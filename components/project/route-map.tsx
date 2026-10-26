// The University Management System backend as a wiring diagram: the request
// bus in src/index.ts, the middleware it passes, and the routers hanging off it.
// Routers that exist in src/routes but are never mounted hang loose, in redline.
// Verified against the backend repository's src/index.ts and src/routes/*.

const MIDDLEWARE = [
    { code: "cors({ credentials: true })", note: "frontend origin only" },
    { code: "/api/auth/*  →  Better Auth", note: "sign-in, sign-up, sessions" },
    { code: "express.json()", note: "" },
    { code: "securityMiddleware", note: "Arcjet: bot detection + sliding-window limit" },
];

const MOUNTED = [
    { path: "/api/subjects", file: "subjects.ts", routes: ["GET /", "POST /", "GET /:id", "GET /:id/classes", "GET /:id/users"] },
    { path: "/api/users", file: "users.ts", routes: ["GET /", "GET /:id", "GET /:id/departments", "GET /:id/subjects"] },
    { path: "/api/classes", file: "classes.ts", routes: ["GET /", "POST /", "GET /:id", "GET /:id/users"] },
];

const LOOSE = [
    { file: "departments.ts", routes: 6 },
    { file: "enrollment.ts", routes: 2 },
    { file: "stats.ts", routes: 3 },
];

const RouteMap = () => (
    <figure className="min-w-0">
        <div className="font-mono text-[12px] leading-relaxed">
            <p className="inline-flex border border-ink-3 bg-surface px-3 py-1.5 text-ink">src/index.ts · express()</p>

            {/* The bus: a vertical rule every request travels down. */}
            <ol className="relative ml-4 border-l border-ink-3 pb-2 pt-4">
                {MIDDLEWARE.map((m) => (
                    <li key={m.code} className="relative flex flex-wrap items-baseline gap-x-3 py-1.5 pl-6">
                        <span aria-hidden="true" className="absolute left-0 top-[1.15em] h-px w-4 bg-ink-3" />
                        <span className="text-ink">{m.code}</span>
                        {m.note && <span className="text-ink-3">{m.note}</span>}
                    </li>
                ))}
                <li className="relative py-1.5 pl-6">
                    <span aria-hidden="true" className="absolute left-0 top-[1.15em] h-px w-4 bg-accent" />
                    <p className="max-w-[46ch] border-l-2 border-accent bg-accent-soft px-3 py-2 font-sans text-[13px] leading-snug text-ink-2">
                        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent">Redline · </span>
                        Limits are tiered by role — admin 20, teacher and student 10, guest 5 a minute — but nothing sets{" "}
                        <code className="font-mono text-[12px] text-ink">req.user</code> yet, so every request gets the guest tier.
                    </p>
                </li>
                {MOUNTED.map((r) => (
                    <li key={r.path} className="relative mt-3 pl-6">
                        <span aria-hidden="true" className="absolute left-0 top-[1.05rem] h-px w-6 bg-ink-3" />
                        <div className="border border-line-strong bg-surface">
                            <p className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-line px-3 py-1.5">
                                <span className="font-medium text-ink">{r.path}</span>
                                <span className="text-ink-3">{r.file}</span>
                            </p>
                            <p className="px-3 py-1.5 text-[11.5px] text-ink-3">{r.routes.join("  ·  ")}</p>
                        </div>
                    </li>
                ))}
            </ol>

            {/* Written but never mounted: no connection to the bus. */}
            <div className="ml-4 mt-5 pl-6">
                <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.1em] text-accent">Written, not mounted</p>
                <ul className="flex flex-wrap gap-2">
                    {LOOSE.map((r) => (
                        <li key={r.file} className="border border-dashed border-accent-line px-3 py-1.5 text-ink-2">
                            {r.file} <span className="text-ink-3">· {r.routes} routes</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        <figcaption className="mt-6 font-serif text-[16px] italic text-ink-3">
            Fig. 3 — The API as wired in src/index.ts. Dashed: routers in src/routes that no request can reach.
        </figcaption>
    </figure>
);

export default RouteMap;
