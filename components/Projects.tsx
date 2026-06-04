"use client";

import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Github,
  Star,
  ExternalLink,
  Search,
  Users,
  Clock,
  Target,
  Award,
  Image as ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { useState, useMemo } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const categories = ["All", "AI/ML", "Full Stack", "IoT", "DevOps", "Data Science"] as const;

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filteredProjects = useMemo(() => {
    let filtered = projects;
    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.fullDescription.toLowerCase().includes(q) ||
          p.techStack.some((t) => t.toLowerCase().includes(q))
      );
    }
    return filtered;
  }, [selectedCategory, searchQuery]);

  const displayedProjects = useMemo(() => {
    if (showAll || searchQuery.trim() || selectedCategory !== "All") {
      return filteredProjects;
    }
    return filteredProjects.slice(0, 4);
  }, [filteredProjects, showAll, searchQuery, selectedCategory]);

  const isCurated =
    !showAll && selectedCategory === "All" && !searchQuery.trim();

  return (
    <section id="projects" className="section bg-surface">
      <div className="shell">
        <motion.div {...reveal} className="mb-12">
          <p className="eyebrow mb-4">02 — Selected Work</p>
          <h2 className="display max-w-3xl text-[clamp(2rem,5vw,3.5rem)] text-ink">
            Things I&apos;ve designed, trained &amp;{" "}
            <span className="italic text-gold">deployed</span>.
          </h2>
        </motion.div>

        {/* Featured internship case study */}
        <motion.a
          href="/internship"
          {...reveal}
          className="card card-hover group mb-10 grid gap-6 overflow-hidden p-6 md:grid-cols-[auto_1fr_auto] md:items-center md:p-8"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-solid text-ongold">
            <Sparkles className="h-7 w-7" />
          </span>
          <div>
            <span className="chip mb-2 w-fit !border-gold/40 !bg-gold-solid/15 text-gold">
              Internship · Smart NV
            </span>
            <h3 className="font-display text-2xl text-ink md:text-3xl">
IQ Noodles: teaching a phone to solve a puzzle
            </h3>
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted">
              A camera app that detects a real puzzle&apos;s pieces and works out
              how to finish it. Built and trained during my 2026 internship.
              Read the full case study.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 self-start font-medium text-gold md:self-center">
            Read case study
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </motion.a>

        {/* Controls */}
        <motion.div {...reveal} className="mb-10 space-y-5">
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search by name, tech, or keyword…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-line bg-base py-3 pl-11 pr-4 text-sm text-ink placeholder:text-muted transition-colors focus:border-gold focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "border-gold bg-gold-solid/15 text-gold"
                    : "border-line text-muted hover:border-gold/50 hover:text-ink"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${searchQuery}-${showAll}`}
            className="grid gap-6 md:grid-cols-2"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
            }}
          >
            {displayedProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Show more / less */}
        {isCurated && filteredProjects.length > 4 && (
          <div className="mt-12 flex justify-center">
            <button onClick={() => setShowAll(true)} className="btn btn-outline">
              Show all {projects.length} projects
            </button>
          </div>
        )}
        {showAll && selectedCategory === "All" && !searchQuery.trim() && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => {
                setShowAll(false);
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="btn btn-outline"
            >
              Show less
            </button>
          </div>
        )}

        {displayedProjects.length === 0 && (
          <div className="py-20 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-line">
              <Search className="h-7 w-7 text-muted" />
            </div>
            <h3 className="mb-1 font-display text-2xl text-ink">No projects found</h3>
            <p className="text-muted">Try a different search or category.</p>
          </div>
        )}
      </div>
    </section>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function ProjectCard({ project, index }: { project: any; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeTab, setActiveTab] = useState("overview");
  const [showGallery, setShowGallery] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  const photos: string[] = project.photos || [];
  const hasPhotos = photos.length > 0;
  const tabs = ["overview", "metrics", "challenges", "outcomes"].filter((t) => {
    if (t === "metrics") return project.metrics;
    if (t === "challenges") return project.challenges;
    if (t === "outcomes") return project.outcomes;
    return true;
  });

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 28 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.05 } },
      }}
      className="card card-hover flex flex-col overflow-hidden"
    >
      {/* Gallery modal */}
      <AnimatePresence>
        {showGallery && hasPhotos && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setShowGallery(false)}
          >
            <button
              onClick={() => setShowGallery(false)}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
              aria-label="Close gallery"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={imgIndex}
                src={photos[imgIndex]}
                alt={`${project.title} — ${imgIndex + 1}`}
                className="max-h-[82vh] w-auto rounded-xl object-contain"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
              />
              {photos.length > 1 && (
                <>
                  <button
                    onClick={() => setImgIndex((p) => (p - 1 + photos.length) % photos.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => setImgIndex((p) => (p + 1) % photos.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
                    aria-label="Next"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cover */}
      <div className="relative h-44 overflow-hidden border-b border-line bg-surface2">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-700 hover:scale-105"
          />
        ) : (
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle, var(--c-gold-solid) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />

        <div className="absolute left-4 top-4 flex gap-2">
          <span className="chip !bg-base/80 !py-1 backdrop-blur-sm">{project.category}</span>
          {project.featured && (
            <span className="chip !border-gold/40 !bg-gold-solid/20 !py-1 text-gold">
              <Star className="h-3 w-3 fill-current" />
              Featured
            </span>
          )}
        </div>

        <h3 className="absolute inset-x-4 bottom-3 font-display text-xl leading-tight text-ink">
          {project.title}
        </h3>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <p className="text-sm leading-relaxed text-muted">{project.shortDescription}</p>

        <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-gold" />
            {project.duration}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-gold" />
            {project.teamSize}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.techStack.slice(0, 5).map((tech: string) => (
            <span key={tech} className="chip">
              {tech}
            </span>
          ))}
          {project.techStack.length > 5 && (
            <span className="chip">+{project.techStack.length - 5}</span>
          )}
        </div>

        <div className="mt-auto">
          <Accordion type="single" collapsible>
            <AccordionItem value="details" className="border-line">
              <AccordionTrigger className="text-sm font-medium text-ink hover:text-gold hover:no-underline">
                <span className="flex items-center gap-2">
                  <ArrowUpRight className="h-4 w-4" />
                  Full details
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-5 pt-2">
                  <div className="flex flex-wrap gap-1">
                    {tabs.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`relative rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                          activeTab === tab
                            ? "bg-gold-solid/15 text-gold"
                            : "text-muted hover:text-ink"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                    >
                      {activeTab === "overview" && (
                        <div className="space-y-4">
                          <p className="text-sm leading-relaxed text-muted">
                            {project.fullDescription}
                          </p>
                          {project.techStack.length > 5 && (
                            <div className="flex flex-wrap gap-2 border-t border-line pt-4">
                              {project.techStack.map((tech: string) => (
                                <span key={tech} className="chip">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {activeTab === "metrics" && project.metrics && (
                        <div className="grid grid-cols-3 gap-3">
                          {project.metrics.map((m: any, i: number) => (
                            <div
                              key={i}
                              className="rounded-xl border border-line bg-base p-4 text-center"
                            >
                              <div className="font-display text-3xl text-gold">
                                {inView && (
                                  <CountUp end={m.value} duration={1.6} suffix={m.suffix} />
                                )}
                              </div>
                              <div className="mt-1 text-[11px] leading-tight text-muted">
                                {m.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {activeTab === "challenges" && project.challenges && (
                        <ul className="space-y-3">
                          {project.challenges.map((c: string, i: number) => (
                            <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                              <Target className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {activeTab === "outcomes" && project.outcomes && (
                        <ul className="space-y-3">
                          {project.outcomes.map((o: string, i: number) => (
                            <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                              <Award className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
                              <span>{o}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex flex-wrap gap-2 border-t border-line pt-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline flex-1 !py-2 text-sm"
                      >
                        <Github className="h-4 w-4" />
                        Code
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-solid flex-1 !py-2 text-sm"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Demo
                      </a>
                    )}
                    {hasPhotos && (
                      <button
                        onClick={() => setShowGallery(true)}
                        className="btn btn-outline flex-1 !py-2 text-sm"
                      >
                        <ImageIcon className="h-4 w-4" />
                        Photos ({photos.length})
                      </button>
                    )}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </motion.div>
  );
}
