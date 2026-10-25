// Limited to what the résumé and the projects on this site can back up.

export interface SkillGroup {
    id: string;
    name: string;
    skills: string[];
}

export const skillGroups: SkillGroup[] = [
    {
        id: "01",
        name: "Languages",
        skills: ["JavaScript", "TypeScript", "Python", "SQL", "C/C++"],
    },
    {
        id: "02",
        name: "Frontend",
        skills: ["React", "TanStack Query", "Tailwind CSS", "HTML", "CSS"],
    },
    {
        id: "03",
        name: "Backend & Data",
        skills: [
            "Node.js",
            "Express",
            "REST APIs",
            "PostgreSQL",
            "Prisma",
            "Drizzle ORM",
            "MongoDB",
            "Redis / BullMQ",
            "Socket.IO",
            "Zod",
            "Auth & access control",
        ],
    },
    {
        id: "04",
        name: "Cloud & Engineering",
        skills: ["AWS", "Docker", "Docker Compose", "Git", "GitHub", "CI/CD fundamentals"],
    },
];
