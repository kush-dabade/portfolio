// Project content is taken from each repository's README. Keep it that way:
// no metrics, deployments or links that the repository can't back up.

export type ProjectPreview = "teamos" | "iac" | "failover" | "ratings";

export interface Project {
    slug: string;
    title: string;
    category: string;
    status: string;
    summary: string;
    highlights: string[];
    stack: string[];
    githubLink: string;
    // Only set when there is a real, public deployment.
    liveLink?: string;
    preview: ProjectPreview;
}

export const projects: Project[] = [
    {
        slug: "teamos",
        title: "TeamOS",
        category: "Full-stack SaaS",
        status: "In active development",
        summary:
            "A multi-tenant project-management workspace. Every team gets a workspace, and every project, sprint, task and conversation lives inside it — built as a modular monolith with realtime updates.",
        highlights: [
            "Tenancy is checked, never trusted: each tenant-owned table carries a workspaceId, and membership and role are re-read from the database on every request.",
            "Realtime events are emitted only after the Prisma transaction commits; clients invalidate and refetch instead of patching state.",
            "Email and notification fan-out runs on Redis-backed BullMQ queues with deterministic job IDs, so a retry can't send twice.",
            "“One active sprint per project” is a partial unique index in Postgres, not a service-level check.",
            "The backend suite runs against real Postgres and Redis in GitHub Actions on every pull request.",
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
            "Docker",
        ],
        githubLink: "https://github.com/kush-dabade/TeamOS",
        preview: "teamos",
    },
    {
        slug: "aws-infrastructure-automation",
        title: "AWS Infrastructure Automation",
        category: "Infrastructure as Code",
        status: "Course practical",
        summary:
            "A repeatable Infrastructure as Code workflow: a parameterised AWS CloudFormation template for a secure S3 bucket, provisioned, updated and drift-checked through the AWS CLI.",
        highlights: [
            "Parameterised template (ProjectName, Environment, Owner); account ID and region are derived, never hard-coded.",
            "Secure defaults: SSE-S3 encryption, all four Block Public Access settings, ACLs disabled and an HTTPS-only bucket policy.",
            "Create and update both go through reviewed change sets; the deploy script needs a typed confirmation and refuses to touch an existing stack.",
            "Recorded in ap-south-1: CREATE_COMPLETE, a versioning update with no resource replacement, and drift detection IN_SYNC.",
        ],
        stack: ["AWS CloudFormation", "AWS CLI v2", "Amazon S3", "Bash", "cfn-lint"],
        githubLink: "https://github.com/kush-dabade/aws-infrastructure-automation",
        preview: "iac",
    },
    {
        slug: "ec2-failure-recovery",
        title: "EC2 Failure Recovery Experiment",
        category: "High availability",
        status: "Course experiment",
        summary:
            "An experiment showing that an application behind an Application Load Balancer keeps serving when an EC2 instance fails, while an Auto Scaling Group replaces it — with a dashboard that shows the real AWS state as it changes.",
        highlights: [
            "Two instances in two Availability Zones behind an ALB, managed by an Auto Scaling Group (min 2, max 3) with /health target checks.",
            "The dashboard reads ASG, target-health and EC2 state through a read-only instance role; the public site is GET/HEAD only.",
            "Failure injection runs only from the operator's terminal, with allowlist checks, typed confirmation and a guard that never terminates the last healthy target.",
            "Downtime is reported as the longest run of failed requests at a 700 ms sampling interval — “none observed”, never “zero”.",
        ],
        stack: ["Amazon EC2", "ALB", "Auto Scaling", "IAM", "Python", "boto3", "Bash", "JavaScript"],
        githubLink: "https://github.com/kush-dabade/-ec2-failure-recovery",
        preview: "failover",
    },
    {
        slug: "roxiler-systems-assignment",
        title: "Roxiler Systems Assignment",
        category: "Full-stack coding challenge",
        status: "Internship assignment",
        summary:
            "A store-rating platform built for the Roxiler Systems Full-Stack Intern Coding Challenge. One login serves three roles — System Administrator, Normal User and Store Owner — each with its own dashboard.",
        highlights: [
            "Authorization is backend-authoritative: role-checking middleware gates every protected route; frontend guards exist only for UX.",
            "JWT in an HttpOnly cookie, with the user's role re-fetched from the database on every request.",
            "One rating per user per store, enforced by a unique constraint on (userId, storeId).",
            "Vitest + Supertest integration tests against real PostgreSQL; the whole stack starts with docker compose up.",
        ],
        stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Express", "Prisma", "PostgreSQL", "Zod", "Docker"],
        githubLink: "https://github.com/kush-dabade/roxiler-systems-assignment",
        preview: "ratings",
    },
];
