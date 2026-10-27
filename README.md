# Kush Dabade — Portfolio

Personal portfolio of **Kush Dabade**, B.Sc. Computer Science student at MIT World Peace University, Pune.
A static site built with Next.js, TypeScript and Tailwind CSS, art-directed as a set of engineering
drawings: every section is a numbered sheet, and the projects are explained with figures drawn from
their own source code.

## What's on it

- **Home** (`/`) — seven sheets:
  - **00 Cover** — the name, and Fig. 1: TeamOS as an exploded axonometric drawing of the layers a
    write passes through. It assembles on load, turns with the pointer and opens as you scroll.
  - **Index** — a drawing register of every project and its status.
  - **01 TeamOS** — screens, a scroll-driven walk through the create-task path with real code
    excerpts (the figure stays pinned and follows along), an interactive access check that returns
    the API's real responses, the architecture decision register, and an honest status.
  - **02 University Management System** — the Drizzle data model and the API's wiring, including
    the routers that are written but not mounted.
  - **03 CoinWave** — live-demo screens and a diagram of how a chart's candles are sourced from
    Binance or CoinGecko.
  - **04 Lab** — two AWS practicals: a replay of the EC2 failure-recovery run from its report, and
    the CloudFormation change-set workflow.
  - **05 Profile** and **06 Contact**.
- **Résumé** (`/resume`) — download button plus an embedded PDF preview (pdf.js via `react-pdf`).
- Light and dark themes (following the OS until you choose; the choice is remembered), section
  navigation with scroll-spy and a reading-progress line, CSS-driven reveals (nothing is hidden
  without JavaScript), full keyboard support, reduced-motion support, SEO metadata, sitemap,
  robots.txt and a generated Open Graph image.

Every page is prerendered as static HTML at build time. There is no backend and no database.

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run typecheck` | Type-check |
| `npm run build` | Production build (static) |
| `npm start` | Serve the production build |

## Personalising

All personal content lives in two files:

- `lib/config/site-config.ts` — name, intro, about, education, links, résumé path.
  Leave a link as `""` to hide it; the UI never renders a control for a missing value.
- `lib/data/projects.ts` and `lib/data/skills.ts` — projects and skill groups.
- `lib/data/teamos.ts` — the layers of Fig. 1, the write-path steps and their code excerpts, the
  access cases, decisions and status (all taken from the TeamOS repository).
- `lib/data/lab.ts` — the infrastructure experiments, including the failure-recovery run's timeline.
  The two repository links are empty on purpose: both READMEs contain an AWS account ID. Remove it,
  then paste the URLs here and the links appear.
- `assets/originals/` — full-size source images (not served). Web-ready copies live in `public/images/`.

### Adding the résumé

Save your PDF as **`public/Kush_Dabade_Resume.pdf`** and rebuild. The build detects the file and:

- turns the hero's **Résumé** link into **Download résumé**, and
- shows the embedded preview, zoom controls and "Open in new tab" on `/resume`.

Without the file, those controls link to `/resume`, which says the PDF isn't published yet.

## Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel, **Add New → Project**, import the repository and keep the detected **Next.js** defaults.
3. Deploy. No environment variables are required.

Canonical URLs, the sitemap and Open Graph tags use Vercel's production URL automatically
(`VERCEL_PROJECT_PRODUCTION_URL`). If you add a custom domain, set `NEXT_PUBLIC_SITE_URL`
(for example `https://kushdabade.dev`) in the Vercel project settings and redeploy.

## License

MIT — see [LICENSE](LICENSE).
