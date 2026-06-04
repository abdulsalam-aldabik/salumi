"use client";

import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, Download, Moon, Sun } from "lucide-react";

const navItems = [
  { name: "About", href: "#about", id: "about" },
  { name: "Work", href: "#projects", id: "projects" },
  { name: "Skills", href: "#skills", id: "skills" },
  { name: "Education", href: "#education", id: "education" },
  { name: "Internship", href: "/internship", id: "internship" },
  { name: "Contact", href: "#contact", id: "contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
      const sections = ["hero", ...navItems.map((i) => i.id)].map((id) =>
        document.getElementById(id)
      );
      const current = sections.find((section) => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom >= 120;
      });
      if (current) setActiveSection(current.id);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  return (
    <>
      {/* Scroll progress */}
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
          {/* Wordmark */}
          <a href="#hero" className="group flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line font-display text-lg text-gold transition-colors group-hover:border-gold">
              S
            </span>
            <span className="font-display text-xl tracking-tight text-ink">
              Salumi
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? "text-gold"
                    : "text-muted hover:text-ink"
                }`}
              >
                {item.name}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-gold-solid/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}

            <div className="mx-2 h-5 w-px bg-line" />

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

            <a href="/Abdul_Salam_CV.pdf" download className="btn btn-solid !px-4 !py-2 text-sm">
              <Download className="h-4 w-4" />
              CV
            </a>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              onClick={toggleTheme}
              className="rounded-full p-2.5 text-muted"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="rounded-full p-2.5 text-ink"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="overflow-hidden border-t border-line bg-base md:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28 }}
            >
              <div className="shell space-y-1 py-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                      activeSection === item.id
                        ? "bg-gold-solid/10 text-gold"
                        : "text-muted hover:bg-surface hover:text-ink"
                    }`}
                  >
                    {item.name}
                  </a>
                ))}
                <a
                  href="/Abdul_Salam_CV.pdf"
                  download
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn btn-solid mt-2 w-full"
                >
                  <Download className="h-4 w-4" />
                  Download CV
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
