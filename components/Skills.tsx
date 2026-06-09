"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";
import { Brain, Code, Globe, Server, Cpu, Shield, Database, Film, Users } from "lucide-react";

const skillCategories = [
  { id: "soft", title: "Soft Skills", icon: Users, skills: skills.soft },
  { id: "aiml", title: "AI & Machine Learning", icon: Brain, skills: skills.aiml },
  { id: "programming", title: "Programming Languages", icon: Code, skills: skills.programming },
  { id: "webDev", title: "Web Development", icon: Globe, skills: skills.webDev },
  { id: "devops", title: "DevOps & Tooling", icon: Server, skills: skills.devops },
  { id: "hardware", title: "Hardware & IoT", icon: Cpu, skills: skills.hardware },
  { id: "dataScience", title: "Data Science & BI", icon: Database, skills: skills.dataScience },
  { id: "media", title: "Media & Infrastructure", icon: Film, skills: skills.media },
  { id: "security", title: "Security & Compliance", icon: Shield, skills: skills.security },
];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

export function Skills() {
  return (
    <section id="skills" className="section bg-base">
      <div className="shell">
        <motion.div {...reveal} className="mb-14">
          <p className="eyebrow mb-4">03 — Capabilities</p>
          <h2 className="display max-w-3xl text-[clamp(2rem,5vw,3.5rem)] text-ink">
            A full stack, from{" "}
            <span className="italic text-gold">silicon to model</span>.
          </h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: (index % 2) * 0.08 }}
                className="card card-hover p-6"
              >
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-gold-solid/10 text-gold">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg text-ink">{category.title}</h3>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                      {category.skills.length} skills
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span key={skill} className="chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
