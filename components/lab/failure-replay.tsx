'use client'
import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { RUN_EVENTS, RUN_LENGTH, RUN_START, RUN_WINDOWS } from "@/lib/data/lab";

/*
 * Fig. 5 — the EC2 failure-recovery run, replayed. The clock is the run's own
 * (15:01:30–15:07:52 UTC); every state change sits at the timestamp the run
 * report recorded. Request counts are the probe's per-window totals, spread
 * evenly across each window — exact at every window boundary.
 */

type InstanceId = "ec2a" | "ec2b" | "repl";
type State = "healthy" | "draining" | "shutting-down" | "terminated" | "pending" | "health-check" | "absent";

const instanceState = (id: InstanceId, t: number): State => {
    if (id === "ec2b") return "healthy";
    if (id === "ec2a") return t < 156 ? "healthy" : t < 178 ? "draining" : t < 218 ? "shutting-down" : "terminated";
    return t < 164 ? "absent" : t < 173 ? "pending" : t < 332 ? "health-check" : "healthy";
};

const stateStyle: Record<State, { label: string; dot: string; text: string }> = {
    healthy: { label: "Healthy", dot: "bg-ok", text: "text-ok" },
    draining: { label: "Draining", dot: "bg-warn", text: "text-warn" },
    "shutting-down": { label: "Shutting down", dot: "bg-accent", text: "text-accent" },
    terminated: { label: "Terminated", dot: "bg-ink-3", text: "text-ink-3" },
    pending: { label: "Pending", dot: "bg-warn", text: "text-warn" },
    "health-check": { label: "Health check", dot: "bg-warn", text: "text-warn" },
    absent: { label: "—", dot: "bg-line-strong", text: "text-ink-3" },
};

const served = (id: InstanceId, t: number) =>
    Math.round(
        RUN_WINDOWS.reduce((sum, w) => {
            if (t <= w.from) return sum;
            const f = Math.min(1, (t - w.from) / (w.to - w.from));
            return sum + w.served[id] * f;
        }, 0)
    );

const healthyTargets = (t: number) => (t < 159 ? 2 : t < 332 ? 1 : 2);
const status = (t: number) => (t < 156 ? "Healthy" : t < 164 ? "Degraded" : t < 332 ? "Recovering" : "Healthy");

const clock = (t: number) => {
    const total = RUN_START.h * 3600 + RUN_START.m * 60 + RUN_START.s + Math.floor(t);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${pad(Math.floor(total / 3600))}:${pad(Math.floor(total / 60) % 60)}:${pad(total % 60)}`;
};

const INSTANCES: { id: InstanceId; name: string; az: string }[] = [
    { id: "ec2a", name: "EC2-1", az: "ap-south-1a" },
    { id: "ec2b", name: "EC2-2", az: "ap-south-1b" },
    { id: "repl", name: "Replacement", az: "ap-south-1a" },
];

// Seconds of run time per second of playback.
const SPEED = 22;

const FailureReplay = () => {
    const [t, setT] = useState(0);
    const [playing, setPlaying] = useState(false);
    const root = useRef<HTMLDivElement>(null);
    const started = useRef(false);

    // Starts once, the first time the figure is properly on screen.
    useEffect(() => {
        const el = root.current;
        if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const watch = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;
                    setPlaying(true);
                }
            },
            { threshold: 0.45 }
        );
        watch.observe(el);
        return () => watch.disconnect();
    }, []);

    const tRef = useRef(0);
    useEffect(() => {
        tRef.current = t;
    }, [t]);

    useEffect(() => {
        if (!playing) return;
        let raf = 0;
        let last = performance.now();
        const tick = (now: number) => {
            const next = Math.min(RUN_LENGTH, tRef.current + ((now - last) / 1000) * SPEED);
            last = now;
            tRef.current = next;
            setT(next);
            if (next >= RUN_LENGTH) setPlaying(false);
            else raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [playing]);

    const toggle = () => {
        if (t >= RUN_LENGTH) {
            tRef.current = 0;
            setT(0);
            setPlaying(true);
        } else setPlaying((p) => !p);
    };

    const total = INSTANCES.reduce((sum, i) => sum + served(i.id, t), 0);
    const current = [...RUN_EVENTS].reverse().find((e) => e.t <= t) ?? RUN_EVENTS[0];
    const live = INSTANCES.filter((i) => {
        const s = instanceState(i.id, t);
        // Who is answering right now (EC2-1 stops answering the moment it starts draining).
        return s === "healthy" || (i.id === "ec2a" && t < 157.25);
    });
    const runStatus = status(t);

    return (
        <div ref={root} className="min-w-0">
            {/* Topology. */}
            <div className="grid items-center gap-3 md:grid-cols-[minmax(0,10rem)_2.5rem_minmax(0,11rem)_2.5rem_minmax(0,1fr)] md:gap-0">
                <div className="flex flex-col justify-center border border-line-strong bg-surface px-4 py-3">
                    <p className="text-[14px] font-medium text-ink">HTTP probe</p>
                    <p className="font-mono text-[11px] text-ink-3">every 0.5 s · 3 s timeout</p>
                </div>
                <div className="flow-line mx-auto h-5 w-px md:h-px md:w-full md:self-center" data-flowing="" aria-hidden="true" />
                <div className="flex flex-col justify-center border border-line-strong bg-surface px-4 py-3">
                    <p className="text-[14px] font-medium text-ink">Load balancer</p>
                    <p className="font-mono text-[11px] text-ink-3">health check /health</p>
                    <p className="mt-2 font-mono text-[11px] text-ink-2">
                        healthy targets <span className="text-ink">{healthyTargets(t)} / 2</span>
                    </p>
                </div>
                <div className="flow-line mx-auto h-5 w-px md:h-px md:w-full md:self-center" data-flowing="" aria-hidden="true" />
                <div className="border border-dashed border-line-strong p-2 sm:p-3">
                    <p className="flex flex-wrap items-baseline justify-between gap-x-3 px-1 pb-2 font-mono text-[11px] text-ink-3">
                        <span>Auto Scaling group</span>
                        <span>min 2 · desired 2 · max 3</span>
                    </p>
                    <ul className="grid gap-1.5">
                        {INSTANCES.map((inst) => {
                            const s = instanceState(inst.id, t);
                            const st = stateStyle[s];
                            const answering = live.some((l) => l.id === inst.id);
                            return (
                                <li
                                    key={inst.id}
                                    className={`grid grid-cols-[1fr_auto] items-center gap-x-3 border bg-surface px-3 py-2 transition-[opacity,border-color] duration-300 ${s === "absent" ? "border-dashed border-line opacity-50" : s === "terminated" ? "border-line opacity-60" : answering ? "border-ink-3" : "border-line-strong"}`}
                                >
                                    <p className="min-w-0">
                                        <span className="flex items-center gap-2 text-[14px] font-medium text-ink">
                                            <span className={`h-2 w-2 shrink-0 ${st.dot}`} aria-hidden="true" />
                                            {inst.name}
                                            <span className="font-mono text-[11px] font-normal text-ink-3">{inst.az}</span>
                                        </span>
                                        <span className={`mt-0.5 block font-mono text-[11px] uppercase tracking-[0.06em] ${st.text}`}>{st.label}</span>
                                    </p>
                                    <p className="text-right font-mono text-[11px] text-ink-3">
                                        <span className="block text-[15px] tabular-nums text-ink">{served(inst.id, t)}</span>
                                        served
                                    </p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            {/* Clock, status and counters. */}
            <div className="mt-6 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
                {[
                    { k: "Clock (UTC)", v: clock(t) },
                    { k: "Status", v: runStatus, tone: runStatus === "Healthy" ? "text-ok" : runStatus === "Degraded" ? "text-accent" : "text-warn" },
                    { k: "Probe requests", v: String(total) },
                    { k: "Failed", v: "0", tone: "text-ok" },
                ].map((cell) => (
                    <div key={cell.k} className="bg-canvas px-4 py-3">
                        <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-3">{cell.k}</p>
                        <p className={`mt-1 font-mono text-[18px] tabular-nums ${cell.tone ?? "text-ink"}`}>{cell.v}</p>
                    </div>
                ))}
            </div>

            {/* Scrubber. */}
            <div className="mt-6 flex items-center gap-4">
                <button
                    type="button"
                    onClick={toggle}
                    aria-label={playing ? "Pause replay" : t >= RUN_LENGTH ? "Replay from the start" : "Play replay"}
                    className="grid h-10 w-10 shrink-0 place-items-center border border-line-strong text-ink hover:border-accent hover:text-accent"
                >
                    {playing ? <Pause aria-hidden="true" className="h-4 w-4" /> : t >= RUN_LENGTH ? <RotateCcw aria-hidden="true" className="h-4 w-4" /> : <Play aria-hidden="true" className="h-4 w-4" />}
                </button>
                <div className="relative h-10 min-w-0 flex-1">
                    <div className="absolute inset-x-0 top-1/2 h-px bg-line-strong" aria-hidden="true" />
                    <div className="absolute left-0 top-1/2 h-px bg-accent" style={{ width: `${(t / RUN_LENGTH) * 100}%` }} aria-hidden="true" />
                    {RUN_EVENTS.map((e) => (
                        <span
                            key={e.t}
                            aria-hidden="true"
                            className={`absolute top-1/2 h-3 w-px -translate-y-1/2 ${e.t <= t ? "bg-accent" : "bg-ink-3"}`}
                            style={{ left: `${(e.t / RUN_LENGTH) * 100}%` }}
                        />
                    ))}
                    <span
                        aria-hidden="true"
                        className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-accent bg-canvas"
                        style={{ left: `${(t / RUN_LENGTH) * 100}%` }}
                    />
                    <input
                        type="range"
                        min={0}
                        max={RUN_LENGTH}
                        step={0.5}
                        value={t}
                        onChange={(e) => {
                            setPlaying(false);
                            setT(Number(e.target.value));
                        }}
                        aria-label="Replay position"
                        aria-valuetext={`${clock(t)} UTC — ${current.text}`}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    />
                </div>
            </div>

            {/* What just happened. */}
            <ol className="mt-5 grid gap-x-8 gap-y-1.5 font-mono text-[12px] sm:grid-cols-2">
                {RUN_EVENTS.map((e) => (
                    <li
                        key={e.t}
                        className={`grid grid-cols-[4.75rem_1fr] gap-x-3 transition-colors duration-300 ${e === current ? "text-accent" : e.t <= t ? "text-ink-2" : "text-ink-3/70"}`}
                    >
                        <span className="tabular-nums">{clock(e.t)}</span>
                        <span className="font-sans text-[13px]">{e.text}</span>
                    </li>
                ))}
            </ol>
            <p className="sr-only" aria-live="polite">
                {playing ? "" : `${clock(t)} UTC: ${current.text}. Status ${runStatus}.`}
            </p>
        </div>
    );
};

export default FailureReplay;
