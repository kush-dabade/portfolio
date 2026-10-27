import Image from "next/image";
import type { Project } from "@/lib/data/projects";
import Reveal from "../reveal";
import { Rails, SheetZones, gutter } from "../section";
import { LiveLink, NoteGrid, ProjectMeta, RepoLinks, StackLine } from "./parts";
import CandleSource from "./candle-source";

// The visual counterpoint to TeamOS: instead of a centred, framed product shot,
// Chart Studio bleeds off the stage, with the Intelligence page's breadth panel
// laid over its corner. Both are captures of the live deployment.
const CoinWaveFeature = ({ project, position }: { project: Project; position: number }) => (
    <article id={project.slug} aria-labelledby={`project-${project.slug}`} tabIndex={-1} className="outline-none">
        <Rails>
            <SheetZones sheet="Sheet 03 — CoinWave" />
            <div className="grid lg:grid-cols-12">
                <div className="@container relative order-last aspect-[6/5] min-w-0 overflow-hidden border-t border-line bg-inset sm:aspect-[16/11] lg:order-first lg:col-span-7 lg:aspect-auto lg:min-h-[38rem] lg:border-r lg:border-t-0">
                    {/* On wide screens the pair is sized off the column width and centred, so the
                        overlay stays on the main shot however tall the text column grows. */}
                    <div className="absolute inset-0 lg:inset-x-0 lg:bottom-auto lg:top-1/2 lg:h-[92cqi] lg:-translate-y-1/2">
                        <Reveal variant="frame" className="absolute left-[6%] top-[8%] w-[125%] lg:left-12 lg:top-0 lg:w-[128%]">
                            <div className="group/frame relative aspect-[1440/900] overflow-hidden rounded-[4px] border border-line-strong bg-surface shadow-frame">
                                <Image
                                    src="/images/projects/coinwave-chart.webp"
                                    alt="CoinWave Chart Studio: Bitcoin daily candles from the Binance BTC/USDT pair with 20- and 50-day moving averages, a volume pane and RSI, under a toolbar of intervals, chart types and indicators"
                                    fill
                                    sizes="(min-width: 1200px) 900px, (min-width: 1024px) 75vw, 125vw"
                                    className="object-cover object-left-top transition-[scale] duration-[1400ms] ease-out-soft group-hover/frame:scale-[1.015]"
                                />
                            </div>
                        </Reveal>
                        <Reveal
                            variant="frame"
                            delay={0.15}
                            className="absolute bottom-[6%] left-[4%] w-[58%] lg:bottom-0 lg:left-8 lg:w-[54%]"
                        >
                            <div className="relative aspect-[1164/616] overflow-hidden rounded-[3px] border border-line-strong bg-surface shadow-frame">
                                <Image
                                    src="/images/projects/coinwave-breadth.webp"
                                    alt="CoinWave Intelligence detail: market breadth, the share of 215 assets rising over 1 hour to 1 year, with up/down counts, the median move and Bitcoin's move"
                                    fill
                                    sizes="(min-width: 1024px) 400px, 58vw"
                                    className="object-cover object-left-top transition-[scale] duration-[1400ms] ease-out-soft"
                                />
                            </div>
                        </Reveal>
                    </div>
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
                <CandleSource />
            </Reveal>
            <div className="border-t border-line">
                <NoteGrid notes={project.notes} columns="sm:grid-cols-2 xl:grid-cols-4" />
            </div>
            <StackLine stack={project.stack} className={`border-t border-line py-6 ${gutter}`} />
        </Rails>
    </article>
);

export default CoinWaveFeature;
