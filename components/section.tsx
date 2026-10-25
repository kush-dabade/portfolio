import Reveal from "./reveal";

// The framed column every section sits in: a centred max-width with hairline rails.
export const Rails = ({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div className={`border-x border-line ${className}`}>{children}</div>
    </div>
);

const Section = ({
    id,
    index,
    eyebrow,
    title,
    description,
    children,
}: {
    id: string;
    index: string;
    eyebrow: string;
    title: string;
    description?: string;
    children: React.ReactNode;
}) => (
    <section id={id} aria-labelledby={`${id}-title`} tabIndex={-1} className="outline-none">
        <Rails>
            <Reveal className="px-5 pb-8 pt-14 sm:px-10 sm:pb-10 sm:pt-20">
                <p className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
                    <span className="text-accent">{index}</span>
                    <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
                    {eyebrow}
                </p>
                <h2
                    id={`${id}-title`}
                    className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
                >
                    {title}
                </h2>
                {description && (
                    <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-2">
                        {description}
                    </p>
                )}
            </Reveal>
        </Rails>
        {children}
    </section>
);

export default Section;
