// Grouped from the tools actually used in the projects on this site.

export interface SkillGroup {
    id: string;
    name: string;
    skills: string[];
}

export const skillGroups: SkillGroup[] = [
    {
        id: "01",
        name: "Languages",
        skills: ["TypeScript", "JavaScript", "Python", "SQL", "Bash", "HTML & CSS"],
    },
    {
        id: "02",
        name: "Frontend",
        skills: ["React", "Vite", "Tailwind CSS", "TanStack Query", "React Router", "shadcn/ui"],
    },
    {
        id: "03",
        name: "Backend",
        skills: ["Node.js", "Express", "Prisma", "Zod", "Better Auth", "Socket.IO", "BullMQ", "REST APIs"],
    },
    {
        id: "04",
        name: "Data",
        skills: ["PostgreSQL", "Redis"],
    },
    {
        id: "05",
        name: "Cloud & DevOps",
        skills: ["AWS EC2", "ALB & Auto Scaling", "S3", "IAM", "CloudFormation", "AWS CLI", "Docker", "GitHub Actions"],
    },
    {
        id: "06",
        name: "Testing & Tools",
        skills: ["Vitest", "Supertest", "Python unittest", "Git", "GitHub"],
    },
];
