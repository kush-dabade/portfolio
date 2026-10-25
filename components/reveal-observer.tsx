'use client'
import { useEffect } from "react";
import { usePathname } from "next/navigation";

// One IntersectionObserver for every [data-reveal] element on the page.
// Anything already on screen (or scrolled past) is marked shown first, and only
// then does <html> get .reveal-on — so nothing visible ever blinks out, and
// without JavaScript nothing is hidden at all. Re-runs after client navigation.
const RevealObserver = () => {
    const pathname = usePathname();

    useEffect(() => {
        if (!("IntersectionObserver" in window)) return;

        const watch = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;
                    entry.target.setAttribute("data-shown", "");
                    watch.unobserve(entry.target);
                }
            },
            { rootMargin: "0px 0px -8% 0px" }
        );

        const fold = window.innerHeight;
        for (const el of document.querySelectorAll("[data-reveal]:not([data-shown])")) {
            if (el.getBoundingClientRect().top < fold) el.setAttribute("data-shown", "");
            else watch.observe(el);
        }
        document.documentElement.classList.add("reveal-on");

        return () => watch.disconnect();
    }, [pathname]);

    return null;
};

export default RevealObserver;
