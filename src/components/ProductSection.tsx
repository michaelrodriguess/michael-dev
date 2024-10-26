import React, { useState } from "react";
import { projectData } from "../lib/projectData";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  description: string;
  group: number;
  technologies?: string[];
  repository?: string;
  deploy?: string;
  imageUrl?: string;
}

export default function ProductSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openModal = (project: Project) => setSelectedProject(project);
  const closeModal = () => setSelectedProject(null);

  return (
    <section className="py-5 sm:py-10 lg:py-10 flex flex-col items-center justify-center">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center text-[#F96458]">
        Produtos
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-7xl mx-auto">
        {projectData.nodes.map((project: Project) => (
          <div
            key={project.id}
            onClick={() => openModal(project)}
            className="group relative border border-[#FFC680] p-4 rounded-lg bg-[#333] 
                     hover:bg-[#3a3a3a] transition-all duration-300 transform 
                     hover:-translate-y-1 cursor-pointer overflow-hidden"
          >
            {project.imageUrl && (
              <div className="h-40 mb-4 overflow-hidden rounded-lg">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            )}
            <h3 className="text-xl font-semibold text-white mb-2">
              {project.title}
            </h3>
            <p className="text-gray-300 text-sm line-clamp-3">
              {project.description}
            </p>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-[#FFC680] text-sm">Ver detalhes →</span>
              <span className="text-xs text-gray-400">
                Group {project.group}
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#2E2F33] rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="border-b border-[#FFC680] p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-[#F96458]">
                  {selectedProject.title}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6 text-gray-200">
              {selectedProject.imageUrl && (
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    width={500}
                    height={300}
                    className="rounded-lg"
                  />
                </div>
              )}

              <div>
                <h4 className="text-lg font-semibold text-[#FFC680] mb-2">
                  Descrição
                </h4>
                <p>{selectedProject.description}</p>
              </div>

              {selectedProject.technologies && (
                <div>
                  <h4 className="text-lg font-semibold text-[#FFC680] mb-2">
                    Tecnologias Utilizadas
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#333] rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                {selectedProject.repository && (
                  <a
                    href={selectedProject.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#333] text-white rounded-lg hover:bg-[#444] transition-colors"
                  >
                    Repositório
                  </a>
                )}
                {selectedProject.deploy && (
                  <a
                    href={selectedProject.deploy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#F96458] text-white rounded-lg hover:bg-[#ff7b6f] transition-colors"
                  >
                    Ver Projeto
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
