'use client'
import { useEffect, useRef, useState } from "react";
import ExplodedStack from "../figure/exploded-stack";

// Pins Fig. 1 beside the steps (lg and up) and moves the request to whichever
// step is crossing the middle of the viewport. The steps are server-rendered
// children marked with data-step; this only watches them.
const PathScroller = ({ children, total }: { children: React.ReactNode; total: number }) => {
    const list = useRef<HTMLOListElement>(null);
    const [step, setStep] = useState(0);

    useEffect(() => {
        const items = list.current?.querySelectorAll<HTMLElement>("[data-step]");
        if (!items) return;
        const watch = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) setStep(Number((entry.target as HTMLElement).dataset.step));
                }
            },
            { rootMargin: "-45% 0px -50% 0px" }
        );
        items.forEach((el) => watch.observe(el));
        return () => watch.disconnect();
    }, []);

    useEffect(() => {
        list.current?.querySelectorAll<HTMLElement>("[data-step]").forEach((el) => {
            el.toggleAttribute("data-current", Number(el.dataset.step) === step);
        });
    }, [step]);

    return (
        <div className="grid lg:grid-cols-12">
            <div className="hidden border-r border-line lg:col-span-5 lg:block">
                <div className="sticky top-14 flex h-[calc(100svh-3.5rem)] max-h-[52rem] flex-col justify-center px-8 xl:px-10">
                    <ExplodedStack mode="guided" step={step} labels={false} />
                    <p className="mt-6 flex items-center gap-3 font-mono text-[11.5px] text-ink-3" aria-hidden="true">
                        <span className="text-accent">{String(step + 1).padStart(2, "0")}</span>
                        <span className="h-px flex-1 bg-line">
                            <span className="block h-px bg-accent transition-[width] duration-500" style={{ width: `${((step + 1) / total) * 100}%` }} />
                        </span>
                        <span>{String(total).padStart(2, "0")}</span>
                    </p>
                </div>
            </div>
            <ol ref={list} className="min-w-0 lg:col-span-7">
                {children}
            </ol>
        </div>
    );
};

export default PathScroller;
