"use client";
import { Minus, Plus, RotateCcw } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { siteConfig } from "@/lib/config/site-config";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const MIN_SCALE = 0.6;
const MAX_SCALE = 2;

// Renders every page of the PDF as a canvas sized to the column, with zoom.
const PdfPreview = () => {
    const [scale, setScale] = useState(1);
    const [numPages, setNumPages] = useState(0);
    const [fitWidth, setFitWidth] = useState<number | null>(null);
    const scroller = useRef<HTMLDivElement>(null);

    // Fit pages to the container; ResizeObserver also reports the initial size.
    useEffect(() => {
        const el = scroller.current;
        if (!el) return;
        const observer = new ResizeObserver(([entry]) => {
            setFitWidth(Math.min(entry.contentRect.width - 32, 820));
        });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const controlClass =
        "flex h-8 w-8 items-center justify-center rounded-md border border-line bg-canvas text-ink-2 hover:border-line-strong hover:text-ink disabled:cursor-not-allowed disabled:opacity-40";

    const status = (text: string) => (
        <div className="flex h-96 items-center justify-center font-mono text-sm text-ink-3">{text}</div>
    );

    return (
        <div className="overflow-hidden rounded-lg border border-line bg-canvas">
            <div className="flex items-center justify-between gap-3 border-b border-line bg-raised px-3 py-2">
                <span className="font-mono text-[11px] text-ink-3">
                    {numPages > 0 ? `${numPages} page${numPages > 1 ? "s" : ""}` : "PDF preview"}
                </span>
                <div className="flex items-center gap-1.5" role="group" aria-label="Zoom">
                    <button
                        type="button"
                        onClick={() => setScale((s) => Math.max(+(s - 0.2).toFixed(1), MIN_SCALE))}
                        disabled={scale <= MIN_SCALE}
                        className={controlClass}
                        aria-label="Zoom out"
                    >
                        <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                    <span className="w-12 text-center font-mono text-xs text-ink" aria-live="polite">
                        {Math.round(scale * 100)}%
                    </span>
                    <button
                        type="button"
                        onClick={() => setScale((s) => Math.min(+(s + 0.2).toFixed(1), MAX_SCALE))}
                        disabled={scale >= MAX_SCALE}
                        className={controlClass}
                        aria-label="Zoom in"
                    >
                        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                    <button
                        type="button"
                        onClick={() => setScale(1)}
                        disabled={scale === 1}
                        className={controlClass}
                        aria-label="Reset zoom"
                    >
                        <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                </div>
            </div>

            <div
                ref={scroller}
                className="h-[75vh] min-h-120 overflow-auto bg-inset p-4"
                data-lenis-prevent="true"
                tabIndex={0}
                aria-label="Résumé preview — scrollable"
            >
                <Document
                    file={siteConfig.resume.file}
                    onLoadSuccess={({ numPages: total }) => setNumPages(total)}
                    className="flex flex-col items-center gap-4"
                    loading={status("Loading PDF…")}
                    error={status("The preview couldn't load — use the download button instead.")}
                >
                    {fitWidth !== null &&
                        Array.from({ length: numPages }, (_, i) => (
                            <Page
                                key={i}
                                pageNumber={i + 1}
                                width={fitWidth}
                                scale={scale}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                                className="overflow-hidden rounded-sm border border-line shadow-sm"
                                loading={status(`Rendering page ${i + 1}…`)}
                            />
                        ))}
                </Document>
            </div>
        </div>
    );
};

export default PdfPreview;
