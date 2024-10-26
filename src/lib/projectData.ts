// lib/projectData.ts

export const projectData = {
  nodes: [
    {
      id: "1",
      title: "Projeto Alpha",
      description: "Descrição do Projeto Alpha",
      group: 1,
    },
    {
      id: "2",
      title: "Projeto Beta",
      description: "Descrição do Projeto Beta",
      group: 1,
    },
    {
      id: "3",
      title: "Projeto Gama",
      description: "Descrição do Projeto Gama",
      group: 2,
    },
    {
      id: "4",
      title: "Projeto Delta",
      description: "Descrição do Projeto Delta",
      group: 2,
    },
  ],
  links: [
    { source: "1", target: "2" },
    { source: "2", target: "3" },
    { source: "3", target: "4" },
  ],
};
