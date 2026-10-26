// CoinWave's polling, drawn like a logic-analyser trace: three minutes on the
// x-axis, one track per page, a tick each time that page calls CoinGecko.
// Intervals and endpoints are from src/pages/*.tsx and src/services/markets.ts.

const WINDOW = 180;

const TRACKS = [
    { page: "Portfolio", every: 15, calls: "/simple/price" },
    { page: "Dashboard", every: 30, calls: "/global · /coins/markets · /market_chart" },
    { page: "Markets", every: 45, calls: "/global · /coins/markets (120 coins, sparklines)" },
    { page: "Analysis", every: 60, calls: "/global · /coins/markets" },
];

const Cadence = () => (
    <figure className="min-w-0">
        <div className="relative">
            {/* Time axis. */}
            <div className="grid grid-cols-[7.5rem_1fr] items-end gap-x-4 pb-2 font-mono text-[10.5px] text-ink-3 sm:grid-cols-[9rem_1fr]">
                <span>page · interval</span>
                <span className="relative h-4">
                    {[0, 30, 60, 90, 120, 150, 180].map((t) => (
                        <span key={t} className="absolute -translate-x-1/2 last:-translate-x-full first:translate-x-0" style={{ left: `${(t / WINDOW) * 100}%` }}>
                            {t}s
                        </span>
                    ))}
                </span>
            </div>

            <ol className="border-y border-line">
                {TRACKS.map((track) => (
                    <li key={track.page} className="grid grid-cols-[7.5rem_1fr] items-center gap-x-4 border-b border-line py-3 last:border-b-0 sm:grid-cols-[9rem_1fr]">
                        <p className="min-w-0">
                            <span className="block text-[14px] font-medium text-ink">{track.page}</span>
                            <span className="block font-mono text-[11px] text-ink-3">every {track.every} s</span>
                        </p>
                        <div className="min-w-0">
                            <div className="relative h-6" aria-hidden="true">
                                <span className="absolute inset-x-0 top-1/2 h-px bg-line-strong" />
                                {Array.from({ length: Math.floor(WINDOW / track.every) + 1 }, (_, k) => (
                                    <span
                                        key={k}
                                        className="absolute top-0 h-6 w-[3px] -translate-x-1/2 bg-ink"
                                        style={{ left: `${((k * track.every) / WINDOW) * 100}%` }}
                                    />
                                ))}
                                {/* The sweep line: one pass every 18 s (ten times real speed). */}
                                <span className="cadence-sweep absolute -top-1 bottom-[-0.25rem] w-px bg-accent" />
                            </div>
                            <p className="mt-1.5 truncate font-mono text-[11px] text-ink-3">{track.calls}</p>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
        <figcaption className="mt-5 max-w-[70ch] font-serif text-[16px] italic leading-snug text-ink-3">
            Fig. 4 — Three minutes of CoinWave calling CoinGecko. Each page starts its own interval when it opens and clears it when you
            leave, so only the page in front of you is polling.
        </figcaption>
    </figure>
);

export default Cadence;
