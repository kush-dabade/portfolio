import { projectBySlug, projects } from "@/lib/data/projects";
import Section from "../section";
import TeamOSFeature from "../project/teamos-feature";
import UniversityFeature from "../project/university-feature";
import CoinWaveFeature from "../project/coinwave-feature";

// Three projects, three compositions: the flagship takes the full sheet, then a
// text-and-diagram block and an image-and-text block that mirror each other.
const ProjectSection = () => (
    <Section
        id="projects"
        index="01"
        label={`Selected work (${projects.length})`}
        title="Things I've built."
        description="Each one links to its source. Where a project isn't deployed or finished, it says so."
    >
        <TeamOSFeature project={projectBySlug("teamos")} position={1} />
        <UniversityFeature project={projectBySlug("university-management")} position={2} />
        <CoinWaveFeature project={projectBySlug("coinwave")} position={3} />
    </Section>
);

export default ProjectSection;
