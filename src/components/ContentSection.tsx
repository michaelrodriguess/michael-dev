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
      className="relative w-20 h-10 flex items-center bg-[#333] cursor-pointer rounded-full p-1"
    >
      <motion.div
        className="absolute w-8 h-8 bg-[#FFC680] rounded-full"
        animate={{
          x: isOn ? 44 : 4,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      />
      <div className="w-full h-full flex items-center justify-between px-2 text-xs font-medium">
        <span className={`${isOn ? "opacity-50" : "opacity-100"} text-white`}>
          PRO
        </span>
        <span className={`${isOn ? "opacity-100" : "opacity-50"} text-white`}>
          KNOW
        </span>
      </div>
    </div>
  );
};

export const ContentSections = () => {
  const [isKnowledgeTree, setIsKnowledgeTree] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(
    null
  );

  return (
    <div className="relative min-h-screen bg-[#2E2F33]">
      <div className="container mx-auto px-4">
        <div className="flex justify-center my-8">
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
              key="products"
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8"
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
    </div>
  );
};

export default ContentSections;
