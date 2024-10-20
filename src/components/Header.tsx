"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const menuItems = [
    "Sobre",
    "Árvore do Conhecimento",
    "Habilidades",
    "Blog",
    "Contato",
  ];

  return (
    <header className="relative flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-4 text-white">
      <div className="w-full sm:w-auto flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/aiMaik.webp"
            alt="Logo"
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
          <div className="ml-2 text-lg sm:text-xl">Michael Rodrigues</div>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="sm:hidden text-white text-2xl p-2 hover:bg-white/10 rounded-lg transition-colors z-50"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? (
            <IoCloseOutline className="w-6 h-6" />
          ) : (
            <CiMenuBurger className="w-6 h-6 " />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <nav className="hidden sm:flex flex-row gap-4">
        {menuItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/ /g, "-")}`}
            className="relative group text-white px-2 py-1"
          >
            {item}
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#FFCF96] transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </nav>

      <div
        className={`
          fixed sm:hidden top-20 right-0
          bg-[#2A2B30] shadow-xl z-40
          transform transition-all duration-300 ease-in-out
          rounded-l-xl
          ${
            isMenuOpen
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }
        `}
      >
        <div className="py-4">
          <nav className="flex flex-col">
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                className="relative group text-white px-6 py-3 hover:bg-white/10 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
                <span className="absolute left-0 bottom-1 w-0 h-[2px]  group-hover:w-full" />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
