import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, FileText } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import SectionBreak from "@/components/section-break";
import { Rails } from "@/components/section";
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
        <div className="flex flex-col justify-between gap-6 px-5 pb-10 pt-12 sm:flex-row sm:items-end sm:px-10 sm:pt-16">
          <div>
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-1.5 font-mono text-xs text-ink-3 hover:text-ink"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Back home
            </Link>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
              Curriculum vitae
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Résumé
            </h1>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-2">
              {siteConfig.name} · {siteConfig.education.degree}, {siteConfig.education.institution}, {siteConfig.education.location}.
            </p>
          </div>

          {available && (
            <div className="flex shrink-0 flex-wrap gap-2">
              <ResumeButton
                available
                className="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2.5 text-sm font-medium text-canvas hover:opacity-90"
              />
              <a
                href={siteConfig.resume.file}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-line-strong px-4 py-2.5 text-sm font-medium text-ink hover:bg-raised"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                Open in new tab
              </a>
            </div>
          )}
        </div>
      </Rails>

      <Rails className="border-t border-line bg-inset/40">
        <div className="p-4 sm:p-8">
          {available ? (
            <ResumeViewer />
          ) : (
            <div className="flex flex-col items-center rounded-lg border border-dashed border-line-strong px-6 py-20 text-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-md border border-line bg-raised text-ink-2">
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
                  className="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2.5 text-sm font-medium text-canvas hover:opacity-90"
                >
                  View projects
                </Link>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-line-strong px-4 py-2.5 text-sm font-medium text-ink hover:bg-raised"
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
