'use client'
import Image from 'next/image';
import MultiverseScene from '../components/MultiverseScene';
import { projectData } from '../lib/projectData';

export default function Home() {
  return (
    <main className="w-full"> 
      <div className="bg-[#34353A]  min-h-screen">
        <header className="flex items-center justify-between px-6 pt-2 text-white">
          <div className="flex items-center">
            <Image
            src="/aiMaik.webp"
            alt="Logo"
            width={48}
            height={48}
            className="rounded-full object-cover"
            />
            <div className="ml-2">
              Michael Rodrigues
            </div>
          </div>
          <nav className="flex space-x-4">
            <a href="#about" className="relative group text-white">
              Sobre
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#FFCF96] transition-all duration-300 group-hover:w-full"/>
            </a>
            <a href="#multiverse" className="relative group text-white">
              Árvore do Conhecimento
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#FFCF96] transition-all duration-300 group-hover:w-full"/>
            </a>
            <a href="#skills" className="relative group text-white">
              Habilidades
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#FFCF96] transition-all duration-300 group-hover:w-full"/>
            </a>
            <a href="#blog" className="relative group text-white">
              Blog
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#FFCF96] transition-all duration-300 group-hover:w-full"/>
            </a>
            <a href="#contact" className="relative group text-white">
              Contato
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#FFCF96] transition-all duration-300 group-hover:w-full"/>
            </a>
          </nav>
        </header>

        <section id="about" className="py-20 flex items-center justify-center">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-4 mb-4 md:mb-0 p-20 pt-5 ">
              <h2 className="text-4xl font-extrabold mb-4 text-[#F96458] tracking-wide font-serif">
              Hi, I&apos;m Michael Rodrigue
              </h2>
              <p className="text-lg mb-6 leading-relaxed text-gray-300 font-light">
                A passionate software developer with 4 years of experience. Driven by curiosity and fueled by caffeine, I love turning ideas into reality. Whether it&apos;s crafting efficient code or solving complex problems, my goal is to create impactful digital experiences.
              </p>
              <blockquote className="border-l-4 border-[#A8DADC] pl-4 italic text-lg font-semibold text-[#A8DADC]">
                Be the change you wish to see in the word
                <span className="block mt-2 text-sm text-gray-400">— Mahatma Gandhi</span>
              </blockquote>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md border-2 border-[#FFCF96] rounded-3xl">
                <Image
                src="/sobreMaik.webp"
                alt="Sobre Michael Rodrigues"
                layout="responsive"
                width={1920}
                height={1280}
                className="rounded-3xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="multiverse" className="py-20 flex flex-col items-center justify-center ">        
          <div className="border-2 border-[#FFCF96] rounded-xl w-full max-w-3xl h-[400px] flex items-center justify-center bg-black">
            <MultiverseScene data={projectData} />
          </div>
        </section>
    
      </div>


      <section id="skills" className="py-20 flex flex-col items-center justify-center bg-white text-center">
        <h2 className="text-3xl font-semibold mb-4">Habilidades</h2>
        <p className="max-w-2xl text-gray-700">
          skils here
        </p>
      </section>

      <section id="blog" className="py-20 flex flex-col items-center justify-center bg-white text-center">
        <h2 className="text-3xl font-semibold mb-4">Blog</h2>
        <p className="max-w-2xl text-gray-700">
          blog here
        </p>
      </section>

      <section id="contact" className="py-20 flex flex-col items-center justify-center bg-gray-50 text-center">
        <h2 className="text-3xl font-semibold mb-4">Contato</h2>
        <p className="max-w-2xl text-gray-700">
          contact here
        </p>
      </section>

      
    </main>
  );
}
