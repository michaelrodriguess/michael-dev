export const projectData = {
    nodes: [
      { id: "JavaScript", group: 1 },
      { id: "TypeScript", group: 1 },
      { id: "React", group: 1 },
      { id: "Next.js", group: 1 },
      { id: "Three.js", group: 1 },
      { id: "Projeto A", group: 2 },
      { id: "Projeto B", group: 2 },
    ],
    links: [
      { source: "JavaScript", target: "TypeScript" },
      { source: "TypeScript", target: "React" },
      { source: "React", target: "Next.js" },
      { source: "JavaScript", target: "Three.js" },
      { source: "React", target: "Projeto A" },
      { source: "Three.js", target: "Projeto B" },
      { source: "Next.js", target: "Projeto B" },
    ]
  };