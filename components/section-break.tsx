// The seam between sections: one full-bleed hairline, with a registration "+"
// where each side rail of the content column crosses it.
const Mark = ({ at }: { at: string }) => (
    <span className={`absolute top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 ${at}`}>
        <span className="absolute inset-x-0 top-1/2 h-px bg-ink-3" />
        <span className="absolute inset-y-0 left-1/2 w-px bg-ink-3" />
    </span>
);

const SectionBreak = () => (
    <div aria-hidden="true" className="border-t border-line">
        <div className="mx-auto max-w-330 px-3 sm:px-6">
            <div className="relative">
                <Mark at="left-0" />
                <Mark at="left-full" />
            </div>
        </div>
    </div>
);

export default SectionBreak;
