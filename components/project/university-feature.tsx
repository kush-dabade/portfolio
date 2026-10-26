import type { Project } from "@/lib/data/projects";
import Reveal from "../reveal";
import { Rails, SheetZones, gutter } from "../section";
import { ProjectMeta, RepoLinks, StackLine, StatusNote } from "./parts";
import SchemaDiagram from "./schema-diagram";
import RouteMap from "./route-map";

// Not deployed and no screenshots exist, so this sheet is drawn from the code
// itself: the data model (Fig. 2) and the API's wiring (Fig. 3).
const UniversityFeature = ({ project, position }: { project: Project; position: number }) => (
    <article id={project.slug} aria-labelledby={`project-${project.slug}`} tabIndex={-1} className="outline-none">
        <Rails>
            <SheetZones sheet="Sheet 02 — University Mgmt." />
            <div className="grid xl:grid-cols-12">
                <Reveal className={`@container flex min-w-0 flex-col pb-10 pt-12 xl:col-span-5 xl:pb-14 xl:pt-16 ${gutter}`}>
                    <ProjectMeta project={project} position={position} />
                    <h3
                        id={`project-${project.slug}`}
                        className="mt-6 font-display text-[clamp(2.4rem,16.5cqi,6rem)] uppercase leading-[0.84] tracking-[-0.025em] text-ink [font-weight:760]"
                    >
                        University
                        <br />
                        Management
                        <br />
                        System
                    </h3>
                    <p className="mt-6 text-[clamp(1.2rem,1.1rem+0.5vw,1.45rem)] font-medium leading-snug tracking-[-0.015em] text-ink">{project.tagline}</p>
                    <p className="mt-4 max-w-[60ch] text-[16.5px] leading-relaxed text-ink-2">{project.summary}</p>
                    <div className="mt-8 xl:mt-auto xl:pt-10">
                        <RepoLinks project={project} />
                    </div>
                </Reveal>
                <div className="relative min-w-0 border-t border-line bg-inset px-3 py-10 sm:px-8 xl:col-span-7 xl:border-l xl:border-t-0 xl:px-10 xl:py-14">
                    <div className="blueprint fade-edges pointer-events-none absolute inset-0" aria-hidden="true" />
                    <Reveal variant="frame" className="relative flex h-full min-w-0 items-center">
                        <SchemaDiagram />
                    </Reveal>
                </div>
            </div>

            <div className="grid border-t border-line xl:grid-cols-12">
                <Reveal className={`min-w-0 py-10 xl:col-span-5 xl:py-14 ${gutter}`}>
                    <ol className="space-y-7">
                        {project.notes.map((note, i) => (
                            <li key={note.title}>
                                <h4 className="flex items-baseline gap-3 text-[16px] font-semibold tracking-[-0.01em] text-ink">
                                    <span className="font-mono text-[12px] font-normal text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                                    {note.title}
                                </h4>
                                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{note.body}</p>
                            </li>
                        ))}
                    </ol>
                    {project.note && (
                        <div className="mt-9">
                            <StatusNote note={project.note} />
                        </div>
                    )}
                </Reveal>
                <Reveal delay={0.08} className={`min-w-0 border-t border-line py-10 xl:col-span-7 xl:border-l xl:border-t-0 xl:py-14 ${gutter} xl:px-10`}>
                    <RouteMap />
                </Reveal>
            </div>

            <StackLine stack={project.stack} className={`border-t border-line py-6 ${gutter}`} />
        </Rails>
    </article>
);

export default UniversityFeature;
