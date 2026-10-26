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
            className={`inline-flex h-11 items-center gap-2 rounded-[3px] border px-4 text-sm font-medium active:translate-y-px ${status === "copied"
                ? "border-accent-line bg-accent-soft text-accent"
                : "border-line-strong text-ink hover:bg-raised"
                }`}
            aria-label={`Copy email address ${email}`}
        >
            {status === "copied" ? <Check aria-hidden="true" className="h-4 w-4" /> : <Copy aria-hidden="true" className="h-4 w-4" />}
            <span aria-hidden="true">{status === "copied" ? "Copied" : status === "failed" ? "Copy failed" : "Copy address"}</span>
            <span className="sr-only" role="status" aria-live="polite">
                {status === "copied" ? "Email address copied to clipboard" : status === "failed" ? "Copy failed — use the email link instead" : ""}
            </span>
        </button>
    );
};

export default CopyEmailButton;
