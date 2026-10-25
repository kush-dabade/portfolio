import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/config/site-config";
import Section, { Rails } from "../section";
import Reveal from "../reveal";
import SectionLink from "../section-link";

const onwardLink =
    "group inline-flex items-center gap-1.5 text-sm text-ink-2 underline decoration-line-strong underline-offset-4 hover:text-ink hover:decoration-accent";

const AboutSection = () => {
    const { about, portrait, name, location, education } = siteConfig;
    const [lede, ...rest] = about;

    return (
        <Section id="about" index="01" eyebrow="About" title="What I like building.">
            <Rails className="border-t border-line">
                <div className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                    {/* Portrait with a short caption — side by side on phones, stacked from md up. */}
                    <Reveal className="border-b border-line px-5 py-8 sm:px-10 sm:py-10 md:border-b-0 md:border-r">
                        <figure className="flex items-center gap-5 md:block">
                            <div className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-lg border border-line bg-inset sm:w-36 md:w-full md:max-w-[19rem]">
                                <Image
                                    src={portrait.src}
                                    alt={portrait.alt}
                                    fill
                                    sizes="(min-width: 768px) 304px, 144px"
                                    className="object-cover"
                                    style={portrait.pixelArt ? { imageRendering: "pixelated" } : undefined}
                                />
                            </div>
                            <figcaption className="md:mt-5">
                                <span className="block text-[15px] font-medium text-ink">{name}</span>
                                <span className="mt-1 block font-mono text-[12px] leading-relaxed text-ink-3">
                                    {location}
                                    <br />
                                    B.Sc. (Hons) CS · {education.specialization}
                                </span>
                            </figcaption>
                        </figure>
                    </Reveal>

                    <Reveal delay={0.08} className="px-5 py-8 sm:px-10 sm:py-10">
                        <p className="text-[17px] leading-relaxed text-ink sm:text-lg">{lede}</p>
                        {rest.map((paragraph) => (
                            <p key={paragraph} className="mt-5 text-[15px] leading-relaxed text-ink-2 sm:text-base">
                                {paragraph}
                            </p>
                        ))}
                        <p className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                            <SectionLink id="projects" className={onwardLink}>
                                See what I&apos;ve built
                                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                            </SectionLink>
                            <Link href="/resume" className={onwardLink}>
                                Read my résumé
                                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                        </p>
                    </Reveal>
                </div>
            </Rails>
        </Section>
    );
};

export default AboutSection;
