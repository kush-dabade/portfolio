import { siteConfig } from "@/lib/config/site-config";
import Section, { Rails, gutter } from "../section";
import Reveal from "../reveal";
import InlineList from "../inline-list";

const EducationSection = () => {
    const { education } = siteConfig;

    return (
        <Section id="education" index="04" label="Education" title="Where I'm studying.">
            <Rails className="border-t border-line">
                <Reveal className="grid lg:grid-cols-12">
                    <div className={`py-10 lg:col-span-7 lg:border-r lg:border-line lg:py-12 ${gutter}`}>
                        <h3 className="text-[clamp(1.5rem,1.25rem+1vw,2rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
                            {education.degree}
                        </h3>
                        <p className="mt-3 text-[17px] text-ink-2">Specialization in {education.specialization}</p>
                        <p className="mt-1 text-[17px] text-ink-2">
                            {education.institution}, {education.location}
                        </p>
                    </div>
                    <dl className="grid grid-cols-2 border-t border-line lg:col-span-5 lg:border-t-0">
                        <div className={`border-r border-line py-10 lg:py-12 ${gutter} lg:px-10`}>
                            <dt className="font-mono text-[12.5px] text-ink-3">Expected graduation</dt>
                            <dd className="mt-3">
                                <span className="block text-[2.5rem] font-semibold leading-none tracking-[-0.04em] text-ink tabular-nums">
                                    {education.expectedGraduation}
                                </span>
                            </dd>
                        </div>
                        <div className={`py-10 lg:py-12 ${gutter} lg:px-10`}>
                            <dt className="font-mono text-[12.5px] text-ink-3">CGPA</dt>
                            <dd className="mt-3">
                                <span className="block text-[2.5rem] font-semibold leading-none tracking-[-0.04em] text-ink tabular-nums">
                                    {education.cgpa}
                                </span>
                            </dd>
                        </div>
                    </dl>
                </Reveal>
                <Reveal className={`grid gap-3 border-t border-line py-7 lg:grid-cols-12 lg:items-baseline lg:gap-x-8 ${gutter}`}>
                    <h4 className="font-mono text-[12.5px] font-normal text-ink-3 lg:col-span-3">Relevant coursework</h4>
                    <InlineList items={education.coursework} className="text-[16px] leading-relaxed text-ink-2 lg:col-span-9" />
                </Reveal>
            </Rails>
        </Section>
    );
};

export default EducationSection;
