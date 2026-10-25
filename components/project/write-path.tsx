import type { ProjectNote } from "@/lib/data/projects";
import { gutter } from "../section";

// One step: a numbered node on the line, then what happens there. Vertical on
// phones, horizontal from lg up; the connector reaches across the grid gap so
// the line is unbroken, and turns into a dashed accent where the commit happens.
const Step = ({
    step,
    n,
    last,
    boundary,
    after,
}: {
    step: ProjectNote;
    n: number;
    last: boolean;
    boundary: boolean;
    after: boolean;
}) => (
    <li className="relative grid grid-cols-[1.75rem_1fr] gap-x-4 pb-7 last:pb-0 lg:block lg:pb-0">
        <div className="lg:flex lg:items-center">
            <span
                className={`relative z-10 grid h-7 w-7 place-items-center rounded-full border bg-canvas font-mono text-[11px] ${after ? "border-accent-line text-accent" : "border-line-strong text-ink-2"}`}
            >
                {n}
            </span>
            {!last && (
                <span
                    aria-hidden="true"
                    className={`hidden flex-1 lg:-mr-6 lg:ml-2 lg:block ${boundary ? "border-t border-dashed border-accent-line" : "h-px bg-line-strong"}`}
                />
            )}
        </div>
        {!last && (
            <span
                aria-hidden="true"
                className={`absolute bottom-1 left-[0.875rem] top-9 lg:hidden ${boundary ? "border-l border-dashed border-accent-line" : "w-px bg-line-strong"}`}
            />
        )}
        <div className="lg:mt-4 lg:pr-2">
            <p className="text-[15px] font-semibold leading-7 text-ink lg:leading-normal">{step.title}</p>
            <p className="mt-1 text-[13.5px] leading-relaxed text-ink-2">{step.body}</p>
        </div>
    </li>
);

const Phase = ({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) => (
    <p className={`mb-5 font-mono text-[12.5px] ${accent ? "text-accent" : "text-ink-3"}`}>{children}</p>
);

// Verified against task.routes.ts → task.controller.ts → task.service.ts.
const WritePath = ({ steps, commitAfter }: { steps: ProjectNote[]; commitAfter: number }) => {
    const inside = steps.slice(0, commitAfter);
    const after = steps.slice(commitAfter);

    return (
        <div className={`py-10 lg:py-12 ${gutter}`}>
            <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <h4 className="text-[17px] font-semibold tracking-[-0.01em] text-ink">How a write travels through TeamOS</h4>
                <code className="font-mono text-[12.5px] text-ink-3">POST /api/v1/projects/:projectId/tasks</code>
            </div>

            <div className="mt-8 grid gap-7 lg:grid-cols-6 lg:gap-x-6">
                <div className="lg:col-span-4">
                    <Phase>Inside the request</Phase>
                    <ol className="lg:grid lg:grid-cols-4 lg:gap-x-6">
                        {inside.map((step, i) => (
                            <Step key={step.title} step={step} n={i + 1} last={false} boundary={i === inside.length - 1} after={false} />
                        ))}
                    </ol>
                </div>
                <div className="lg:col-span-2">
                    <Phase accent>After the transaction commits</Phase>
                    <ol start={commitAfter + 1} className="lg:grid lg:grid-cols-2 lg:gap-x-6">
                        {after.map((step, i) => (
                            <Step
                                key={step.title}
                                step={step}
                                n={commitAfter + i + 1}
                                last={i === after.length - 1}
                                boundary={false}
                                after
                            />
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default WritePath;
