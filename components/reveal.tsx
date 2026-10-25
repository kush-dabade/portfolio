import type { CSSProperties } from "react";

// Fades content up once as it enters the viewport. This is only a marker — the
// motion is CSS (app/globals.css) and the one observer for the whole page lives
// in reveal-observer.tsx — so it renders on the server and never hides anything
// until JavaScript is running. `frame` is the variant for project imagery.
const Reveal = ({
    children,
    className = "",
    delay = 0,
    variant,
    as: Tag = "div",
    ...rest
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    variant?: "frame";
    as?: "div" | "li" | "figure" | "header";
} & Omit<React.HTMLAttributes<HTMLElement>, "className" | "children">) => (
    <Tag
        {...rest}
        className={className}
        data-reveal={variant ?? ""}
        style={delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined}
    >
        {children}
    </Tag>
);

export default Reveal;
