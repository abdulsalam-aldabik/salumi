"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Brain, Code, Globe, Server, Cpu, Shield, Database, Film } from "lucide-react";

const skillCategories = [
  {
    id: "aiml",
    title: "AI & Machine Learning",
    icon: Brain,
    skills: skills.aiml,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "programming",
    title: "Programming Languages",
    icon: Code,
    skills: skills.programming,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "webDev",
    title: "Web Development",
    icon: Globe,
    skills: skills.webDev,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "devops",
    title: "DevOps & Tools",
    icon: Server,
    skills: skills.devops,
    color: "from-orange-500 to-red-500",
  },
  {
    id: "hardware",
    title: "Hardware & IoT",
    icon: Cpu,
    skills: skills.hardware,
    color: "from-yellow-500 to-amber-500",
  },
  {
    id: "dataScience",
    title: "Data Science & BI",
    icon: Database,
    skills: skills.dataScience,
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: "media",
    title: "Media & Infrastructure",
    icon: Film,
    skills: skills.media,
    color: "from-rose-500 to-pink-500",
  },
  {
    id: "security",
    title: "Security & Compliance",
    icon: Shield,
    skills: skills.security,
    color: "from-red-500 to-orange-500",
  },
];

export function Skills() {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8 },
  };

  return (
    <section id="skills" className="bg-white dark:bg-gray-900 py-20 md:py-32 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div {...fadeInUp}>
          <h2 className="mb-4 text-center text-4xl font-bold text-[#1a1a3e] dark:text-white md:text-5xl">
            Technical Skills
          </h2>
          <p className="mb-12 text-center text-lg text-gray-600 dark:text-gray-400">
            My expertise across different technology domains
          </p>
        </motion.div>

        <motion.div
          className="mx-auto max-w-4xl"
          {...fadeInUp}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {skillCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <AccordionItem
                    value={category.id}
                    className="overflow-hidden rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-300 hover:border-[#D5B977] hover:shadow-lg"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${category.color}`}
                        >
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-xl font-semibold text-[#1a1a3e] dark:text-white">
                            {category.title}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {category.skills.length} skills
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="flex flex-wrap gap-2 pt-4">
                        {category.skills.map((skill) => (
                          <motion.div
                            key={skill}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Badge
                              variant="secondary"
                              className="cursor-pointer bg-[#1a1a3e] dark:bg-gray-700 px-4 py-2 text-sm text-white transition-all duration-300 hover:bg-[#D5B977] hover:text-[#1a1a3e]"
                            >
                              {skill}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              );
            })}
          </Accordion>
        </motion.div>

        {/* All Skills at a Glance */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="rounded-2xl bg-gradient-to-br from-[#1a1a3e] to-[#0a0a1c] p-8">
            <h3 className="mb-6 text-center text-2xl font-bold text-white">
              All Skills at a Glance
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {Object.values(skills)
                .flat()
                .map((skill) => (
                  <motion.div
                    key={skill}
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Badge className="bg-[#D5B977] px-3 py-1.5 text-[#1a1a3e] hover:bg-white">
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
