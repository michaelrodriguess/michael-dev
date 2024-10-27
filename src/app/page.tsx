import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import ContentSections from "@/components/ContentSection";

import Header from "@/components/Header";
import SkillsSection from "@/components/SkillsSection";

export default function Home() {
  return (
    <main className="w-full bg-[#2E2F33]">
      <div className="min-h-screen">
        <Header />
        <AboutSection />
        <ContentSections />
        <SkillsSection />
        <ContactSection />
      </div>
    </main>
  );
}
