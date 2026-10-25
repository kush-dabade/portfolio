import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { siteConfig } from "@/lib/config/site-config";
import { Rails, gutter } from "./section";
import SectionLink from "./section-link";

const SiteFooter = () => {
    const year = new Date().getFullYear();
    const { github, linkedin } = siteConfig.links;

    return (
        <footer className="w-full">
            <Rails>
                <div className={`flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:justify-between ${gutter}`}>
                    <div className="flex items-center gap-3">
                        <span className="grid h-7 w-7 place-items-center rounded-md border border-line-strong bg-raised font-mono text-[11px] font-semibold text-ink">
                            {siteConfig.initials}
                        </span>
                        <p className="text-sm text-ink-2">
                            © {year} {siteConfig.name}
                        </p>
                    </div>

                    <nav aria-label="Footer">
                        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-2">
                            <li>
                                <SectionLink id="projects" className="hover:text-ink">Projects</SectionLink>
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

                <div className={`border-t border-line py-4 ${gutter}`}>
                    <p className="font-mono text-[12px] leading-relaxed text-ink-3">
                        Built with Next.js, TypeScript and Tailwind CSS.
                    </p>
                </div>
            </Rails>
        </footer>
    );
};

export default SiteFooter;
