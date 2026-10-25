// A run of short items separated by slashes. Each separator trails its item, so
// when the list wraps, a line ends with "/" instead of starting with one.
const InlineList = ({ items, className = "" }: { items: string[]; className?: string }) => (
    <ul className={`flex flex-wrap gap-y-1.5 ${className}`}>
        {items.map((item, i) => (
            <li key={item} className="whitespace-nowrap">
                {item}
                {i < items.length - 1 && (
                    <span aria-hidden="true" className="px-2.5 text-line-strong">
                        /
                    </span>
                )}
            </li>
        ))}
    </ul>
);

export default InlineList;
