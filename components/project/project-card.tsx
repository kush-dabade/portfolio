import { ArrowUpRight, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import type { Project } from "@/lib/data/projects";
import ProjectPreview from "./project-preview";
import Reveal from "../reveal";

const Label = ({ children }: { children: React.ReactNode }) => (
    <h4 className="mb-3 font-mono text-[11px] font-normal uppercase tracking-[0.12em] text-ink-3">{children}</h4>
);

const OutLink = ({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) => (
    <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-md border border-line bg-raised px-3 py-1.5 text-[13px] font-medium text-ink-2 hover:border-line-strong hover:text-ink"
    >
        {icon}
        {children}
    </a>
);

/** One project: intro beside its preview, then highlights and stack underneath. `flip` mirrors the top row. */
const ProjectCard = ({ project, position, flip = false }: { project: Project; position: number; flip?: boolean }) => {
    const { slug, title, category, status, summary, highlights, stack, githubLink, liveLink, preview } = project;
    const headingId = `project-${slug}`;

    return (
        <article aria-labelledby={headingId} className="group relative px-5 py-10 sm:px-10 sm:py-14">
            {/* Hover: an accent hairline sweeps across the top edge. */}
            <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-linear-to-r from-transparent via-accent to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100"
            />
            <Reveal>
                <div className="grid items-center gap-8 md:grid-cols-[5fr_7fr] md:gap-10">
                    <header className={flip ? "md:order-last" : undefined}>
                        <p className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">
                                <span className="text-accent">{String(position).padStart(2, "0")}</span> / {category}
                            </span>
                            <span className="rounded border border-line bg-raised px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-2">
                                {status}
                            </span>
                        </p>

                        <h3 id={headingId} className="text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
                            <a href={githubLink} target="_blank" rel="noreferrer" className="rounded-sm hover:text-accent">
                                {title}
                                <ArrowUpRight
                                    aria-hidden="true"
                                    className="ml-1.5 inline-block h-5 w-5 align-[-0.1em] text-ink-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                                />
                                <span className="sr-only">(source on GitHub, opens in a new tab)</span>
                            </a>
                        </h3>

                        <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{summary}</p>

                        <div className="mt-6 flex flex-wrap gap-2">
                            <OutLink href={githubLink} icon={<FaGithub aria-hidden="true" className="h-3.5 w-3.5" />}>
                                View source<span className="sr-only"> for {title} (opens in a new tab)</span>
                            </OutLink>
                            {liveLink && (
                                <OutLink href={liveLink} icon={<ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />}>
                                    Live site<span className="sr-only"> for {title} (opens in a new tab)</span>
                                </OutLink>
                            )}
                        </div>
                    </header>

                    <ProjectPreview kind={preview} />
                </div>

                <div className="mt-8 grid gap-8 border-t border-line pt-8 md:grid-cols-[2fr_1fr] md:gap-10">
                    <section>
                        <Label>Highlights</Label>
                        <ul className="space-y-2.5">
                            {highlights.map((point) => (
                                <li key={point} className="flex gap-3 text-sm leading-relaxed text-ink-2">
                                    <span aria-hidden="true" className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </section>
                    <section>
                        <Label>Stack</Label>
                        <ul className="flex flex-wrap gap-1.5">
                            {stack.map((tool) => (
                                <li key={tool} className="rounded border border-line bg-chip px-2 py-0.5 font-mono text-[11px] text-chip-ink">
                                    {tool}
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </Reveal>
        </article>
    );
};

export default ProjectCard;
