import { ArrowDown } from "lucide-react";
import { FaGithub } from "react-icons/fa";
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

const Hero = ({ hasResume }: { hasResume: boolean }) => {
    const githubHandle = siteConfig.links.github.split("/").pop();

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

                <div className="relative px-5 pb-16 pt-16 sm:px-10 sm:pb-24 sm:pt-28">
                    <Reveal>
                        <p className="inline-flex items-center gap-2 rounded-full border border-line bg-canvas/70 px-3 py-1 font-mono text-[11px] text-ink-2 backdrop-blur-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                            {siteConfig.education.degree} · MIT-WPU, Pune
                        </p>
                    </Reveal>

                    <Reveal delay={0.06}>
                        <h1
                            id="hero-title"
                            className="mt-6 text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.035em] text-ink sm:text-6xl lg:text-7xl"
                        >
                            {siteConfig.name}
                        </h1>
                        <p className="mt-3 font-mono text-[13px] text-ink-3 sm:text-sm">
                            {siteConfig.role}
                        </p>
                    </Reveal>

                    <Reveal delay={0.12}>
                        <p className="mt-7 max-w-xl text-base leading-relaxed text-ink-2 sm:text-lg">
                            {siteConfig.intro}
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
                            <a
                                href={siteConfig.links.github}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-md px-3 py-2.5 font-mono text-[13px] text-ink-2 hover:text-ink"
                            >
                                <FaGithub className="h-4 w-4" aria-hidden="true" />
                                {githubHandle}
                                <span className="sr-only">on GitHub (opens in a new tab)</span>
                            </a>
                        </div>
                    </Reveal>
                </div>
            </Rails>
        </section>
    );
};

export default Hero;
