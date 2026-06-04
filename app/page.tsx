"use client";

import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AskPortfolio } from "@/components/assistant/AskPortfolio";

export default function Home() {
  return (
    <main className="min-h-screen bg-base">
      <Navigation />
      <ScrollToTop />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Education />
      <Contact />
      <AskPortfolio />
    </main>
  );
}
