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
    role: "Full-stack developer",
    location: "Pune, India",

    hero: {
        headline: "Building full-stack products, from idea to implementation.",
        intro:
            "I build web applications with React, TypeScript, Node.js and PostgreSQL, with a growing focus on backend architecture and cloud infrastructure. I enjoy turning ideas into working products and understanding the engineering decisions behind them.",
    },

    about: [
        "I'm a Computer Science student at MIT World Peace University, Pune, interested in building useful software and understanding how it works beneath the interface. I like working across the stack — especially designing APIs, modelling relational data, and connecting backend systems to clean, usable frontends.",
        "TeamOS has been my chance to explore that on a larger application: multi-tenant architecture, background jobs and realtime features. I'm continuing to grow in backend engineering, system design and cloud infrastructure by building and improving real projects.",
    ],

    // Profile image for the About section: a web-sized copy of assets/originals/kush-avatar-16bit.jpeg.
    // It is a pixel-art portrait Kush supplied;
    // swap `src` for a photograph (any aspect, it's cropped square) whenever you like.
    portrait: {
        src: "/images/kush-avatar.webp",
        alt: "Pixel-art portrait of Kush Dabade wearing headphones and sunglasses",
        pixelArt: true,
    },

    education: {
        degree: "B.Sc. (Honors) Computer Science",
        specialization: "Cloud Computing",
        institution: "MIT World Peace University",
        location: "Pune, India",
        expectedGraduation: "2027",
        cgpa: "8.37",
        coursework: [
            "Data Structures & Algorithms",
            "Database Management Systems",
            "Web Technologies",
            "Computer Networks",
            "Operating Systems",
        ],
    },

    seo: {
        title: "Kush Dabade — Full-stack Developer",
        description:
            "Kush Dabade is a Computer Science student at MIT World Peace University, Pune, building full-stack applications with React, TypeScript, Node.js and PostgreSQL, with a focus on backend architecture and cloud infrastructure.",
        url: siteUrl,
        keywords: [
            "Kush Dabade",
            "Full-stack developer",
            "Backend engineering",
            "TypeScript",
            "React",
            "Node.js",
            "PostgreSQL",
            "TeamOS",
            "MIT World Peace University",
            "Portfolio",
        ],
    },

    links: {
        github: "https://github.com/kush-dabade",
        linkedin: "https://www.linkedin.com/in/kush-dabade/",
        email: "dabadekush@gmail.com",
    },

    // The download buttons and embedded preview switch on automatically when
    // this file exists in /public at build time.
    resume: {
        file: "/Kush_Dabade_Resume.pdf",
        downloadName: "Kush_Dabade_Resume.pdf",
    },
};

export type SiteConfig = typeof siteConfig;
