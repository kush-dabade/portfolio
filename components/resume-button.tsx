import Link from "next/link";
import { Download, FileText } from "lucide-react";
import { siteConfig } from "@/lib/config/site-config";

// Downloads the PDF when it shipped with the build; otherwise opens the résumé page,
// which explains that the PDF is on its way — so the control always does something real.
const ResumeButton = ({
    available,
    className = "",
}: {
    available: boolean;
    className?: string;
}) =>
    available ? (
        <a href={siteConfig.resume.file} download={siteConfig.resume.downloadName} className={className}>
            <Download className="h-4 w-4" aria-hidden="true" />
            Download résumé
            <span className="sr-only">(PDF)</span>
        </a>
    ) : (
        <Link href="/resume" className={className}>
            <FileText className="h-4 w-4" aria-hidden="true" />
            Résumé
        </Link>
    );

export default ResumeButton;
