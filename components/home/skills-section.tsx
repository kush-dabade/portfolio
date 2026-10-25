import { skillGroups } from "@/lib/data/skills";
import Section, { Rails } from "../section";
import Reveal from "../reveal";

const SkillsSection = () => (
    <Section
        id="skills"
        index="02"
        eyebrow="Skills"
        title="What I work with."
        description="Drawn from my projects and coursework. No ratings — the projects below show how I've used them."
    >
        <Rails className="border-t border-line">
            {/* Four groups in a 2 × 2 grid; the hairlines come from the gap over a line-coloured backdrop. */}
            <ul className="grid gap-px bg-line md:grid-cols-2">
                {skillGroups.map((group, i) => (
                    <li key={group.id} className="bg-canvas">
                        <Reveal delay={i * 0.04} className="h-full px-5 py-6 sm:px-10 sm:py-8">
                            <h3 className="mb-4 flex items-center gap-3 text-sm font-medium text-ink">
                                <span className="font-mono text-xs font-normal text-ink-3">{group.id}</span>
                                {group.name}
                            </h3>
                            <ul className="flex flex-wrap gap-1.5">
                                {group.skills.map((skill) => (
                                    <li
                                        key={skill}
                                        className="rounded-md border border-line bg-inset px-2 py-0.5 text-[13px] text-ink-2 transition-colors hover:border-line-strong hover:text-ink"
                                    >
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </Reveal>
                    </li>
                ))}
            </ul>
        </Rails>
    </Section>
);

export default SkillsSection;
