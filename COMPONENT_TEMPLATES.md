# Component Templates - Design System

Use these templates to ensure consistency across all components.

---

## Section Template

```tsx
"use client";

import { motion } from "framer-motion";

export function SectionName() {
  // Standard fade-in animation
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Stagger container for multiple items
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="section-name" className="py-20 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* Section Title */}
        <motion.div {...fadeInUp}>
          <h2 className="mb-4 text-center text-4xl font-bold text-primary md:text-5xl">
            Section Title
          </h2>
          <p className="mb-12 text-center text-lg text-gray-600 md:mb-16">
            Section description goes here
          </p>
        </motion.div>

        {/* Content Grid */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Items go here */}
        </motion.div>
      </div>
    </section>
  );
}
```

---

## Card Component Template

```tsx
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "lucide-react";

interface CardItemProps {
  title: string;
  description: string;
  tags?: string[];
  featured?: boolean;
}

export function CardItem({ title, description, tags, featured }: CardItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Card className="group relative h-full overflow-hidden border-2 border-gray-100 bg-white transition-all duration-500 hover:-translate-y-2 hover:border-accent/30 hover:shadow-2xl">
        {/* Featured Badge */}
        {featured && (
          <div className="absolute right-4 top-4 z-10">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
              Featured
            </Badge>
          </div>
        )}

        {/* Card Header */}
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
            {title}
          </CardTitle>
          <CardDescription className="mt-2 text-base text-gray-700">
            {description}
          </CardDescription>
        </CardHeader>

        {/* Card Content */}
        <CardContent className="space-y-4">
          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  className="border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-medium text-accent-dark transition-colors duration-200 hover:bg-accent/20"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Action Button */}
          <motion.button
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-3 font-semibold text-white shadow-lg shadow-accent/30 transition-all duration-300 hover:scale-105 hover:bg-accent-dark hover:shadow-xl hover:shadow-accent/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon className="h-5 w-5" />
            Learn More
          </motion.button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
```

---

## Button Component Template

```tsx
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  icon?: LucideIcon;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export function Button({ 
  children, 
  variant = "primary", 
  icon: Icon, 
  onClick, 
  href,
  className = "" 
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";
  
  const variantClasses = {
    primary: "rounded-full bg-accent px-8 py-4 text-white shadow-lg shadow-accent/30 hover:scale-105 hover:bg-accent-dark hover:shadow-xl hover:shadow-accent/50",
    secondary: "rounded-full border-2 border-accent px-8 py-4 text-accent hover:bg-accent hover:text-white",
    ghost: "rounded-lg bg-transparent px-6 py-3 text-gray-600 hover:bg-accent/5 hover:text-accent",
  };

  const Component = href ? motion.a : motion.button;
  const props = href ? { href } : { onClick };

  return (
    <Component
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      whileHover={{ scale: variant === "ghost" ? 1 : 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {Icon && <Icon className="h-5 w-5" />}
      {children}
    </Component>
  );
}
```

---

## Badge Component Template

```tsx
import { motion } from "framer-motion";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "featured";
  className?: string;
}

export function CustomBadge({ children, variant = "default", className = "" }: BadgeProps) {
  const variantClasses = {
    default: "border border-accent/20 bg-accent/10 text-accent-dark hover:bg-accent/20",
    primary: "border-0 bg-primary text-white hover:bg-primary-light",
    featured: "border-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg",
  };

  return (
    <motion.span
      className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${variantClasses[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
    >
      {children}
    </motion.span>
  );
}
```

---

## Icon Component Template

```tsx
import { LucideIcon } from "lucide-react";

interface IconWrapperProps {
  icon: LucideIcon;
  size?: "sm" | "md" | "lg" | "xl";
  color?: "default" | "primary" | "accent";
  className?: string;
}

export function IconWrapper({ 
  icon: Icon, 
  size = "md", 
  color = "default",
  className = "" 
}: IconWrapperProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
    xl: "h-8 w-8",
  };

  const colorClasses = {
    default: "text-gray-600",
    primary: "text-primary",
    accent: "text-accent",
  };

  return (
    <Icon className={`${sizeClasses[size]} ${colorClasses[color]} ${className}`} />
  );
}
```

---

## Form Input Template

```tsx
import { motion } from "framer-motion";
import { useState } from "react";

interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  value: string;
  onChange: (value: string) => void;
}

export function FormInput({ 
  label, 
  type = "text", 
  placeholder, 
  required, 
  error,
  value,
  onChange 
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </label>
      
      <motion.input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full rounded-lg border-2 bg-white px-4 py-3 transition-all duration-300 focus:outline-none ${
          error
            ? "border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200"
            : isFocused
            ? "border-accent focus:ring-2 focus:ring-accent/20"
            : "border-gray-200 hover:border-gray-300"
        }`}
        animate={{
          scale: isFocused ? 1.01 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
      
      {error && (
        <motion.p
          className="mt-1 text-sm text-red-600"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
```

---

## Accordion Item Template

```tsx
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden rounded-lg border-2 border-gray-100 bg-white transition-all duration-300 hover:border-accent/30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors duration-200 hover:bg-gray-50"
      >
        <span className="text-lg font-semibold text-primary">{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="h-5 w-5 text-accent" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t border-gray-100 px-6 py-4 text-gray-700">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

---

## Loading Spinner Template

```tsx
import { motion } from "framer-motion";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "accent" | "white";
}

export function Spinner({ size = "md", color = "accent" }: SpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  };

  const colorClasses = {
    primary: "border-primary/20 border-t-primary",
    accent: "border-accent/20 border-t-accent",
    white: "border-white/20 border-t-white",
  };

  return (
    <motion.div
      className={`rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}
```

---

## Toast Notification Template

```tsx
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, X } from "lucide-react";
import { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const Icon = type === "success" ? CheckCircle : XCircle;
  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-4 right-4 z-50 flex items-center gap-3 rounded-lg ${bgColor} px-6 py-4 text-white shadow-2xl`}
    >
      <Icon className="h-5 w-5" />
      <p className="font-medium">{message}</p>
      <button
        onClick={onClose}
        className="ml-2 rounded-full p-1 transition-colors hover:bg-white/20"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

// Usage with AnimatePresence:
// <AnimatePresence>
//   {showToast && (
//     <Toast
//       message="Success!"
//       type="success"
//       onClose={() => setShowToast(false)}
//     />
//   )}
// </AnimatePresence>
```

---

## Modal/Dialog Template

```tsx
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border-2 border-gray-100 bg-white p-8 shadow-2xl"
          >
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-primary">{title}</h3>
              <button
                onClick={onClose}
                className="rounded-full p-2 transition-colors hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="text-gray-700">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

---

## Stats Counter Template

```tsx
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface StatsProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export function StatCounter({ value, label, suffix = "", prefix = "", duration = 2 }: StatsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const increment = value / (duration * 60); // 60 fps
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="rounded-2xl border-2 border-gray-100 bg-white p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-accent/30 hover:shadow-2xl"
    >
      <div className="mb-2 text-5xl font-bold text-accent">
        {prefix}
        {count}
        {suffix}
      </div>
      <div className="text-lg font-medium text-gray-600">{label}</div>
    </motion.div>
  );
}
```

---

## Usage Example: Complete Component

```tsx
"use client";

import { motion } from "framer-motion";
import { Sparkles, Github, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ExampleComponent() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* Title */}
        <motion.div {...fadeInUp} className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Section Title
          </h2>
          <p className="text-lg text-gray-600">
            Section description goes here
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants}>
            <Card className="group h-full overflow-hidden border-2 border-gray-100 bg-white transition-all duration-500 hover:-translate-y-2 hover:border-accent/30 hover:shadow-2xl">
              <CardHeader>
                <Badge className="w-fit border border-accent/20 bg-accent/10 px-4 py-2 text-accent-dark">
                  <Sparkles className="mr-1 h-4 w-4" />
                  Featured
                </Badge>
                <CardTitle className="mt-4 text-2xl font-bold text-primary">
                  Card Title
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Card description goes here
                </p>
                
                {/* Buttons */}
                <div className="flex gap-3">
                  <motion.a
                    href="#"
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition-all duration-300 hover:scale-105 hover:bg-accent-dark hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="h-4 w-4" />
                    Code
                  </motion.a>
                  <motion.a
                    href="#"
                    className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-accent px-6 py-3 text-sm font-semibold text-accent transition-all duration-300 hover:bg-accent hover:text-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="h-4 w-4" />
                    Demo
                  </motion.a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
```

---

## Best Practices

1. **Always use motion components** from Framer Motion for animations
2. **Include viewport={{ once: true }}** to prevent re-triggering animations on scroll
3. **Use consistent transition durations**: 200ms, 300ms, 500ms, 800ms
4. **Add focus-visible states** for accessibility
5. **Use the design system colors**: primary (#1a1f36), accent (#00d4ff)
6. **Follow the 8px spacing grid**: gap-6, p-8, py-20, etc.
7. **Include hover states** on all interactive elements
8. **Use semantic HTML** (section, article, aside, etc.)
9. **Add ARIA labels** for screen readers
10. **Test on mobile** - ensure responsive design works

---

**Remember:** Copy these templates and modify them to fit your needs. Consistency is key to a professional portfolio!
