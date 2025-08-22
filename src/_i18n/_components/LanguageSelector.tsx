import { Button } from "@/components/ui/button";
import { useLanguage } from "../context";
import { Globe } from "lucide-react";

const LanguageSelector = () => {
  const { language, changeLanguage } = useLanguage();

  const toggleLanguage = () => {
    changeLanguage(language === "en" ? "pt" : "en");
  };

  return (
    <Button
      variant="link"
      onClick={toggleLanguage}
      aria-label="Change language"
      className="relative group flex items-center gap-2 text-white px-2 py-1 cursor-pointer no-underline hover:no-underline"
    >
      <Globe className="h-5 w-5" />
      <span>{language.toUpperCase()}</span>
      <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#FFCF96] transition-all duration-300 group-hover:w-full" />
      </Button>
  );
};

export default LanguageSelector;
