// TeamOS, layer by layer. Everything here is taken from the TeamOS repository:
// the create-task path (task.routes.ts → task.controller.ts → task.service.ts),
// the realtime handlers in the frontend, and docs/architecture/system-design.md.
// Code excerpts are shortened — error messages, long objects and surrounding
// control flow are elided with "…" — but nothing in them is paraphrased.

export type PlateId = "client" | "session" | "validate" | "tenancy" | "commit" | "fanout";

// The six layers of Fig. 1, top to bottom — the order a write passes through them.
export const PLATES: { id: PlateId; title: string; detail: string }[] = [
    { id: "client", title: "Client", detail: "React 19 · TanStack Query" },
    { id: "session", title: "Session", detail: "Better Auth · requireAuth" },
    { id: "validate", title: "Validate", detail: "Zod · createTaskSchema" },
    { id: "tenancy", title: "Tenancy", detail: "Workspace membership + role" },
    { id: "commit", title: "Transaction", detail: "Prisma · PostgreSQL" },
    { id: "fanout", title: "After commit", detail: "BullMQ · Socket.IO" },
];

export interface PathStep {
    // Which plate of the figure lights up for this step.
    plate: number;
    title: string;
    body: string;
    file: string;
    code: string;
    // 1-based line numbers inside `code` to mark.
    mark?: number[];
}

export const WRITE_PATH: PathStep[] = [
    {
        plate: 0,
        title: "A member adds a task",
        body: "The board calls a TanStack Query mutation. On success it invalidates the cached task lists instead of patching local state, so the server stays the single source of truth.",
        file: "frontend/src/features/tasks/hooks/use-create-task.ts",
        code: `return useMutation<Task, AppError, CreateTaskVariables>({
  mutationFn: ({ projectId, input }) => createTask(projectId, input),
  onSuccess: (_task, { projectId }) => {
    queryClient.invalidateQueries({ queryKey: taskKeys.list(projectId) });
    queryClient.invalidateQueries({ queryKey: taskKeys.workspaceLists() });
  },
});`,
        mark: [2],
    },
    {
        plate: 1,
        title: "Who is asking?",
        body: "Every route runs requireAuth first. It resolves the Better Auth session from the request's cookies; no session means a 401 before any business code runs.",
        file: "backend/src/middleware/require-auth.ts",
        code: `const session = await auth.api.getSession({
  headers: fromNodeHeaders(req.headers),
});

if (!session) {
  throw new UnauthorizedError("Authentication required");
}`,
        mark: [1],
    },
    {
        plate: 2,
        title: "Is the request well-formed?",
        body: "The controller parses the body with a Zod schema. A malformed title, priority or date is rejected with a 400 before the service layer sees it.",
        file: "backend/src/modules/task/task.schema.ts",
        code: `export const createTaskSchema = z.object({
  title: z.string().trim().min(3, …).max(255, …),
  description: z.string().trim().max(5000, …).optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
  dueDate: z.iso.date().optional(),
  assigneeId: z.string().trim().min(1, …).optional(),
});`,
    },
    {
        plate: 3,
        title: "Is this their workspace?",
        body: "Tenants share one database, so isolation is the application's job. The service looks up the project's workspace, re-reads the caller's membership and role from Postgres, and refuses guests.",
        file: "backend/src/modules/task/task.service.ts",
        code: `const membership = await requireWorkspaceMembership(project.workspaceId, actorId);

if (membership.role === "GUEST") {
  throw new ForbiddenError("Guests cannot create tasks");
}`,
        mark: [1],
    },
    {
        plate: 4,
        title: "Write it once, atomically",
        body: "The task and its activity entry are written in a single Prisma transaction. The activity's realtime event is staged, not sent — the transaction could still roll back.",
        file: "backend/src/modules/task/task.service.ts",
        code: `const task = await prisma.$transaction(async (tx) => {
  const createdTask = await tx.task.create({ data: { … } });

  // only stages the activity row inside this transaction
  emitActivityCreated = await createActivity({ … }, tx);

  return createdTask;
});`,
        mark: [1],
    },
    {
        plate: 5,
        title: "Only then, tell everyone",
        body: "After the commit resolves: the staged activity event goes out, the assignee's notification is queued on BullMQ with a deterministic job ID (queueing the same event twice is a no-op), and TASK_CREATED is emitted to the workspace's Socket.IO room.",
        file: "backend/src/modules/task/task.service.ts",
        code: `emitActivityCreated();

await enqueueNotification({ recipientId: task.assigneeId, eventId: task.id, … });
// jobId: \`create-notification-\${recipientId}-\${eventId}\`

emitToWorkspace(task.workspaceId, REALTIME_EVENTS.TASK_CREATED, {
  workspaceId: task.workspaceId,
  task: response,
});`,
        mark: [1, 3, 6],
    },
    {
        plate: 0,
        title: "Every open board catches up",
        body: "Other members' clients receive the event and invalidate the affected query, so they refetch committed data. If a socket push fails it is only logged — the next normal fetch is the fallback.",
        file: "frontend/src/features/realtime/lib/realtime-handlers.ts",
        code: `[REALTIME_EVENTS.TASK_CREATED]: (payload, queryClient) => {
  if (!isTaskEventPayload(payload)) {
    return;
  }
  queryClient.invalidateQueries({ queryKey: taskKeys.list(payload.task.projectId) });
},`,
        mark: [5],
    },
];

// What happens to POST /api/v1/projects/:projectId/tasks for each kind of caller.
// Messages and status codes as the backend sends them (middleware/error-handler.ts).
export const ACCESS_CASES = [
    { id: "owner", label: "Owner", gate: 4, status: 201, message: "Created" },
    { id: "admin", label: "Admin", gate: 4, status: 201, message: "Created" },
    { id: "member", label: "Member", gate: 4, status: 201, message: "Created" },
    { id: "guest", label: "Guest", gate: 3, status: 403, message: "Guests cannot create tasks" },
    { id: "outsider", label: "Other workspace", gate: 2, status: 403, message: "You are not a member of this workspace" },
    { id: "anon", label: "Signed out", gate: 0, status: 401, message: "Authentication required" },
] as const;

// The checks in order. A case stops at its `gate`; 4 means it got through all of them.
export const ACCESS_GATES = [
    { title: "Session", detail: "requireAuth" },
    { title: "Body", detail: "Zod schema" },
    { title: "Membership", detail: "workspace member?" },
    { title: "Role", detail: "not a guest?" },
];

// docs/architecture/system-design.md §17, "Important Architectural Tradeoffs".
export const DECISIONS = [
    {
        chose: "A modular monolith",
        over: "microservices",
        gain: "One deploy, plain database transactions, in-process calls between modules.",
        cost: "Module boundaries are a convention, not something the build enforces.",
    },
    {
        chose: "One database, scoped by workspaceId",
        over: "a database per tenant",
        gain: "One schema to migrate; cheap to build and run.",
        cost: "Isolation lives in application code — a missing filter is a silent bug, so cross-workspace access has its own regression suite.",
    },
    {
        chose: "Commit, then emit",
        over: "emitting inside the request",
        gain: "A failed or slow socket push can never lose or roll back a write.",
        cost: "Realtime is best-effort; a missed event waits for the client's next fetch.",
    },
    {
        chose: "BullMQ for side effects",
        over: "doing them in the request",
        gain: "Sign-up, invitations and notifications don't wait on email or notification writes.",
        cost: "Delivery is eventual, and a Redis outage degrades those side effects.",
    },
    {
        chose: "Local file storage, behind one interface",
        over: "S3 from day one",
        gain: "Attachments work today with no cloud dependency or cost.",
        cost: "One disk, no CDN — swapping in S3 means implementing one provider.",
    },
];

// README "Roadmap" and docs/development/deployment.md, in their own terms.
export const STATUS = {
    built: "Workspaces, membership and roles, invitations, projects, tasks, sprints, comments, attachments, activity, notifications, search and realtime — working end to end, with CI gating every pull request on lint, typecheck and the full backend suite against real Postgres 17 and Redis 8.",
    now: "Production-readiness hardening.",
    next: "The remaining product capabilities, broader automated testing and more infrastructure work.",
    deployment: "A single-VM production setup (Docker Compose, Caddy as the only public entry point) is written up in the repository. There's no public URL yet.",
};
