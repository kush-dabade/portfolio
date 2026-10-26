import { ArrowUpRight, Info } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import type { Project, ProjectNote } from "@/lib/data/projects";
import { gutter } from "../section";
import InlineList from "../inline-list";
import { buttonPrimary, nudgeOut } from "../ui";

const tones = {
    accent: "bg-accent",
    ok: "bg-ok",
    muted: "bg-ink-3",
};

// "01 · Flagship · Full-stack SaaS — ● In active development"
export const ProjectMeta = ({ project, position }: { project: Project; position: number }) => (
    <p className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[13px] text-ink-3">
        <span>
            <span className="text-accent">{String(position).padStart(2, "0")}</span>
            <span className="mx-2 text-line-strong" aria-hidden="true">/</span>
            {project.category}
        </span>
        <span className="inline-flex items-center gap-2 text-ink-2">
            <span aria-hidden="true" className={`h-1.5 w-1.5 ${tones[project.status.tone]}`} />
            {project.status.label}
        </span>
    </p>
);

// Repository links as full-width rows — label, what's in it, and an arrow — so
// a split frontend/backend project reads as two clear destinations.
export const RepoLinks = ({ project }: { project: Project }) => (
    <ul className="divide-y divide-line border-y border-line">
        {project.repos.map((repo) => (
            <li key={repo.href}>
                <a
                    href={repo.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group -mx-2 flex items-center gap-4 rounded-[2px] px-2 py-3.5 hover:bg-wash"
                >
                    <FaGithub aria-hidden="true" className="h-[18px] w-[18px] shrink-0 text-ink-2 group-hover:text-ink" />
                    <span className="min-w-0 flex-1">
                        <span className="block text-[15px] font-medium text-ink">
                            {repo.label}
                            {project.repos.length > 1 && " repository"}
                        </span>
                        {repo.detail && <span className="block truncate font-mono text-[12.5px] text-ink-3">{repo.detail}</span>}
                    </span>
                    <ArrowUpRight aria-hidden="true" className={`${nudgeOut} shrink-0 text-ink-3 group-hover:text-accent`} />
                    <span className="sr-only">for {project.name} on GitHub (opens in a new tab)</span>
                </a>
            </li>
        ))}
    </ul>
);

export const LiveLink = ({ project }: { project: Project }) =>
    project.liveLink ? (
        <a href={project.liveLink} target="_blank" rel="noreferrer" className={buttonPrimary}>
            Open live demo
            <ArrowUpRight aria-hidden="true" className={nudgeOut} />
            <span className="sr-only">of {project.name} (opens in a new tab)</span>
        </a>
    ) : null;

// Engineering notes in a hairline grid. Column count is chosen by the caller so
// the class names stay literal for Tailwind.
export const NoteGrid = ({ notes, columns }: { notes: ProjectNote[]; columns: string }) => (
    <ul className={`grid gap-px bg-line ${columns}`}>
        {notes.map((note, i) => (
            <li key={note.title} className={`bg-canvas py-7 lg:py-8 ${gutter}`}>
                <h4 className="flex items-baseline gap-3 text-[15px] font-semibold tracking-[-0.01em] text-ink">
                    <span className="font-mono text-[12px] font-normal text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                    {note.title}
                </h4>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-2">{note.body}</p>
            </li>
        ))}
    </ul>
);

// The stack as one quiet line of text rather than a wall of badges.
export const StackLine = ({ stack, className = "" }: { stack: string[]; className?: string }) => (
    <div className={`flex flex-col gap-2 sm:flex-row sm:gap-6 ${className}`}>
        <h4 className="shrink-0 font-mono text-[13px] font-normal text-ink-3">Built with</h4>
        <InlineList items={stack} className="font-mono text-[13px] text-ink-2" />
    </div>
);

export const StatusNote = ({ note }: { note: string }) => (
    <p className="flex gap-3 border-l-2 border-warn bg-inset px-4 py-3.5 text-[14px] leading-relaxed text-ink-2">
        <Info aria-hidden="true" className="mt-[3px] h-4 w-4 shrink-0 text-warn" />
        <span>
            <span className="font-medium text-ink">Status: </span>
            {note}
        </span>
    </p>
);
