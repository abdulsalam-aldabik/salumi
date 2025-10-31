"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

const educationData = [
  {
    id: "bachelor",
    degree: "Bachelor of Applied Computer Science",
    specialization: "AI Specialization",
    institution: personalInfo.university,
    location: personalInfo.location,
    period: "2022 - Present",
    description: "Specializing in Artificial Intelligence with focus on Machine Learning, Computer Vision, and Deep Learning.",
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
      "Built autonomous driving AI system using YOLO and ResNet50",
      "Developed multi-agent AI framework using CrewAI and AutoGen",
      "Created comprehensive BI dashboards using Qlik Sense",
      "Completed full-stack projects with Spring Boot and React",
    ],
  },
];

export function Education() {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8 },
  };

  return (
    <section id="education" className="bg-gray-50 dark:bg-gray-800 py-20 md:py-32 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div {...fadeInUp}>
          <h2 className="mb-4 text-center text-4xl font-bold text-[#1a1a3e] dark:text-white md:text-5xl">
            Education
          </h2>
          <p className="mb-12 text-center text-lg text-gray-600 dark:text-gray-400">
            Academic background and achievements
          </p>
        </motion.div>

        <motion.div
          className="mx-auto max-w-4xl"
          {...fadeInUp}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {educationData.map((edu) => (
            <Card
              key={edu.id}
              className="overflow-hidden border-2 border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-[#D5B977] hover:shadow-xl"
            >
              <div className="bg-gradient-to-r from-[#1a1a3e] to-[#0a0a1c] p-6 text-white">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#D5B977]">
                      <GraduationCap className="h-8 w-8 text-[#1a1a3e]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{edu.degree}</h3>
                      <p className="text-lg text-[#D5B977]">{edu.specialization}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-300">
                    <GraduationCap className="h-4 w-4" />
                    <span>{edu.institution}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin className="h-4 w-4" />
                    <span>{edu.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar className="h-4 w-4" />
                    <span>{edu.period}</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-6 dark:bg-gray-800">
                <p className="mb-6 text-gray-700 dark:text-gray-300">{edu.description}</p>

                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="courses" className="border-gray-300 dark:border-gray-600">
                    <AccordionTrigger className="text-lg font-semibold text-[#1a1a3e] dark:text-white hover:text-[#D5B977] hover:no-underline">
                      Key Courses
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {edu.courses.map((course, index) => (
                          <motion.div
                            key={course}
                            className="flex items-center gap-2 rounded-lg bg-gray-100 dark:bg-gray-700 p-3 transition-all duration-300 hover:bg-[#D5B977] hover:text-white"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                          >
                            <div className="h-2 w-2 rounded-full bg-[#1a1a3e] dark:bg-white" />
                            <span className="text-sm font-medium">{course}</span>
                          </motion.div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="achievements" className="border-gray-300 dark:border-gray-600">
                    <AccordionTrigger className="text-lg font-semibold text-[#1a1a3e] dark:text-white hover:text-[#D5B977] hover:no-underline">
                      Key Achievements
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-3">
                        {edu.achievements.map((achievement, index) => (
                          <motion.li
                            key={achievement}
                            className="flex gap-3 text-gray-700 dark:text-gray-300"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                          >
                            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#D5B977]" />
                            <span>{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
