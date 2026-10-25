'use client'
import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, Menu, Moon, Sun, X } from "lucide-react";
import { siteConfig } from "@/lib/config/site-config";
import { useTheme } from "../theme";
import SectionLink from "../section-link";
import { useActiveSection, usePanelDismiss } from "./hooks";

const SECTIONS = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
] as const;

const SECTION_IDS = SECTIONS.map((s) => s.id);

const ThemeButton = () => {
    const { toggle } = useTheme();
    return (
        <button
            type="button"
            aria-label="Toggle colour theme"
            title="Toggle colour theme"
            className="group grid h-8 w-8 place-items-center rounded-md border border-transparent text-ink-2 hover:border-line hover:text-ink"
            onClick={(e) => {
                // Pointer clicks grow the new theme from the cursor; keyboard presses from the button.
                const box = e.currentTarget.getBoundingClientRect();
                const fromKeyboard = e.detail === 0;
                toggle({
                    x: fromKeyboard ? box.left + box.width / 2 : e.clientX,
                    y: fromKeyboard ? box.top + box.height / 2 : e.clientY,
                });
            }}
        >
            {/* CSS shows the right icon, so server and client markup always match. */}
            <Sun aria-hidden="true" className="hidden h-4 w-4 transition-transform duration-300 group-hover:rotate-45 dark:block" />
            <Moon aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-12 dark:hidden" />
        </button>
    );
};

const SiteHeader = () => {
    const pathname = usePathname();
    const onHome = pathname === "/";
    const current = useActiveSection(SECTION_IDS, onHome);
    const [hovered, setHovered] = useState<string | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuButton = useRef<HTMLButtonElement>(null);

    const closeMenu = useCallback(() => setMenuOpen(false), []);
    usePanelDismiss(menuOpen, closeMenu, menuButton);

    // The highlight follows the pointer, and rests on the section being read.
    const highlighted = hovered ?? current;

    return (
        <>
            <header className="sticky top-0 z-50 border-b border-line bg-canvas/80 backdrop-blur-md">
                <div className="mx-auto max-w-5xl px-4 sm:px-6">
                    <div className="flex h-14 items-center justify-between gap-4 border-x border-line px-3 sm:px-4">
                        <Link href="/" onClick={closeMenu} aria-label={`${siteConfig.name} — home`} className="group flex items-center gap-2.5 rounded-md">
                            <span className="grid h-7 w-7 place-items-center rounded-md border border-line-strong bg-raised font-mono text-[11px] font-semibold text-ink group-hover:border-accent-line">
                                {siteConfig.initials}
                            </span>
                            <span className="hidden text-sm font-medium tracking-tight sm:inline">{siteConfig.name}</span>
                        </Link>

                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <nav aria-label="Primary" className="hidden md:block">
                                <ul className="flex" onMouseLeave={() => setHovered(null)}>
                                    {SECTIONS.map(({ id, label }) => (
                                        <li key={id} className="relative">
                                            {highlighted === id && (
                                                <motion.span
                                                    layoutId="section-highlight"
                                                    aria-hidden="true"
                                                    className="absolute inset-0 rounded-md border border-line bg-raised"
                                                    transition={{ type: "spring", stiffness: 520, damping: 40 }}
                                                />
                                            )}
                                            <SectionLink
                                                id={id}
                                                aria-current={current === id ? "location" : undefined}
                                                onMouseEnter={() => setHovered(id)}
                                                onFocus={() => setHovered(id)}
                                                onBlur={() => setHovered(null)}
                                                className={`relative block rounded-md px-3 py-1.5 text-[13px] font-medium ${highlighted === id ? "text-ink" : "text-ink-2 hover:text-ink"}`}
                                            >
                                                {label}
                                            </SectionLink>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            <span aria-hidden="true" className="mx-1 hidden h-4 w-px bg-line md:block" />

                            <Link
                                href="/resume"
                                aria-current={pathname === "/resume" ? "page" : undefined}
                                className="hidden items-center gap-1.5 rounded-md border border-line px-2.5 py-1.5 text-[13px] font-medium text-ink-2 hover:border-line-strong hover:text-ink aria-[current=page]:border-line-strong aria-[current=page]:bg-raised aria-[current=page]:text-ink sm:inline-flex"
                            >
                                <FileText aria-hidden="true" className="h-3.5 w-3.5" />
                                Résumé
                            </Link>

                            <ThemeButton />

                            <button
                                ref={menuButton}
                                type="button"
                                aria-expanded={menuOpen}
                                aria-controls="mobile-menu"
                                aria-label={menuOpen ? "Close menu" : "Open menu"}
                                onClick={() => setMenuOpen((open) => !open)}
                                className="grid h-8 w-8 place-items-center rounded-md border border-line text-ink-2 hover:border-line-strong hover:text-ink md:hidden"
                            >
                                {menuOpen ? <X aria-hidden="true" className="h-4 w-4" /> : <Menu aria-hidden="true" className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {menuOpen && (
                        <motion.nav
                            key="panel"
                            id="mobile-menu"
                            aria-label="Mobile"
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.16 }}
                            className="absolute inset-x-0 top-full z-50 border-b border-line bg-canvas md:hidden"
                        >
                            <div className="mx-auto max-w-5xl px-4 sm:px-6">
                                <ol className="border-x border-line px-2 py-2">
                                    {SECTIONS.map(({ id, label }, n) => (
                                        <li key={id}>
                                            <SectionLink
                                                id={id}
                                                onClick={closeMenu}
                                                aria-current={current === id ? "location" : undefined}
                                                className="flex items-center justify-between rounded-md px-3 py-3 text-[15px] font-medium text-ink-2 hover:bg-wash hover:text-ink aria-[current=location]:bg-raised aria-[current=location]:text-ink"
                                            >
                                                {label}
                                                <span className="font-mono text-[11px] text-ink-3">{String(n + 1).padStart(2, "0")}</span>
                                            </SectionLink>
                                        </li>
                                    ))}
                                    <li className="mt-2 border-t border-line pt-2">
                                        <Link
                                            href="/resume"
                                            onClick={closeMenu}
                                            className="flex items-center gap-2 rounded-md px-3 py-3 text-[15px] font-medium text-ink-2 hover:bg-wash hover:text-ink"
                                        >
                                            <FileText aria-hidden="true" className="h-4 w-4" />
                                            Résumé
                                        </Link>
                                    </li>
                                </ol>
                            </div>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </header>

            {/* Tapping anywhere outside the panel closes it. It lives outside <header>
                because the header's backdrop blur would otherwise contain this fixed layer. */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        aria-hidden="true"
                        onClick={closeMenu}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-x-0 bottom-0 top-14 z-40 bg-black/40 backdrop-blur-[2px] md:hidden"
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default SiteHeader;
