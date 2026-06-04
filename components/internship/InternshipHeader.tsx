"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Moon, Sun, Download } from "lucide-react";

export function InternshipHeader() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    const initial = saved === "light" ? "light" : "dark";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  return (
    <>
      <motion.div
        className="fixed left-0 right-0 top-0 z-[60] h-0.5 origin-left bg-gold-solid"
        style={{ scaleX }}
      />
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "border-b border-line bg-base/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="shell flex h-16 items-center justify-between md:h-20">
          <a
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to portfolio
          </a>

          <div className="flex items-center gap-1">
            <button
              onClick={toggleTheme}
              className="rounded-full p-2.5 text-muted transition-colors hover:text-ink"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-[18px] w-[18px]" />
              ) : (
                <Moon className="h-[18px] w-[18px]" />
              )}
            </button>
            <a
              href="/Abdul_Salam_CV.pdf"
              download
              className="btn btn-solid !px-4 !py-2 text-sm"
            >
              <Download className="h-4 w-4" />
              CV
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
