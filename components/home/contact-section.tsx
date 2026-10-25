import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { siteConfig } from "@/lib/config/site-config";
import Section, { Rails } from "../section";
import Reveal from "../reveal";
import CopyEmailButton from "../copy-email-button";

const ChannelRow = ({
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
    const className =
        "group flex items-center gap-4 px-5 py-4 hover:bg-wash sm:px-8";
    const content = (
        <>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line bg-raised text-ink-2 group-hover:text-ink">
                {icon}
            </span>
            <span className="min-w-0 flex-1">
                <span className="block font-mono text-[11px] text-ink-3">{label}</span>
                <span className="block truncate text-sm text-ink">{value}</span>
            </span>
            <ArrowUpRight
                className="h-4 w-4 text-ink-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                aria-hidden="true"
            />
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

const ContactSection = ({ hasResume }: { hasResume: boolean }) => {
    const { email, github, linkedin } = siteConfig.links;

    return (
        <Section
            id="contact"
            index="05"
            eyebrow="Contact"
            title="Get in touch."
            description="If you'd like to talk about one of these projects, or an opportunity where this kind of work is useful, email is the best way to reach me."
        >
            <Rails className="border-t border-line">
                <div className="grid grid-cols-1 md:grid-cols-12">
                    <Reveal className="px-5 py-8 sm:px-10 sm:py-10 md:col-span-6 md:border-r md:border-line">
                        <h3 className="mb-3 font-mono text-[11px] font-normal uppercase tracking-[0.12em] text-ink-3">
                            Email
                        </h3>
                        <CopyEmailButton email={email} />
                        <a
                            href={`mailto:${email}`}
                            className="mt-4 inline-flex items-center gap-2 text-sm text-ink-2 underline decoration-line-strong underline-offset-4 hover:text-ink hover:decoration-accent"
                        >
                            <Mail className="h-4 w-4" aria-hidden="true" />
                            Or open your mail app
                        </a>
                    </Reveal>

                    <Reveal delay={0.08} className="border-t border-line md:col-span-6 md:border-t-0">
                        <div className="divide-y divide-line">
                            <ChannelRow
                                href={linkedin}
                                external
                                icon={<FaLinkedin className="h-4 w-4" aria-hidden="true" />}
                                label="LinkedIn"
                                value={linkedin.replace(/^https:\/\/(www\.)?/, "").replace(/\/$/, "")}
                            />
                            <ChannelRow
                                href={github}
                                external
                                icon={<FaGithub className="h-4 w-4" aria-hidden="true" />}
                                label="GitHub"
                                value={github.replace("https://", "")}
                            />
                            <ChannelRow
                                href="/resume"
                                icon={<FileText className="h-4 w-4" aria-hidden="true" />}
                                label="Résumé"
                                value={hasResume ? "View or download the PDF" : "Résumé page"}
                            />
                        </div>
                    </Reveal>
                </div>
            </Rails>
        </Section>
    );
};

export default ContactSection;
