import Image from "next/image";
import { siteConfig } from "@/lib/config/site-config";
import { skillGroups } from "@/lib/data/skills";
import { Rails, SheetZones, gutter } from "../section";
import Reveal from "../reveal";
import InlineList from "../inline-list";

// Registration corners around the portrait, like crop marks on a print.
const Corners = () => (
    <>
        {["left-0 top-0 border-l border-t", "right-0 top-0 border-r border-t", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((c) => (
            <span key={c} aria-hidden="true" className={`absolute h-3 w-3 border-ink-3 ${c}`} />
        ))}
    </>
);

// About, education and skills on one sheet: the person, then the specification.
const ProfileSection = () => {
    const { about, portrait, name, education } = siteConfig;
    const [lede, ...rest] = about;

    return (
        <section id="profile" aria-labelledby="profile-title" tabIndex={-1} className="outline-none">
            <Rails>
                <SheetZones sheet="Sheet 05 — Profile" />
                <div className="grid lg:grid-cols-12">
                    <Reveal as="figure" className={`flex items-center gap-6 border-b border-line py-10 lg:col-span-4 lg:block lg:border-b-0 lg:border-r lg:py-16 ${gutter}`}>
                        <div className="relative w-32 shrink-0 p-2 sm:w-40 lg:w-full lg:max-w-[16rem]">
                            <Corners />
                            <div className="relative aspect-square overflow-hidden bg-inset">
                                <Image
                                    src={portrait.src}
                                    alt={portrait.alt}
                                    fill
                                    sizes="(min-width: 1024px) 256px, 160px"
                                    className="object-cover"
                                    style={portrait.pixelArt ? { imageRendering: "pixelated" } : undefined}
                                />
                            </div>
                        </div>
                        <figcaption className="lg:mt-5">
                            <span className="block font-serif text-[17px] italic text-ink-2">Detail A — the author{portrait.pixelArt ? ", in pixels" : ""}.</span>
                            <span className="mt-1 block font-mono text-[11.5px] text-ink-3">{name} · Pune, India</span>
                        </figcaption>
                    </Reveal>

                    <Reveal delay={0.06} className={`py-12 lg:col-span-8 lg:py-16 ${gutter}`}>
                        <p className="font-mono text-[12px] text-ink-3">
                            <span className="text-accent">05</span> / About
                        </p>
                        <h2 id="profile-title" className="mt-5 text-[clamp(2.1rem,1.5rem+2.4vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink">
                            What I like building.
                        </h2>
                        <p className="mt-7 max-w-[50ch] text-[clamp(1.1rem,0.98rem+0.45vw,1.35rem)] leading-[1.5] tracking-[-0.01em] text-ink">{lede}</p>
                        {rest.map((paragraph) => (
                            <p key={paragraph} className="mt-5 max-w-[62ch] text-[16.5px] leading-relaxed text-ink-2">
                                {paragraph}
                            </p>
                        ))}
                    </Reveal>
                </div>

                {/* Education, as a title block. */}
                <Reveal className="grid border-t border-line lg:grid-cols-12">
                    <div className={`py-8 lg:col-span-4 lg:border-r lg:border-line ${gutter}`}>
                        <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-3">Education</p>
                        <p className="mt-3 text-[19px] font-semibold leading-snug tracking-[-0.015em] text-ink">{education.degree}</p>
                        <p className="mt-1 text-[15px] text-ink-2">
                            {education.specialization} · {education.institution}, {education.location}
                        </p>
                    </div>
                    <dl className="grid grid-cols-2 border-t border-line lg:col-span-3 lg:border-r lg:border-t-0">
                        <div className={`border-r border-line py-8 ${gutter} lg:px-8`}>
                            <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-3">Graduating</dt>
                            <dd className="mt-2 font-display text-[2.6rem] leading-none text-ink tabular-nums [font-weight:720]">{education.expectedGraduation}</dd>
                        </div>
                        <div className={`py-8 ${gutter} lg:px-8`}>
                            <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-3">CGPA</dt>
                            <dd className="mt-2 font-display text-[2.6rem] leading-none text-ink tabular-nums [font-weight:720]">{education.cgpa}</dd>
                        </div>
                    </dl>
                    <div className={`border-t border-line py-8 lg:col-span-5 lg:border-t-0 ${gutter} lg:px-8`}>
                        <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-3">Coursework</p>
                        <InlineList items={education.coursework} className="mt-3 text-[15px] leading-relaxed text-ink-2" />
                    </div>
                </Reveal>

                {/* Skills, as a specification table. */}
                <div className="border-t border-line">
                    <p className={`border-b border-line py-3 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-3 ${gutter}`}>
                        Tools and languages — from my projects and coursework; no ratings
                    </p>
                    <dl className="divide-y divide-line">
                        {skillGroups.map((group, i) => (
                            <Reveal key={group.id} delay={i * 0.04} className={`grid gap-2 py-5 lg:grid-cols-12 lg:items-baseline lg:gap-x-8 ${gutter}`}>
                                <dt className="flex items-baseline gap-3 text-[15px] font-medium text-ink lg:col-span-4">
                                    <span className="font-mono text-[12px] font-normal text-ink-3">{group.id}</span>
                                    {group.name}
                                </dt>
                                <dd className="lg:col-span-8">
                                    <InlineList items={group.skills} className="text-[16px] leading-relaxed text-ink-2" />
                                </dd>
                            </Reveal>
                        ))}
                    </dl>
                </div>
            </Rails>
        </section>
    );
};

export default ProfileSection;
