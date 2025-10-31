"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { ChevronDown, Github, Linkedin, Mail, Download, Sparkles } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { TypeAnimation } from "react-type-animation";

export function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  // Mouse position for parallax effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 100 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Floating particles animation
  const [particles, setParticles] = useState<Array<{ x: number; y: number; size: number; delay: number; duration: number }>>([]);
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    // Reduce particles from 40 to 15 for better performance
    const newParticles = Array.from({ length: 15 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 3,
    }));
    setParticles(newParticles);
  }, []);

  // Mouse move handler for parallax effects with throttling
  useEffect(() => {
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      // Cancel previous animation frame
      if (rafId) cancelAnimationFrame(rafId);
      
      // Use requestAnimationFrame for smooth performance
      rafId = requestAnimationFrame(() => {
        const rect = heroRef.current!.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        mouseX.set(x * 20);
        mouseY.set(y * 20);
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [mouseX, mouseY]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a0a1c] via-[#1a1a3e] to-[#0a0a1c] dark:from-[#000000] dark:via-[#0a0e1a] dark:to-[#000000]"
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#D5B977]/10 via-transparent to-[#D5B977]/10"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ backgroundSize: "200% 200%" }}
      />

      {/* Animated grid pattern overlay - simplified for performance */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `
          linear-gradient(to right, #D5B977 1px, transparent 1px),
          linear-gradient(to bottom, #D5B977 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
      }} />

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E\")",
        }}
      />

      {/* Animated floating particles */}
      {mounted && particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-[#D5B977] blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.sin(index) * 20, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Animated SVG shapes - reduced for performance */}
      <motion.div
        className="absolute left-10 top-20 opacity-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <svg width="100" height="100" viewBox="0 0 100 100">
          <polygon points="50,10 90,90 10,90" fill="none" stroke="#D5B977" strokeWidth="2" />
        </svg>
      </motion.div>

      {/* Animated background gradient circles - simplified */}
      <div className="absolute right-20 top-20 h-96 w-96 rounded-full bg-[#D5B977] opacity-10 blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 left-20 h-96 w-96 rounded-full bg-[#D5B977] opacity-10 blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />

      {/* Glassmorphism content container */}
      <motion.div 
        style={{ opacity, scale }}
        className="container relative z-10 mx-auto px-4"
      >
        <motion.div
          className="relative mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-12 lg:p-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ x: mouseXSpring, y: mouseYSpring }}
        >
          {/* Animated border gradient */}
          <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-[#D5B977]/50 via-[#c2a562]/50 to-[#D5B977]/50 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
          
          <div className="flex flex-col items-center text-center">
            {/* Sparkle icon animation */}
            <motion.div
              className="mb-6"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles className="h-12 w-12 text-[#D5B977]" />
            </motion.div>

            {/* Animated name with stagger effect */}
            <motion.h1
              className="mb-4 text-5xl font-bold md:text-7xl lg:text-8xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {personalInfo.name.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  className="inline-block bg-gradient-to-r from-white via-[#D5B977] to-white bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 50, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2 + index * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    scale: 1.05,
                    textShadow: "0 0 20px rgba(213, 185, 119, 0.8)",
                    transition: { duration: 0.2 },
                  }}
                  style={{
                    display: "inline-block",
                    marginRight: "0.3em",
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
            
            {/* Nickname with pulse animation */}
            {personalInfo.nickname && (
              <motion.p
                className="mb-4 text-xl text-[#D5B977] md:text-2xl lg:text-3xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <motion.span
                  animate={{
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  &quot;{personalInfo.nickname}&quot;
                </motion.span>
              </motion.p>
            )}

            {/* Rotating title with typing animation */}
            <motion.div
              className="mb-6 h-12 text-2xl font-semibold text-white md:text-3xl lg:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {mounted && (
                <TypeAnimation
                  sequence={[
                    "AI Engineer & Developer",
                    2000,
                    "Machine Learning Specialist",
                    2000,
                    "Full-Stack Developer",
                    2000,
                    "Applied Computer Science Student",
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="bg-gradient-to-r from-white to-[#D5B977] bg-clip-text text-transparent"
                />
              )}
            </motion.div>

            {/* Tagline with letter-by-letter animation */}
            <motion.p
              className="mb-10 max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              {personalInfo.tagline.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.03,
                    delay: 1.4 + index * 0.03,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.p>

            {/* Magnetic buttons with enhanced effects */}
            <motion.div
              className="flex flex-col gap-4 sm:flex-row sm:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2 }}
            >
              <MagneticButton href="#projects">
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  View Projects
                </span>
              </MagneticButton>

              <MagneticButton href="#contact" variant="outline">
                <span className="relative z-10 flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Let&apos;s Connect
                </span>
              </MagneticButton>

              <MagneticButton href="/Abdul_Salam_CV.pdf" variant="outline" download>
                <span className="relative z-10 flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Download CV
                </span>
              </MagneticButton>
            </motion.div>

            {/* Social links with glow effect */}
            <motion.div
              className="mt-10 flex gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.2 }}
            >
              {personalInfo.github && (
                <SocialLink href={personalInfo.github} icon={Github} label="GitHub" />
              )}
              {personalInfo.linkedin && (
                <SocialLink href={personalInfo.linkedin} icon={Linkedin} label="LinkedIn" />
              )}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Animated scroll indicator with bounce */}
      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          y: [0, 15, 0],
        }}
        transition={{
          opacity: { duration: 1, delay: 2.5 },
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }
        }}
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll to about section"
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-[#D5B977]">
            Scroll
          </span>
          <div className="rounded-full border-2 border-[#D5B977] p-2">
            <ChevronDown className="h-6 w-6 text-[#D5B977]" />
          </div>
        </motion.div>
      </motion.a>
    </section>
  );
}

// Magnetic Button Component
interface MagneticButtonProps {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "outline";
  download?: boolean;
}

function MagneticButton({ children, href, variant = "primary", download }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 300 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const baseClasses = "group relative overflow-hidden rounded-full px-8 py-4 font-semibold transition-all duration-300";
  const variantClasses = variant === "primary"
    ? "bg-[#D5B977] text-[#1a1a3e] hover:shadow-2xl hover:shadow-[#D5B977]/50"
    : "border-2 border-[#D5B977] text-[#D5B977] hover:shadow-2xl hover:shadow-[#D5B977]/30";

  return (
    <motion.a
      ref={buttonRef}
      href={href}
      download={download}
      className={`${baseClasses} ${variantClasses}`}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
    >
      {/* Ripple effect container */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`h-full w-full rounded-full ${
              variant === "primary" ? "bg-white" : "bg-[#D5B977]"
            }`} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated background gradient */}
      <motion.div
        className={`absolute inset-0 ${
          variant === "primary" 
            ? "bg-gradient-to-r from-white to-[#D5B977]" 
            : "bg-[#D5B977]"
        }`}
        initial={{ x: variant === "primary" ? "-100%" : "100%" }}
        whileHover={{ x: 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Button content with color transition */}
      <span className={`relative z-10 transition-colors ${
        variant === "outline" ? "group-hover:text-[#1a1a3e]" : ""
      }`}>
        {children}
      </span>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-[#D5B977] opacity-0 blur-xl"
        animate={{
          opacity: isHovered ? 0.5 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
}

// Social Link Component with hover effects
interface SocialLinkProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

function SocialLink({ href, icon: Icon, label }: SocialLinkProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative rounded-full border-2 border-white/20 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:border-[#D5B977] hover:bg-[#D5B977]/10"
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
    >
      <Icon className="h-6 w-6 text-white transition-colors group-hover:text-[#D5B977]" />
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-[#D5B977] opacity-0 blur-xl"
        whileHover={{ opacity: 0.6 }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
}
