"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { ArrowDown, Github, Linkedin, Mail, Download } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section
      id="hero"
      className="grain relative flex min-h-screen items-center overflow-hidden bg-base pt-28 pb-20"
    >
      {/* Warm atmospheric glow */}
      <div className="glow-warm pointer-events-none absolute inset-x-0 top-0 h-[60vh] opacity-70" />
      {/* Faint baseline grid for structure */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--c-ink) 1px, transparent 1px)",
          backgroundSize: "min(12vw, 9rem) 100%",
        }}
      />

      <div className="shell relative z-10">
        <div className="max-w-4xl">
          <motion.p
            className="eyebrow mb-7"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
AI &amp; Computer-Vision Engineer · Belgium
          </motion.p>

          <h1 className="display text-[clamp(3rem,9vw,7rem)] text-ink">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.05 }}
            >
              Abdul Salam
            </motion.span>
            <motion.span
              className="block italic text-gold"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.16 }}
            >
              Aldabik
            </motion.span>
          </h1>

          <motion.p
            className="mt-8 max-w-xl text-lg leading-relaxed text-muted text-balance md:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.3 }}
          >
            I design and ship privacy-first intelligent systems: computer-vision
            models that read the real world, and local-first automation that
            runs without the cloud.
          </motion.p>

          <motion.p
            className="mt-6 max-w-xl text-base leading-relaxed text-muted"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.38 }}
          >
            Currently finishing my Applied Computer Science degree (AI
            specialization) at Thomas More. Recent work includes a production
            computer-vision app built during my internship, plus self-built
            machine-learning and home-infrastructure projects.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.42 }}
          >
            <a href="#projects" className="btn btn-solid">
              View Work
            </a>
            <a href="#contact" className="btn btn-outline">
              <Mail className="h-4 w-4" />
              Get in Touch
            </a>
            <a
              href="/Abdul_Salam_CV.pdf"
              download
              className="btn btn-outline"
            >
              <Download className="h-4 w-4" />
              Résumé
            </a>
          </motion.div>

          <motion.div
            className="mt-12 flex items-center gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            <Social href={personalInfo.github} label="GitHub" icon={Github} />
            <Social href={personalInfo.linkedin} label="LinkedIn" icon={Linkedin} />
            <span className="h-px w-10 bg-line" />
            <a
              href={`mailto:${personalInfo.email}`}
              className="font-mono text-xs text-muted transition-colors hover:text-gold"
            >
              {personalInfo.email}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 text-muted transition-colors hover:text-gold md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        aria-label="Scroll to about"
      >
        <span className="eyebrow !text-muted">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}

function Social({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:text-gold"
    >
      <Icon className="h-5 w-5" />
    </a>
  );
}
