'use client'
import { useEffect, useState } from "react";

/**
 * Which of the given sections is currently being read — the last one whose top
 * has crossed a line about a third of the way down the viewport.
 */
export function useActiveSection(ids: readonly string[], enabled: boolean) {
    const [active, setActive] = useState<string | null>(null);

    useEffect(() => {
        if (!enabled) return;
        const watch = new IntersectionObserver(
            (entries) => {
                const hits = entries.filter((e) => e.isIntersecting).map((e) => e.target.id);
                if (hits.length) setActive(hits[hits.length - 1]);
                else if (window.scrollY < 200) setActive(null);
            },
            { rootMargin: "-35% 0px -60% 0px" }
        );
        for (const id of ids) {
            const el = document.getElementById(id);
            if (el) watch.observe(el);
        }
        return () => watch.disconnect();
    }, [ids, enabled]);

    return enabled ? active : null;
}

/** Closes an open panel on Escape (handing focus back) or when the layout grows past mobile. */
export function usePanelDismiss(open: boolean, close: () => void, returnFocusTo: React.RefObject<HTMLElement | null>) {
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key !== "Escape") return;
            close();
            returnFocusTo.current?.focus();
        };
        const desktop = window.matchMedia("(min-width: 768px)");
        const onBreakpoint = () => desktop.matches && close();

        window.addEventListener("keydown", onKey);
        desktop.addEventListener("change", onBreakpoint);
        return () => {
            window.removeEventListener("keydown", onKey);
            desktop.removeEventListener("change", onBreakpoint);
        };
    }, [open, close, returnFocusTo]);
}
