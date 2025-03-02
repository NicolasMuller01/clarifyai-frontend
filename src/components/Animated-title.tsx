"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ArrowRight, Check, X } from "lucide-react";
import TermsAndConditions from "./TermsAndConditions";

export default function AnimatedTitle() {
  const [currentTool, setCurrentTool] = useState(0);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const tools = ["Jira", "Asana", "Trello"];
  const [isValidEmail, setIsValidEmail] = useState(false);

  const floatingLogos = [
    {
      src: "/jira-logo.svg",
      className: "left-[10%] top-[20%] w-12 md:w-16",
      duration: 8,
    },
    {
      src: "/asana-logo.svg",
      className: "right-[15%] top-[30%] w-14 md:w-20",
      duration: 10,
    },
    {
      src: "/trello-logo.svg",
      className: "left-[20%] bottom-[25%] w-16 md:w-24",
      duration: 12,
    },
    {
      src: "/jira-logo.svg",
      className: "right-[25%] bottom-[20%] w-10 md:w-14",
      duration: 9,
    },
  ];

  useEffect(() => {
    if (
      !email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      email.includes("yopmail")
    ) {
      setIsValidEmail(false);
    } else {
      setIsValidEmail(true);
    }
  }, [email]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTool((prev) => (prev + 1) % tools.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [tools.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return;
    }
    setIsLoading(true);
  };

  const handleJoinWhitelist = () => {
    setShowTermsModal(true);
  };

  const acceptTerms = async () => {
    setShowTermsModal(false);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/send-email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      if (response.ok) {
        setShowSuccess(true);
      } else {
        console.error("Failed to send email.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Logos flotantes */}
      {floatingLogos.map((logo, index) => (
        <motion.div
          key={index}
          className={`absolute opacity-[0.07] ${logo.className}`}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: logo.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <img src={logo.src} alt="" className="w-full h-auto" />
        </motion.div>
      ))}

      <div
        id="join-whitelist"
        className="flex flex-col items-center justify-center p-8 md:p-12 max-w-[1200px] mx-auto min-h-[90vh] relative z-10"
      >
        <h1 className="text-5xl md:text-6xl xl:text-7xl font-medium text-center mb-10 text-slate-700 leading-tight">
          <span className="font-bold text-indigo-600">Automatize</span> your
          tickets with <span className="font-bold text-indigo-600">AI</span>
        </h1>

        <div className="flex items-center justify-center text-4xl md:text-5xl xl:text-6xl text-slate-700 mb-16">
          Works with{" "}
          <div className="relative w-24 md:w-36 xl:w-44 h-20 mx-4 flex items-center justify-center">
            {tools.map((tool, index) => (
              <motion.span
                key={tool}
                className="absolute font-bold text-indigo-600"
                initial={{ opacity: 0, y: 25 }}
                animate={{
                  opacity: currentTool === index ? 1 : 0,
                  y: currentTool === index ? 0 : 25,
                }}
                transition={{ duration: 0.5 }}
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 text-lg h-12"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
            <Button
              type="button"
              className="h-12 px-8 text-lg bg-indigo-600 hover:bg-indigo-500"
              onClick={handleJoinWhitelist}
              disabled={isLoading || !isValidEmail}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <span className="flex items-center gap-2">
                  Join Whitelist
                  <ArrowRight className="w-5 h-5" />
                </span>
              )}
            </Button>
          </div>
          <div className="bg-indigo-50 border border-indigo-200 text-indigo-800 p-3 mb-6 rounded-md shadow-sm text-center w-full max-w-md">
            <p className="font-medium text-sm">
              The first 50 users will receive a free trial! 🚀
            </p>
          </div>
          <p className="text-sm text-center text-slate-500">
            By joining the whitelist, you agree to our{" "}
            <span className="text-indigo-600 hover:text-indigo-500 underline">
              Terms & Conditions
            </span>
          </p>
        </motion.form>

        <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <div className="bg-green-100 p-2 rounded-full">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                Successfully Joined!
              </DialogTitle>
            </DialogHeader>
            <div className="text-center space-y-3 py-4">
              <p className="text-slate-600">
                Thank you for joining our whitelist! We'll keep you updated on
                our latest developments.
              </p>
            </div>
            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-500"
              onClick={() => setShowSuccess(false)}
            >
              Got it
            </Button>
          </DialogContent>
        </Dialog>

        <Dialog open={showTermsModal} onOpenChange={setShowTermsModal}>
          <DialogContent className="sm:max-w-md max-h-[90vh] overflow-hidden">
            <DialogHeader className="relative">
              <DialogTitle className="text-xl">Terms & Conditions</DialogTitle>
            </DialogHeader>
            <div className="max-h-[60vh] overflow-y-auto space-y-4 text-slate-600 text-sm custom-scrollbar">
              <TermsAndConditions />
            </div>

            <DialogFooter>
              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-500"
                onClick={acceptTerms}
              >
                Accept Terms & Join Whitelist
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
