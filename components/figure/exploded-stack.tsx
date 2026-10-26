'use client'
import { useEffect, useId, useRef, useState } from "react";
import { PLATES } from "@/lib/data/teamos";

/*
 * Fig. 1 — TeamOS as an exploded axonometric drawing: six plates, one per
 * layer a write passes through, threaded on a centre line like parts in an
 * assembly drawing. A request (the vermilion mark) travels down the line.
 *
 * Every plate's artwork is drawn flat in its own (u, v) coordinates and put in
 * place with a single affine matrix, so lettering lies on the plates. Motion is
 * one requestAnimationFrame loop that writes attributes straight to the DOM —
 * React renders the structure once and never re-renders per frame.
 *
 *   mode="auto"    the request loops on its own (hero); the pointer turns the view
 *   mode="guided"  the request sits at `step` (scrollytelling in the TeamOS section)
 */

// Plate size, thickness, and the drawing's own box (labels hang outside it).
const W = 300;
const D = 172;
const T = 7;
const VB_W = 460;
const VB_H = 640;
const CX = 228;
const CY = VB_H / 2;

const BASE = { yaw: 38, pitch: 34, gap: 88 };
const rad = (deg: number) => (deg * Math.PI) / 180;

type View = { yaw: number; pitch: number; gap: number };

// Plates sit at z = 0 … 5·gap, top plate first; the stack stays centred as it spreads.
const plateZ = (i: number, gap: number, spread: number[]) => (PLATES.length - 1 - i) * gap * spread[i];

const projector = (v: View) => {
    const ct = Math.cos(rad(v.yaw));
    const st = Math.sin(rad(v.yaw));
    const sp = Math.sin(rad(v.pitch));
    const cp = Math.cos(rad(v.pitch));
    const zMid = ((PLATES.length - 1) * v.gap) / 2;
    return {
        point: (u: number, w: number, z: number): [number, number] => [
            CX + u * ct - w * st,
            CY + (u * st + w * ct) * sp - (z - zMid) * cp,
        ],
        matrix: (z: number) =>
            `matrix(${ct} ${st * sp} ${-st} ${ct * sp} ${CX} ${CY - (z - zMid) * cp})`,
    };
};

const pts = (list: [number, number][]) => list.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");

// ---------------------------------------------------------------------------
// The request's route, as a continuous position s:
//   0…5  on the centre line, at plate ⌊s⌋ → ⌈s⌉
//   5…6  on the last plate, forking to the queue and the socket room
//   6…7  the realtime event rising from the room back to the client plate
// ---------------------------------------------------------------------------

const QUEUE: [number, number] = [-78, 6];
const ROOM: [number, number] = [74, 0];

// Auto mode: [time (s), s] keyframes; the request rests briefly on each plate.
const LOOP: [number, number][] = [
    [0, -0.7], [0.7, 0], [1.25, 0], [1.7, 1], [2.2, 1], [2.65, 2], [3.15, 2], [3.6, 3], [4.15, 3],
    [4.6, 4], [5.3, 4], [5.75, 5], [6.0, 5], [6.6, 6], [7.1, 6], [8.0, 7], [9.4, 7],
];
const LOOP_END = 10;

const ease = (x: number) => (x < 0.5 ? 2 * x * x : 1 - (-2 * x + 2) ** 2 / 2);

const sAtTime = (t: number) => {
    for (let i = 1; i < LOOP.length; i++) {
        const [t1, s1] = LOOP[i];
        const [t0, s0] = LOOP[i - 1];
        if (t <= t1) return s0 + (s1 - s0) * ease((t - t0) / (t1 - t0 || 1));
    }
    return LOOP[LOOP.length - 1][1];
};

// Guided steps 0–6 → positions on the route.
const STEP_S = [0, 1, 2, 3, 4, 6, 7];

// Which plate the request is "at", if any.
const plateAt = (s: number): number | null => {
    if (s < -0.25) return null;
    if (s >= 6.6) return 0;
    if (s >= 4.7) return 5;
    const r = Math.round(s);
    return Math.abs(s - r) < 0.3 ? r : null;
};

// ---------------------------------------------------------------------------
// Plate artwork, in plate coordinates: u ∈ [-150, 150], v ∈ [-95, 95].
// ---------------------------------------------------------------------------

const Lettering = ({
    x,
    y,
    size = 9,
    end = false,
    children,
    className = "fig-ink-3",
}: {
    x: number;
    y: number;
    size?: number;
    end?: boolean;
    children: React.ReactNode;
    className?: string;
}) => (
    <text x={x} y={y} fontSize={size} textAnchor={end ? "end" : undefined} className={`font-mono ${className}`}>
        {children}
    </text>
);

const ART: Record<string, React.ReactNode> = {
    client: (
        <>
            <rect x={-128} y={-70} width={256} height={142} rx={4} className="fig-line" />
            <path d="M-128 -56 H128" className="fig-line" />
            {[-120, -113, -106].map((x) => <circle key={x} cx={x} cy={-63} r={1.8} className="fig-dot" />)}
            <rect x={-128} y={-56} width={52} height={128} style={{ fill: "var(--fig-hatch)" }} />
            {[-44, -34, -24, -14].map((y) => <path key={y} d={`M-120 ${y} H-88`} className="fig-line" />)}
            {[-64, -2, 60].map((x, col) => (
                <g key={x}>
                    <path d={`M${x} -46 H${x + 54}`} className="fig-line" />
                    {[0, 1, 2].slice(0, 3 - (col === 2 ? 1 : 0)).map((r) => (
                        <rect key={r} x={x} y={-38 + r * 22} width={54} height={16} rx={2} className="fig-line" />
                    ))}
                </g>
            ))}
            <rect x={-64} y={28} width={54} height={16} rx={2} className="fig-new" />
            <Lettering x={-128} y={80}>board · new task</Lettering>
        </>
    ),
    session: (
        <>
            <rect x={-120} y={-52} width={150} height={62} rx={6} className="fig-line" />
            <Lettering x={-108} y={-32} size={10} className="fig-ink">session</Lettering>
            <Lettering x={-108} y={-14}>user.id · email · name</Lettering>
            <path d="M-108 -2 H18" className="fig-dash" />
            <path d="M40 -21 H66" className="fig-line" />
            <circle cx={88} cy={-21} r={20} className="fig-line" />
            <path d="M79 -21 l6 6 l12 -13" className="fig-line" />
            <Lettering x={-120} y={44} size={10} className="fig-ink">getSession(headers)</Lettering>
            <Lettering x={-120} y={62}>none → 401</Lettering>
        </>
    ),
    validate: (
        <>
            <Lettering x={-124} y={-62} size={10} className="fig-ink">createTaskSchema</Lettering>
            {[
                ["title", "string 3–255"],
                ["priority", "LOW…URGENT"],
                ["dueDate", "iso date?"],
                ["assigneeId", "string?"],
            ].map(([k, t], i) => (
                <g key={k}>
                    <path d={`M-124 ${-50 + i * 26} H124`} className="fig-line" />
                    <Lettering x={-124} y={-34 + i * 26} className="fig-ink-2">{k}</Lettering>
                    <Lettering x={124} y={-34 + i * 26} end>
                        {t}
                    </Lettering>
                </g>
            ))}
            <path d="M-124 54 H124" className="fig-line" />
            <Lettering x={-124} y={76}>invalid → 400</Lettering>
        </>
    ),
    tenancy: (
        <>
            {[-132, -44, 44].map((x, i) => (
                <g key={x}>
                    <rect x={x} y={-72} width={86} height={124} rx={3} className={i === 1 ? "fig-zone" : "fig-line"} />
                    <Lettering x={x + 8} y={-56} className={i === 1 ? "fig-accent" : "fig-ink-3"}>
                        {`workspace ${"ABC"[i]}`}
                    </Lettering>
                    {[0, 1, 2, 3].map((r) => (
                        <path key={r} d={`M${x + 8} ${-40 + r * 14} H${x + 78}`} className="fig-line" />
                    ))}
                </g>
            ))}
            <Lettering x={-132} y={70} size={10} className="fig-ink">requireWorkspaceMembership()</Lettering>
            <Lettering x={-132} y={83}>OWNER · ADMIN · MEMBER — GUEST read-only</Lettering>
        </>
    ),
    commit: (
        <>
            <rect x={-136} y={-74} width={272} height={150} rx={6} className="fig-dash" />
            <Lettering x={-128} y={-60} className="fig-ink">prisma.$transaction</Lettering>
            {[
                { x: -120, name: "Task" },
                { x: 22, name: "Activity" },
            ].map(({ x, name }) => (
                <g key={name}>
                    <rect x={x} y={-46} width={98} height={86} rx={3} className="fig-line" />
                    <path d={`M${x} -30 H${x + 98}`} className="fig-line" />
                    <Lettering x={x + 8} y={-35} className="fig-ink-2">{name}</Lettering>
                    {[0, 1, 2].map((r) => <path key={r} d={`M${x + 8} ${-16 + r * 16} H${x + 90}`} className="fig-line" />)}
                </g>
            ))}
            <Lettering x={-128} y={64}>BEGIN</Lettering>
            <Lettering x={128} y={64} end className="fig-commit">
                COMMIT
            </Lettering>
        </>
    ),
    fanout: (
        <>
            <path d="M0 -80 V80" className="fig-dash" />
            <Lettering x={-136} y={-58} className="fig-ink">BullMQ</Lettering>
            <Lettering x={-136} y={-44}>notification queue</Lettering>
            {[0, 1, 2, 3].map((k) => (
                <rect key={k} x={-136 + k * 28} y={-4} width={22} height={20} rx={2} className={k === 2 ? "fig-job" : "fig-line"} />
            ))}
            <Lettering x={-136} y={46}>jobId = recipient + event</Lettering>
            <Lettering x={14} y={-58} className="fig-ink">Socket.IO</Lettering>
            <Lettering x={14} y={-44}>room workspace:id</Lettering>
            {[12, 24, 36].map((r) => <circle key={r} cx={ROOM[0]} cy={ROOM[1]} r={r} className="fig-ring" />)}
            <Lettering x={14} y={62} className="fig-ink-2">TASK_CREATED</Lettering>
        </>
    ),
};

// ---------------------------------------------------------------------------

type Props = {
    mode: "auto" | "guided";
    step?: number;
    // Turns the view with the pointer and spreads the plates as the page scrolls past.
    responsive?: boolean;
    // Leader lines and names beside the plates (from sm up).
    labels?: boolean;
    className?: string;
    caption?: React.ReactNode;
};

const ExplodedStack = ({ mode, step = 0, responsive = false, labels = true, className = "", caption }: Props) => {
    const svg = useRef<SVGSVGElement>(null);
    // Two copies of the figure share the page, so every SVG id is made unique.
    const uid = `fig${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
    const readout = useRef<HTMLSpanElement>(null);
    const stepRef = useRef(step);
    const wakeRef = useRef<() => void>(() => {});
    const [hovered, setHovered] = useState<number | null>(null);
    const hoveredRef = useRef<number | null>(null);

    useEffect(() => {
        stepRef.current = step;
        wakeRef.current();
    }, [step]);

    useEffect(() => {
        hoveredRef.current = hovered;
        wakeRef.current();
    }, [hovered]);

    useEffect(() => {
        const root = svg.current;
        if (!root) return;
        const q = <E extends Element>(sel: string) => Array.from(root.querySelectorAll<E>(sel));
        const plates = q<SVGGElement>("[data-plate]");
        const sidesR = q<SVGPolygonElement>("[data-side='r']");
        const sidesF = q<SVGPolygonElement>("[data-side='f']");
        const leaders = q<SVGPolylineElement>("[data-leader]");
        const labels = q<SVGGElement>("[data-label]");
        const axis = root.querySelector<SVGLineElement>("[data-axis]")!;
        const packet = root.querySelector<SVGGElement>("[data-packet]")!;
        const fork = root.querySelector<SVGGElement>("[data-fork]")!;
        const rise = root.querySelector<SVGLineElement>("[data-rise]")!;

        const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const finePointer = window.matchMedia("(pointer: fine)").matches;

        const cur: View = { ...BASE };
        const target: View = { ...BASE };
        // Per-plate spread, animated from 0 (a closed stack) on first view.
        const spread: number[] = PLATES.map(() => (calm ? 1 : 0));
        let introStart = -1;
        let s = mode === "guided" ? STEP_S[stepRef.current] : -0.7;
        let clock = 0;
        let visible = false;
        let raf = 0;
        let last = 0;
        let lastReadout = "";

        const draw = () => {
            const proj = projector(cur);
            const z = PLATES.map((_, i) => plateZ(i, cur.gap, spread));
            const hx = W / 2;
            const hd = D / 2;
            const active = hoveredRef.current ?? plateAt(s);

            plates.forEach((g, i) => {
                g.setAttribute("transform", proj.matrix(z[i]));
                g.toggleAttribute("data-active", active === i);
                g.style.opacity = String(Math.min(1, spread[i] * 1.6 + (calm ? 1 : 0.08)));
                sidesR[i].setAttribute("points", pts([proj.point(hx, -hd, z[i]), proj.point(hx, hd, z[i]), proj.point(hx, hd, z[i] - T), proj.point(hx, -hd, z[i] - T)]));
                sidesF[i].setAttribute("points", pts([proj.point(-hx, hd, z[i]), proj.point(hx, hd, z[i]), proj.point(hx, hd, z[i] - T), proj.point(-hx, hd, z[i] - T)]));
                sidesR[i].style.opacity = sidesF[i].style.opacity = g.style.opacity;
                const [ax, ay] = proj.point(hx, -hd, z[i]);
                leaders[i].setAttribute("points", pts([[ax + 4, ay], [VB_W + 14, ay]]));
                labels[i].setAttribute("transform", `translate(${VB_W + 22} ${ay.toFixed(2)})`);
                labels[i].toggleAttribute("data-active", active === i);
                leaders[i].toggleAttribute("data-active", active === i);
            });

            const [x0, y0] = proj.point(0, 0, z[0] + 70);
            const [x1, y1] = proj.point(0, 0, -40);
            axis.setAttribute("x1", x0.toFixed(2));
            axis.setAttribute("y1", y0.toFixed(2));
            axis.setAttribute("x2", x1.toFixed(2));
            axis.setAttribute("y2", y1.toFixed(2));

            // The request mark.
            let px: number, py: number;
            if (s < 0) {
                [px, py] = proj.point(0, 0, z[0] - s * 90);
            } else if (s <= 5) {
                const a = Math.floor(s);
                const b = Math.min(5, a + 1);
                [px, py] = proj.point(0, 0, z[a] + (z[b] - z[a]) * (s - a));
            } else {
                const f = Math.min(1, s - 5);
                [px, py] = proj.point(QUEUE[0] * f, QUEUE[1] * f, z[5]);
            }
            packet.setAttribute("transform", `translate(${px.toFixed(2)} ${py.toFixed(2)})`);
            const shown = mode === "guided" ? 1 : s < 0 ? Math.max(0, 1 + s / 0.7) : s > 7 ? 0 : 1;
            packet.style.opacity = String(calm && mode === "auto" ? 0 : shown);

            // The fork toward the socket room, then the event rising back to the client.
            const f = Math.max(0, Math.min(1, s - 5));
            const r = Math.max(0, Math.min(1, s - 6));
            const [rx, ry] = proj.point(ROOM[0] * f, ROOM[1] * f, z[5] + (z[0] - z[5]) * ease(r));
            fork.setAttribute("transform", `translate(${rx.toFixed(2)} ${ry.toFixed(2)})`);
            fork.style.opacity = String(s > 5 && !(calm && mode === "auto") ? shown : 0);
            const [bx, by] = proj.point(ROOM[0], ROOM[1], z[5]);
            rise.setAttribute("x1", bx.toFixed(2));
            rise.setAttribute("y1", by.toFixed(2));
            rise.setAttribute("x2", rx.toFixed(2));
            rise.setAttribute("y2", ry.toFixed(2));
            rise.style.opacity = String(r > 0 ? shown : 0);

            const text = `${cur.yaw.toFixed(1)}° / ${cur.pitch.toFixed(1)}°`;
            if (readout.current && text !== lastReadout) {
                readout.current.textContent = text;
                lastReadout = text;
            }
        };

        const tick = (now: number) => {
            const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
            last = now;
            let busy = false;

            // Assemble on first view: plates lift off the bottom one, staggered.
            if (!calm && spread.some((v) => v < 1)) {
                if (introStart < 0) introStart = now;
                const t = (now - introStart) / 1000;
                PLATES.forEach((_, i) => {
                    const delay = (PLATES.length - 1 - i) * 0.07;
                    const x = Math.max(0, Math.min(1, (t - delay) / 1.1));
                    spread[i] = 1 - (1 - x) ** 4;
                });
                busy = true;
            }

            const k = 1 - Math.exp(-dt * 5);
            for (const key of ["yaw", "pitch", "gap"] as const) {
                const d = target[key] - cur[key];
                if (Math.abs(d) > 0.01) {
                    cur[key] += d * k;
                    busy = true;
                } else cur[key] = target[key];
            }

            if (mode === "auto") {
                if (!calm) {
                    clock = (clock + dt) % LOOP_END;
                    s = clock > LOOP[LOOP.length - 1][0] ? 7.4 : sAtTime(clock);
                    busy = true;
                }
            } else {
                const goal = STEP_S[stepRef.current] ?? 0;
                const d = goal - s;
                if (Math.abs(d) > 0.002 && !calm) {
                    s += d * (1 - Math.exp(-dt * 4.5));
                    busy = true;
                } else s = goal;
            }

            draw();
            raf = busy && visible ? requestAnimationFrame(tick) : 0;
            if (!raf) last = 0;
        };

        const wake = () => {
            if (!raf && visible) raf = requestAnimationFrame(tick);
            else if (!visible) draw();
        };
        wakeRef.current = wake;

        const onPointer = (e: PointerEvent) => {
            const nx = (e.clientX / window.innerWidth) * 2 - 1;
            const ny = (e.clientY / window.innerHeight) * 2 - 1;
            target.yaw = BASE.yaw + nx * 13;
            target.pitch = BASE.pitch - ny * 8;
            wake();
        };

        // Scrolling the figure up out of view opens the stack further.
        const onScroll = () => {
            const box = root.getBoundingClientRect();
            const p = Math.max(0, Math.min(1, -box.top / box.height));
            target.gap = BASE.gap * (1 + 0.28 * p);
            wake();
        };

        const seen = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible) wake();
        });
        seen.observe(root);

        if (responsive && !calm) {
            if (finePointer) window.addEventListener("pointermove", onPointer, { passive: true });
            window.addEventListener("scroll", onScroll, { passive: true });
        }
        draw();

        return () => {
            seen.disconnect();
            cancelAnimationFrame(raf);
            window.removeEventListener("pointermove", onPointer);
            window.removeEventListener("scroll", onScroll);
            wakeRef.current = () => {};
        };
    }, [mode, responsive]);

    return (
        <figure className={`exploded ${className}`} style={{ "--fig-hatch": `url(#${uid}-h)` } as React.CSSProperties}>
            <svg
                ref={svg}
                viewBox={`0 0 ${VB_W} ${VB_H}`}
                overflow="visible"
                role="img"
                aria-labelledby={`${uid}-t ${uid}-d`}
                className={`block h-auto w-full select-none ${labels ? "sm:w-[66%]" : ""}`}
            >
                <title id={`${uid}-t`}>TeamOS, exploded along the path of a write</title>
                <desc id={`${uid}-d`}>
                    Six stacked layers a create-task request passes through, top to bottom: the React client, the Better Auth
                    session check, Zod validation, the workspace membership and role check, a Prisma transaction in PostgreSQL,
                    and, after the commit, a BullMQ notification job and a Socket.IO event that travels back up to the client.
                </desc>

                <defs>
                    <pattern id={`${uid}-h`} width={6} height={6} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                        <path d="M0 0 V6" className="fig-hatch-line" />
                    </pattern>
                </defs>
                <line data-axis className="fig-axis" />

                {PLATES.map((plate, i) => (
                    <g key={plate.id}>
                        <polygon data-side="f" className="fig-side-f" />
                        <polygon data-side="r" className="fig-side-r" />
                        <g data-plate={plate.id} className="fig-plate">
                            <rect x={-W / 2} y={-D / 2} width={W} height={D} className="fig-face" />
                            {ART[plate.id]}
                            <text x={W / 2 - 10} y={-D / 2 + 20} fontSize={12} textAnchor="end" className="fig-num font-mono">
                                {String(i + 1).padStart(2, "0")}
                            </text>
                            <circle cx={0} cy={0} r={6} className="fig-hole" />
                        </g>
                    </g>
                ))}

                <line data-rise className="fig-rise" />

                <g data-fork className="fig-packet">
                    <circle r={9} className="fig-halo" />
                    <rect x={-4} y={-4} width={8} height={8} transform="rotate(45)" />
                </g>
                <g data-packet className="fig-packet">
                    <circle r={11} className="fig-halo" />
                    <rect x={-5} y={-5} width={10} height={10} transform="rotate(45)" />
                </g>

                <g className={labels ? "hidden sm:inline" : "hidden"} aria-hidden="true">
                    {PLATES.map((plate, i) => (
                        <g key={plate.id}>
                            <polyline data-leader className="fig-leader" />
                            <g
                                data-label
                                className="fig-label"
                                onPointerEnter={() => setHovered(i)}
                                onPointerLeave={() => setHovered(null)}
                            >
                                <rect x={-6} y={-16} width={190} height={40} className="fill-transparent" />
                                <text y={-1} fontSize={12.5} className="font-mono fig-label-num">
                                    {String(i + 1).padStart(2, "0")}
                                </text>
                                <text x={26} y={-1} fontSize={15} className="fig-label-title">
                                    {plate.title}
                                </text>
                                <text x={26} y={16} fontSize={11.5} className="font-mono fig-label-detail">
                                    {plate.detail}
                                </text>
                            </g>
                        </g>
                    ))}
                </g>
            </svg>
            {caption && (
                <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <span className="font-serif text-[17px] italic text-ink-2">{caption}</span>
                    <span className="font-mono text-[11.5px] text-ink-3" aria-hidden="true">
                        {responsive && <span className="hidden pointer-fine:inline">move the pointer to turn it · </span>}
                        view <span ref={readout}>{BASE.yaw.toFixed(1)}° / {BASE.pitch.toFixed(1)}°</span>
                    </span>
                </figcaption>
            )}
        </figure>
    );
};

export default ExplodedStack;
