import { projects } from "@/lib/data/projects";
import ProjectCard from "../project/project-card";
import Section, { Rails } from "../section";

const ProjectSection = () => (
    <Section
        id="projects"
        index="03"
        eyebrow={`Selected projects (${projects.length})`}
        title="Things I've built."
        description="Each one links to its source. Where a project isn't deployed or finished, it says so."
    >
        <Rails className="divide-y divide-line border-t border-line">
            {projects.map((project, idx) => (
                <ProjectCard key={project.slug} project={project} position={idx + 1} flip={idx % 2 === 1} />
            ))}
        </Rails>
    </Section>
);

export default ProjectSection;
