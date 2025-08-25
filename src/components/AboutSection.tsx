import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/_i18n";

const AboutSection = () => {
  const { t } = useLanguage();
  
  return (
    <section
      id="about"
      className="relative py-8 lg:py-12 flex items-center bg-[#2E2F33]"
    >
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            className="w-full lg:w-1/2 p-6 lg:p-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-8 bg-gradient-to-r from-[#F96458] to-[#FFC680] text-transparent bg-clip-text tracking-wide font-serif">
              {t("greeting")}
            </h2>
            <p className="text-base sm:text-lg mb-8 leading-relaxed text-[#C1C1C1] font-light">
              {t ("With over 5 years of experience in software development, I specialize in crafting efficient and scalable solutions. My passion for technology drives me to constantly explore new possibilities and create innovative digital experiences.")}
            </p>
            <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-[#FFC680]">{t("What I Do")}</h3>
                <ul className="list-disc list-inside text-[#C1C1C1] space-y-4">
                  <li className="flex items-center gap-4">
                    <motion.div 
                      className="w-3 h-3 rounded-full bg-[#FFC680]"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    {t("Develop robust back-end systems")}
                  </li>
                  <li className="flex items-center gap-4">
                    <motion.div 
                      className="w-3 h-3 rounded-full bg-[#FFC680]"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    />
                    {t("Create efficient and scalable APIs")}
                  </li>
                  <li className="flex items-center gap-4">
                    <motion.div 
                      className="w-3 h-3 rounded-full bg-[#FFC680]"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    />
                    {t("Implement modern development practices")}
                  </li>
                  <li className="flex items-center gap-4">
                    <motion.div 
                      className="w-3 h-3 rounded-full bg-[#FFC680]"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    />
                    {t("Solve complex technical challenges")}
                  </li>
                  <li className="flex items-center gap-4">
                    <motion.div 
                      className="w-3 h-3 rounded-full bg-[#FFC680]"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    />
                    {t("AI & AI Agents development")}
                  </li>
                  <li className="flex items-center gap-4">
                    <motion.div 
                      className="w-3 h-3 rounded-full bg-[#FFC680]"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    />
                    {t("Requirements gathering and solution architecture")}
                  </li>
                </ul>
            </div>
            <blockquote className="border-l-4 border-[#FA6559] pl-6 italic text-lg font-semibold text-[#A8DADC] mb-6 mt-10">
              <p className="mb-2">
                  &quot;{t("Education is the most powerful weapon you can use to change the world")}&quot;
              </p>
              <span className="block mt-2 text-sm text-[#FA6559]">
                — Nelson Mandela
              </span>
            </blockquote>
          </motion.div>

          <motion.div 
            className="hidden md:block w-full md:w-1/2 lg:w-5/12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-0 border-2 border-[#FFC680] rounded-3xl transform translate-x-4 translate-y-4" />
              <div className="relative border-2 border-[#FFC680] rounded-3xl overflow-hidden">
                <Image
                  src="/sobreMaik.webp"
                  alt="About Michael Rodrigues"
                  width={500}
                  height={400}
                  className="object-contain w-full h-auto transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
