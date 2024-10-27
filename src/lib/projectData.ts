import { ProjectDetails } from "@/components/ProjectCard";

export const projectData = {
  nodes: [
    {
      id: "1",
      group: 1,
      project: {
        title: "Portfolio Digital",
        shortDescription:
          "Portfolio pessoal desenvolvido com Next.js e Tailwind",
        description:
          "Um portfolio digital moderno e responsivo desenvolvido com as mais recentes tecnologias web. Inclui seções para projetos, habilidades e uma árvore de conhecimento interativa.",
        image: "/portfolio.png",
        githubUrl: "https://github.com/username/portfolio",
        liveUrl: "https://portfolio.dev",
        technologies: [
          { name: "Next.js" },
          { name: "TypeScript" },
          { name: "Tailwind CSS" },
          { name: "Framer Motion" },
          { name: "Three.js" },
        ],
        features: [
          "Design responsivo e moderno",
          "Animações suaves e interativas",
          "Árvore de conhecimento 3D",
          "Modo escuro/claro",
          "Performance otimizada",
        ],
        startDate: "2024-01-01",
        endDate: "2024-03-15",
        status: "Concluído",
      } as ProjectDetails,
    },
    {
      id: "2",
      group: 2,
      project: {
        title: "Dashboard Analytics",
        shortDescription: "Dashboard para análise de dados em tempo real",
        description:
          "Um dashboard completo para visualização e análise de dados em tempo real, com gráficos interativos e filtros avançados.",
        image: "/dashboard.jpg",
        githubUrl: "https://github.com/username/dashboard",
        technologies: [
          { name: "React" },
          { name: "Redux" },
          { name: "D3.js" },
          { name: "Material UI" },
          { name: "Node.js" },
        ],
        features: [
          "Gráficos interativos em tempo real",
          "Filtros avançados",
          "Exportação de relatórios",
          "Autenticação de usuários",
          "API RESTful",
        ],
        startDate: "2024-02-01",
        status: "Em Desenvolvimento",
        endDate: "",
      } as ProjectDetails,
    },
  ],
  links: [{ source: "1", target: "2" }],
};
