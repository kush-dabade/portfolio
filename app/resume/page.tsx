import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, FileText } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import SectionBreak from "@/components/section-break";
import { Rails, SheetZones, gutter } from "@/components/section";
import { buttonPrimary, buttonSecondary } from "@/components/ui";
import ResumeButton from "@/components/resume-button";
import ResumeViewer from "@/components/resume/resume-viewer-loader";
import { siteConfig } from "@/lib/config/site-config";
import { hasResume } from "@/lib/resume";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${siteConfig.name} — ${siteConfig.education.degree}, ${siteConfig.education.institution}.`,
  alternates: { canonical: "/resume" },
};

export default function ResumeRoute() {
  const available = hasResume();

  return (
    <>
      <Rails>
        <SheetZones sheet="Sheet R — Résumé" />
        <div className={`flex flex-col justify-between gap-8 pb-10 pt-12 sm:pt-16 lg:flex-row lg:items-end lg:pb-12 lg:pt-20 ${gutter}`}>
          <div>
            <Link
              href="/"
              className="group mb-8 inline-flex items-center gap-1.5 text-sm text-ink-2 hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" aria-hidden="true" />
              Back home
            </Link>
            <p className="font-mono text-[12px] text-ink-3"><span className="text-accent">PDF</span> / Curriculum vitae</p>
            <h1 className="mt-5 font-display text-[clamp(3.4rem,1.6rem+6vw,7rem)] uppercase leading-[0.82] tracking-[-0.025em] text-ink [font-weight:760]">
              Résumé
            </h1>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink-2">
              {siteConfig.name} · {siteConfig.education.degree}, {siteConfig.education.institution}, {siteConfig.education.location}.
            </p>
          </div>

          {available && (
            <div className="flex shrink-0 flex-wrap gap-2">
              <ResumeButton available className={buttonPrimary} />
              <a href={siteConfig.resume.file} target="_blank" rel="noreferrer" className={buttonSecondary}>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                Open in new tab
              </a>
            </div>
          )}
        </div>
      </Rails>

      <Rails className="relative border-t border-line bg-inset">
        <div className="blueprint fade-edges pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative p-3 sm:p-8 lg:p-12">
          {available ? (
            <ResumeViewer />
          ) : (
            <div className="flex flex-col items-center rounded-[3px] border border-dashed border-line-strong px-6 py-20 text-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-[2px] border border-line bg-raised text-ink-2">
                <FileText className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-lg font-semibold text-ink">
                The PDF résumé isn&apos;t published here yet
              </h2>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-2">
                In the meantime, the projects on the home page and their repositories on GitHub cover what I&apos;ve been building.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-2">
                <Link
                  href="/#projects"
                  className="inline-flex items-center gap-2 rounded-[2px] bg-ink px-4 py-2.5 text-sm font-medium text-canvas hover:opacity-90"
                >
                  View projects
                </Link>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-[2px] border border-line-strong px-4 py-2.5 text-sm font-medium text-ink hover:bg-raised"
                >
                  <FaGithub className="h-4 w-4" aria-hidden="true" />
                  GitHub
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </Rails>

      <SectionBreak />
    </>
  );
}
