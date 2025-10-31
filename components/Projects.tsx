"use client";

import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Github, Star, ExternalLink, Search, Users, Clock, TrendingUp, Target, Award } from "lucide-react";
import { useState, useMemo } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const categories = ["All", "AI/ML", "Full Stack", "IoT", "DevOps", "Data Science"] as const;

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<{ [key: number]: string }>({});
  const [showAll, setShowAll] = useState(false);

  // Fixed filtering logic
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((project) => project.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.shortDescription.toLowerCase().includes(query) ||
          project.fullDescription.toLowerCase().includes(query) ||
          project.techStack.some((tech) => tech.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  // Display only top 3 latest projects unless "Show More" is clicked
  const displayedProjects = useMemo(() => {
    if (showAll || searchQuery.trim() || selectedCategory !== "All") {
      return filteredProjects;
    }
    return filteredProjects.slice(0, 3);
  }, [filteredProjects, showAll, searchQuery, selectedCategory]);

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8 },
  };

  return (
    <section id="projects" className="relative bg-gray-50 dark:bg-gray-800 py-20 md:py-32 transition-colors duration-300">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D5B977]/5 to-transparent" />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div {...fadeInUp}>
          <h2 className="mb-4 text-center text-4xl font-bold text-[#1a1a3e] dark:text-white md:text-5xl">
            Featured Projects
          </h2>
          <p className="mb-8 text-center text-lg text-gray-600 dark:text-gray-400">
            A showcase of my AI/ML and full-stack development work
          </p>

          {/* Search Bar */}
          <div className="mx-auto mb-8 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects by title, tech stack, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-100 py-3 pl-12 pr-4 transition-all duration-300 focus:border-[#D5B977] focus:outline-none focus:ring-2 focus:ring-[#D5B977]/20"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-6 py-2 font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-[#D5B977] text-[#1a1a3e] shadow-lg shadow-[#D5B977]/30"
                    : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Filter by ${category}`}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Results Count */}
          <motion.p
            className="mb-8 text-center text-sm text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={`${selectedCategory}-${searchQuery}-${filteredProjects.length}`}
          >
            Showing <span className="font-semibold text-[#D5B977]">{displayedProjects.length}</span> of{" "}
            <span className="font-semibold">{projects.length}</span> projects
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${searchQuery}-${showAll}`}
            className="grid gap-6 md:gap-8 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
              exit: { opacity: 0 },
            }}
          >
            {displayedProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                activeTab={activeTab[project.id] || "overview"}
                setActiveTab={(tab) => setActiveTab({ ...activeTab, [project.id]: tab })}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Show More Button */}
        {!showAll && filteredProjects.length > 3 && selectedCategory === "All" && !searchQuery.trim() && (
          <motion.div
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.button
              onClick={() => setShowAll(true)}
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#D5B977] to-[#c2a562] px-8 py-4 font-semibold text-[#1a1a3e] shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-[#D5B977]/40"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Show More Projects
                <motion.span
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ↓
                </motion.span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#c2a562] to-[#D5B977] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.button>
          </motion.div>
        )}

        {/* Show Less Button */}
        {showAll && selectedCategory === "All" && !searchQuery.trim() && (
          <motion.div
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.button
              onClick={() => {
                setShowAll(false);
                // Scroll back to projects section
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="group relative overflow-hidden rounded-full border-2 border-[#D5B977] bg-transparent px-8 py-4 font-semibold text-[#D5B977] shadow-lg transition-all duration-300 hover:bg-[#D5B977] hover:text-[#1a1a3e] hover:shadow-2xl hover:shadow-[#D5B977]/40"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Show Less
                <motion.span
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ↑
                </motion.span>
              </span>
            </motion.button>
          </motion.div>
        )}

        {/* No Results */}
        {displayedProjects.length === 0 && (
          <motion.div
            className="py-20 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
              <Search className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="mb-2 text-2xl font-bold text-gray-700 dark:text-gray-300">No projects found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: any;
  index: number;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

function ProjectCard({ project, index, activeTab, setActiveTab }: ProjectCardProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
      },
    },
    exit: { opacity: 0, y: -50, transition: { duration: 0.3 } },
  };

  return (
    <motion.div ref={ref} variants={cardVariants} className="w-full">
      <Card className="group relative h-full overflow-hidden border-2 border-transparent bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:border-[#D5B977] hover:shadow-2xl hover:shadow-[#D5B977]/20">
        {/* Gradient border effect */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#D5B977] via-[#c2a562] to-[#b39559] opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ padding: '2px' }}>
          <div className="h-full w-full rounded-lg bg-white dark:bg-gray-800" />
        </div>

        <div className="relative z-10 max-w-full overflow-hidden">
          {/* Project Header Image */}
          <div className="relative h-40 w-full overflow-hidden bg-gradient-to-br from-[#1a1a3e] via-[#2d2d5a] to-[#1a1a3e]">
            {/* Badges */}
            <div className="absolute left-4 top-4 z-20 flex gap-2">
              {project.featured && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                >
                  <Badge className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
                    <Star className="h-3 w-3 fill-current" />
                    Featured
                  </Badge>
                </motion.div>
              )}
            </div>

            <div className="absolute right-4 top-4 z-20">
              <Badge className="bg-[#D5B977] font-semibold text-[#1a1a3e]">
                {project.category}
              </Badge>
            </div>

            {/* Title with gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a3e] via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <motion.h3
                className="text-center text-xl font-bold text-white drop-shadow-2xl line-clamp-2"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {project.title}
              </motion.h3>
            </div>

            {/* Animated gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#D5B977]/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>

          <CardHeader className="space-y-2 py-4">
            <CardDescription className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              {project.shortDescription}
            </CardDescription>

            {/* Project Meta Info */}
            <div className="flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-[#D5B977]" />
                <span>{project.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-[#D5B977]" />
                <span>{project.teamSize}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {project.techStack.slice(0, 4).map((tech: string, i: number) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Badge
                    variant="secondary"
                    className="cursor-pointer bg-[#1a1a3e] dark:bg-gray-700 text-white transition-all duration-300 hover:bg-[#D5B977] hover:text-[#1a1a3e] hover:shadow-lg"
                  >
                    {tech}
                  </Badge>
                </motion.div>
              ))}
              {project.techStack.length > 4 && (
                <Badge variant="secondary" className="bg-gray-200 text-gray-700">
                  +{project.techStack.length - 4}
                </Badge>
              )}
            </div>

            {/* Enhanced Accordion */}
            <Accordion type="single" collapsible>
              <AccordionItem value="details" className="border-gray-300 dark:border-gray-600">
                <AccordionTrigger className="text-[#1a1a3e] dark:text-white hover:text-[#D5B977] hover:no-underline">
                  <span className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    View Full Details
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6 text-base">
                    {/* Tabs */}
                    <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
                      {["overview", "metrics", "challenges", "outcomes"].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`relative px-3 py-2 text-xs sm:text-sm md:text-base font-semibold capitalize transition-colors ${
                            activeTab === tab
                              ? "text-[#D5B977]"
                              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                          }`}
                        >
                          {tab}
                          {activeTab === tab && (
                            <motion.div
                              className="absolute bottom-0 left-0 h-0.5 w-full bg-[#D5B977]"
                              layoutId={`activeTab-${project.id}`}
                              transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Tab Content */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        {activeTab === "overview" && (
                          <div className="space-y-4 max-w-full">
                            <p className="text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-300">
                              {project.fullDescription}
                            </p>

                            {project.techStack.length > 4 && (
                              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                <p className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                  All Technologies:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {project.techStack.map((tech: string) => (
                                    <Badge
                                      key={tech}
                                      variant="secondary"
                                      className="bg-gray-100 text-gray-700"
                                    >
                                      {tech}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {activeTab === "metrics" && project.metrics && (
                          <div className="grid grid-cols-3 gap-4">
                            {project.metrics.map((metric: any, i: number) => (
                              <MetricCard key={i} metric={metric} inView={inView} delay={i * 0.1} />
                            ))}
                          </div>
                        )}

                        {activeTab === "challenges" && project.challenges && (
                          <ul className="space-y-3 max-w-full">
                            {project.challenges.map((challenge: string, i: number) => (
                              <motion.li
                                key={i}
                                className="flex gap-2 sm:gap-3"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                              >
                                <Target className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-[#D5B977]" />
                                <span className="text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-300">{challenge}</span>
                              </motion.li>
                            ))}
                          </ul>
                        )}

                        {activeTab === "outcomes" && project.outcomes && (
                          <ul className="space-y-3 max-w-full">
                            {project.outcomes.map((outcome: string, i: number) => (
                              <motion.li
                                key={i}
                                className="flex gap-2 sm:gap-3"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                              >
                                <Award className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-green-500" />
                                <span className="text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-300">{outcome}</span>
                              </motion.li>
                            ))}
                          </ul>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {/* Action Buttons */}
                    <div className="flex gap-3 border-t border-gray-200 pt-4">
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#1a1a3e] px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#D5B977] hover:text-[#1a1a3e] hover:shadow-lg"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Github className="h-4 w-4" />
                          View Code
                        </motion.a>
                      )}
                      <motion.a
                        href="#"
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-[#D5B977] px-4 py-2 text-sm font-semibold text-[#D5B977] transition-all duration-300 hover:bg-[#D5B977] hover:text-white hover:shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </motion.a>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
}

interface MetricCardProps {
  metric: { label: string; value: number; suffix: string };
  inView: boolean;
  delay: number;
}

function MetricCard({ metric, inView, delay }: MetricCardProps) {
  return (
    <motion.div
      className="rounded-lg bg-gradient-to-br from-[#1a1a3e] to-[#2d2d5a] p-4 text-center shadow-lg"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      <div className="mb-1 text-3xl font-bold text-[#D5B977]">
        {inView && (
          <CountUp
            end={metric.value}
            duration={2}
            suffix={metric.suffix}
            separator=","
          />
        )}
      </div>
      <div className="text-xs font-medium text-gray-300">{metric.label}</div>
    </motion.div>
  );
}
