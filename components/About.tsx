"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { useCountUp } from "@/lib/hooks";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MapPin, GraduationCap } from "lucide-react";

export function About() {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8 },
  };

  return (
    <section id="about" className="bg-white dark:bg-gray-900 py-20 md:py-32 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div {...fadeInUp}>
          <h2 className="mb-4 text-center text-4xl font-bold text-[#1a1a3e] dark:text-white md:text-5xl">
            About Me
          </h2>
          <div className="mb-12 flex items-center justify-center gap-6 text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[#D5B977]" />
              <span>{personalInfo.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-[#D5B977]" />
              <span>{personalInfo.university}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mx-auto max-w-4xl"
          {...fadeInUp}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="mb-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-8">
            <p className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              I&apos;m <span className="font-semibold text-[#1a1a3e] dark:text-white">Abdul salam Aldabik</span>, also known as{" "}
              <span className="font-semibold text-[#D5B977]">Salumi</span>. I&apos;m an{" "}
              <span className="font-semibold text-[#1a1a3e] dark:text-white">{personalInfo.program}</span> student at{" "}
              <span className="font-semibold text-[#1a1a3e] dark:text-white">{personalInfo.university}</span>, 
              driven by a passion for building innovative solutions with{" "}
              <span className="font-semibold text-[#D5B977]">Artificial Intelligence</span> and{" "}
              <span className="font-semibold text-[#D5B977]">Machine Learning</span>.
            </p>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="bio" className="border-gray-300 dark:border-gray-600">
                <AccordionTrigger className="text-lg font-semibold text-[#1a1a3e] dark:text-white hover:text-[#D5B977] hover:no-underline">
                  Read Full Bio
                </AccordionTrigger>
                <AccordionContent className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>
                    Driven by a desire to build game-changing technologies, I see Applied Computer Science as my launchpad, 
                    equipping me with the knowledge and tools to turn innovative ideas into reality. My expertise spans 
                    artificial intelligence, IoT systems, and collaborative software development.
                  </p>
                  <p>
                    My technical journey includes developing smart home automation systems with Raspberry Pi, creating 
                    environmental monitoring solutions using ESP32 and BLE technology, and leading cross-functional teams 
                    in requirements analysis and prototyping projects. I thrive in collaborative environments, consistently 
                    earning praise for my leadership and project management skills.
                  </p>
                  <p>
                    Beyond academic projects, I&apos;m passionate about personal innovation—from tinkering with hardware 
                    like my ongoing smart home expansion to exploring creative pursuits that challenge me and spark new ideas. 
                    These experiences translate into valuable technical and problem-solving skills.
                  </p>
                  <p>
                    With a solid foundation in AI and computer science, combined with a thirst for innovation, I&apos;m 
                    ready to push the boundaries of what&apos;s possible with technology. This portfolio showcases my 
                    journey, skills, and aspirations as I strive to shape the future, one line of code at a time.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <StatCard value={9} suffix="+" label="Major Projects" />
            <StatCard value={6} suffix="+" label="Years Experience" />
            <StatCard value={100} suffix="%" label="Passion" delay={0.2} />
            <StatCard value={50} suffix="+" label="Technologies" delay={0.3} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface StatCardProps {
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
}

function StatCard({ value, suffix = "", label, delay = 0 }: StatCardProps) {
  const { ref, count } = useCountUp(value, 2000);

  return (
    <motion.div
      ref={ref}
      className="rounded-xl bg-[#1a1a3e] dark:bg-gray-800 p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="mb-2 text-3xl font-bold text-[#D5B977]">
        {count}
        {suffix}
      </div>
      <div className="text-sm text-gray-300 dark:text-gray-400">{label}</div>
    </motion.div>
  );
}
