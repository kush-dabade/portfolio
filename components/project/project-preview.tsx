import Image from "next/image";
import type { ProjectPreview as PreviewKind } from "@/lib/data/projects";

// Previews are either a real screenshot or a diagram drawn from the repository
// itself (architecture, template, schema) — never a mocked-up result.

// Screenshots keep a fixed 16:10 window; diagrams flow to their natural height on
// phones and lock to the same ratio from `sm` up so the cards line up.
const Frame = ({
    label,
    diagram = false,
    ratio = "aspect-16/10",
    children,
}: {
    label: string;
    diagram?: boolean;
    ratio?: string;
    children: React.ReactNode;
}) => (
    <div className="overflow-hidden rounded-lg border border-line bg-inset transition-[border-color,transform] duration-300 ease-out group-hover:-translate-y-0.5 group-hover:border-accent-line">
        <div className="flex items-center gap-3 border-b border-line bg-raised px-3 py-2">
            <div className="flex gap-1.5" aria-hidden="true">
                <span className="h-2 w-2 rounded-full bg-line-strong" />
                <span className="h-2 w-2 rounded-full bg-line-strong" />
                <span className="h-2 w-2 rounded-full bg-line-strong" />
            </div>
            <span className="truncate font-mono text-[10.5px] text-ink-3">{label}</span>
        </div>
        {/* Class names stay literal so Tailwind can find them. */}
        <div className={`relative overflow-hidden ${diagram ? "sm:aspect-16/10" : ratio}`}>{children}</div>
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

// Shown full width as the flagship, so the frame matches the screenshot's own ratio.
const TeamOSPreview = () => (
    <Frame label="teamos — dashboard" ratio="aspect-[1438/640]">
        <Image
            src="/images/projects/teamos-dashboard.webp"
            alt="TeamOS dashboard: a workspace sidebar, projects to continue, overdue tasks needing attention, and a My tasks table"
            fill
            sizes="(min-width: 1024px) 896px, 100vw"
            className="object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-[1.015]"
        />
    </Frame>
);

const CoinWavePreview = () => (
    <Frame label="coinwave.vercel.app — markets">
        <Image
            src="/images/projects/coinwave-markets.webp"
            alt="CoinWave markets page: total market cap, 24h volume and BTC dominance cards, trending coins, filters and a market table with 7-day sparklines"
            fill
            sizes="(min-width: 1024px) 520px, (min-width: 768px) 55vw, 100vw"
            className="object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
    </Frame>
);

const Entity = ({ name, fields, className = "" }: { name: string; fields: [string, string][]; className?: string }) => (
    <div className={`min-w-0 rounded-md border border-line bg-canvas ${className}`}>
        <div className="border-b border-line px-2 py-1.5 text-[10px] text-ink sm:text-[11px]">{name}</div>
        <ul className="space-y-0.5 px-2 py-1.5 text-[9.5px] sm:text-[10px]">
            {fields.map(([field, type]) => (
                <li key={field} className="flex justify-between gap-2">
                    <span className="truncate text-ink-2">{field}</span>
                    <span className="truncate text-ink-3">{type}</span>
                </li>
            ))}
        </ul>
    </div>
);

const Arrow = () => (
    <span aria-hidden="true" className="hidden self-center text-[10px] text-ink-3 min-[480px]:block">
        →
    </span>
);

// Drawn from the Drizzle schema in the backend repository (src/db/schema/app.ts).
const UniversityPreview = () => (
    <Frame label="backend · src/db/schema/app.ts" diagram>
        <div
            className="flex flex-col justify-center gap-2.5 px-4 py-5 font-mono sm:absolute sm:inset-0 sm:px-5 sm:py-3"
            role="img"
            aria-label="Database schema: departments have many subjects, subjects have many classes; each class has a teacher and a unique invite code; enrollments link students to classes; users have a student, teacher or admin role."
        >
            <div className="grid grid-cols-1 gap-2 min-[480px]:grid-cols-[1fr_auto_1fr_auto_1fr]">
                <Entity name="departments" fields={[["code", "unique"], ["name", "varchar"]]} />
                <Arrow />
                <Entity name="subjects" fields={[["code", "unique"], ["department_id", "fk"]]} />
                <Arrow />
                <Entity name="classes" fields={[["subject_id", "fk"], ["teacher_id", "fk"], ["invite_code", "unique"]]} />
            </div>
            <div className="grid grid-cols-1 gap-2 min-[480px]:grid-cols-2">
                <Entity name="enrollments" fields={[["student_id", "fk → user"], ["class_id", "fk → classes"]]} />
                <Entity name="user" fields={[["role", "enum, default student"], ["name", "text"]]} />
            </div>
            <p className="flex flex-wrap items-center gap-1.5 text-[9.5px] text-ink-3 sm:text-[10px]">
                user role
                <Pill tone="accent">student</Pill>
                <Pill tone="accent">teacher</Pill>
                <Pill tone="accent">admin</Pill>
            </p>
        </div>
    </Frame>
);

const ProjectPreview = ({ kind }: { kind: PreviewKind }) => {
    switch (kind) {
        case "teamos":
            return <TeamOSPreview />;
        case "university":
            return <UniversityPreview />;
        case "coinwave":
            return <CoinWavePreview />;
    }
};

export default ProjectPreview;
