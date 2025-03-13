import React from "react";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative py-8 lg:py-12 flex items-center bg-[#2E2F33]"
    >
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 p-6 lg:p-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-8 text-[#F96458] tracking-wide font-serif">
              Hi, I&apos;m Michael Rodrigues
            </h2>
            <p className="text-base sm:text-lg mb-8 leading-relaxed text-[#C1C1C1] font-light">
              A passionate software developer with 5 years of experience. Driven
              by curiosity and fueled by caffeine, I love turning ideas into
              reality. Whether it&apos;s crafting efficient code or solving
              complex problems, my goal is to create impactful digital
              experiences.
            </p>
            <blockquote className="border-l-4 border-[#A8DADC] pl-6 italic text-lg font-semibold text-[#A8DADC] mb-6">
              Be the change you wish to see in the world
              <span className="block mt-2 text-sm text-gray-400">
                — Mahatma Gandhi
              </span>
            </blockquote>
          </div>

          <div className="hidden md:block w-full md:w-1/2 lg:w-5/12">
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-0 border-2 border-[#FFC680] rounded-3xl transform translate-x-4 translate-y-4" />

              <div className="relative border-2 border-[#FFC680] rounded-3xl overflow-hidden">
                <Image
                  src="/sobreMaik.webp"
                  alt="About Michael Rodrigues"
                  width={500}
                  height={400}
                  className="object-contain w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
