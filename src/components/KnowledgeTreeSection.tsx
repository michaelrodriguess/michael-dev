import React from "react";
import { projectData } from "../lib/projectData";
import MultiverseScene from "./MultiverseScene";

export default function KnowledgeTreeSection() {
  return (
    <section className="py-5 sm:py-10 lg:py-10 flex flex-col items-center justify-center">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center text-[#F96458]">
        Knowledge Tree
      </h2>
      <div className="border-2 border-[#FFC680] rounded-xl w-full max-w-3xl h-[300px] sm:h-[400px] lg:h-[500px] flex items-center justify-center bg-black">
        <MultiverseScene data={projectData} />
      </div>
    </section>
  );
}
