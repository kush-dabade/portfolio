'use client'
import { useId, useState } from "react";
import { ACCESS_CASES, ACCESS_GATES } from "@/lib/data/teamos";

type CaseId = (typeof ACCESS_CASES)[number]["id"];

// The four checks a create-task request meets, drawn as a line of gates. Pick
// who is calling; the request runs until the gate that stops it, and the panel
// shows the exact response TeamOS sends back.
const AccessCheck = () => {
    const [id, setId] = useState<CaseId>("guest");
    const name = useId();
    const current = ACCESS_CASES.find((c) => c.id === id)!;
    const ok = current.status === 201;
    // Where the request mark stops: just past the last gate, or on the failing one.
    const stop = (Math.min(current.gate, ACCESS_GATES.length) + 0.5) / (ACCESS_GATES.length + 1);

    return (
        <div className="grid min-w-0 gap-8 lg:grid-cols-12 lg:gap-x-10">
            <fieldset className="min-w-0 lg:col-span-4">
                <legend className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">Request as</legend>
                <div className="mt-3 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-1">
                    {ACCESS_CASES.map((c) => (
                        <label
                            key={c.id}
                            className="group relative flex cursor-pointer items-center justify-between gap-3 bg-canvas px-3.5 py-2.5 text-[14px] text-ink-2 has-[:checked]:bg-surface has-[:checked]:text-ink has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:-outline-offset-2 has-[:focus-visible]:outline-accent hover:text-ink"
                        >
                            <input
                                type="radio"
                                name={name}
                                value={c.id}
                                checked={id === c.id}
                                onChange={() => setId(c.id)}
                                className="sr-only"
                            />
                            <span className="flex items-center gap-2.5">
                                <span aria-hidden="true" className="grid h-3.5 w-3.5 place-items-center border border-line-strong group-has-[:checked]:border-accent">
                                    <span className="hidden h-1.5 w-1.5 bg-accent group-has-[:checked]:block" />
                                </span>
                                {c.label}
                            </span>
                            <span className={`font-mono text-[11.5px] ${c.status === 201 ? "text-ok" : "text-ink-3"}`}>{c.status}</span>
                        </label>
                    ))}
                </div>
            </fieldset>

            <div className="min-w-0 lg:col-span-8">
                <p className="font-mono text-[12px] text-ink-3">
                    <span className="text-ink">POST</span> /api/v1/projects/:projectId/tasks
                </p>

                {/* The gates. */}
                <div className="relative mt-8" aria-hidden="true">
                    <div className="absolute left-0 right-0 top-[11px] h-px bg-line-strong" />
                    <div
                        className="absolute left-0 top-[11px] h-px bg-accent transition-[width] duration-700 ease-out-soft"
                        style={{ width: `${stop * 100}%` }}
                    />
                    <div
                        className="absolute top-[5px] h-3 w-3 -translate-x-1/2 rotate-45 bg-accent transition-[left] duration-700 ease-out-soft"
                        style={{ left: `${stop * 100}%` }}
                    />
                    <ol className="relative grid grid-cols-5">
                        {ACCESS_GATES.map((gate, i) => {
                            const failed = !ok && current.gate === i;
                            const passed = ok || i < current.gate;
                            return (
                                <li key={gate.title} className="flex flex-col items-center text-center">
                                    <span
                                        className={`grid h-6 w-6 place-items-center border bg-canvas font-mono text-[11px] transition-colors duration-300 ${failed ? "border-accent text-accent" : passed ? "border-ink-3 text-ink" : "border-line text-ink-3"}`}
                                    >
                                        {failed ? "✕" : passed ? "✓" : i + 1}
                                    </span>
                                    <span className={`mt-3 text-[13px] font-medium ${failed ? "text-accent" : "text-ink"}`}>{gate.title}</span>
                                    <span className="mt-0.5 hidden font-mono text-[10.5px] text-ink-3 sm:block">{gate.detail}</span>
                                </li>
                            );
                        })}
                        <li className="flex flex-col items-center text-center">
                            <span className={`grid h-6 w-6 place-items-center border bg-canvas font-mono text-[11px] ${ok ? "border-ok text-ok" : "border-line text-ink-3"}`}>
                                {ok ? "✓" : "—"}
                            </span>
                            <span className="mt-3 text-[13px] font-medium text-ink">Commit</span>
                            <span className="mt-0.5 hidden font-mono text-[10.5px] text-ink-3 sm:block">$transaction</span>
                        </li>
                    </ol>
                </div>

                {/* The response, as the API sends it. */}
                <div className="mt-8 border border-line bg-surface" role="status" aria-live="polite">
                    <p className="flex items-center justify-between gap-4 border-b border-line px-4 py-2 font-mono text-[11.5px] text-ink-3">
                        <span>Response</span>
                        <span className={ok ? "text-ok" : "text-accent"}>
                            {current.status} {ok ? "Created" : current.status === 401 ? "Unauthorized" : "Forbidden"}
                        </span>
                    </p>
                    <pre className="code-block overflow-x-auto px-4 py-3 whitespace-pre-wrap">
                        {ok ? (
                            <>
                                {"{ "}
                                <span className="tk-str">&quot;success&quot;</span>: <span className="tk-kw">true</span>, <span className="tk-str">&quot;data&quot;</span>: {"{ …task } }"}
                            </>
                        ) : (
                            <>
                                <span className="tk-com">
                                    {current.status === 401
                                        ? "stopped by requireAuth — no service code ran"
                                        : current.gate === 2
                                          ? "stopped by requireWorkspaceMembership — the project belongs to another workspace"
                                          : "stopped by the role check in createTask"}
                                </span>
                                {"\n{ "}
                                <span className="tk-str">&quot;success&quot;</span>: <span className="tk-kw">false</span>, <span className="tk-str">&quot;error&quot;</span>: {"{ "}
                                <span className="tk-str">&quot;code&quot;</span>: <span className="tk-str">&quot;{current.status === 401 ? "AUTH_REQUIRED" : "FORBIDDEN"}&quot;</span>,{" "}
                                <span className="tk-str">&quot;message&quot;</span>: <span className="tk-str">&quot;{current.message}&quot;</span>
                                {" } }"}
                            </>
                        )}
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default AccessCheck;
