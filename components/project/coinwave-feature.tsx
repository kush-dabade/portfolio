import Image from "next/image";
import type { Project } from "@/lib/data/projects";
import Reveal from "../reveal";
import { Rails, gutter } from "../section";
import { LiveLink, NoteGrid, ProjectMeta, ProjectTitle, RepoLinks, StackLine } from "./parts";

// The visual counterpoint to TeamOS: instead of a centred, framed product shot,
// the Markets page bleeds off the stage, with the Dashboard's volume chart laid
// over its corner. Both are captures of the live deployment.
const CoinWaveFeature = ({ project, position }: { project: Project; position: number }) => (
    <article id={project.slug} aria-labelledby={`project-${project.slug}`} tabIndex={-1} className="outline-none">
        <Rails className="border-t border-line">
            <div className="grid lg:grid-cols-12">
                <div className="relative order-last aspect-[6/5] min-w-0 overflow-hidden border-t border-line bg-inset sm:aspect-[16/11] lg:order-first lg:col-span-7 lg:aspect-auto lg:min-h-[38rem] lg:border-r lg:border-t-0">
                    <Reveal variant="frame" className="absolute left-[6%] top-[8%] w-[125%] lg:left-12 lg:top-14 lg:w-[128%]">
                        <div className="group/frame relative aspect-[1440/900] overflow-hidden rounded-xl border border-line-strong bg-surface shadow-frame">
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
                        <div className="relative aspect-[935/274] overflow-hidden rounded-lg border border-line-strong bg-surface shadow-frame">
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

                <Reveal className={`flex min-w-0 flex-col pb-12 pt-12 lg:col-span-5 lg:pb-14 lg:pt-16 ${gutter}`}>
                    <ProjectMeta project={project} position={position} />
                    <ProjectTitle project={project} />
                    <p className="mt-6 max-w-[60ch] text-[17px] leading-relaxed text-ink-2">{project.summary}</p>
                    <div className="mt-8 lg:mt-auto lg:pt-10">
                        <LiveLink project={project} />
                        <p className="mt-3 font-mono text-[12.5px] text-ink-3">Screens captured from the live demo.</p>
                        <div className="mt-6">
                            <RepoLinks project={project} />
                        </div>
                    </div>
                </Reveal>
            </div>

            <div className="border-t border-line">
                <NoteGrid notes={project.notes} columns="lg:grid-cols-3" />
            </div>
            <StackLine stack={project.stack} className={`border-t border-line py-6 ${gutter}`} />
        </Rails>
    </article>
);

export default CoinWaveFeature;
