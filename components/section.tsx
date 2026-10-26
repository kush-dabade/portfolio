import Reveal from "./reveal";

// The framed column every section sits in: a centred 1320px sheet with hairline rails.
export const Rails = ({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div className="mx-auto w-full max-w-330 px-3 sm:px-6">
        <div className={`border-x border-line ${className}`}>{children}</div>
    </div>
);

// Carries the rails down to the footer on pages shorter than the viewport.
export const RailsFiller = () => (
    <div aria-hidden="true" className="mx-auto flex w-full max-w-330 flex-1 px-3 sm:px-6">
        <div className="flex-1 border-x border-line" />
    </div>
);

// Inner padding shared by everything inside the rails, so all text lines up.
export const gutter = "px-5 sm:px-8 lg:px-12";

// The border of a drawing sheet: the sheet's name, then zone letters along the
// edge with a rule between each. Every major section starts with one.
const ZONES = "ABCDEFGHJKLM".split("");
export const SheetZones = ({ sheet, className = "" }: { sheet: string; className?: string }) => (
    <div aria-hidden="true" className={`relative flex h-7 items-stretch border-b border-line font-mono text-[10px] text-ink-3 ${className}`}>
        <span className="flex items-center whitespace-nowrap border-r border-line px-3 uppercase tracking-[0.12em] sm:px-4">{sheet}</span>
        <span className="grid flex-1 grid-cols-6 sm:grid-cols-12">
            {ZONES.map((z, i) => (
                <span key={z} className={`items-center justify-center border-r border-line last:border-r-0 ${i >= 6 ? "hidden sm:flex" : "flex"}`}>
                    {z}
                </span>
            ))}
        </span>
    </div>
);

// A numbered sub-section inside a sheet: "01.2" in the margin column, then the
// heading and a short lede.
export const SubHead = ({
    id,
    index,
    title,
    children,
    className = "",
}: {
    id?: string;
    index: string;
    title: string;
    children?: React.ReactNode;
    className?: string;
}) => (
    <Reveal as="header" className={`grid gap-y-4 pb-10 pt-16 lg:grid-cols-12 lg:gap-x-8 lg:pt-20 ${gutter} ${className}`}>
        <p className="font-mono text-[12px] text-accent lg:col-span-3 lg:pt-2">{index}</p>
        <div className="lg:col-span-9">
            <h3 id={id} tabIndex={id ? -1 : undefined} className="max-w-[24ch] outline-none text-[clamp(1.75rem,1.3rem+1.8vw,2.75rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-ink">
                {title}
            </h3>
            {children && <div className="mt-4 max-w-[60ch] text-[16.5px] leading-relaxed text-ink-2">{children}</div>}
        </div>
    </Reveal>
);
