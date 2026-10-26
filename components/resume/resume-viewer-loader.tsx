"use client";
import dynamic from "next/dynamic";

// pdf.js needs the browser, so the viewer is loaded on the client only.
const ResumeViewer = dynamic(() => import("./resume-viewer"), {
    ssr: false,
    loading: () => (
        <div className="flex h-[75vh] min-h-120 items-center justify-center rounded-[3px] border border-line font-mono text-sm text-ink-3">
            Loading PDF viewer…
        </div>
    ),
});

export default ResumeViewer;
