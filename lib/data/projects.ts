// Project content is checked against each repository's source code. Keep it that way:
// no metrics, deployments or features the code can't back up.

export type ProjectPreview = "teamos" | "university" | "coinwave";

export interface ProjectLink {
    label: string;
    href: string;
}

export interface Project {
    slug: string;
    title: string;
    category: string;
    status: string;
    summary: string;
    highlights: string[];
    stack: string[];
    // Source repositories — some projects are split into frontend and backend.
    repos: ProjectLink[];
    // Only set when there is a working public deployment.
    liveLink?: string;
    // Honest caveat shown under the highlights, for partially finished work.
    note?: string;
    featured?: boolean;
    preview: ProjectPreview;
}

export const projects: Project[] = [
    {
        slug: "teamos",
        title: "TeamOS — Multi-Tenant Project Management SaaS",
        category: "Flagship · Full-stack SaaS",
        status: "In active development",
        summary:
            "A project management app where every team gets its own workspace: projects, sprints, tasks, comments, attachments and an activity trail. The backend is a modular monolith in TypeScript; the React frontend stays in sync through realtime events.",
        highlights: [
            "Workspace-scoped tenancy: every tenant-owned table carries a workspaceId, and each request re-reads the caller's membership and role (owner, admin, member, guest) from the database.",
            "Layered domain modules (routes → controller → service → schema) with Zod validation at the boundary and Better Auth sessions.",
            "Socket.IO events fire only after the Prisma transaction commits; the client invalidates TanStack Query caches and refetches instead of patching state.",
            "Email and notification work runs on Redis-backed BullMQ queues with deterministic job IDs, so a retry can't send twice.",
            "Docker Compose for the full stack; the backend suite runs against real Postgres and Redis in GitHub Actions on every pull request.",
        ],
        stack: [
            "React",
            "TypeScript",
            "TanStack Query",
            "Node.js",
            "Express",
            "Prisma",
            "PostgreSQL",
            "Redis",
            "BullMQ",
            "Socket.IO",
            "Better Auth",
            "Docker",
        ],
        repos: [{ label: "View source", href: "https://github.com/kush-dabade/TeamOS" }],
        featured: true,
        preview: "teamos",
    },
    {
        slug: "university-management",
        title: "University Management System",
        category: "Full-stack web app",
        status: "Frontend + API",
        summary:
            "An admin app for a university's academic structure — departments, subjects, classes, faculty and student enrollments — with a React frontend talking to a separate Express and PostgreSQL API.",
        highlights: [
            "Relational schema in Drizzle ORM on PostgreSQL: departments own subjects, subjects own classes, and teachers and enrolled students link back to users through indexed foreign keys.",
            "List endpoints support search, filtering and pagination with joined queries; the frontend's Refine data provider maps table filters and page state onto those query parameters.",
            "Better Auth email/password sessions with admin, teacher and student roles, plus Arcjet bot protection and per-role rate limits on the API.",
        ],
        stack: ["React", "TypeScript", "Refine", "shadcn/ui", "Zod", "Express", "Drizzle ORM", "PostgreSQL", "Better Auth", "Arcjet"],
        repos: [
            { label: "Frontend", href: "https://github.com/kush-dabade/university-management-frontend" },
            { label: "Backend", href: "https://github.com/kush-dabade/university-management-backend" },
        ],
        note: "Department, enrollment and statistics endpoints are written but not yet mounted in the API server.",
        preview: "university",
    },
    {
        slug: "coinwave",
        title: "CoinWave — Cryptocurrency Market Dashboard",
        category: "Frontend · Data visualisation",
        status: "Live demo",
        summary:
            "A market dashboard built on CoinGecko's public API: market overview, a filterable coin table with 7-day sparklines, trending coins, analysis charts and a portfolio tracker. It runs entirely in the browser — there's no backend.",
        highlights: [
            "A typed service layer normalises CoinGecko responses (null-safe numbers, sparkline series) before any component renders them.",
            "Market table with search, gainers/losers/trending filters, sorting by market cap, price or 24h change, and a watchlist saved in localStorage.",
            "Recharts area charts, sparklines and allocation charts, plus a market heatmap, with data refreshed every 30–60 seconds.",
        ],
        stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "Recharts", "TanStack Table", "React Router"],
        repos: [{ label: "View source", href: "https://github.com/kush-dabade/coinwave" }],
        liveLink: "https://coinwave.vercel.app",
        preview: "coinwave",
    },
];
