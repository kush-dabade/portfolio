// Shared control styles. Radii: 8px for controls, 12px for frames, 4px for tags.
export const buttonPrimary =
    "group inline-flex h-11 items-center justify-center gap-2 rounded-[3px] bg-ink px-5 text-sm font-medium text-canvas hover:bg-ink/85 active:translate-y-px";

export const buttonSecondary =
    "group inline-flex h-11 items-center justify-center gap-2 rounded-[3px] border border-line-strong bg-canvas/40 px-5 text-sm font-medium text-ink hover:bg-raised active:translate-y-px";

export const buttonIcon =
    "grid h-11 w-11 place-items-center rounded-[3px] text-ink-2 hover:bg-raised hover:text-ink active:translate-y-px";

// Arrow that nudges toward where a link goes.
export const nudgeRight = "h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5";
export const nudgeOut =
    "h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5";
export const nudgeDown = "h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5";
