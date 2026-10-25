import Reveal from "./reveal";

// The framed column every section sits in: a centred 1200px sheet with hairline rails.
export const Rails = ({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div className="mx-auto w-full max-w-300 px-3 sm:px-6">
        <div className={`border-x border-line ${className}`}>{children}</div>
    </div>
);

// Carries the rails down to the footer on pages shorter than the viewport.
export const RailsFiller = () => (
    <div aria-hidden="true" className="mx-auto flex w-full max-w-300 flex-1 px-3 sm:px-6">
        <div className="flex-1 border-x border-line" />
    </div>
);

// Inner padding shared by everything inside the rails, so all text lines up.
export const gutter = "px-5 sm:px-8 lg:px-12";

// Section index and name. From lg up it sits in the left margin column, level
// with the heading; on smaller screens it stacks above it.
export const SectionLabel = ({ index, children }: { index: string; children: React.ReactNode }) => (
    <p className="flex items-baseline gap-3 font-mono text-[13px] text-ink-3">
        <span className="text-accent">{index}</span>
        <span aria-hidden="true" className="h-px w-6 translate-y-[-0.3em] bg-line-strong" />
        {children}
    </p>
);

const Section = ({
    id,
    index,
    label,
    title,
    description,
    children,
}: {
    id: string;
    index: string;
    label: string;
    title: string;
    description?: string;
    children: React.ReactNode;
}) => (
    <section id={id} aria-labelledby={`${id}-title`} tabIndex={-1} className="outline-none">
        <Rails>
            <Reveal as="header" className={`grid gap-y-5 pb-12 pt-20 lg:grid-cols-12 lg:gap-x-8 lg:pb-14 lg:pt-24 ${gutter}`}>
                <div className="lg:col-span-3 lg:pt-[0.9rem]">
                    <SectionLabel index={index}>{label}</SectionLabel>
                </div>
                <div className="lg:col-span-9">
                    <h2
                        id={`${id}-title`}
                        className="text-[clamp(2.1rem,1.55rem+2.3vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.038em] text-ink"
                    >
                        {title}
                    </h2>
                    {description && (
                        <p className="mt-5 max-w-[56ch] text-[17px] leading-relaxed text-ink-2">{description}</p>
                    )}
                </div>
            </Reveal>
        </Rails>
        {children}
    </section>
);

export default Section;
