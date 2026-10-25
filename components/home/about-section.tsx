import { siteConfig } from "@/lib/config/site-config";
import Section, { Rails } from "../section";
import Reveal from "../reveal";

const AboutSection = () => (
    <Section id="about" index="01" eyebrow="About" title="From the schema to production.">
        <Rails className="border-t border-line">
            <div className="grid grid-cols-1 md:grid-cols-12">
                <Reveal className="px-5 py-8 sm:px-10 sm:py-10 md:col-span-7 md:border-r md:border-line">
                    <div className="space-y-5 text-[15px] leading-relaxed text-ink-2 sm:text-base">
                        {siteConfig.about.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}
                    </div>
                </Reveal>

                <Reveal delay={0.08} className="border-t border-line md:col-span-5 md:border-t-0">
                    <h3 className="px-5 pt-8 font-mono text-[11px] font-normal uppercase tracking-[0.12em] text-ink-3 sm:px-8 sm:pt-10">
                        Right now
                    </h3>
                    <dl className="mt-4 divide-y divide-line border-y border-line">
                        {siteConfig.focus.map((item) => (
                            <div key={item.label} className="flex flex-col gap-0.5 px-5 py-3.5 sm:px-8">
                                <dt className="font-mono text-[11px] text-ink-3">{item.label}</dt>
                                <dd className="text-sm text-ink">{item.value}</dd>
                            </div>
                        ))}
                    </dl>
                </Reveal>
            </div>
        </Rails>
    </Section>
);

export default AboutSection;
