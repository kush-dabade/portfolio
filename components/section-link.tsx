'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSectionScroll } from "./scroll";

type SectionLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    id: string;
};

// Links to a home-page section. On the home page it scrolls in place; from any
// other route it navigates to "/#id" and lets Next.js land on the section.
const SectionLink = ({ id, onClick, children, ...rest }: SectionLinkProps) => {
    const pathname = usePathname();
    const scrollToSection = useSectionScroll();

    if (pathname !== "/") {
        return (
            <Link href={`/#${id}`} onClick={onClick} {...rest}>
                {children}
            </Link>
        );
    }

    return (
        <a
            href={`#${id}`}
            onClick={(e) => {
                onClick?.(e);
                // Leave modified clicks (new tab, etc.) to the browser.
                if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                e.preventDefault();
                scrollToSection(id);
            }}
            {...rest}
        >
            {children}
        </a>
    );
};

export default SectionLink;
