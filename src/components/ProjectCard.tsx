import React from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/_i18n";
import { TranslationKeys } from "@/_i18n/config";

export interface ProjectDetails {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  images: string[];
  githubUrl: string;
  liveUrl?: string;
  technologies: { name: string }[];
  features: string[];
  startDate: string;
  endDate?: string;
  status: string;
  group: number;
  project?: string;
}

interface ProjectCardProps {
  project: ProjectDetails;
  onClick: (project: ProjectDetails) => void;
}

export const getStatusColor = (status: string, t: (key: TranslationKeys) => string) => {
  switch (status) {
    case t("In Development"):
      return "bg-yellow-500";
    case t("Completed"):
      return "bg-green-500";
    case t("On Hold"):
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};


export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onClick,
}) => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-[#333] rounded-xl overflow-hidden shadow-lg border border-[#FFC680] hover:shadow-2xl transition-all duration-300"
      onClick={() => onClick(project)}
    >
      {project.images && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.images[0]}
            alt={project.title}
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <span
              className={`px-3 py-1 rounded-full text-xs text-white ${getStatusColor(
                project.status,
                t
              )}`}
            >
              {project.status}
            </span>
          </div>
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-300 text-sm mb-4">{project.shortDescription}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-[#2a2a2a] rounded-md text-xs text-[#FFC680]"
            >
              {tech.name}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 bg-[#2a2a2a] rounded-md text-xs text-gray-400">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{project.startDate}</span>
          </div>
          <button className="text-[#FFC680] hover:text-[#ffb766] transition-colors duration-200">
            Ver detalhes →
          </button>
        </div>
      </div>
    </motion.div>
  );
};
