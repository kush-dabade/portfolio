import { ArrowDownRight } from "lucide-react";
import { projectBySlug, projects } from "@/lib/data/projects";
import { Rails, gutter } from "../section";
import Reveal from "../reveal";
import SectionLink from "../section-link";
import TeamOSFeature from "../project/teamos-feature";
import UniversityFeature from "../project/university-feature";
import CoinWaveFeature from "../project/coinwave-feature";
import SectionBreak from "../section-break";

const tones = {
    accent: "bg-accent",
    ok: "bg-ok",
    muted: "bg-ink-3",
};

// The drawing register: every sheet in the set, what it is, and its status —
// an index a reader can jump from.
const REGISTER = [
    ...projects.map((p, i) => ({ id: p.slug, sheet: String(i + 1).padStart(2, "0"), name: p.name, what: p.tagline, status: p.status })),
    { id: "lab", sheet: "04", name: "Lab", what: "Two AWS infrastructure experiments", status: { label: "Coursework", tone: "muted" as const } },
];

const ProjectSection = () => (
    <section id="work" aria-labelledby="work-title" tabIndex={-1} className="outline-none">
        <Rails>
            <Reveal as="header" className={`grid gap-y-5 pb-10 pt-16 lg:grid-cols-12 lg:gap-x-8 lg:pb-12 lg:pt-20 ${gutter}`}>
                <p className="font-mono text-[12px] text-ink-3 lg:col-span-3 lg:pt-3">
                    <span className="text-accent">Index</span> — drawing register
                </p>
                <div className="lg:col-span-9">
                    <h2 id="work-title" className="text-[clamp(2.1rem,1.5rem+2.4vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink">
                        The work, sheet by sheet.
                    </h2>
                    <p className="mt-4 max-w-[56ch] text-[16.5px] leading-relaxed text-ink-2">
                        Each project is drawn from its own source code and links to it. Where something isn&apos;t deployed or finished, the sheet says so.
                    </p>
                </div>
            </Reveal>

            <ol className="border-t border-line">
                {REGISTER.map((row) => (
                    <li key={row.id} className="border-b border-line last:border-b-0">
                        <SectionLink
                            id={row.id}
                            className={`group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 gap-y-1 py-4 hover:bg-wash sm:grid-cols-[3rem_minmax(0,1.1fr)_minmax(0,1fr)_auto] lg:grid-cols-12 lg:gap-x-8 ${gutter}`}
                        >
                            <span className="font-mono text-[12px] text-ink-3 group-hover:text-accent lg:col-span-1">{row.sheet}</span>
                            <span className="text-[17px] font-semibold tracking-[-0.01em] text-ink sm:text-[19px] lg:col-span-4">{row.name}</span>
                            <span className="col-start-2 row-start-2 text-[14.5px] text-ink-2 sm:col-start-auto sm:row-start-auto lg:col-span-4">
                                {row.what}
                                <span className="mt-1 flex items-center gap-2 font-mono text-[11px] text-ink-3 sm:hidden">
                                    <span aria-hidden="true" className={`h-1.5 w-1.5 ${tones[row.status.tone]}`} />
                                    {row.status.label}
                                </span>
                            </span>
                            <span className="col-start-3 row-start-1 flex items-center justify-end gap-2.5 font-mono text-[11.5px] text-ink-3 sm:col-start-auto sm:row-start-auto lg:col-span-3">
                                <span className="hidden items-center gap-2 sm:inline-flex">
                                    <span aria-hidden="true" className={`h-1.5 w-1.5 ${tones[row.status.tone]}`} />
                                    {row.status.label}
                                </span>
                                <ArrowDownRight aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:text-accent" />
                            </span>
                        </SectionLink>
                    </li>
                ))}
            </ol>
        </Rails>

        <SectionBreak />
        <TeamOSFeature project={projectBySlug("teamos")} position={1} />
        <SectionBreak />
        <UniversityFeature project={projectBySlug("university-management")} position={2} />
        <SectionBreak />
        <CoinWaveFeature project={projectBySlug("coinwave")} position={3} />
    </section>
);

export default ProjectSection;
