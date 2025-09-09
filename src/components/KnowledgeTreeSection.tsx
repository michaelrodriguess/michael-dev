import React from "react";
import { getProjectData } from "../_lib/projectData";
import MultiverseScene from "./MultiverseScene";
import { useLanguage } from "@/_i18n";

export default function KnowledgeTreeSection() {
    const { t } = useLanguage();
    const projectData = getProjectData(t);

  return (
    <section className="flex flex-col items-center justify-center">
      <div className="border-2 border-[#FFC680] rounded-xl w-full max-w-3xl h-[300px] sm:h-[400px] lg:h-[500px] flex items-center justify-center bg-black">
        <MultiverseScene data={projectData} />
      </div>
    </section>
  );
}
