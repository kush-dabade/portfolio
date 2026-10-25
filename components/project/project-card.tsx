import { ArrowUpRight, ExternalLink, Info } from "lucide-react";
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

/**
 * One project. Regular cards put the intro beside the preview (`flip` mirrors them);
 * the featured card gives its screenshot the full column width.
 */
const ProjectCard = ({ project, position, flip = false }: { project: Project; position: number; flip?: boolean }) => {
    const { slug, title, category, status, summary, highlights, stack, repos, liveLink, note, featured, preview } = project;
    const headingId = `project-${slug}`;
    const primaryHref = liveLink ?? repos[0].href;

    const meta = (
        <p className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">
                <span className="text-accent">{String(position).padStart(2, "0")}</span> / {category}
            </span>
            <span className="rounded border border-line bg-raised px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-2">
                {status}
            </span>
        </p>
    );

    const heading = (
        <h3 id={headingId} className={`font-semibold tracking-tight ${featured ? "text-2xl sm:text-[2rem]" : "text-2xl sm:text-[1.6rem]"}`}>
            <a href={primaryHref} target="_blank" rel="noreferrer" className="rounded-sm hover:text-accent">
                {title}
                <ArrowUpRight
                    aria-hidden="true"
                    className="ml-1.5 inline-block h-5 w-5 align-[-0.1em] text-ink-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
                <span className="sr-only">({liveLink ? "live demo" : "source on GitHub"}, opens in a new tab)</span>
            </a>
        </h3>
    );

    const actions = (
        <div className="flex flex-wrap gap-2">
            {liveLink && (
                <OutLink href={liveLink} icon={<ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />}>
                    Live demo<span className="sr-only"> of {title} (opens in a new tab)</span>
                </OutLink>
            )}
            {repos.map((repo) => (
                <OutLink key={repo.href} href={repo.href} icon={<FaGithub aria-hidden="true" className="h-3.5 w-3.5" />}>
                    {repo.label}
                    <span className="sr-only">{repos.length > 1 ? " repository" : ""} for {title} (opens in a new tab)</span>
                </OutLink>
            ))}
        </div>
    );

    return (
        <article aria-labelledby={headingId} className="group relative px-5 py-10 sm:px-10 sm:py-14">
            {/* Hover: an accent hairline sweeps across the top edge. */}
            <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-linear-to-r from-transparent via-accent to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100"
            />
            <Reveal>
                {featured ? (
                    <>
                        {meta}
                        <div className="grid gap-6 md:grid-cols-[7fr_5fr] md:items-end md:gap-10">
                            <div>
                                {heading}
                                <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{summary}</p>
                            </div>
                            <div className="md:justify-self-end">{actions}</div>
                        </div>
                        <div className="mt-8">
                            <ProjectPreview kind={preview} />
                        </div>
                    </>
                ) : (
                    <div className="grid items-center gap-8 md:grid-cols-[5fr_7fr] md:gap-10">
                        <header className={flip ? "md:order-last" : undefined}>
                            {meta}
                            {heading}
                            <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{summary}</p>
                            <div className="mt-6">{actions}</div>
                        </header>
                        <ProjectPreview kind={preview} />
                    </div>
                )}

                <div className="mt-8 grid gap-8 border-t border-line pt-8 md:grid-cols-[2fr_1fr] md:gap-10">
                    <section>
                        <Label>{featured ? "Engineering highlights" : "Highlights"}</Label>
                        <ul className="space-y-2.5">
                            {highlights.map((point) => (
                                <li key={point} className="flex gap-3 text-sm leading-relaxed text-ink-2">
                                    <span aria-hidden="true" className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                                    {point}
                                </li>
                            ))}
                        </ul>
                        {note && (
                            <p className="mt-5 flex gap-2.5 rounded-md border border-line bg-inset px-3 py-2.5 text-[13px] leading-relaxed text-ink-2">
                                <Info aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-3" />
                                <span>
                                    <span className="font-medium text-ink">Status: </span>
                                    {note}
                                </span>
                            </p>
                        )}
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
