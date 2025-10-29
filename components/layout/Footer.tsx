"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Heart } from "lucide-react";
import { fadeInUp, scrollReveal } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: "Find Help", href: "/find-help" },
      { label: "Offer Help", href: "/offer-help" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Pricing", href: "/pricing" },
    ],
    resources: [
      { label: "Documentation", href: "/docs" },
      { label: "Help Center", href: "/help" },
      { label: "Blog", href: "/blog" },
      { label: "Status", href: "/status" },
    ],
    company: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
      { label: "Terms", href: "/terms" },
    ],
  };

  const socialLinks = [
    {
      label: "GitHub",
      href: "https://github.com/microcollab",
      icon: Github,
    },
    {
      label: "Twitter",
      href: "https://twitter.com/microcollab",
      icon: Twitter,
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/company/microcollab",
      icon: Linkedin,
    },
  ];

  const techStack = [
    "Next.js 16",
    "React 19",
    "TypeScript",
    "Supabase",
    "Tailwind CSS 4",
    "Framer Motion",
  ];

  return (
    <footer className="section-alt-3 relative overflow-hidden border-t border-white/10">
      {/* Background Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute bottom-0 left-1/2 h-64 w-96 -translate-x-1/2"
      >
        <div className="glow-pink h-full w-full" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Section */}
          <motion.div
            {...scrollReveal}
            variants={fadeInUp}
            className="lg:col-span-2"
          >
            <Link href="/" className="inline-block">
              <h3 className="gradient-text-glow font-display text-2xl font-extrabold">
                MicroCollab
              </h3>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-steel">
              Connect with expert developers for short, focused help sessions.
              Get unstuck fast. Build better, together.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="glass"
                  size="icon"
                  asChild
                >
                  <motion.a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Product Links */}
          <motion.div
            {...scrollReveal}
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
          >
            <h4 className="mb-4 font-display text-sm font-semibold text-white">
              Product
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-sm text-steel transition-colors hover:text-brand-emerald"
                  >
                    <span className="transition-transform group-hover:translate-x-1">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div
            {...scrollReveal}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <h4 className="mb-4 font-display text-sm font-semibold text-white">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-sm text-steel transition-colors hover:text-brand-emerald"
                  >
                    <span className="transition-transform group-hover:translate-x-1">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            {...scrollReveal}
            variants={fadeInUp}
            transition={{ delay: 0.3 }}
          >
            <h4 className="mb-4 font-display text-sm font-semibold text-white">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-sm text-steel transition-colors hover:text-brand-emerald"
                  >
                    <span className="transition-transform group-hover:translate-x-1">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Tech Stack */}
        <motion.div
          {...scrollReveal}
          variants={fadeInUp}
          transition={{ delay: 0.4 }}
          className="mt-12 border-t border-white/10 pt-8"
        >
          <h4 className="mb-4 text-center font-display text-sm font-semibold text-white">
            Built With
          </h4>
          <div className="flex flex-wrap justify-center gap-2">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.05 }}
              >
                <Badge variant="glass" className="hover:scale-105">
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          {...scrollReveal}
          variants={fadeInUp}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row"
        >
          <p className="flex items-center gap-2 text-sm text-steel">
            © {currentYear} MicroCollab. Made with
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Heart className="h-4 w-4 fill-brand-pink text-brand-pink" />
            </motion.span>
            by developers, for developers.
          </p>
          <div className="flex items-center gap-6 text-sm text-steel">
            <Link
              href="/privacy"
              className="transition-colors hover:text-brand-emerald"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-brand-emerald"
            >
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
