"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { personalInfo } from "@/lib/data";
import { useCountUp } from "@/lib/hooks";
import { MapPin, GraduationCap, Download, Github, Linkedin, Mail } from "lucide-react";

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

export function About() {
  return (
    <section id="about" className="section bg-base">
      <div className="shell">
        <motion.div {...reveal} className="mb-14">
          <p className="eyebrow mb-4">01 — About</p>
          <h2 className="display max-w-3xl text-[clamp(2rem,5vw,3.5rem)] text-ink">
            Driven to build technology that{" "}
            <span className="italic text-gold">earns trust</span>.
          </h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.4fr] lg:gap-16">
          {/* Profile card */}
          <motion.div {...reveal} className="space-y-5 self-start">
            <ProfilePhoto />

            <div className="card p-6">
              <h3 className="font-display text-xl text-ink">{personalInfo.name}</h3>
              <p className="mt-1 text-sm text-gold">{personalInfo.title}</p>

              <div className="mt-4 space-y-2 text-sm text-muted">
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 flex-shrink-0 text-gold" />
                  {personalInfo.location}
                </span>
                <span className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 flex-shrink-0 text-gold" />
                  {personalInfo.university}
                </span>
              </div>

              <a
                href="/Abdul_Salam_CV.pdf"
                download
                className="btn btn-solid mt-5 w-full text-sm"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>

              <div className="mt-3 flex gap-2">
                <IconLink href={personalInfo.github} label="GitHub" icon={Github} />
                <IconLink href={personalInfo.linkedin} label="LinkedIn" icon={Linkedin} />
                <IconLink href={`mailto:${personalInfo.email}`} label="Email" icon={Mail} />
              </div>
            </div>
          </motion.div>

          {/* Narrative + stats */}
          <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.1 }}>
            <div className="space-y-5 text-lg leading-relaxed text-muted">
              <p>
                I&apos;m{" "}
                <span className="text-ink">Abdul Salam Aldabik</span> (
                <span className="text-gold">Salumi</span>), an Applied Computer
                Science student at {personalInfo.university} specializing in
                Artificial Intelligence.
              </p>
              <p>
                My work spans deep-learning computer vision, multi-agent
                systems and self-hosted infrastructure. I care about systems
                that stay private and explainable, whether that&apos;s a vision
                model steering a car or a home server running voice automation
                fully on-device.
              </p>
              <p>
                I also work well in teams, where I&apos;m usually the one mapping
                the architecture and keeping people moving. I treat each build
                as a problem to get right, one decision at a time.
              </p>
            </div>

            <div className="card mt-8 grid grid-cols-2 divide-line sm:grid-cols-4 sm:divide-x">
              <Stat value={9} suffix="+" label="Projects shipped" />
              <Stat value={6} suffix=" yrs" label="Building & self-hosting" />
              <Stat value={50} suffix="+" label="Tools & technologies" />
              <Stat value={99} suffix="%" label="Infra uptime" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProfilePhoto() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="card relative aspect-[4/5] overflow-hidden">
      {/* Monogram placeholder */}
      <div className="glow-warm absolute inset-0 flex items-center justify-center bg-surface2">
        <span className="font-display text-[7rem] leading-none text-gold/80">AS</span>
      </div>
      {/* Real photo fades in if /profile.jpg is added */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/profile.jpg"
        alt={personalInfo.name}
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

function IconLink({
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
      className="flex h-10 flex-1 items-center justify-center rounded-xl border border-line text-muted transition-colors hover:border-gold hover:text-gold"
    >
      <Icon className="h-[18px] w-[18px]" />
    </a>
  );
}

function Stat({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const { ref, count } = useCountUp(value, 1600);
  return (
    <div ref={ref} className="px-5 py-6 text-center">
      <span className="block font-display text-3xl text-gold md:text-4xl">
        {count}
        {suffix}
      </span>
      <span className="mt-1 block text-xs leading-tight text-muted">{label}</span>
    </div>
  );
}
