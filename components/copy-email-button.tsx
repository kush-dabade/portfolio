'use client'
import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

// Copies the address and confirms it visually and to screen readers.
const CopyEmailButton = ({ email }: { email: string }) => {
    const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => () => {
        if (timer.current) clearTimeout(timer.current);
    }, []);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setStatus("copied");
        } catch {
            setStatus("failed");
        }
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setStatus("idle"), 2200);
    };

    return (
        <button
            type="button"
            onClick={handleCopy}
            className="group inline-flex items-center gap-3 rounded-md border border-line bg-raised py-2 pl-3.5 pr-2 text-left hover:border-line-strong"
            aria-label={`Copy email address ${email}`}
        >
            <span className="font-mono text-sm text-ink">{email}</span>
            <span
                className={`inline-flex items-center gap-1.5 rounded border px-2 py-1 font-mono text-[11px] uppercase tracking-wider ${status === "copied"
                    ? "border-accent-line bg-accent-soft text-accent"
                    : "border-line bg-canvas text-ink-3 group-hover:text-ink"
                    }`}
                aria-hidden="true"
            >
                {status === "copied" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {status === "copied" ? "Copied" : status === "failed" ? "Failed" : "Copy"}
            </span>
            <span className="sr-only" role="status" aria-live="polite">
                {status === "copied" ? "Email address copied to clipboard" : status === "failed" ? "Copy failed — use the email link instead" : ""}
            </span>
        </button>
    );
};

export default CopyEmailButton;
