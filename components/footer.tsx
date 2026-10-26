import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { siteConfig } from "@/lib/config/site-config";
import { Rails, gutter } from "./section";
import SectionLink from "./section-link";

// The title block in the corner of every drawing: who drew it, what the set is,
// and where to go next.
const SiteFooter = () => {
    const year = new Date().getFullYear();
    const { github, linkedin } = siteConfig.links;

    const cell = `border-b border-line py-4 sm:border-b-0 sm:border-r sm:last:border-r-0 ${gutter} lg:px-6`;
    const term = "font-mono text-[10px] uppercase tracking-[0.12em] text-ink-3";

    return (
        <footer className="w-full">
            <Rails className="border-t border-line">
                <div className="grid sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.4fr]">
                    <div className={cell}>
                        <p className={term}>Drawn by</p>
                        <p className="mt-1.5 flex items-center gap-2.5 text-[15px] font-medium text-ink">
                            <span className="grid h-6 w-6 place-items-center border border-line-strong font-mono text-[10px] font-semibold">{siteConfig.initials}</span>
                            {siteConfig.name}
                        </p>
                    </div>
                    <div className={cell}>
                        <p className={term}>Set</p>
                        <p className="mt-1.5 text-[14px] text-ink-2">Portfolio · sheets 00–06</p>
                    </div>
                    <div className={cell}>
                        <p className={term}>Revision</p>
                        <p className="mt-1.5 font-mono text-[13px] text-ink-2">© {year} · Next.js</p>
                    </div>
                    <nav aria-label="Footer" className={cell}>
                        <p className={term}>Elsewhere</p>
                        <ul className="mt-1.5 flex flex-wrap items-center gap-x-5 gap-y-1 text-[14px] text-ink-2">
                            <li>
                                <SectionLink id="work" className="hover:text-ink">Work</SectionLink>
                            </li>
                            <li>
                                <Link href="/resume" className="hover:text-ink">Résumé</Link>
                            </li>
                            <li>
                                <a href={github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-ink">
                                    <FaGithub className="h-3.5 w-3.5" aria-hidden="true" />
                                    GitHub
                                    <span className="sr-only">(opens in a new tab)</span>
                                </a>
                            </li>
                            {linkedin && (
                                <li>
                                    <a href={linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-ink">
                                        <FaLinkedin className="h-3.5 w-3.5" aria-hidden="true" />
                                        LinkedIn
                                        <span className="sr-only">(opens in a new tab)</span>
                                    </a>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </Rails>
        </footer>
    );
};

export default SiteFooter;
