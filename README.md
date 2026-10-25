# Kush Dabade — Portfolio

Personal portfolio of **Kush Dabade**, B.Sc. Computer Science student at MIT World Peace University, Pune.
An editorial, static site built with Next.js, TypeScript and Tailwind CSS.

## What's on it

- **Home** (`/`) — hero, three project case studies (TeamOS, University Management System, CoinWave),
  about, skills, education and contact.
- **Résumé** (`/resume`) — download button plus an embedded PDF preview (pdf.js via `react-pdf`).
- Light/dark theme toggle (dark by default, remembered per browser), section navigation with
  scroll-spy and a reading-progress line, CSS-driven section reveals (nothing is hidden without
  JavaScript), a TeamOS screen switcher, an SVG schema diagram, a copy-email button, mobile
  navigation, reduced-motion support, SEO metadata, sitemap, robots.txt and a generated Open Graph image.

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
