// Every personal detail on the site comes from this file.
// Leave a value as an empty string ("") when you don't want it shown —
// the UI hides anything that is missing instead of rendering a dead control.

const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "http://localhost:3000");

export const siteConfig = {
    name: "Kush Dabade",
    initials: "KD",
    role: "Full-stack & cloud · Pune, India",
    location: "Pune, India",
    intro:
        "I'm a Computer Science student building full-stack web applications and learning to run them reliably on AWS. I care about systems that are secure by default, tested against real dependencies, and honest about their trade-offs.",

    about: [
        "I'm studying for a B.Sc. in Computer Science at MIT World Peace University in Pune. I like taking a feature all the way through — from the database schema and API to the interface, and then to how it should run in production.",
        "My largest project is TeamOS, a multi-tenant project-management workspace with realtime updates, background job queues and a backend test suite that runs against real Postgres and Redis in CI. Alongside it, my cloud coursework has me provisioning infrastructure as code and deliberately breaking EC2 instances to watch a load balancer and Auto Scaling Group recover.",
        "I write down why a decision was made, not only what it was, and I prefer a smaller claim I can prove over a bigger one I can't.",
    ],

    focus: [
        { label: "Studying", value: "B.Sc. Computer Science, MIT-WPU" },
        { label: "Building", value: "TeamOS — multi-tenant workspace" },
        { label: "Practising", value: "AWS, IaC and failure recovery" },
        { label: "Based in", value: "Pune, India" },
    ],

    education: {
        degree: "B.Sc. Computer Science",
        institution: "MIT World Peace University",
        location: "Pune, India",
        // Taken from your web-development résumé; update if it changes.
        period: "Expected 2027",
        coursework: [
            "Data Structures & Algorithms",
            "Database Systems",
            "Web Technologies",
            "Cloud & DevOps practicals",
        ],
    },

    seo: {
        title: "Kush Dabade — Full-stack & Cloud Developer",
        description:
            "Portfolio of Kush Dabade, a Computer Science student at MIT World Peace University, Pune, building full-stack TypeScript applications and AWS infrastructure.",
        url: siteUrl,
        keywords: [
            "Kush Dabade",
            "Portfolio",
            "Full-stack developer",
            "TypeScript",
            "React",
            "Node.js",
            "PostgreSQL",
            "AWS",
            "CloudFormation",
            "MIT World Peace University",
        ],
    },

    links: {
        github: "https://github.com/kush-dabade",
        // TODO(Kush): add your public LinkedIn URL, e.g. "https://www.linkedin.com/in/your-handle".
        linkedin: "",
        // TODO(Kush): add the email address you want recruiters to use.
        email: "",
    },

    // Drop your PDF into /public with this exact name. The download buttons and
    // the embedded preview switch on automatically when the file exists at build time.
    resume: {
        file: "/Kush_Dabade_Resume.pdf",
        downloadName: "Kush_Dabade_Resume.pdf",
    },
};

export type SiteConfig = typeof siteConfig;
