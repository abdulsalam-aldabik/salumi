"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { GraduationCap, Calendar, MapPin, BookOpen, Trophy } from "lucide-react";

const educationData = [
  {
    id: "bachelor",
    degree: "Bachelor of Applied Computer Science",
    specialization: "AI Specialization",
    institution: personalInfo.university,
    location: personalInfo.location,
    period: "Since 2022",
    description:
      "Specializing in Artificial Intelligence with a focus on Machine Learning, Computer Vision, and Deep Learning.",
    courses: [
      "Machine Learning & Deep Learning",
      "Computer Vision & Image Processing",
      "Natural Language Processing",
      "Data Structures & Algorithms",
      "Software Engineering",
      "Database Management Systems",
      "Web Development (Full Stack)",
      "Business Intelligence & Analytics",
      "IoT & Embedded Systems",
    ],
    achievements: [
      "Built an autonomous-driving AI system using YOLOv11 and ResNet50",
      "Designed a privacy-first multi-agent assistant architecture (LangGraph)",
      "Created comprehensive BI dashboards in Qlik Sense",
      "Delivered full-stack projects with Spring Boot and React",
    ],
  },
];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

export function Education() {
  return (
    <section id="education" className="section bg-surface">
      <div className="shell">
        <motion.div {...reveal} className="mb-14">
          <p className="eyebrow mb-4">04 — Education</p>
          <h2 className="display max-w-3xl text-[clamp(2rem,5vw,3.5rem)] text-ink">
            Where the foundations were{" "}
            <span className="italic text-gold">laid</span>.
          </h2>
        </motion.div>

        {educationData.map((edu) => (
          <motion.div key={edu.id} {...reveal} className="card overflow-hidden">
            {/* Header */}
            <div className="flex flex-col gap-5 border-b border-line p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gold-solid text-ongold">
                  <GraduationCap className="h-7 w-7" />
                </span>
                <div>
                  <h3 className="font-display text-2xl text-ink">{edu.degree}</h3>
                  <p className="text-gold">{edu.specialization}</p>
                </div>
              </div>
              <div className="space-y-1.5 text-sm text-muted">
                <p className="flex items-center gap-2 sm:justify-end">
                  <GraduationCap className="h-4 w-4 flex-shrink-0 text-gold" />
                  {edu.institution}
                </p>
                <p className="flex items-center gap-2 sm:justify-end">
                  <Calendar className="h-4 w-4 flex-shrink-0 text-gold" />
                  {edu.period}
                </p>
                <p className="flex items-center gap-2 sm:justify-end">
                  <MapPin className="h-4 w-4 flex-shrink-0 text-gold" />
                  {edu.location}
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="grid gap-10 p-6 md:grid-cols-2 md:p-8">
              <div>
                <p className="mb-6 leading-relaxed text-muted">{edu.description}</p>
                <h4 className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink">
                  <BookOpen className="h-4 w-4 text-gold" />
                  Key Courses
                </h4>
                <div className="flex flex-wrap gap-2">
                  {edu.courses.map((course) => (
                    <span key={course} className="chip">
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink">
                  <Trophy className="h-4 w-4 text-gold" />
                  Highlights
                </h4>
                <ul className="space-y-3">
                  {edu.achievements.map((a) => (
                    <li key={a} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
