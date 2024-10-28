import React from "react";
import { motion } from "framer-motion";
import {
  X,
  Github,
  Globe,
  Calendar,
  Terminal,
  CheckCircle,
} from "lucide-react";
import { getStatusColor, ProjectDetails } from "./ProjectCard";
import Image from "next/image";

interface ProjectModalProps {
  project: ProjectDetails;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-[#2E2F33] rounded-xl max-w-sm md:max-w-4xl w-full max-h-[80vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-48 md:h-64 overflow-hidden rounded-t-xl">
          <Image
            src={project.image}
            alt={project.title}
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2E2F33] to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-all duration-200"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between mb-4 md:mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
                {project.title}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                  project.status
                )}`}
              >
                {project.status}
              </span>
            </div>
            <div className="flex gap-2 md:gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-[#333] text-white hover:bg-[#444] transition-colors duration-200"
                >
                  <Github size={20} />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-[#333] text-white hover:bg-[#444] transition-colors duration-200"
                >
                  <Globe size={20} />
                </a>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-[#FFC680] mb-3">
                Sobre o Projeto
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="flex items-center gap-2 text-gray-400 mb-4">
                <Calendar size={16} />
                <span>
                  {new Date(project.startDate).toLocaleDateString()} -
                  {project.endDate
                    ? new Date(project.endDate).toLocaleDateString()
                    : "Presente"}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#FFC680] mb-3">
                Principais Features
              </h3>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-gray-300"
                  >
                    <CheckCircle size={16} className="text-[#FFC680]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#FFC680] mb-3">
              Tecnologias Utilizadas
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-[#333] rounded-lg flex items-center gap-2"
                >
                  <Terminal size={16} className="text-[#FFC680]" />
                  <span className="text-white">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
