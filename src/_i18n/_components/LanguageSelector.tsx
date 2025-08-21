

import { Button } from "@/components/ui/button";
import { useLanguage } from "../context";
import { Globe } from "lucide-react";

const LanguageSelector = () => {
    const { language, changeLanguage } = useLanguage();
  
    const toggleLanguage = () => {
      changeLanguage(language === 'en' ? 'pt' : 'en');
    };
  
    return (
      <Button variant="ghost" size="icon" onClick={toggleLanguage} aria-label="Change language">
        <Globe className="h-5 w-5" />
        <span className="ml-2">{language.toUpperCase()}</span>
      </Button>
    );
  };
  
  export default LanguageSelector;

