import { GraduationCap } from "lucide-react";
import { siteConfig } from "@/lib/config/site-config";
import Section, { Rails } from "../section";
import Reveal from "../reveal";

const EducationSection = () => {
    const { education } = siteConfig;

    return (
        <Section id="education" index="04" eyebrow="Education" title="Where I'm studying.">
            <Rails className="border-t border-line">
                <Reveal className="grid grid-cols-1 md:grid-cols-12">
                    <div className="flex gap-4 px-5 py-8 sm:px-10 sm:py-10 md:col-span-7 md:border-r md:border-line">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-line bg-raised text-accent">
                            <GraduationCap className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div>
                            <h3 className="text-lg font-semibold tracking-tight text-ink">{education.degree}</h3>
                            <p className="mt-1 text-[15px] text-ink-2">
                                Specialization in {education.specialization}
                            </p>
                            <p className="mt-0.5 text-[15px] text-ink-2">
                                {education.institution}, {education.location}
                            </p>
                            <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs">
                                <div className="flex gap-2">
                                    <dt className="text-ink-3">Graduating</dt>
                                    <dd className="text-ink">{education.expectedGraduation} (expected)</dd>
                                </div>
                                <div className="flex gap-2">
                                    <dt className="text-ink-3">CGPA</dt>
                                    <dd className="text-ink">{education.cgpa}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                    <div className="border-t border-line px-5 py-8 sm:px-10 sm:py-10 md:col-span-5 md:border-t-0 md:px-8">
                        <h4 className="mb-3 font-mono text-[11px] font-normal uppercase tracking-[0.12em] text-ink-3">
                            Relevant coursework
                        </h4>
                        <ul className="flex flex-wrap gap-2">
                            {education.coursework.map((course) => (
                                <li
                                    key={course}
                                    className="rounded-md border border-line bg-inset px-2.5 py-1 text-[13px] text-ink-2"
                                >
                                    {course}
                                </li>
                            ))}
                        </ul>
                    </div>
                </Reveal>
            </Rails>
        </Section>
    );
};

export default EducationSection;
