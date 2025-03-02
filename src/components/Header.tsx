import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Header = () => {
  const scrollToSection = () => {
    const section = document.getElementById("join-whitelist");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo y Nombre */}
          <div className="flex items-center space-x-2">
            <img
              src="/ticketForge.svg"
              alt="TicketForge Logo"
              width={30}
              height={30}
            />
            <span className="text-xl font-semibold">
              Clarify
              <span className="text-xl font-bold text-indigo-600">AI</span>
            </span>
          </div>

          {/* Botón de Whitelist */}
          <div className="flex items-center">
            <Button
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
              onClick={scrollToSection}
            >
              Join Whitelist
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
