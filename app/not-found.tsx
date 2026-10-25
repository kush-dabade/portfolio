import type { Metadata } from "next";
import Link from "next/link";
import SectionBreak from "@/components/section-break";
import { Rails } from "@/components/section";
import { ArrowRight, FileText, FolderGit2, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found",
};

const routes = [
  { title: "Home", subtitle: "About, skills, education and contact", href: "/", icon: Home },
  { title: "Projects", subtitle: "TeamOS, AWS experiments and more", href: "/#projects", icon: FolderGit2 },
  { title: "Résumé", subtitle: "View or download the PDF", href: "/resume", icon: FileText },
];

export default function PageNotFound() {
  return (
    <>
      <Rails>
        <div className="px-5 pb-10 pt-16 sm:px-10 sm:pt-24">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
            <span className="text-accent">404</span> — Not found
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            This page doesn&apos;t exist.
          </h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-2">
            The link may be old or mistyped. Here&apos;s where you can go instead.
          </p>
        </div>
      </Rails>
      <Rails className="divide-y divide-line border-t border-line">
        {routes.map(({ title, subtitle, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-center gap-4 px-5 py-5 hover:bg-wash sm:px-10"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-md border border-line bg-raised text-ink-2 group-hover:text-ink">
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="flex-1">
              <span className="block text-sm font-medium text-ink">{title}</span>
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
    </>
  );
}
