import { ArrowDown } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { siteConfig } from "@/lib/config/site-config";
import { Rails } from "../section";
import Reveal from "../reveal";
import ResumeButton from "../resume-button";
import SectionLink from "../section-link";

// Small "+" registration marks pinned to grid intersections.
const Crosshair = ({ className }: { className: string }) => (
    <span className={`absolute h-3 w-3 ${className}`} aria-hidden="true">
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-ink-3/50" />
        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-ink-3/50" />
    </span>
);

const SocialIcon = ({ href, label, children }: { href: string; label: string; children: React.ReactNode }) => (
    <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={`${label} (opens in a new tab)`}
        title={label}
        className="grid h-10 w-10 place-items-center rounded-md border border-transparent text-ink-2 hover:border-line hover:text-ink"
    >
        {children}
    </a>
);

const Hero = ({ hasResume }: { hasResume: boolean }) => {
    const { name, role, location, hero, links } = siteConfig;

    return (
        <section aria-labelledby="hero-title">
            <Rails className="relative overflow-hidden">
                {/* The one technical-grid visual */}
                <div className="blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
                <Crosshair className="right-[calc(25%-6px)] top-[89px] hidden sm:block" />
                <Crosshair className="right-[calc(25%-6px)] bottom-[89px] hidden lg:block" />
                <Crosshair className="right-[calc(55%-6px)] top-[185px] hidden lg:block" />
                <span
                    className="pointer-events-none absolute bottom-4 right-5 hidden font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3 sm:block"
                    aria-hidden="true"
                >
                    18.52° N · 73.86° E — Pune
                </span>

                <div className="relative px-5 pb-16 pt-14 sm:px-10 sm:pb-24 sm:pt-24">
                    <Reveal>
                        <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            <span className="text-base font-medium text-ink sm:text-lg">{name}</span>
                            <span className="font-mono text-[12px] text-ink-3 sm:text-[13px]">
                                {role} · {location}
                            </span>
                        </p>
                    </Reveal>

                    <Reveal delay={0.06}>
                        <h1
                            id="hero-title"
                            className="mt-5 max-w-[17ch] text-[2.25rem] font-semibold leading-[1.06] tracking-[-0.03em] text-ink sm:text-5xl lg:text-6xl"
                        >
                            {hero.headline}
                        </h1>
                    </Reveal>

                    <Reveal delay={0.12}>
                        <p className="mt-6 max-w-[60ch] text-base leading-relaxed text-ink-2 sm:text-[17px]">
                            {hero.intro}
                        </p>
                    </Reveal>

                    <Reveal delay={0.18}>
                        <div className="mt-9 flex flex-wrap items-center gap-3">
                            <SectionLink
                                id="projects"
                                className="group inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2.5 text-sm font-medium text-canvas hover:opacity-90"
                            >
                                View projects
                                <ArrowDown className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" aria-hidden="true" />
                            </SectionLink>
                            <ResumeButton
                                available={hasResume}
                                className="inline-flex items-center gap-2 rounded-md border border-line-strong bg-canvas/60 px-4 py-2.5 text-sm font-medium text-ink backdrop-blur-sm hover:bg-raised"
                            />
                            <span className="mx-1 hidden h-5 w-px bg-line sm:block" aria-hidden="true" />
                            <div className="flex items-center">
                                <SocialIcon href={links.github} label="GitHub">
                                    <FaGithub className="h-[18px] w-[18px]" aria-hidden="true" />
                                </SocialIcon>
                                {links.linkedin && (
                                    <SocialIcon href={links.linkedin} label="LinkedIn">
                                        <FaLinkedin className="h-[18px] w-[18px]" aria-hidden="true" />
                                    </SocialIcon>
                                )}
                            </div>
                        </div>
                    </Reveal>
                </div>
            </Rails>
        </section>
    );
};

export default Hero;
