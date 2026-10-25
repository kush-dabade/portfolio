import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/config/site-config";
import Section, { Rails, gutter } from "../section";
import Reveal from "../reveal";
import SectionLink from "../section-link";
import { nudgeRight } from "../ui";

const onwardLink =
    "group inline-flex items-center gap-2 text-[15px] font-medium text-ink underline decoration-line-strong underline-offset-[6px] hover:decoration-accent";

const AboutSection = () => {
    const { about, portrait, name, location, education } = siteConfig;
    const [lede, ...rest] = about;

    return (
        <Section id="about" index="02" label="About" title="What I like building.">
            <Rails className="border-t border-line">
                <div className="grid lg:grid-cols-12">
                    {/* Portrait with a short caption — side by side on phones, stacked from lg up. */}
                    <Reveal as="figure" className={`flex items-center gap-5 border-b border-line py-8 sm:gap-7 lg:col-span-4 lg:block lg:border-b-0 lg:border-r lg:py-12 ${gutter}`}>
                        <div className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-xl border border-line bg-inset sm:w-36 lg:w-full lg:max-w-[17rem]">
                            <Image
                                src={portrait.src}
                                alt={portrait.alt}
                                fill
                                sizes="(min-width: 1024px) 272px, 144px"
                                className="object-cover"
                                style={portrait.pixelArt ? { imageRendering: "pixelated" } : undefined}
                            />
                        </div>
                        <figcaption className="lg:mt-6">
                            <span className="block text-[15px] font-medium text-ink">{name}</span>
                            <span className="mt-1.5 block font-mono text-[12.5px] leading-relaxed text-ink-3">
                                {location}
                                <br />
                                B.Sc. (Hons) CS · {education.specialization}
                                {portrait.pixelArt && (
                                    <>
                                        <br />
                                        Pixel-art avatar
                                    </>
                                )}
                            </span>
                        </figcaption>
                    </Reveal>

                    <Reveal delay={0.08} className={`py-10 lg:col-span-8 lg:py-12 ${gutter}`}>
                        <p className="max-w-[38ch] text-[clamp(1.2rem,1rem+0.9vw,1.7rem)] leading-[1.42] tracking-[-0.018em] text-ink">
                            {lede}
                        </p>
                        {rest.map((paragraph) => (
                            <p key={paragraph} className="mt-6 max-w-[62ch] text-[17px] leading-relaxed text-ink-2">
                                {paragraph}
                            </p>
                        ))}
                        <p className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
                            <SectionLink id="projects" className={onwardLink}>
                                Back to the projects
                                <ArrowRight aria-hidden="true" className={nudgeRight} />
                            </SectionLink>
                            <Link href="/resume" className={onwardLink}>
                                Read my résumé
                                <ArrowRight aria-hidden="true" className={nudgeRight} />
                            </Link>
                        </p>
                    </Reveal>
                </div>
            </Rails>
        </Section>
    );
};

export default AboutSection;
