import type { CSSProperties } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { siteConfig } from "@/lib/config/site-config";
import { Rails, gutter } from "../section";
import ResumeButton from "../resume-button";
import SectionLink from "../section-link";
import { buttonIcon, buttonPrimary, buttonSecondary, nudgeDown, nudgeRight } from "../ui";

// Small "+" registration marks pinned to the blueprint's 96px grid lines.
const Crosshair = ({ className }: { className: string }) => (
    <span className={`absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 ${className}`} aria-hidden="true">
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-ink-3/60" />
        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-ink-3/60" />
    </span>
);

const SocialIcon = ({ href, label, children }: { href: string; label: string; children: React.ReactNode }) => (
    <a href={href} target="_blank" rel="noreferrer" aria-label={`${label} (opens in a new tab)`} title={label} className={buttonIcon}>
        {children}
    </a>
);

// Staggers the CSS entrance: each step starts 80ms after the previous one.
const step = (i: number) => ({ "--i": i }) as CSSProperties;

// "Lead, tail." → the statement in full ink, the continuation a step quieter.
const splitHeadline = (headline: string) => {
    const cut = headline.indexOf(", ");
    return cut === -1 ? [headline, ""] : [headline.slice(0, cut + 1), headline.slice(cut + 2)];
};

// Keeps hyphenated words ("full-stack") from breaking at the hyphen.
const unbroken = (text: string) =>
    text.split(/(\S*-\S*)/).map((part, i) =>
        part.includes("-") ? (
            <span key={i} className="whitespace-nowrap">
                {part}
            </span>
        ) : (
            part
        )
    );

const Hero = ({ hasResume }: { hasResume: boolean }) => {
    const { name, role, location, hero, links, education } = siteConfig;
    const [lead, tail] = splitHeadline(hero.headline);

    return (
        <section aria-labelledby="hero-title">
            <Rails className="relative overflow-hidden">
                <div className="blueprint fade-right pointer-events-none absolute inset-0" aria-hidden="true" />
                <Crosshair className="left-[671px] top-[95px] hidden lg:block" />
                <Crosshair className="left-[959px] top-[383px] hidden lg:block" />

                <div className={`relative flex flex-col pb-14 pt-14 sm:pb-16 sm:pt-20 lg:min-h-[min(44rem,calc(100svh-9.5rem))] lg:pb-12 lg:pt-20 ${gutter}`}>
                    <p className="rise flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px]" style={step(0)}>
                        <span className="font-medium text-ink">{name}</span>
                        <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
                        <span className="text-ink-2">{role}</span>
                    </p>

                    <h1
                        id="hero-title"
                        className="rise mt-7 max-w-[12.4em] text-[clamp(2.3rem,0.8rem+6.4vw,6.4rem)] font-semibold leading-[0.95] tracking-[-0.042em] sm:mt-9"
                        style={step(1)}
                    >
                        <span className="text-ink">{unbroken(lead)}</span>{" "}
                        <span className="text-ink-3">{unbroken(tail)}</span>
                    </h1>

                    <div className="mt-10 grid gap-8 sm:mt-14 lg:mt-auto lg:grid-cols-12 lg:items-end lg:gap-x-8 lg:pt-12">
                        <p className="rise max-w-[54ch] text-[17px] leading-relaxed text-ink-2 sm:text-lg lg:col-span-6" style={step(2)}>
                            {hero.intro}
                        </p>

                        <div className="rise flex flex-wrap items-center gap-3 lg:col-span-6 lg:justify-end" style={step(3)}>
                            <SectionLink id="projects" className={buttonPrimary}>
                                Explore my work
                                <ArrowDown aria-hidden="true" className={nudgeDown} />
                            </SectionLink>
                            <ResumeButton available={hasResume} className={buttonSecondary} />
                            <span className="flex items-center sm:ml-1">
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

                {/* Colophon: three facts a reader would otherwise have to scroll for. */}
                <dl className="rise relative grid border-t border-line bg-canvas/70 backdrop-blur-[2px] sm:grid-cols-3" style={step(4)}>
                    <div className={`border-b border-line py-5 sm:border-b-0 sm:border-r ${gutter} lg:pr-8`}>
                        <dt className="font-mono text-[13px] text-ink-3">Now building</dt>
                        <dd className="mt-1.5 text-[15px] leading-snug text-ink-2">
                            <SectionLink id="teamos" className="group inline-flex items-center gap-1.5 font-medium text-ink hover:text-accent">
                                TeamOS
                                <ArrowRight aria-hidden="true" className={`${nudgeRight} h-3.5 w-3.5`} />
                            </SectionLink>{" "}
                            — a multi-tenant project management SaaS
                        </dd>
                    </div>
                    <div className={`border-b border-line py-5 sm:border-b-0 sm:border-r ${gutter} lg:px-8`}>
                        <dt className="font-mono text-[13px] text-ink-3">Studying</dt>
                        <dd className="mt-1.5 text-[15px] leading-snug text-ink-2">
                            <span className="font-medium text-ink">B.Sc. (Hons) Computer Science</span>, {education.specialization} · MIT-WPU, graduating {education.expectedGraduation}
                        </dd>
                    </div>
                    <div className={`py-5 ${gutter} lg:px-8`}>
                        <dt className="font-mono text-[13px] text-ink-3">Based in</dt>
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
