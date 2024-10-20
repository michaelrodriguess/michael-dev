"use client";
import Image from "next/image";
import MultiverseScene from "../components/MultiverseScene";
import { projectData } from "../lib/projectData";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="w-full">
      <div className="bg-[#34353A] min-h-screen">
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

            <div className="pl-20 w-full sm:w-2/3 md:w-1/2 lg:w-1/2 xl:w-5/12 max-lg:hidden ">
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
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center text-white">
            Árvore do Conhecimento
          </h2>
          <div className="border-2 border-[#FFCF96] rounded-xl w-full max-w-3xl h-[300px] sm:h-[400px] lg:h-[500px] flex items-center justify-center bg-black">
            <MultiverseScene data={projectData} />
          </div>
        </section>
      </div>

      <section
        id="habilidades"
        className="py-10 sm:py-16 lg:py-20 flex flex-col items-center justify-center bg-white text-center"
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6">
          Habilidades
        </h2>
        <div className="container mx-auto px-4">
          <p className="max-w-2xl mx-auto text-gray-700">skills here</p>
        </div>
      </section>

      <section
        id="blog"
        className="py-10 sm:py-16 lg:py-20 flex flex-col items-center justify-center bg-gray-100 text-center"
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6">
          Blog
        </h2>
        <div className="container mx-auto px-4">
          <p className="max-w-2xl mx-auto text-gray-700">blog here</p>
        </div>
      </section>

      <section
        id="contato"
        className="py-10 sm:py-16 lg:py-20 flex flex-col items-center justify-center bg-white text-center"
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6">
          Contato
        </h2>
        <div className="container mx-auto px-4">
          <p className="max-w-2xl mx-auto text-gray-700">contact here</p>
        </div>
      </section>
    </main>
  );
}
