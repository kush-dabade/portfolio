'use client'
import { useRef, useState } from "react";
import Image from "next/image";

// Real screenshots from the TeamOS repository (.github/assets), cropped to the
// app window above the account footer. All three share one 1438 × 640 frame;
// on phones the frame turns 4:3 and shows the top-left of the app at a size
// that can actually be read, instead of the whole window in miniature.
const VIEWS = [
    {
        id: "dashboard",
        label: "Dashboard",
        src: "/images/projects/teamos-dashboard.webp",
        alt: "TeamOS dashboard: a workspace sidebar, projects to continue, overdue tasks needing attention, and a My tasks table",
    },
    {
        id: "projects",
        label: "Projects",
        src: "/images/projects/teamos-projects.webp",
        alt: "TeamOS projects list: five projects with status, a progress bar, completed task counts and when each was last updated",
    },
    {
        id: "sprints",
        label: "Sprints",
        src: "/images/projects/teamos-sprints.webp",
        alt: "TeamOS project page for Billing & Subscriptions on the Sprints tab: a planned, an active and a completed sprint with start and end dates",
    },
] as const;

type ViewId = (typeof VIEWS)[number]["id"];

const TeamOSViews = () => {
    const [active, setActive] = useState<ViewId>("dashboard");
    const tabs = useRef<(HTMLButtonElement | null)[]>([]);

    // Arrow keys move between tabs (and select them), per the ARIA tabs pattern.
    const onKeyDown = (e: React.KeyboardEvent, index: number) => {
        const last = VIEWS.length - 1;
        const next =
            e.key === "ArrowRight" ? (index === last ? 0 : index + 1)
                : e.key === "ArrowLeft" ? (index === 0 ? last : index - 1)
                    : e.key === "Home" ? 0
                        : e.key === "End" ? last
                            : null;
        if (next === null) return;
        e.preventDefault();
        setActive(VIEWS[next].id);
        tabs.current[next]?.focus();
    };

    return (
        <figure>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 sm:mb-5">
                <div role="tablist" aria-label="TeamOS screens" className="inline-flex rounded-lg border border-line bg-canvas p-1">
                    {VIEWS.map((view, i) => (
                        <button
                            key={view.id}
                            ref={(el) => { tabs.current[i] = el; }}
                            type="button"
                            role="tab"
                            id={`teamos-tab-${view.id}`}
                            aria-selected={active === view.id}
                            aria-controls="teamos-view"
                            tabIndex={active === view.id ? 0 : -1}
                            onClick={() => setActive(view.id)}
                            onKeyDown={(e) => onKeyDown(e, i)}
                            className="rounded-md px-3 py-1.5 text-[13px] font-medium text-ink-2 hover:text-ink aria-selected:bg-raised aria-selected:text-ink"
                        >
                            {view.label}
                        </button>
                    ))}
                </div>
                <figcaption className="font-mono text-[12.5px] text-ink-3">Screens from the TeamOS repository</figcaption>
            </div>

            <div
                id="teamos-view"
                role="tabpanel"
                aria-labelledby={`teamos-tab-${active}`}
                className="group/frame relative aspect-[4/3] overflow-hidden rounded-xl border border-line-strong bg-surface shadow-frame sm:aspect-[1438/640]"
            >
                {VIEWS.map((view) => (
                    <Image
                        key={view.id}
                        src={view.src}
                        alt={active === view.id ? view.alt : ""}
                        aria-hidden={active === view.id ? undefined : true}
                        fill
                        sizes="(min-width: 1200px) 1100px, (min-width: 640px) 100vw, 200vw"
                        className={`object-cover object-left-top [transition:opacity_350ms_ease,scale_1400ms_var(--ease-out-soft)] group-hover/frame:scale-[1.012] ${active === view.id ? "opacity-100" : "opacity-0"}`}
                    />
                ))}
            </div>
        </figure>
    );
};

export default TeamOSViews;
