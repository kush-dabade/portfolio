// Project content is checked against each repository's source code. Keep it that way:
// no metrics, deployments or features the code can't back up.

export type ProjectSlug = "teamos" | "university-management" | "coinwave";

export interface ProjectLink {
    label: string;
    // A few words on what the link leads to, shown under the label.
    detail?: string;
    href: string;
}

// One engineering point: a short title and the evidence behind it.
export interface ProjectNote {
    title: string;
    body: string;
}

export interface Project {
    slug: ProjectSlug;
    name: string;
    tagline: string;
    category: string;
    status: { label: string; tone: "accent" | "ok" | "muted" };
    summary: string;
    notes: ProjectNote[];
    stack: string[];
    // Source repositories — some projects are split into frontend and backend.
    repos: ProjectLink[];
    // Only set when there is a working public deployment.
    liveLink?: string;
    // Honest caveat for partially finished work.
    note?: string;
}

// What happens when a TeamOS member creates a task, in the order the backend
// runs it (task.routes.ts → task.controller.ts → task.service.ts).
export const teamosWritePath: ProjectNote[] = [
    {
        title: "Session",
        body: "requireAuth resolves the Better Auth session from the request cookie.",
    },
    {
        title: "Validate",
        body: "The controller parses the body with a Zod schema before any service code runs.",
    },
    {
        title: "Authorise",
        body: "The service re-reads the caller's workspace membership and role from Postgres; guests can't write.",
    },
    {
        title: "Commit",
        body: "The task and its activity entry are written in one Prisma transaction.",
    },
    {
        title: "Fan out",
        body: "Only after the commit: a Socket.IO event to the workspace room, and a BullMQ job for the assignee's notification.",
    },
    {
        title: "Refetch",
        body: "Clients invalidate the affected TanStack Query caches and refetch, rather than patching local state.",
    },
];

export const projects: Project[] = [
    {
        slug: "teamos",
        name: "TeamOS",
        tagline: "Multi-tenant project management SaaS",
        category: "Flagship · Full-stack SaaS",
        status: { label: "In active development", tone: "accent" },
        summary:
            "Teams sharing one app need their work kept strictly apart. TeamOS gives every team its own workspace — projects, sprints, tasks, comments, attachments and an activity trail — on a modular TypeScript backend, with a React frontend kept in sync through realtime events.",
        notes: [
            {
                title: "Tenant isolation",
                body: "Every tenant-owned table carries a workspaceId, and each request re-checks the caller's membership and role (owner, admin, member, guest).",
            },
            {
                title: "No duplicate jobs",
                body: "Notification and invitation-email jobs on Redis-backed BullMQ queues get deterministic IDs, so queueing the same event twice is a no-op.",
            },
            {
                title: "One active sprint, enforced by Postgres",
                body: "A hand-written partial unique index allows at most one active sprint per project, whatever the application code does.",
            },
            {
                title: "Tested against real services",
                body: "Tenant-isolation, RBAC and realtime tests run against real Postgres and Redis in GitHub Actions on every pull request.",
            },
        ],
        stack: [
            "React",
            "TypeScript",
            "TanStack Query",
            "Node.js",
            "Express",
            "Prisma",
            "PostgreSQL",
            "Redis",
            "BullMQ",
            "Socket.IO",
            "Better Auth",
            "Zod",
            "Docker Compose",
        ],
        repos: [{ label: "Source", detail: "github.com/kush-dabade/TeamOS", href: "https://github.com/kush-dabade/TeamOS" }],
    },
    {
        slug: "university-management",
        name: "University Management System",
        tagline: "Full-stack university administration",
        category: "Full-stack web app",
        status: { label: "Not deployed", tone: "muted" },
        summary:
            "An admin app for a university's academic structure — departments, subjects, classes, faculty and student enrollments — with a React frontend talking to a separate Express and PostgreSQL API.",
        notes: [
            {
                title: "Relational model",
                body: "Drizzle ORM on PostgreSQL: departments own subjects, subjects own classes, and teachers and enrolled students link back to users through indexed foreign keys.",
            },
            {
                title: "Queries the UI can drive",
                body: "List endpoints take search, filter and pagination parameters over joined queries; the Refine data provider maps table state onto them.",
            },
            {
                title: "Auth and protection",
                body: "Better Auth email/password sign-in with student, teacher and admin roles. Arcjet bot detection and a sliding-window rate limit run in front of every API route.",
            },
        ],
        stack: ["React", "TypeScript", "Refine", "shadcn/ui", "Zod", "Express", "Drizzle ORM", "PostgreSQL", "Better Auth", "Arcjet"],
        repos: [
            {
                label: "Frontend",
                detail: "React · Refine · shadcn/ui",
                href: "https://github.com/kush-dabade/university-management-frontend",
            },
            {
                label: "Backend",
                detail: "Express · Drizzle ORM · PostgreSQL",
                href: "https://github.com/kush-dabade/university-management-backend",
            },
        ],
        note: "Department, enrollment and statistics routers are written but not mounted in the API server, and the API routes don't read the session yet — so the per-role rate limits all resolve to the guest tier.",
    },
    {
        slug: "coinwave",
        name: "CoinWave",
        tagline: "Cryptocurrency market dashboard",
        category: "Frontend · Data visualisation",
        status: { label: "Live demo", tone: "ok" },
        summary:
            "A market dashboard built on CoinGecko's public API: market overview, a filterable coin table with 7-day sparklines, trending coins, analysis charts and a portfolio tracker. It runs entirely in the browser — there's no backend.",
        notes: [
            {
                title: "Typed data layer",
                body: "A service layer normalises CoinGecko responses — null-safe numbers, sparkline series — before any component renders them.",
            },
            {
                title: "Market table",
                body: "Search, gainers / losers / trending filters, sorting by market cap, price or 24h change, and a watchlist saved in localStorage.",
            },
            {
                title: "Charts",
                body: "Recharts area charts, sparklines and allocation charts plus a market heatmap; each page polls the API every 15 to 60 seconds.",
            },
        ],
        stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "Recharts", "TanStack Table", "React Router"],
        repos: [{ label: "Source", detail: "github.com/kush-dabade/coinwave", href: "https://github.com/kush-dabade/coinwave" }],
        liveLink: "https://coinwave.vercel.app",
    },
];

export const projectBySlug = (slug: ProjectSlug): Project => {
    const project = projects.find((p) => p.slug === slug);
    if (!project) throw new Error(`Unknown project: ${slug}`);
    return project;
};
