"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard, type ProjectDetails } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { projectData } from "../lib/projectData";
import KnowledgeTreeSection from "./KnowledgeTreeSection";

interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, onToggle }) => {
  return (
    <div
      onClick={onToggle}
      className={`relative ${
        isOn ? "w-36" : "w-48"
      } h-12 flex items-center p-1 cursor-pointer rounded-full transition-all duration-300 ${
        isOn ? "bg-[#FFC680]" : "bg-[#333]"
      }`}
      role="button"
      aria-pressed={isOn}
    >
      <motion.div
        className="absolute w-10 h-10 bg-[#FF8A4B] rounded-full"
        animate={{
          x: isOn ? 90 : 4,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      />
      {!isOn && (
        <span className="absolute left-14 text-white font-medium opacity-100">
          Knowledge Tree
        </span>
      )}
      {isOn && (
        <span className="absolute left-6 text-white font-medium opacity-100">
          Projects
        </span>
      )}
    </div>
  );
};

export const ContentSections = () => {
  const [isKnowledgeTree, setIsKnowledgeTree] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(
    null
  );

  return (
    <section className="bg-[#2E2F33]">
      <div className="max-w-screen-lg mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <ToggleSwitch
            isOn={isKnowledgeTree}
            onToggle={() => setIsKnowledgeTree(!isKnowledgeTree)}
          />
        </div>

        <AnimatePresence mode="wait">
          {isKnowledgeTree ? (
            <motion.div
              key="knowledge"
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -200 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <KnowledgeTreeSection />
            </motion.div>
          ) : (
            <motion.div
              key="projects"
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-6"
            >
              {projectData.nodes.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project.project}
                  onClick={setSelectedProject}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ContentSections;
