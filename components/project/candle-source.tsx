// How CoinWave picks the source of a chart's candles, drawn as a gate sequence
// and its two outcomes. Verified against src/services/binance.ts
// (binancePairFor, fetchKlines), src/hooks/queries.ts (useCandles, CG_FALLBACK)
// and the source line in src/pages/ChartStudioPage.tsx.

const GATES = [
    { step: "Request", code: "Chart Studio · BTC · 1D", note: "an asset from CoinGecko, an interval" },
    { step: "Pair", code: "BTCUSDT in Binance's prices?", note: "one call lists every USDT spot pair" },
    { step: "Price check", code: "|Binance ÷ CoinGecko − 1| ≤ 3%", note: "or the pair is rejected" },
];

const OUTCOMES = [
    {
        when: "Both pass",
        source: "Binance klines",
        facts: ["Up to 1,000 candles at the chosen interval", "Open, high, low, close and volume", "Quoted in USDT, used as a USD proxy"],
        label: "Binance BTC/USDT · daily candles · USDT as USD proxy",
        fallback: false,
    },
    {
        when: "Either fails",
        source: "CoinGecko OHLC",
        facts: ["Fixed granularity: 30-minute, 4-hour or 4-day", "No volume", "A warning says the interval is approximate"],
        label: "CoinGecko OHLC · 4-day candles · no volume (no Binance pair)",
        fallback: true,
    },
];

const CandleSource = () => (
    <figure className="min-w-0">
        <ol className="grid gap-px border border-line bg-line md:grid-cols-3">
            {GATES.map((gate, i) => (
                <li key={gate.step} className="relative min-w-0 bg-canvas px-4 py-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-3">
                        <span className="text-accent">{String(i + 1).padStart(2, "0")}</span> · {gate.step}
                    </p>
                    <p className="mt-2 font-mono text-[13px] text-ink">{gate.code}</p>
                    <p className="mt-1 text-[13px] text-ink-3">{gate.note}</p>
                </li>
            ))}
        </ol>

        <p className="mt-4 max-w-[62ch] border-l-2 border-accent bg-accent-soft px-3 py-2 text-[13px] leading-snug text-ink-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent">Why gate 03 · </span>
            Tickers aren&apos;t unique: an unrelated token can trade under the same symbol. A price that disagrees by more than 3% means
            it isn&apos;t the same asset.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
            {OUTCOMES.map((o) => (
                <div
                    key={o.source}
                    className={`min-w-0 border bg-surface ${o.fallback ? "border-dashed border-accent-line" : "border-line-strong"}`}
                >
                    <p className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-line px-4 py-2 font-mono text-[12px]">
                        <span className="font-medium text-ink">{o.source}</span>
                        <span className={o.fallback ? "text-accent" : "text-ink-3"}>{o.when}</span>
                    </p>
                    <ul className="space-y-1 px-4 py-3 text-[13.5px] text-ink-2">
                        {o.facts.map((fact) => (
                            <li key={fact}>{fact}</li>
                        ))}
                    </ul>
                    <p className="border-t border-line px-4 py-2.5">
                        <span className="block font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-3">Printed above the chart</span>
                        <span className="mt-1 block font-mono text-[12px] leading-snug text-ink">{o.label}</span>
                    </p>
                </div>
            ))}
        </div>

        <figcaption className="mt-5 max-w-[70ch] font-serif text-[16px] italic leading-snug text-ink-3">
            Fig. 4 — Where a chart&apos;s candles come from. The same check picks the daily closes behind Compare, Risk Lab and portfolio
            history.
        </figcaption>
    </figure>
);

export default CandleSource;
