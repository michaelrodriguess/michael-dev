"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { useRouter, usePathname } from "next/navigation";

const menuItems = [
  { label: "About", id: "about" },
  { label: "Projects", id: "content-section" },
  { label: "Skills", id: "skills" },
  { label: "Blog", id: "blog" },
  { label: "Contact", id: "contact" },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const scrollToSection = (id: string) => {
    if (pathName == "/blog") {
      router.push("/");
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
          setIsMenuOpen(false);
        }
      }, 500);
    } else {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        setIsMenuOpen(false);
      }    
    }
  };

  return (
    <header className="relative flex flex-col md:flex-row items-center justify-between px-4 md:px-6 py-2 text-white">
      <div className="w-full md:w-auto flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/aiMaik.webp"
            alt="Logo"
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white text-2xl p-2 hover:bg-white/10 rounded-lg transition-colors z-50"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? (
            <IoCloseOutline className="w-6 h-6" />
          ) : (
            <CiMenuBurger className="w-6 h-6" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <nav className="hidden md:flex flex-row gap-2 md:gap-4">
        {menuItems.map(({ label, id }) => (
          <button
            key={id}
            onClick={() => {
              if (label == "Blog") {
                router.push("/blog");
              } else if (label != "Blog") {
              scrollToSection(id)}

            }}
            className="relative group text-white px-2 py-1 cursor-pointer"
          >
            {label}
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#FFCF96] transition-all duration-300 group-hover:w-full" />
          </button>
        ))}
      </nav>

      <div
        className={`fixed md:hidden top-20 right-0 bg-[#2A2B30] shadow-xl z-40 transform transition-all duration-300 ease-in-out rounded-l-xl ${
          isMenuOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
      >
        <div className="py-4">
          <nav className="flex flex-col">
            {menuItems.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="relative group text-white px-6 py-3 hover:bg-white/10 transition-colors"
              >
                {label}
                <span className="absolute left-0 bottom-1 w-0 h-[2px] bg-[#FFCF96] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
