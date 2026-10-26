import type { CSSProperties } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { siteConfig } from "@/lib/config/site-config";
import { Rails, SheetZones, gutter } from "../section";
import ResumeButton from "../resume-button";
import SectionLink from "../section-link";
import ExplodedStack from "../figure/exploded-stack";
import { PLATES } from "@/lib/data/teamos";
import { buttonIcon, buttonPrimary, buttonSecondary, nudgeDown, nudgeRight } from "../ui";

const SocialIcon = ({ href, label, children }: { href: string; label: string; children: React.ReactNode }) => (
    <a href={href} target="_blank" rel="noreferrer" aria-label={`${label} (opens in a new tab)`} title={label} className={buttonIcon}>
        {children}
    </a>
);

// Staggers the CSS entrance: each step starts 80ms after the previous one.
const step = (i: number) => ({ "--i": i }) as CSSProperties;

const Hero = ({ hasResume }: { hasResume: boolean }) => {
    const { name, role, location, hero, links, education } = siteConfig;
    const [first, ...rest] = name.split(" ");

    return (
        <section aria-labelledby="hero-title">
            <Rails className="relative overflow-hidden">
                <SheetZones sheet="SHEET 00 — COVER" />
                <div className="blueprint fade-right pointer-events-none absolute inset-0 top-7" aria-hidden="true" />

                <div className={`relative grid pb-10 pt-10 sm:pt-14 lg:min-h-[min(44rem,calc(100svh-10.5rem))] lg:grid-cols-12 lg:gap-x-8 lg:pb-8 lg:pt-9 ${gutter}`}>
                    <div className="relative z-10 flex min-w-0 flex-col lg:col-span-6">
                        <p className="rise flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[12.5px] uppercase tracking-[0.08em] text-ink-2" style={step(0)}>
                            <span className="h-2 w-2 bg-accent" aria-hidden="true" />
                            {role}
                            <span aria-hidden="true" className="text-ink-3">/</span>
                            <span className="text-ink-3">{location}</span>
                        </p>

                        <h1
                            id="hero-title"
                            className="rise mt-6 font-display text-[clamp(5.2rem,1rem+20vw,12.5rem)] [font-weight:760] uppercase leading-[0.8] tracking-[-0.035em] text-ink sm:mt-8 lg:text-[clamp(6rem,0.5rem+11.6vw,12.5rem)]"
                            style={step(1)}
                        >
                            <span className="block">{first}</span>
                            <span className="block">{rest.join(" ")}</span>
                        </h1>

                        <div className="mt-8 max-w-[34rem] sm:mt-10 lg:mt-auto lg:pt-10">
                            <p className="rise text-[clamp(1.35rem,1.1rem+0.9vw,1.75rem)] font-medium leading-[1.2] tracking-[-0.02em] text-ink" style={step(2)}>
                                {hero.lead}
                            </p>
                            <p className="rise mt-4 max-w-[46ch] text-[16.5px] leading-relaxed text-ink-2" style={step(3)}>
                                {hero.intro}
                            </p>
                            <div className="rise mt-8 flex flex-wrap items-center gap-3" style={step(4)}>
                                <SectionLink id="work" className={buttonPrimary}>
                                    See the work
                                    <ArrowDown aria-hidden="true" className={nudgeDown} />
                                </SectionLink>
                                <ResumeButton available={hasResume} className={buttonSecondary} />
                                <span className="flex items-center">
                                    <SocialIcon href={links.github} label="GitHub">
                                        <FaGithub className="h-[18px] w-[18px]" aria-hidden="true" />
                                    </SocialIcon>
                                    {links.linkedin && (
                                        <SocialIcon href={links.linkedin} label="LinkedIn">
                                            <FaLinkedin className="h-[18px] w-[18px]" aria-hidden="true" />
                                        </SocialIcon>
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="rise relative mt-12 min-w-0 lg:col-span-6 lg:mt-0 lg:-ml-10 lg:self-center" style={step(3)}>
                        <ExplodedStack
                            mode="auto"
                            responsive
                            caption={
                                <>
                                    Fig. 1 — <SectionLink id="teamos-path" className="underline decoration-line-strong underline-offset-4 hover:text-ink hover:decoration-accent">TeamOS</SectionLink>, exploded along the path of one write.
                                </>
                            }
                        />
                        {/* Phones get the plate names as a key instead of leader lines. */}
                        <ol className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-line pt-4 sm:hidden">
                            {PLATES.map((plate, i) => (
                                <li key={plate.id} className="flex items-baseline gap-2 text-[13.5px] text-ink">
                                    <span className="font-mono text-[11px] text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                                    {plate.title}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>

                {/* Title block: the three facts a reader would otherwise scroll for. */}
                <dl className="rise relative grid border-t border-line bg-canvas/80 backdrop-blur-[2px] sm:grid-cols-3" style={step(5)}>
                    <div className={`border-b border-line py-4 sm:border-b-0 sm:border-r ${gutter} lg:pr-8`}>
                        <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-3">Now building</dt>
                        <dd className="mt-1.5 text-[15px] leading-snug text-ink-2">
                            <SectionLink id="teamos" className="group inline-flex items-center gap-1.5 font-medium text-ink hover:text-accent">
                                TeamOS
                                <ArrowRight aria-hidden="true" className={`${nudgeRight} h-3.5 w-3.5`} />
                            </SectionLink>{" "}
                            — multi-tenant project management
                        </dd>
                    </div>
                    <div className={`border-b border-line py-4 sm:border-b-0 sm:border-r ${gutter} lg:px-8`}>
                        <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-3">Studying</dt>
                        <dd className="mt-1.5 text-[15px] leading-snug text-ink-2">
                            <span className="font-medium text-ink">B.Sc. (Hons) Computer Science</span>, {education.specialization} · MIT-WPU, {education.expectedGraduation}
                        </dd>
                    </div>
                    <div className={`py-4 ${gutter} lg:px-8`}>
                        <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-3">Based in</dt>
                        <dd className="mt-1.5 text-[15px] leading-snug text-ink-2">
                            <span className="font-medium text-ink">{location}</span> · IST, UTC+5:30
                        </dd>
                    </div>
                </dl>
            </Rails>
        </section>
    );
};

export default Hero;
