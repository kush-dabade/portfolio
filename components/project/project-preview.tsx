import Image from "next/image";
import type { ProjectPreview as PreviewKind } from "@/lib/data/projects";

// Previews are either a real screenshot or a diagram drawn from the repository
// itself (architecture, template, schema) — never a mocked-up result.

// Screenshots keep a fixed 16:10 window; diagrams flow to their natural height on
// phones and lock to the same ratio from `sm` up so the cards line up.
const Frame = ({ label, diagram = false, children }: { label: string; diagram?: boolean; children: React.ReactNode }) => (
    <div className="overflow-hidden rounded-lg border border-line bg-inset transition-[border-color,transform] duration-300 ease-out group-hover:-translate-y-0.5 group-hover:border-accent-line">
        <div className="flex items-center gap-3 border-b border-line bg-raised px-3 py-2">
            <div className="flex gap-1.5" aria-hidden="true">
                <span className="h-2 w-2 rounded-full bg-line-strong" />
                <span className="h-2 w-2 rounded-full bg-line-strong" />
                <span className="h-2 w-2 rounded-full bg-line-strong" />
            </div>
            <span className="truncate font-mono text-[10.5px] text-ink-3">{label}</span>
        </div>
        <div className={`relative overflow-hidden ${diagram ? "sm:aspect-16/10" : "aspect-16/10"}`}>{children}</div>
    </div>
);

const Pill = ({ tone = "muted", children }: { tone?: "ok" | "warn" | "muted" | "accent"; children: React.ReactNode }) => {
    const tones = {
        ok: "border-ok/30 text-ok bg-ok/10",
        warn: "border-warn/30 text-warn bg-warn/10",
        muted: "border-line text-ink-3 bg-canvas",
        accent: "border-accent-line text-accent bg-accent-soft",
    };
    return (
        <span className={`inline-flex items-center rounded border px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-wider sm:text-[10px] ${tones[tone]}`}>
            {children}
        </span>
    );
};

const TeamOSPreview = () => (
    <Frame label="teamos — dashboard">
        <Image
            src="/images/projects/teamos-dashboard.webp"
            alt="TeamOS dashboard showing active projects, overdue tasks and a My tasks table"
            fill
            sizes="(min-width: 1024px) 560px, (min-width: 768px) 55vw, 100vw"
            className="object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
    </Frame>
);

const IacPreview = () => {
    const stages = [
        { step: "Deploy", detail: "create change set → review → execute", result: "CREATE_COMPLETE", tone: "ok" as const },
        { step: "Update", detail: "enable-s3-versioning · no replacement", result: "UPDATE_COMPLETE", tone: "ok" as const },
        { step: "Drift", detail: "detect-stack-drift · 0 drifted", result: "IN_SYNC", tone: "ok" as const },
        { step: "Cleanup", detail: "empty versions, then delete stack", result: "PENDING", tone: "warn" as const },
    ];
    return (
        <Frame label="templates/s3-bucket.yaml" diagram>
            <div className="grid grid-rows-[auto_1fr] font-mono sm:absolute sm:inset-0 text-[10px] leading-relaxed sm:text-[11px]">
                <pre className="overflow-hidden border-b border-line px-4 py-3 text-ink-3" aria-hidden="true">
                    <span className="text-accent">ProjectBucket</span>:{"\n"}
                    {"  "}Type: AWS::S3::Bucket{"\n"}
                    {"  "}BucketName: !Sub &quot;${"{"}ProjectName{"}"}-${"{"}Environment{"}"}-…&quot;{"\n"}
                    {"  "}SSEAlgorithm: <span className="text-ink-2">AES256</span>
                </pre>
                <ol className="flex flex-col justify-center gap-2 px-4 py-3" aria-label="Recorded stack results">
                    {stages.map((s, i) => (
                        <li key={s.step} className="flex items-center gap-3">
                            <span className="w-4 text-ink-3">{i + 1}</span>
                            <span className="w-14 text-ink">{s.step}</span>
                            <span className="hidden flex-1 truncate text-ink-3 sm:block">{s.detail}</span>
                            <span className="ml-auto"><Pill tone={s.tone}>{s.result}</Pill></span>
                        </li>
                    ))}
                </ol>
            </div>
        </Frame>
    );
};

const Instance = ({ name, az }: { name: string; az: string }) => (
    <div className="flex-1 rounded-md border border-line bg-canvas p-2 sm:p-2.5">
        <div className="flex items-center justify-between gap-1">
            <span className="text-[10px] text-ink sm:text-[11px]">{name}</span>
            <Pill tone="ok">Healthy</Pill>
        </div>
        <div className="mt-1 text-[9.5px] text-ink-3 sm:text-[10px]"><span className="hidden sm:inline">t3.micro · </span>{az}</div>
    </div>
);

const Node = ({ title, sub }: { title: string; sub: string }) => (
    <div className="mx-auto w-full max-w-[16rem] rounded-md border border-line-strong bg-raised px-3 py-1.5 text-center">
        <div className="text-[10px] text-ink sm:text-[11px]">{title}</div>
        <div className="text-[9.5px] text-ink-3 sm:text-[10px]">{sub}</div>
    </div>
);

const Connector = () => <div className="mx-auto h-3 w-px bg-line-strong sm:h-4" aria-hidden="true" />;

const FailoverPreview = () => (
    <Frame label="vmfail — architecture" diagram>
        <div
            className="flex flex-col justify-center px-4 py-5 font-mono sm:absolute sm:inset-0 sm:px-6 sm:py-3"
            role="img"
            aria-label="Browser traffic flows through an Application Load Balancer to a target group with /health checks, then to two EC2 instances in ap-south-1a and ap-south-1b inside an Auto Scaling Group with min 2, desired 2, max 3."
        >
            <Node title="Browser" sub="request every 700 ms" />
            <Connector />
            <Node title="Application Load Balancer" sub="target group · /health" />
            <Connector />
            <div className="rounded-lg border border-dashed border-accent-line p-2 sm:p-3">
                <div className="mb-2 flex items-center justify-between text-[9.5px] text-ink-3 sm:text-[10px]">
                    <span className="text-accent">Auto Scaling Group</span>
                    <span>min 2 · desired 2 · max 3</span>
                </div>
                <div className="flex gap-2">
                    <Instance name="EC2-1" az="ap-south-1a" />
                    <Instance name="EC2-2" az="ap-south-1b" />
                </div>
            </div>
        </div>
    </Frame>
);

const Entity = ({ name, fields, note }: { name: string; fields: [string, string][]; note?: string }) => (
    <div className="min-w-0 rounded-md border border-line bg-canvas">
        <div className="border-b border-line px-2 py-1.5 text-[10px] text-ink sm:text-[11px]">{name}</div>
        <ul className="space-y-0.5 px-2 py-1.5 text-[9.5px] sm:text-[10px]">
            {fields.map(([field, type]) => (
                <li key={field} className="flex justify-between gap-2">
                    <span className="truncate text-ink-2">{field}</span>
                    <span className="truncate text-ink-3">{type}</span>
                </li>
            ))}
        </ul>
        {note && <div className="border-t border-line px-2 py-1 text-[9.5px] text-accent sm:text-[10px]">{note}</div>}
    </div>
);

const RatingsPreview = () => (
    <Frame label="prisma/schema.prisma" diagram>
        <div
            className="flex flex-col justify-center gap-3 px-4 py-5 font-mono sm:absolute sm:inset-0 sm:px-5 sm:py-3"
            role="img"
            aria-label="Database schema: User with a role of ADMIN, USER or OWNER; Store with an optional unique owner; Rating with a value from 1 to 5 and a unique constraint on userId and storeId."
        >
            <div className="flex flex-wrap items-center gap-1.5">
                <span className="mr-1 text-[10px] text-ink-3">enum Role</span>
                <Pill tone="accent">Admin</Pill>
                <Pill tone="accent">User</Pill>
                <Pill tone="accent">Owner</Pill>
            </div>
            <div className="grid grid-cols-1 gap-2 min-[480px]:grid-cols-3">
                <Entity name="User" fields={[["email", "@unique"], ["role", "Role"], ["ratings", "Rating[]"]]} />
                <Entity name="Rating" fields={[["value", "Int 1–5"], ["userId", "Int"], ["storeId", "Int"]]} note="@@unique([userId, storeId])" />
                <Entity name="Store" fields={[["email", "@unique"], ["ownerId", "Int? @unique"], ["ratings", "Rating[]"]]} />
            </div>
            <p className="text-[9.5px] text-ink-3 sm:text-[10px]">
                one rating per user per store — enforced by the database
            </p>
        </div>
    </Frame>
);

const ProjectPreview = ({ kind }: { kind: PreviewKind }) => {
    switch (kind) {
        case "teamos":
            return <TeamOSPreview />;
        case "iac":
            return <IacPreview />;
        case "failover":
            return <FailoverPreview />;
        case "ratings":
            return <RatingsPreview />;
    }
};

export default ProjectPreview;
