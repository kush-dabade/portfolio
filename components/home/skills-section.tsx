import { skillGroups } from "@/lib/data/skills";
import Section, { Rails } from "../section";
import Reveal from "../reveal";

const SkillsSection = () => (
    <Section
        id="skills"
        index="02"
        eyebrow="Skills"
        title="Tools I've shipped with."
        description="Grouped from what the projects below actually use — not a list of everything I've read about."
    >
        <Rails className="border-t border-line">
            {skillGroups.map((group, i) => (
                <Reveal
                    key={group.id}
                    delay={i * 0.04}
                    className="flex flex-col border-b border-line last:border-b-0 md:flex-row"
                >
                    <div className="flex shrink-0 items-center gap-3 px-5 pb-1 pt-5 sm:px-10 md:w-64 md:border-r md:border-line md:py-5">
                        <span className="font-mono text-xs text-ink-3">{group.id}</span>
                        <h3 className="text-sm font-medium text-ink">{group.name}</h3>
                    </div>
                    <ul className="flex flex-1 flex-wrap items-center gap-2 px-5 pb-5 pt-3 sm:px-10 md:py-5">
                        {group.skills.map((skill) => (
                            <li
                                key={skill}
                                className="rounded-md border border-line bg-inset px-2.5 py-1 text-[13px] text-ink-2 transition-colors hover:border-line-strong hover:text-ink"
                            >
                                {skill}
                            </li>
                        ))}
                    </ul>
                </Reveal>
            ))}
        </Rails>
    </Section>
);

export default SkillsSection;
