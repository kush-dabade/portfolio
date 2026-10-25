import { teamosWritePath, type Project } from "@/lib/data/projects";
import Reveal from "../reveal";
import { Rails, gutter } from "../section";
import { NoteGrid, ProjectMeta, ProjectTitle, RepoLinks, StackLine } from "./parts";
import TeamOSViews from "./teamos-views";
import WritePath from "./write-path";

// The flagship gets the full sheet: a large title, the product on a drawing-grid
// stage, then the engineering — how a write moves through the system, and the
// decisions that keep tenants apart.
const TeamOSFeature = ({ project, position }: { project: Project; position: number }) => (
    <article id={project.slug} aria-labelledby={`project-${project.slug}`} tabIndex={-1} className="outline-none">
        <Rails className="border-t border-line">
            <Reveal className={`grid gap-8 pb-12 pt-12 lg:grid-cols-12 lg:gap-x-8 lg:pb-14 lg:pt-16 ${gutter}`}>
                <div className="min-w-0 lg:col-span-7">
                    <ProjectMeta project={project} position={position} />
                    <ProjectTitle project={project} size="xl" />
                </div>
                <div className="flex min-w-0 flex-col gap-7 lg:col-span-5 lg:pt-12">
                    <p className="text-[17px] leading-relaxed text-ink-2">{project.summary}</p>
                    <RepoLinks project={project} />
                </div>
            </Reveal>

            <div className="relative border-y border-line bg-inset px-3 py-6 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
                <div className="blueprint fade-edges pointer-events-none absolute inset-0" aria-hidden="true" />
                <Reveal variant="frame" className="relative">
                    <TeamOSViews />
                </Reveal>
            </div>

            <Reveal>
                <WritePath steps={teamosWritePath} commitAfter={4} />
            </Reveal>

            <div className="border-t border-line">
                <NoteGrid notes={project.notes} columns="md:grid-cols-2" />
            </div>
            <StackLine stack={project.stack} className={`border-t border-line py-6 ${gutter}`} />
        </Rails>
    </article>
);

export default TeamOSFeature;
