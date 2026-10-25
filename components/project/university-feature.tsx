import type { Project } from "@/lib/data/projects";
import Reveal from "../reveal";
import { Rails, gutter } from "../section";
import { NoteGrid, ProjectMeta, ProjectTitle, RepoLinks, StackLine, StatusNote } from "./parts";
import SchemaDiagram from "./schema-diagram";

// No deployment and no screenshots exist, so the visual is the data model itself.
// Text and diagram sit side by side only from xl, where the diagram can be drawn
// at full size; below that they stack.
const UniversityFeature = ({ project, position }: { project: Project; position: number }) => (
    <article id={project.slug} aria-labelledby={`project-${project.slug}`} tabIndex={-1} className="outline-none">
        <Rails className="border-t border-line">
            <div className="grid xl:grid-cols-12">
                <Reveal className={`flex min-w-0 flex-col pb-10 pt-12 xl:col-span-5 xl:pb-14 xl:pt-16 ${gutter}`}>
                    <ProjectMeta project={project} position={position} />
                    <ProjectTitle project={project} />
                    <p className="mt-6 max-w-[60ch] text-[17px] leading-relaxed text-ink-2">{project.summary}</p>
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

            <div className="border-t border-line">
                <NoteGrid notes={project.notes} columns="lg:grid-cols-3" />
            </div>
            <div className={`grid gap-6 border-t border-line py-6 lg:grid-cols-12 lg:items-center lg:gap-8 ${gutter}`}>
                {project.note && (
                    <div className="lg:col-span-6">
                        <StatusNote note={project.note} />
                    </div>
                )}
                <StackLine stack={project.stack} className="lg:col-span-6" />
            </div>
        </Rails>
    </article>
);

export default UniversityFeature;
