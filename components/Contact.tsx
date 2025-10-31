"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toast, ToastType } from "@/components/ui/toast";
import { Mail, Github, Linkedin, MapPin, Send, Loader2 } from "lucide-react";
import { useState } from "react";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
    isVisible: boolean;
  }>({
    message: "",
    type: "success",
    isVisible: false,
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setToast({
        message: "Please fix the errors in the form",
        type: "error",
        isVisible: true,
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setToast({
        message: "Thank you! Your message has been sent successfully. I'll get back to you soon!",
        type: "success",
        isVisible: true,
      });
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
      setIsSubmitting(false);
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8 },
  };

  return (
    <>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />

      <section id="contact" className="bg-white dark:bg-gray-900 py-20 md:py-32 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp}>
            <h2 className="mb-4 text-center text-4xl font-bold text-[#1a1a3e] dark:text-white md:text-5xl">
              Let&apos;s Build Something Amazing
            </h2>
            <p className="mb-12 text-center text-lg text-gray-600 dark:text-gray-400">
              Have a project in mind? Let&apos;s discuss your next opportunity
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
            {/* Contact Information */}
            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="rounded-2xl bg-gradient-to-br from-[#1a1a3e] to-[#0a0a1c] p-6 sm:p-8 text-white overflow-hidden">
                <h3 className="mb-6 text-xl sm:text-2xl font-bold">Contact Information</h3>

                <div className="space-y-6">
                  <motion.div
                    className="flex items-start gap-4"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#D5B977]">
                      <Mail className="h-6 w-6 text-[#1a1a3e]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-400">Email</p>
                      <a
                        href={`mailto:${personalInfo.email}`}
                        className="text-base sm:text-lg transition-colors hover:text-[#D5B977] break-words"
                      >
                        {personalInfo.email}
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-4"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#D5B977]">
                      <MapPin className="h-6 w-6 text-[#1a1a3e]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-400">Location</p>
                      <p className="text-base sm:text-lg break-words">{personalInfo.location}</p>
                    </div>
                  </motion.div>
                </div>

                <Separator className="my-8 bg-gray-700" />

                <div>
                  <h4 className="mb-4 text-lg font-semibold">Follow Me</h4>
                  <div className="flex gap-4">
                    <motion.a
                      href={personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#1a1a3e] transition-all duration-300 hover:scale-110 hover:bg-[#D5B977]"
                      whileHover={{ y: -5 }}
                      aria-label="GitHub profile"
                    >
                      <Github className="h-6 w-6" />
                    </motion.a>
                    <motion.a
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#1a1a3e] transition-all duration-300 hover:scale-110 hover:bg-[#D5B977]"
                      whileHover={{ y: -5 }}
                      aria-label="LinkedIn profile"
                    >
                      <Linkedin className="h-6 w-6" />
                    </motion.a>
                  </div>
                </div>
              </div>

              <motion.div
                className="rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-6 sm:p-8"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="mb-4 text-lg sm:text-xl font-bold text-[#1a1a3e] dark:text-white">
                  Open to Opportunities
                </h3>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  I&apos;m currently looking for AI/ML Engineer positions,
                  full-stack development roles, and exciting internship
                  opportunities. Feel free to reach out if you think I&apos;d be
                  a good fit for your team!
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div {...fadeInUp} transition={{ duration: 0.8, delay: 0.4 }}>
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-[#1a1a3e] dark:text-white"
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full rounded-lg border-2 px-4 py-3 bg-white dark:bg-gray-800 dark:text-gray-100 transition-all duration-300 focus:outline-none ${
                      errors.name
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 dark:border-gray-600 focus:border-[#D5B977]"
                    }`}
                    placeholder="John Doe"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <motion.p
                      id="name-error"
                      className="mt-1 text-sm text-red-500"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-[#1a1a3e] dark:text-white"
                  >
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full rounded-lg border-2 px-4 py-3 bg-white dark:bg-gray-800 dark:text-gray-100 transition-all duration-300 focus:outline-none ${
                      errors.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 dark:border-gray-600 focus:border-[#D5B977]"
                    }`}
                    placeholder="john@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <motion.p
                      id="email-error"
                      className="mt-1 text-sm text-red-500"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-semibold text-[#1a1a3e] dark:text-white"
                  >
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className={`w-full rounded-lg border-2 px-4 py-3 bg-white dark:bg-gray-800 dark:text-gray-100 transition-all duration-300 focus:outline-none ${
                      errors.message
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 dark:border-gray-600 focus:border-[#D5B977]"
                    }`}
                    placeholder="Tell me about your project or opportunity..."
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && (
                    <motion.p
                      id="message-error"
                      className="mt-1 text-sm text-red-500"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#1a1a3e] py-6 text-lg font-semibold text-white transition-all duration-300 hover:bg-[#D5B977] hover:text-[#1a1a3e] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <motion.footer
          className="mt-20 border-t border-gray-200 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
              <p className="text-gray-600">
                © {new Date().getFullYear()} {personalInfo.name}. All rights
                reserved.
              </p>
              <p className="text-gray-600">
                Built with Next.js, TypeScript, and Tailwind CSS
              </p>
            </div>
          </div>
        </motion.footer>
      </section>
    </>
  );
}
