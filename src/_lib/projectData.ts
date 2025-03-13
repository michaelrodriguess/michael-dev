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
          "/portfolio.png",
          "/lore1.jpg",
          "/portfolio.png",
          "/lore1.jpg",
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
