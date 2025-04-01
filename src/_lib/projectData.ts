import { ProjectDetails } from "@/components/ProjectCard";

export const projectData = {
  nodes: [
    {
      id: "1",
      group: 1,
      project: {
        title: "Personal Portfolio",
        shortDescription: "A digital portfolio that showcases my journey and expertise in software development.",
        description:
          "A modern and responsive portfolio built with Next.js, TypeScript, and Tailwind CSS. It highlights my personal projects, skills, and an interactive knowledge tree. This portfolio is designed to reflect my journey as a developer and the impactful projects I've worked on.",
        images: [
          "/personal1.png",
          "/personal2.png",
          "/personal3.png",
          "/personal4.png",
        ],
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
        status: "Completed",
      } as ProjectDetails,
    },
    {
      id: "2",
      group: 1,
      project: {
        title: "Finance Control",
        shortDescription: "A finance management application to track my expenses, income, savings and use AI to generate insights.",
        description: "A finance management application built with Next.js, TypeScript, and Tailwind CSS. It allows users to track their expenses, income, and savings in one place. The application is designed to be simple and easy to use, with a responsive design that works on all devices.",
        images: ["/finance1.png", "/finance2.png", "/finance3.png", "/finance4.png", "/finance5.png"],
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
        status: "Completed",
      } as ProjectDetails,
    },
    // {
    //   id: "2",
    //   group: 1,
    //   project: {
    //     title: "Portfolio Digital",
    //     shortDescription:
    //       "Portfolio pessoal desenvolvido com Next.js e Tailwind",
    //     description:
    //       "Um portfolio digital moderno e responsivo desenvolvido com as mais recentes tecnologias web. Inclui seções para projetos, habilidades e uma árvore de conhecimento interativa.",
    //     images: ["/lore1.jpg"],
    //     githubUrl: "https://github.com/username/portfolio",
    //     liveUrl: "https://portfolio.dev",
    //     technologies: [
    //       { name: "Next.js" },
    //       { name: "TypeScript" },
    //       { name: "Tailwind CSS" },
    //       { name: "Framer Motion" },
    //       { name: "Three.js" },
    //     ],
    //     startDate: "2024-01-01",
    //     endDate: "2024-03-15",
    //     status: "Em Desenvolvimento",
    //   } as ProjectDetails,
    // },
    // {
    //   id: "3",
    //   group: 3,
    //   project: {
    //     title: "Portfolio Digital",
    //     shortDescription:
    //       "Portfolio pessoal desenvolvido com Next.js e Tailwind",
    //     description:
    //       "Um portfolio digital moderno e responsivo desenvolvido com as mais recentes tecnologias web. Inclui seções para projetos, habilidades e uma árvore de conhecimento interativa.",
    //     images: ["/lore2.jpg"],
    //     githubUrl: "https://github.com/username/portfolio",
    //     liveUrl: "https://portfolio.dev",
    //     technologies: [
    //       { name: "Next.js" },
    //       { name: "TypeScript" },
    //       { name: "Tailwind CSS" },
    //       { name: "Framer Motion" },
    //       { name: "Three.js" },
    //     ],
    //     startDate: "2024-01-01",
    //     endDate: "2024-03-15",
    //     status: "Em Pausa",
    //   } as ProjectDetails,
    // },
  ],
  links: [{ source: "1", target: "2" }],
};
