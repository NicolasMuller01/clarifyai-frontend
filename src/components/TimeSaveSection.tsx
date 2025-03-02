"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button"; // Adjust this path based on your project structure
import { Clock, Zap, BarChart, ArrowRight } from "lucide-react";

export default function TimeSavingSection() {
  const benefits = [
    {
      icon: <Clock className="w-10 h-10 text-indigo-500" />,
      title: "Save Valuable Time",
      description:
        "Reduce ticket creation time by up to 70% with AI-powered automation.",
    },
    {
      icon: <Zap className="w-10 h-10 text-indigo-500" />,
      title: "Streamline Workflows",
      description:
        "Eliminate repetitive tasks and focus on what truly matters for your projects.",
    },
    {
      icon: <BarChart className="w-10 h-10 text-indigo-500" />,
      title: "Boost Productivity",
      description:
        "Create more detailed, consistent tickets with context-aware AI assistance.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-indigo-50 py-20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-indigo-100 opacity-50"></div>
        <div className="absolute -left-10 bottom-10 h-40 w-40 rounded-full bg-indigo-100 opacity-50"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-slate-700 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Save Time and Improve Workflow by
            <span className="text-indigo-600">
              {" "}
              Eliminating Repetitive Tasks
            </span>
          </motion.h2>
          <motion.p
            className="text-lg text-slate-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Upload your project context and let our AI understand your needs.
            Generate detailed tickets for Jira, Asana, Trello, and more in
            seconds, not minutes.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg border border-indigo-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="bg-indigo-50 p-4 rounded-full inline-block mb-6">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-700 mb-3">
                {benefit.title}
              </h3>
              <p className="text-slate-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-indigo-600 rounded-2xl p-10 text-center text-white max-w-3xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to transform your ticket creation process?
          </h3>
          <p className="mb-8 text-indigo-100">
            Join our whitelist today and be among the first to experience the
            future of project management.
          </p>
          <a href="#join-whitelist">
            <Button className="bg-white text-indigo-600 hover:bg-indigo-50 text-lg px-8 py-6 h-auto font-medium">
              <span className="flex items-center gap-2">
                Join Whitelist Now
                <ArrowRight className="w-5 h-5" />
              </span>
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
