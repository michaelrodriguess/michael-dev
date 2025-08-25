import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  X,
  Github,
  Globe,
  Calendar,
  Terminal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards, Navigation } from "swiper/modules";
import { getStatusColor, ProjectDetails } from "./ProjectCard";
import Image from "next/image";
import { useLanguage } from "@/_i18n";

interface ProjectModalProps {
  project: ProjectDetails;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSlideChange = (swiper: any) => {
    setCurrentIndex(swiper.activeIndex);
  };

    const { t } = useLanguage();
  

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
        className="bg-[#2E2F33] rounded-xl w-full max-w-md md:max-w-2xl lg:max-w-4xl mx-4 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-8 md:p-12 overflow-hidden rounded-t-xl bg-gradient-to-b from-gray-900 to-[#2E2F33]">
          <Swiper
            effect="cards"
            grabCursor={true}
            modules={[EffectCards, Navigation]}
            className="h-[250px] md:h-[300px] lg:h-[350px] w-full mx-auto"
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            onSlideChange={handleSlideChange}
          >
            {project.images.map((image, index) => (
              <SwiperSlide key={index} className="rounded-xl overflow-hidden">
                <div className="relative w-full h-full">
                  <Image
                    src={image}
                    alt={`Project Image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {currentIndex > 0 && (
            <div className="swiper-button-prev absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-3 shadow hover:bg-gray-700 transition z-10 hidden md:block">
              <ChevronLeft size={24} />
            </div>
          )}
          {currentIndex < project.images.length - 1 && (
            <div className="swiper-button-next absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-3 shadow hover:bg-gray-700 transition z-10 hidden md:block">
              <ChevronRight size={24} />
            </div>
          )}

          <button
            onClick={onClose}
            className="absolute top-1 right-1 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-all duration-200 z-10"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2">
                {project.title}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-xs md:text-sm ${getStatusColor(
                  project.status,
                  t
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

          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            {project.description}
          </p>

          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Calendar size={16} />
            <span>
              {new Date(`${project.startDate}T00:00:00`).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              -{" "}
              {project.endDate
                ? new Date(`${project.endDate}T00:00:00`).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : t("Present")}
            </span>
          </div>


          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <div
                key={index}
                className="flex items-center gap-1 px-3 py-1 bg-[#333] rounded-lg text-xs sm:text-sm"
              >
                <Terminal size={16} className="text-[#FFC680]" />{" "}
                <span className="text-white">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
