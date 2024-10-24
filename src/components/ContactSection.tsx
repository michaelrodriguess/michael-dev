import React from "react";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";

interface ContactItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  color: string;
}

const ContactSection: React.FC = () => {
  const contactItems: ContactItem[] = [
    {
      icon: <Github size={28} />,
      title: "GitHub",
      description: "Check out my projects and contributions",
      link: "https://github.com/michaelrodriguess",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: <Linkedin size={28} />,
      title: "LinkedIn",
      description: "Let's expand our professional network",
      link: "https://linkedin.com/in/michaelrodriguess/",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Mail size={28} />,
      title: "Email",
      description: "Send me a direct message",
      link: "mailto:hi@michaelrodrigues.dev",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section
      id="contato"
      className="bg-gradient-to-b from-[#2A2B30] to-[#232428] py-8 sm:py-12 md:py-16 lg:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#F96458] to-[#FFC680]">
            Let&apos;s Create Something Amazing Together?
          </h2>
          <p className="text-base sm:text-lg text-[#C1C1C1] max-w-xl sm:max-w-2xl mx-auto px-4 sm:px-0">
            I&apos;m always open to new projects and collaboration
            opportunities. Choose your preferred channel to start a
            conversation!
          </p>
        </div>

        <div className="px-2 sm:px-6 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
            {contactItems.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-xl bg-[#3F404A] p-4 sm:p-5 lg:p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-black/20 flex flex-col"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-10"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${item.color})`,
                  }}
                />

                <div className="relative z-10">
                  <div className="mb-3 sm:mb-4 flex items-center justify-between">
                    <div className="rounded-lg bg-white/10 p-2.5 sm:p-3">
                      <div className="w-6 sm:w-7">
                        {React.cloneElement(item.icon as React.ReactElement, {
                          size: 24,
                          className: "sm:w-7 sm:h-7",
                        })}
                      </div>
                    </div>
                    <ArrowRight
                      className="text-[#F96458] opacity-0 transition-all duration-300 -translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 w-5 h-5 sm:w-6 sm:h-6"
                      size={20}
                    />
                  </div>

                  <h3 className="mb-1.5 sm:mb-2 text-lg sm:text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#C1C1C1] mb-2 sm:mb-4 leading-snug">
                    {item.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 sm:mt-12 lg:mt-16 text-center">
          <hr className="border-t border-[#C1C1C1]/30 mb-4" />
          <p className="text-[#C1C1C1] text-xs sm:text-sm">
            © Copyright 2024 - Michael Rodrigues. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
