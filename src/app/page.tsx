"use client";

import { motion } from "framer-motion";
import { Cta } from "@/components/landing/cta";
import { Features } from "@/components/landing/features";
import { Hero } from "@/components/landing/hero";
import { TemplatesShowcase } from "@/components/landing/templates-showcase";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#09090B] px-4 py-10 md:px-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-20 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-fuchsia-600/20 blur-3xl" />
      </div>
      <motion.div
        className="relative z-10 mx-auto flex max-w-6xl flex-col gap-8"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Hero />
        <Features />
        <TemplatesShowcase />
        <Cta />
      </motion.div>
    </main>
  );
}
