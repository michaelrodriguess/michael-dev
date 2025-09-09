import { TranslationKeys } from "@/_i18n/config";
import { ProjectDetails } from "@/components/ProjectCard";

export const getProjectData = (t: (key: TranslationKeys) => string) => {
  return {
    nodes: [
      {
        id: "1",
        group: 1,
        project: {
          title: t("Personal Portfolio"),
          shortDescription: t(
            "A digital portfolio that showcases my journey and expertise in software development."
          ),
          description: t(
            "A modern and responsive portfolio built with Next.js, TypeScript, and Tailwind CSS. It highlights my personal projects, skills, and an interactive knowledge tree. This portfolio is designed to reflect my journey as a developer and the impactful projects I've worked on."
          ),
          images: ["/personal1.png", "/personal2.png", "/personal3.png", "/personal4.png"],
          githubUrl: "https://github.com/michaelrodriguess/michael-dev",
          liveUrl: "https://michaelrodrigues.dev",
          technologies: [
            { name: "Next.js" },
            { name: "TypeScript" },
            { name: "Tailwind CSS" },
            { name: "Framer Motion" },
            { name: "Three.js" },
          ],
          startDate: "2024-01-01",
          endDate: "2024-03-15",
          status: t("Completed"),
        } as ProjectDetails,
      },
      {
        id: "2",
        group: 1,
        project: {
          title: t("Finance Control"),
          shortDescription: t(
            "A finance management application to track my expenses, income, savings and use AI to generate insights."
          ),
          description: t(
            "A finance management application built with Next.js, TypeScript, and Tailwind CSS. It allows users to track their expenses, income, and savings in one place. The application is designed to be simple and easy to use, with a responsive design that works on all devices."
          ),
          images: ["/finance1.png","/finance2.png","/finance3.png","/finance4.png","/finance5.png"],
          githubUrl: "https://github.com/michaelrodriguess/finance-control",
          liveUrl: "https://finance-control-00-eight.vercel.app/login",
          technologies: [
            { name: "Next.js" },
            { name: "TypeScript" },
            { name: "Tailwind CSS" },
            { name: "Clerk" },
            { name: "Prisma" },
            { name: "Docker" },
            { name: "PostgreSQL" },
          ],
          startDate: "2024-09-01",
          endDate: "2025-01-15",
          status: t("Completed"),
        } as ProjectDetails,
      },
    ],
    links: [{ source: "1", target: "2" }],
  };
};
