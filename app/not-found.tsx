import type { Metadata } from "next";
import Link from "next/link";
import SectionBreak from "@/components/section-break";
import { Rails, RailsFiller, SheetZones, gutter } from "@/components/section";
import { ArrowRight, FileText, FolderGit2, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found",
};

const routes = [
  { title: "Home", subtitle: "Work, lab, profile and contact", href: "/", icon: Home },
  { title: "Work", subtitle: "TeamOS, University Management System, CoinWave and the lab", href: "/#work", icon: FolderGit2 },
  { title: "Résumé", subtitle: "View or download the PDF", href: "/resume", icon: FileText },
];

export default function PageNotFound() {
  return (
    <>
      <Rails>
        <SheetZones sheet="Sheet 404 — Missing" />
        <div className={`pb-12 pt-16 sm:pt-24 lg:pb-16 lg:pt-28 ${gutter}`}>
          <p className="mb-5 font-mono text-[13px] text-ink-3">
            <span className="text-accent">404</span> · Not found
          </p>
          <h1 className="text-[clamp(2.4rem,1.6rem+3.4vw,4.5rem)] font-semibold leading-[1] tracking-[-0.045em] text-ink">
            This page doesn&apos;t exist.
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink-2">
            The link may be old or mistyped. Here&apos;s where you can go instead.
          </p>
        </div>
      </Rails>
      <Rails className="divide-y divide-line border-t border-line">
        {routes.map(({ title, subtitle, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`group flex items-center gap-4 py-5 hover:bg-wash ${gutter}`}
          >
            <span className="flex h-10 w-10 items-center justify-center border border-line bg-raised text-ink-2 group-hover:text-ink">
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="flex-1">
              <span className="block text-[15px] font-medium text-ink">{title}</span>
              <span className="block text-sm text-ink-3">{subtitle}</span>
            </span>
            <ArrowRight
              className="h-4 w-4 text-ink-3 transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
              aria-hidden="true"
            />
          </Link>
        ))}
      </Rails>
      <SectionBreak />
      <RailsFiller />
    </>
  );
}
