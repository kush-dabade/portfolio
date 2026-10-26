import { ArrowRight, ArrowUpRight, FileText } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { siteConfig } from "@/lib/config/site-config";
import { Rails, SheetZones, gutter } from "../section";
import Reveal from "../reveal";
import CopyEmailButton from "../copy-email-button";
import { nudgeOut, nudgeRight } from "../ui";

const Channel = ({
    href,
    external = false,
    icon,
    label,
    value,
}: {
    href: string;
    external?: boolean;
    icon: React.ReactNode;
    label: string;
    value: string;
}) => {
    const className = `group flex h-full items-center gap-4 py-6 hover:bg-wash ${gutter}`;
    const content = (
        <>
            <span className="text-ink-2 group-hover:text-ink">{icon}</span>
            <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-medium text-ink">{label}</span>
                <span className="block truncate font-mono text-[12.5px] text-ink-3">{value}</span>
            </span>
            {external ? (
                <ArrowUpRight aria-hidden="true" className={`${nudgeOut} text-ink-3 group-hover:text-accent`} />
            ) : (
                <ArrowRight aria-hidden="true" className={`${nudgeRight} text-ink-3 group-hover:text-accent`} />
            )}
        </>
    );

    return external ? (
        <a href={href} target="_blank" rel="noreferrer" className={className}>
            {content}
            <span className="sr-only">(opens in a new tab)</span>
        </a>
    ) : (
        <Link href={href} className={className}>
            {content}
        </Link>
    );
};

// The ending mirrors the opening: the same drawing grid and large type, with the
// address itself as the headline act.
const ContactSection = ({ hasResume }: { hasResume: boolean }) => {
    const { email, github, linkedin } = siteConfig.links;

    return (
        <section id="contact" aria-labelledby="contact-title" tabIndex={-1} className="outline-none">
            <Rails className="relative overflow-hidden">
                <SheetZones sheet="Sheet 06 — Contact" />
                <div className="blueprint fade-right pointer-events-none absolute inset-0 top-7" aria-hidden="true" />
                <Reveal className={`relative grid gap-y-6 pb-16 pt-20 lg:grid-cols-12 lg:gap-x-8 lg:pb-20 lg:pt-28 ${gutter}`}>
                    <p className="font-mono text-[12px] text-ink-3 lg:col-span-3 lg:pt-4">
                        <span className="text-accent">06</span> / Contact
                    </p>
                    <div className="lg:col-span-9">
                        <h2
                            id="contact-title"
                            className="font-display text-[clamp(3.6rem,1.4rem+8vw,8.5rem)] uppercase leading-[0.82] tracking-[-0.025em] text-ink [font-weight:760]"
                        >
                            Get in touch.
                        </h2>
                        <p className="mt-6 max-w-[52ch] text-[17px] leading-relaxed text-ink-2 sm:text-lg">
                            If you&apos;d like to talk about one of these projects, or an opportunity where this kind of work is
                            useful, email is the best way to reach me.
                        </p>

                        <div className="mt-12 flex flex-col items-start gap-5 lg:mt-16">
                            <a
                                href={`mailto:${email}`}
                                className="draw-underline max-w-full break-all pb-1 text-[clamp(1.45rem,0.75rem+3.6vw,3.4rem)] font-medium leading-tight tracking-[-0.03em] text-ink hover:text-accent sm:break-normal"
                            >
                                {email}
                                <span className="sr-only"> (opens your email app)</span>
                            </a>
                            <CopyEmailButton email={email} />
                        </div>
                    </div>
                </Reveal>

                <ul className="relative grid border-t border-line bg-canvas/70 backdrop-blur-[2px] sm:grid-cols-3 sm:divide-x sm:divide-line">
                    {linkedin && (
                        <li className="border-b border-line sm:border-b-0">
                            <Channel
                                href={linkedin}
                                external
                                icon={<FaLinkedin className="h-[18px] w-[18px]" aria-hidden="true" />}
                                label="LinkedIn"
                                value={linkedin.replace(/^https:\/\/(www\.)?/, "").replace(/\/$/, "")}
                            />
                        </li>
                    )}
                    <li className="border-b border-line sm:border-b-0">
                        <Channel
                            href={github}
                            external
                            icon={<FaGithub className="h-[18px] w-[18px]" aria-hidden="true" />}
                            label="GitHub"
                            value={github.replace("https://", "")}
                        />
                    </li>
                    <li>
                        <Channel
                            href="/resume"
                            icon={<FileText className="h-[18px] w-[18px]" aria-hidden="true" />}
                            label="Résumé"
                            value={hasResume ? "View or download the PDF" : "Résumé page"}
                        />
                    </li>
                </ul>
            </Rails>
        </section>
    );
};

export default ContactSection;
