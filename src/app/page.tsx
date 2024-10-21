import React from "react";
import Image from "next/image";
import MultiverseScene from "../components/MultiverseScene";
import { projectData } from "../lib/projectData";
import Header from "@/components/Header";
import SkillsSection from "@/components/SkillsSection";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Home() {
  return (
    <main className="w-full bg-[#34353A]">
      <div className="min-h-screen">
        <Header />

        <section id="sobre" className="py-5 flex items-center justify-center">
          <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-8 mb-8 lg:mb-0 p-4 sm:p-6 lg:p-8 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold mb-4 text-[#F96458] tracking-wide font-serif">
                Hi, I&apos;m Michael Rodrigues
              </h2>
              <p className="text-lg lg:text-lg mb-6 leading-relaxed text-gray-300 font-light">
                A passionate software developer with 4 years of experience.
                Driven by curiosity and fueled by caffeine, I love turning ideas
                into reality. Whether it&apos;s crafting efficient code or
                solving complex problems, my goal is to create impactful digital
                experiences.
              </p>
              <blockquote className="border-l-4 border-[#A8DADC] pl-4 italic text-lg lg:text-lg font-semibold text-[#A8DADC] mb-4 sm:mb-6">
                Be the change you wish to see in the world
                <span className="block mt-2 text-sm sm:text-sm text-gray-400">
                  — Mahatma Gandhi
                </span>
              </blockquote>
            </div>

            <div className="pl-20 w-full sm:w-2/3 md:w-1/2 lg:w-1/2 xl:w-5/12 max-lg:hidden">
              <div
                className="relative border-2 border-[#FFCF96] rounded-3xl overflow-hidden"
                style={{ display: "inline-block", maxWidth: "100%" }}
              >
                <Image
                  src="/sobreMaik.webp"
                  alt="Sobre Michael Rodrigues"
                  width={800}
                  height={500}
                  style={{
                    maxHeight: "500px",
                    width: "100%",
                    objectFit: "contain",
                  }}
                  className="rounded-3xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="árvore-do-conhecimento"
          className="py-10 sm:py-16 lg:py-20 flex flex-col items-center justify-center"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center  text-[#F96458]">
            Knowledge Tree
          </h2>
          <div className="border-2 border-[#FFCF96] rounded-xl w-full max-w-3xl h-[300px] sm:h-[400px] lg:h-[500px] flex items-center justify-center bg-black">
            <MultiverseScene data={projectData} />
          </div>
        </section>

        <section id="habilidades" className="py-10 sm:py-16 lg:py-20">
          <SkillsSection />
        </section>

        <section id="contato" className="py-10 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-[#F96458]">
              Contact
            </h2>
            <div className="max-w-2xl mx-auto space-y-8">
              <p className="text-lg text-center text-gray-300 mb-8">
                Interessado em trabalhar juntos? Vamos conversar!
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <a
                  href="https://github.com/michaelrodriguess"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-[#F96458] text-white rounded-lg hover:bg-[#e55a4f] transition-colors"
                >
                  <Github size={20} />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/michaelrodriguess/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-[#F96458] text-white rounded-lg hover:bg-[#e55a4f] transition-colors"
                >
                  <Linkedin size={20} />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="mailto:hi@michaelrodrigues.dev"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-[#F96458] text-white rounded-lg hover:bg-[#e55a4f] transition-colors"
                >
                  <Mail size={20} />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
