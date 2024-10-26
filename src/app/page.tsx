"use client";

import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Header from "@/components/Header";
import KnowledgeTreeSection from "@/components/KnowledgeTreeSection";
import ProductSection from "@/components/ProductSection";

import SkillsSection from "@/components/SkillsSection";
import { useState } from "react";

export default function Home() {
  const [isKnowledgeTree, setIsKnowledgeTree] = useState(false);

  const toggleSection = () => {
    setIsKnowledgeTree(!isKnowledgeTree);
  };

  return (
    <main className="w-full bg-[#2E2F33] overflow-hidden">
      <div className="min-h-screen">
        <Header />
        <AboutSection />

        <div className="flex items-center justify-center gap-4 my-8">
          <span
            className={`text-sm font-medium ${
              !isKnowledgeTree ? "text-[#FFC680]" : "text-white"
            }`}
          >
            Produtos
          </span>
          <button
            onClick={toggleSection}
            className="relative w-16 h-8 rounded-full p-1 cursor-pointer border-2 transition-colors duration-300"
            style={{
              borderColor: isKnowledgeTree ? "#FFC680" : "#F96458",
              backgroundColor: "#333",
            }}
          >
            <div
              className={`w-6 h-6 rounded-full transform transition-all duration-300 ease-in-out ${
                isKnowledgeTree
                  ? "translate-x-8 bg-[#FFC680]"
                  : "translate-x-0 bg-[#F96458]"
              }`}
            />
          </button>
          <span
            className={`text-sm font-medium ${
              isKnowledgeTree ? "text-[#FFC680]" : "text-white"
            }`}
          >
            Knowledge Tree
          </span>
        </div>

        <div className="relative w-full">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: isKnowledgeTree ? "translateX(-50%)" : "translateX(0)",
              width: "200%",
            }}
          >
            <div className="w-full">
              <ProductSection />
            </div>
            <div className="w-full">
              <KnowledgeTreeSection />
            </div>
          </div>
        </div>

        <SkillsSection />
        <ContactSection />
      </div>
    </main>
  );
}
