import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import type { Project } from "@/lib/data/projects";
import { DECISIONS, PLATES, STATUS, WRITE_PATH } from "@/lib/data/teamos";
import Reveal from "../reveal";
import { Rails, SheetZones, SubHead, gutter } from "../section";
import Code from "../code";
import { ProjectMeta, StackLine } from "./parts";
import TeamOSViews from "./teamos-views";
import PathScroller from "./path-scroller";
import AccessCheck from "./access-check";
import { nudgeOut } from "../ui";

// The flagship's title block: what TeamOS is made of, one line per concern.
const SPEC = [
    ["Shape", "Modular monolith — Express API, a BullMQ worker, a React SPA"],
    ["Tenancy", "One PostgreSQL database; every tenant-owned row carries a workspaceId"],
    ["Access", "Better Auth sessions; roles owner, admin, member, guest"],
    ["Async", "BullMQ on Redis for notifications and email"],
    ["Realtime", "Socket.IO rooms per workspace and per user"],
    ["Checks", "CI on every pull request: lint, typecheck, backend suite on real Postgres and Redis"],
];

// Six small plates in a stack, one marked — the step's place in Fig. 1.
const PlateGlyph = ({ active }: { active: number }) => (
    <svg viewBox="0 0 22 30" className="h-[30px] w-[22px]" aria-hidden="true">
        {PLATES.map((_, i) => (
            <path
                key={i}
                d={`M1 ${3 + i * 4.6} L11 ${0.5 + i * 4.6} L21 ${3 + i * 4.6} L11 ${5.5 + i * 4.6} Z`}
                className={i === active ? "fill-accent stroke-accent" : "fill-canvas stroke-line-strong"}
                strokeWidth={1}
            />
        ))}
    </svg>
);

const TeamOSFeature = ({ project, position }: { project: Project; position: number }) => (
    <article id={project.slug} aria-labelledby={`project-${project.slug}`} tabIndex={-1} className="outline-none">
        <Rails>
            <SheetZones sheet="Sheet 01 — TeamOS" />

            {/* Opener: the name at cover scale beside its title block. */}
            <div className="grid lg:grid-cols-12">
                <Reveal className={`min-w-0 pb-10 pt-12 lg:col-span-7 lg:pb-14 lg:pt-16 ${gutter}`}>
                    <ProjectMeta project={project} position={position} />
                    <h3
                        id={`project-${project.slug}`}
                        className="mt-6 font-display text-[clamp(4.5rem,1.5rem+11vw,10rem)] uppercase leading-[0.8] tracking-[-0.03em] text-ink [font-weight:760]"
                    >
                        {project.name}
                    </h3>
                    <p className="mt-6 text-[clamp(1.25rem,1.1rem+0.6vw,1.6rem)] font-medium leading-snug tracking-[-0.015em] text-ink">
                        {project.tagline}
                    </p>
                    <p className="mt-4 max-w-[58ch] text-[16.5px] leading-relaxed text-ink-2">{project.summary}</p>
                    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                        {project.repos.map((repo) => (
                            <a
                                key={repo.href}
                                href={repo.href}
                                target="_blank"
                                rel="noreferrer"
                                className="group inline-flex items-center gap-2.5 border-b border-line-strong pb-1 text-[15px] font-medium text-ink hover:border-accent"
                            >
                                <FaGithub aria-hidden="true" className="h-4 w-4" />
                                {repo.detail}
                                <ArrowUpRight aria-hidden="true" className={`${nudgeOut} text-ink-3 group-hover:text-accent`} />
                                <span className="sr-only">(opens in a new tab)</span>
                            </a>
                        ))}
                    </div>
                </Reveal>

                <Reveal delay={0.08} className="min-w-0 border-t border-line lg:col-span-5 lg:border-l lg:border-t-0">
                    <p className={`hidden py-3.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-3 lg:block lg:border-b lg:border-line lg:px-8`}>Specification</p>
                    <dl className="divide-y divide-line lg:border-b lg:border-line">
                        {SPEC.map(([term, detail]) => (
                            <div key={term} className={`grid grid-cols-[6.5rem_1fr] gap-4 py-3.5 ${gutter} lg:px-8`}>
                                <dt className="pt-0.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-3">{term}</dt>
                                <dd className="text-[14.5px] leading-snug text-ink-2">{detail}</dd>
                            </div>
                        ))}
                    </dl>
                </Reveal>
            </div>

            {/* The product itself. */}
            <div className="relative border-y border-line bg-inset px-3 py-6 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
                <div className="blueprint fade-edges pointer-events-none absolute inset-0" aria-hidden="true" />
                <Reveal variant="frame" className="relative">
                    <TeamOSViews />
                </Reveal>
            </div>

            {/* 01.1 — the write path, step by step beside the pinned figure. */}
            <SubHead id="teamos-path" index="01.1 — The write path" title="One task, created — and everything that has to be true first.">
                <p>
                    Follow a single <code className="font-mono text-[14px] text-ink">POST /api/v1/projects/:projectId/tasks</code> through the
                    layers of Fig. 1. Every excerpt is from the TeamOS repository.
                </p>
            </SubHead>
            <div className="border-t border-line">
                <PathScroller total={WRITE_PATH.length}>
                    {WRITE_PATH.map((s, i) => (
                        <li
                            key={s.title}
                            data-step={i}
                            className={`group flex flex-col justify-center border-b border-line py-12 transition-opacity duration-500 last:border-b-0 lg:min-h-[72svh] lg:py-16 lg:opacity-35 lg:data-[current]:opacity-100 ${gutter} lg:px-12`}
                        >
                            <p className="flex items-center gap-3 font-mono text-[12px] text-ink-3">
                                <PlateGlyph active={s.plate} />
                                <span>
                                    <span className="text-accent">{String(i + 1).padStart(2, "0")}</span> · {PLATES[s.plate].title}
                                    {i === WRITE_PATH.length - 1 && " (other members)"}
                                </span>
                            </p>
                            <h4 className="mt-5 text-[clamp(1.35rem,1.15rem+0.8vw,1.85rem)] font-semibold leading-tight tracking-[-0.02em] text-ink">
                                {s.title}
                            </h4>
                            <p className="mt-3 max-w-[60ch] text-[16px] leading-relaxed text-ink-2">{s.body}</p>
                            <Code code={s.code} file={s.file} mark={s.mark} className="mt-6" />
                        </li>
                    ))}
                </PathScroller>
            </div>

            {/* 01.2 — tenancy, interactively. */}
            <div className="border-t border-line">
                <SubHead index="01.2 — Who can write" title="Isolation is the application's job, so every write proves membership.">
                    <p>
                        Tenants share one database. Nothing in Postgres stops a query from crossing workspaces, so the service re-reads the
                        caller&apos;s membership and role on every write — and cross-workspace access has its own regression tests. Pick a caller:
                    </p>
                </SubHead>
                <Reveal className={`pb-16 lg:pb-20 ${gutter}`}>
                    <div className="lg:ml-[25%]">
                        <AccessCheck />
                    </div>
                </Reveal>
            </div>

            {/* 01.3 — the decision register. */}
            <div className="border-t border-line">
                <SubHead index="01.3 — Decisions" title="What it chose, and what that costs.">
                    <p>From the trade-offs section of TeamOS&apos;s own system-design document — the costs are written down alongside the gains.</p>
                </SubHead>
                <ol className="border-t border-line">
                    {DECISIONS.map((d, i) => (
                        <Reveal
                            as="li"
                            key={d.chose}
                            delay={i * 0.04}
                            className={`grid gap-x-8 gap-y-3 border-b border-line py-7 last:border-b-0 lg:grid-cols-12 ${gutter}`}
                        >
                            <p className="font-mono text-[12px] text-ink-3 lg:col-span-1 lg:pt-1">{String(i + 1).padStart(2, "0")}</p>
                            <div className="lg:col-span-4">
                                <p className="text-[17px] font-semibold leading-snug tracking-[-0.01em] text-ink">{d.chose}</p>
                                <p className="mt-1 font-serif text-[16px] italic text-ink-3">rather than {d.over}</p>
                            </div>
                            <p className="text-[15px] leading-relaxed text-ink-2 lg:col-span-3">
                                <span className="mr-2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ok">Gain</span>
                                {d.gain}
                            </p>
                            <p className="text-[15px] leading-relaxed text-ink-2 lg:col-span-4">
                                <span className="mr-2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-accent">Cost</span>
                                {d.cost}
                            </p>
                        </Reveal>
                    ))}
                </ol>
            </div>

            {/* 01.4 — status, plainly. */}
            <div className="border-t border-line">
                <SubHead index="01.4 — Status" title="Built, in progress, not yet." />
                <Reveal className="grid border-t border-line md:grid-cols-3">
                    {[
                        { label: "Built", tone: "text-ok", body: STATUS.built },
                        { label: "Now", tone: "text-accent", body: STATUS.now },
                        { label: "Next", tone: "text-ink-3", body: STATUS.next },
                    ].map((col) => (
                        <div key={col.label} className={`border-b border-line py-7 md:border-b-0 md:border-r md:last:border-r-0 ${gutter}`}>
                            <p className={`font-mono text-[11px] uppercase tracking-[0.12em] ${col.tone}`}>{col.label}</p>
                            <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{col.body}</p>
                        </div>
                    ))}
                </Reveal>
                <div className={`border-t border-line py-5 ${gutter}`}>
                    <p className="flex gap-3 text-[14.5px] leading-relaxed text-ink-2">
                        <span className="mt-[7px] h-2 w-2 shrink-0 border border-warn" aria-hidden="true" />
                        <span>
                            <span className="font-medium text-ink">Deployment: </span>
                            {STATUS.deployment}
                        </span>
                    </p>
                </div>
                <StackLine stack={project.stack} className={`border-t border-line py-6 ${gutter}`} />
            </div>
        </Rails>
    </article>
);

export default TeamOSFeature;
