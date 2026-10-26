// A small TypeScript tokeniser for the code excerpts. It runs on the server, so
// the page ships coloured HTML and no highlighting library.

const PATTERN =
    /(\/\/[^\n]*|(?:^|\s)#[^\n]*)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`)|\b(\d+)\b|\b(const|let|await|async|return|if|throw|new|export|import|from|function|true|false|null|undefined)\b|([A-Za-z_$][\w$]*)(?=\s*\()/g;

type Token = { text: string; kind?: "com" | "str" | "num" | "kw" | "fn" };

const tokenise = (line: string): Token[] => {
    const out: Token[] = [];
    let at = 0;
    for (const m of line.matchAll(PATTERN)) {
        if (m.index > at) out.push({ text: line.slice(at, m.index) });
        const kind = m[1] ? "com" : m[2] ? "str" : m[3] ? "num" : m[4] ? "kw" : "fn";
        out.push({ text: m[0], kind });
        at = m.index + m[0].length;
    }
    if (at < line.length) out.push({ text: line.slice(at) });
    return out;
};

const Code = ({ code, file, mark = [], className = "" }: { code: string; file?: string; mark?: number[]; className?: string }) => {
    const lines = code.split("\n");
    return (
        <figure className={`min-w-0 overflow-hidden rounded-[3px] border border-line bg-surface ${className}`}>
            {file && (
                <figcaption className="flex items-center gap-2 border-b border-line px-4 py-2 font-mono text-[11.5px] text-ink-3">
                    <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-line-strong" />
                    <span className="truncate">{file}</span>
                </figcaption>
            )}
            <pre className="code-block overflow-x-auto py-3" tabIndex={0} aria-label={file ? `Code from ${file}` : "Code excerpt"}>
                <code className="grid min-w-max">
                    {lines.map((line, i) => (
                        <span key={i} className={`grid grid-cols-[2.5rem_1fr] pr-5 ${mark.includes(i + 1) ? "tk-mark" : ""}`}>
                            <span aria-hidden="true" className="select-none pr-3 text-right text-ink-3/60">
                                {i + 1}
                            </span>
                            <span>
                                {tokenise(line).map((t, j) => (t.kind ? <span key={j} className={`tk-${t.kind}`}>{t.text}</span> : t.text))}
                                {line === "" && " "}
                            </span>
                        </span>
                    ))}
                </code>
            </pre>
        </figure>
    );
};

export default Code;
