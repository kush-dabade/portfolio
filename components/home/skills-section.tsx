import { skillGroups } from "@/lib/data/skills";
import Section, { Rails, gutter } from "../section";
import Reveal from "../reveal";
import InlineList from "../inline-list";

// Four groups as a specification table: the group in the margin column, the
// skills as plain text beside it. Deliberately quieter than the projects.
const SkillsSection = () => (
    <Section
        id="skills"
        index="03"
        label="Skills"
        title="What I work with."
        description="Drawn from my projects and coursework. No ratings — the projects above show how I've used them."
    >
        <Rails className="border-t border-line">
            <dl className="divide-y divide-line">
                {skillGroups.map((group, i) => (
                    <Reveal
                        key={group.id}
                        delay={i * 0.05}
                        className={`grid gap-2 py-6 lg:grid-cols-12 lg:items-baseline lg:gap-x-8 lg:py-7 ${gutter}`}
                    >
                        <dt className="flex items-baseline gap-3 text-[15px] font-medium text-ink lg:col-span-3">
                            <span className="font-mono text-[12.5px] font-normal text-ink-3">{group.id}</span>
                            {group.name}
                        </dt>
                        <dd className="lg:col-span-9">
                            <InlineList items={group.skills} className="text-[16px] leading-relaxed text-ink-2 sm:text-[17px]" />
                        </dd>
                    </Reveal>
                ))}
            </dl>
        </Rails>
    </Section>
);

export default SkillsSection;
