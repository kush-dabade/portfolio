import Image from "next/image";
import type { Project } from "@/lib/data/projects";
import Reveal from "../reveal";
import { Rails, SheetZones, gutter } from "../section";
import { LiveLink, NoteGrid, ProjectMeta, RepoLinks, StackLine } from "./parts";
import Cadence from "./cadence";

// The visual counterpoint to TeamOS: instead of a centred, framed product shot,
// the Markets page bleeds off the stage, with the Dashboard's volume chart laid
// over its corner. Both are captures of the live deployment.
const CoinWaveFeature = ({ project, position }: { project: Project; position: number }) => (
    <article id={project.slug} aria-labelledby={`project-${project.slug}`} tabIndex={-1} className="outline-none">
        <Rails>
            <SheetZones sheet="Sheet 03 — CoinWave" />
            <div className="grid lg:grid-cols-12">
                <div className="relative order-last aspect-[6/5] min-w-0 overflow-hidden border-t border-line bg-inset sm:aspect-[16/11] lg:order-first lg:col-span-7 lg:aspect-auto lg:min-h-[38rem] lg:border-r lg:border-t-0">
                    <Reveal variant="frame" className="absolute left-[6%] top-[8%] w-[125%] lg:left-12 lg:top-14 lg:w-[128%]">
                        <div className="group/frame relative aspect-[1440/900] overflow-hidden rounded-[4px] border border-line-strong bg-surface shadow-frame">
                            <Image
                                src="/images/projects/coinwave-markets.webp"
                                alt="CoinWave markets page: total market cap, 24h volume and BTC dominance cards, the top gainer, trending coins, filters and a market table with 7-day sparklines"
                                fill
                                sizes="(min-width: 1200px) 900px, (min-width: 1024px) 75vw, 125vw"
                                className="object-cover object-left-top transition-[scale] duration-[1400ms] ease-out-soft group-hover/frame:scale-[1.015]"
                            />
                        </div>
                    </Reveal>
                    <Reveal
                        variant="frame"
                        delay={0.15}
                        className="absolute bottom-[6%] left-[4%] w-[64%] lg:bottom-12 lg:left-8 lg:w-[66%]"
                    >
                        <div className="relative aspect-[935/274] overflow-hidden rounded-[3px] border border-line-strong bg-surface shadow-frame">
                            <Image
                                src="/images/projects/coinwave-volume.webp"
                                alt="CoinWave dashboard detail: a 24-hour volume area chart beside a list of trending currencies with prices and daily change"
                                fill
                                sizes="(min-width: 1024px) 460px, 64vw"
                                className="object-cover object-left-top transition-[scale] duration-[1400ms] ease-out-soft"
                            />
                        </div>
                    </Reveal>
                </div>

                <Reveal className={`@container flex min-w-0 flex-col pb-12 pt-12 lg:col-span-5 lg:pb-14 lg:pt-16 ${gutter}`}>
                    <ProjectMeta project={project} position={position} />
                    <h3
                        id={`project-${project.slug}`}
                        className="mt-6 font-display text-[clamp(3rem,20.5cqi,7rem)] uppercase leading-[0.82] tracking-[-0.025em] text-ink [font-weight:760]"
                    >
                        {project.name}
                    </h3>
                    <p className="mt-6 text-[clamp(1.2rem,1.1rem+0.5vw,1.45rem)] font-medium leading-snug tracking-[-0.015em] text-ink">{project.tagline}</p>
                    <p className="mt-4 max-w-[60ch] text-[16.5px] leading-relaxed text-ink-2">{project.summary}</p>
                    <div className="mt-8 lg:mt-auto lg:pt-10">
                        <LiveLink project={project} />
                        <p className="mt-3 font-mono text-[12.5px] text-ink-3">Screens captured from the live demo.</p>
                        <div className="mt-6">
                            <RepoLinks project={project} />
                        </div>
                    </div>
                </Reveal>
            </div>

            <Reveal className={`border-t border-line py-10 lg:py-14 ${gutter}`}>
                <Cadence />
            </Reveal>
            <div className="border-t border-line">
                <NoteGrid notes={project.notes} columns="lg:grid-cols-3" />
            </div>
            <StackLine stack={project.stack} className={`border-t border-line py-6 ${gutter}`} />
        </Rails>
    </article>
);

export default CoinWaveFeature;
