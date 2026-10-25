// The pause between sections: a dot field bounded by hairlines, with a "+" where
// each side rail of the content column crosses a hairline.
const Mark = ({ at }: { at: string }) => (
    <span className={`absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 ${at}`}>
        <span className="absolute inset-x-0 top-1/2 h-px bg-ink-3" />
        <span className="absolute inset-y-0 left-1/2 w-px bg-ink-3" />
    </span>
);

const SectionBreak = () => (
    <div aria-hidden="true" className="relative h-10 border-y border-line sm:h-12">
        <div className="dot-field absolute inset-0 opacity-60" />
        <div className="relative mx-auto h-full max-w-5xl px-4 sm:px-6">
            <div className="relative h-full border-x border-line">
                <Mark at="left-0 top-0" />
                <Mark at="left-full top-0" />
                <Mark at="left-0 top-full" />
                <Mark at="left-full top-full" />
            </div>
        </div>
    </div>
);

export default SectionBreak;
