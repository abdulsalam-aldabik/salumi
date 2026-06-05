"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { Toast, ToastType } from "@/components/ui/toast";
import { Mail, Github, Linkedin, MapPin, Send, Loader2, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "@formspree/react";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

export function Contact() {
  const [state, handleFormspreeSubmit] = useForm("xwpwrdpn");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [toast, setToast] = useState<{ message: string; type: ToastType; isVisible: boolean }>({
    message: "",
    type: "success",
    isVisible: false,
  });

  useEffect(() => {
    if (state.succeeded) {
      setToast({
        message: "Thank you! Your message has been sent — I'll get back to you soon.",
        type: "success",
        isVisible: true,
      });
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    }
  }, [state.succeeded]);

  useEffect(() => {
    if (state.errors && Object.keys(state.errors).length > 0) {
      setToast({
        message: "Something went wrong. Please try again or email me directly.",
        type: "error",
        isVisible: true,
      });
    }
  }, [state.errors]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (formData.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email address";

    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      setToast({ message: "Please fix the errors in the form.", type: "error", isVisible: true });
      return;
    }
    handleFormspreeSubmit(e);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full rounded-xl border bg-base px-4 py-3 text-ink placeholder:text-muted transition-colors focus:outline-none ${
      hasError ? "border-red-500 focus:border-red-500" : "border-line focus:border-gold"
    }`;

  return (
    <>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />

      <section id="contact" className="section bg-base">
        <div className="shell">
          <motion.div {...reveal} className="mb-14">
            <p className="eyebrow mb-4">05 — Contact</p>
            <h2 className="display max-w-3xl text-[clamp(2rem,5vw,3.5rem)] text-ink">
              Let&apos;s build something{" "}
              <span className="italic text-gold">worth trusting</span>.
            </h2>
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            {/* Info */}
            <motion.div {...reveal} className="space-y-8">
              <p className="max-w-md text-lg leading-relaxed text-muted">
                I&apos;m open to AI/ML  roles, full-stack work. Have an idea or an opportunity? Reach out.
              </p>

              <div className="space-y-4">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="card card-hover flex items-center gap-4 p-5"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-solid/10 text-gold">
                    <Mail className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[11px] uppercase tracking-wider text-muted">
                      Email
                    </span>
                    <span className="block truncate text-ink">{personalInfo.email}</span>
                  </span>
                </a>

                <div className="card flex items-center gap-4 p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-solid/10 text-gold">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[11px] uppercase tracking-wider text-muted">
                      Location
                    </span>
                    <span className="block text-ink">{personalInfo.location}</span>
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <SocialButton href={personalInfo.github} label="GitHub" icon={Github} />
                <SocialButton href={personalInfo.linkedin} label="LinkedIn" icon={Linkedin} />
              </div>
            </motion.div>

            {/* Form */}
            <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.1 }}>
              <form onSubmit={handleSubmit} className="card space-y-5 p-6 md:p-8" noValidate>
                <Field label="Your Name" htmlFor="name" error={errors.name}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    className={inputClass(!!errors.name)}
                    aria-invalid={!!errors.name}
                  />
                </Field>

                <Field label="Your Email" htmlFor="email" error={errors.email}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    className={inputClass(!!errors.email)}
                    aria-invalid={!!errors.email}
                  />
                </Field>

                <Field label="Your Message" htmlFor="message" error={errors.message}>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or opportunity…"
                    className={inputClass(!!errors.message)}
                    aria-invalid={!!errors.message}
                  />
                </Field>

                <button
                  type="submit"
                  disabled={state.submitting}
                  className="btn btn-solid w-full disabled:opacity-50"
                >
                  {state.submitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 border-t border-line">
          <div className="shell flex flex-col items-center justify-between gap-3 py-8 text-sm text-muted md:flex-row">
            <p>
              © {new Date().getFullYear()} {personalInfo.name}
            </p>
            <p className="font-mono text-xs">
              Built with Next.js, TypeScript &amp; Tailwind CSS
            </p>
          </div>
        </footer>
      </section>
    </>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-ink">
        {label} <span className="text-gold">*</span>
      </label>
      {children}
      {error && (
        <motion.p
          className="mt-1.5 text-sm text-red-500"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

function SocialButton({
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
      className="card card-hover group inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-ink"
    >
      <Icon className="h-4 w-4 text-gold" />
      {label}
      <ArrowUpRight className="h-3.5 w-3.5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}
