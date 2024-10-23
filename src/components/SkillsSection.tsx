"use client";

import React, { useState } from "react";
import { Globe, Database, Palette } from "lucide-react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] =
    useState<keyof typeof skillsData>("backend");

  const skillsData = {
    backend: {
      title: "Backend Development",
      icon: Database,
      description:
        "Experience in designing and implementing robust server-side applications and APIs. Experience in various programming languages and frameworks to create scalable and maintainable systems.",
      skills: [
        { name: "C", icon: "/icons/c-1.svg" },
        { name: "C++", icon: "/icons/c.svg" },
        { name: "Go", icon: "/icons/go-8.svg" },
        { name: "Java", icon: "/icons/java.svg" },
        { name: "Kotlin", icon: "/icons/kotlin-1.svg" },
        { name: "JavaScript", icon: "/icons/logo-javascript.svg" },
        { name: "Node.js", icon: "/icons/nodejs-1.svg" },
        { name: "Nest.js", icon: "/icons/nestjs.svg" },
        { name: "PHP", icon: "/icons/php.svg" },
        { name: "Python", icon: "/icons/python-5.svg" },
        { name: "MySQL", icon: "/icons/mysql.svg" },
        { name: "MongoDB", icon: "/icons/mongodb.svg" },
        { name: "TypeScript", icon: "/icons/typescript.svg" },
      ],
    },
    frontend: {
      title: "Frontend Development",
      icon: Globe,
      description:
        "Creating modern, responsive interfaces with a focus on user experience. Experience in using various technologies to create interactive and visually appealing applications.",
      skills: [
        { name: "HTML5", icon: "/icons/html-1.svg" },
        { name: "CSS3", icon: "/icons/css-3.svg" },
        { name: "React", icon: "/icons/react-2.svg" },
        { name: "Next.js", icon: "/icons/next-js.svg" },
        { name: "Tailwind", icon: "/icons/tailwind-css-2.svg" },
      ],
    },
    tools: {
      title: "Development Tools & Technologies",
      icon: Palette,
      description:
        "A collection of essential tools and technologies that streamline development processes and enhance productivity. Familiar with version control systems, cloud services, and containerization tools.",
      skills: [
        { name: "Git", icon: "/icons/git-icon.svg" },
        { name: "GitHub", icon: "/icons/github.svg" },
        { name: "GitFlow", icon: "/icons/gitflow.svg" },
        { name: "Docker", icon: "/icons/docker.svg" },
        { name: "AWS", icon: "/icons/aws-logo.svg" },
        { name: "Apache", icon: "/icons/apache-13.svg" },
        { name: "Nginx", icon: "/icons/nginx.svg" },
      ],
    },
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-[#F96458]">
        Skills
      </h2>
      <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
        Throughout my journey as a developer, I have gained experience in
        various technologies and tools. Here is an overview of my main
        competencies:
      </p>

      <div className="bg-[#3F404A] rounded-xl p-6 transition-all">
        <div className="flex items-center gap-3 mb-4">
          {React.createElement(skillsData[activeCategory].icon, {
            className: "text-[#F96458]",
            size: 24,
          })}
          <Select
            value={activeCategory}
            onValueChange={(value: keyof typeof skillsData) =>
              setActiveCategory(value)
            }
          >
            <SelectTrigger className="bg-transparent border-none shadow-none hover:bg-[#34353A] transition-colors text-[#F96458] font-semibold text-xl w-auto">
              <SelectValue defaultValue={activeCategory}>
                {skillsData[activeCategory].title}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-[#34353A] border-[#4F505A]">
              {Object.entries(skillsData).map(([key, value]) => (
                <SelectItem
                  key={key}
                  value={key}
                  className="text-gray-300 hover:text-white hover:bg-[#4F505A] cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    {React.createElement(value.icon, {
                      size: 16,
                    })}
                    <span>{value.title}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <p className="text-gray-300 mb-6 text-sm">
          {skillsData[activeCategory].description}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {skillsData[activeCategory].skills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-3 bg-[#34353A] rounded-lg hover:bg-[#45464F] transition-colors"
            >
              <Image
                src={skill.icon}
                alt={skill.name}
                width={30}
                height={30}
                className="w-8 h-8 mb-2"
              />
              <span className="text-sm text-gray-300 text-center">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;