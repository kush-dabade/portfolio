'use client'
import { createContext, useContext, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import { MotionConfig } from "framer-motion";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

// <html class="dark"> is the single source of truth. The inline script in
// app/layout.tsx sets it before paint, so the first render is always correct.
const readTheme = (): Theme =>
    document.documentElement.classList.contains("dark") ? "dark" : "light";

const watchTheme = (notify: () => void) => {
    const observer = new MutationObserver(notify);
    observer.observe(document.documentElement, { attributeFilter: ["class"] });
    return () => observer.disconnect();
};

const writeTheme = (theme: Theme) => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
        localStorage.setItem(STORAGE_KEY, theme);
    } catch {
        // Storage can be blocked (private browsing); the switch still works for this visit.
    }
};

// Swaps the theme, revealing the new one as a circle that grows from the pointer.
const switchTheme = (next: Theme, origin?: { x: number; y: number }) => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (calm || typeof document.startViewTransition !== "function") {
        writeTheme(next);
        return;
    }

    const root = document.documentElement.style;
    const x = origin?.x ?? window.innerWidth;
    const y = origin?.y ?? 0;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    root.setProperty("--switch-x", `${x}px`);
    root.setProperty("--switch-y", `${y}px`);
    root.setProperty("--switch-r", `${radius}px`);

    document.startViewTransition(() => flushSync(() => writeTheme(next)));
};

type ThemeApi = {
    theme: Theme;
    toggle: (origin?: { x: number; y: number }) => void;
};

const ThemeCtx = createContext<ThemeApi | null>(null);

export const ThemeRoot = ({ children }: { children: React.ReactNode }) => {
    const theme = useSyncExternalStore(watchTheme, readTheme, () => "dark" as const);
    const toggle: ThemeApi["toggle"] = (origin) => switchTheme(theme === "dark" ? "light" : "dark", origin);

    return (
        <ThemeCtx value={{ theme, toggle }}>
            {/* "user" = follow the OS reduced-motion setting in every framer-motion animation. */}
            <MotionConfig reducedMotion="user">{children}</MotionConfig>
        </ThemeCtx>
    );
};

export const useTheme = () => {
    const api = useContext(ThemeCtx);
    if (!api) throw new Error("useTheme() needs <ThemeRoot> above it");
    return api;
};
