'use client'
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

// A marker pinned 600px down the document; once it has scrolled out of view
// above the viewport, the button appears. Tablet and desktop only: on a phone
// it would sit on top of the text column.
const BackToTop = () => {
    const marker = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = marker.current;
        if (!el) return;
        const watch = new IntersectionObserver(([entry]) =>
            setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0)
        );
        watch.observe(el);
        return () => watch.disconnect();
    }, []);

    const goUp = () => {
        const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: calm ? "auto" : "smooth" });
        document.getElementById("main")?.focus({ preventScroll: true });
    };

    return (
        <>
            <div ref={marker} aria-hidden="true" className="pointer-events-none absolute left-0 top-[600px] h-px w-px" />
            <AnimatePresence>
                {visible && (
                    <motion.button
                        type="button"
                        aria-label="Back to top"
                        title="Back to top"
                        onClick={goUp}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.15 }}
                        className="fixed bottom-6 right-6 z-40 hidden h-10 w-10 place-items-center rounded-[3px] border border-line bg-canvas/90 text-ink-3 backdrop-blur-sm hover:border-line-strong hover:text-ink md:grid"
                    >
                        <ArrowUp aria-hidden="true" className="h-4 w-4" />
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
};

export default BackToTop;
