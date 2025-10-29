"use client";

import { motion } from "framer-motion";
import { fadeInDown, fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { AnimatedGrid } from "@/components/animations/AnimatedGrid";
import { ConnectionNetwork } from "@/components/animations/ConnectionNetwork";
import { ParticleField } from "@/components/animations/ParticleField";
import { FloatingShapes } from "@/components/animations/FloatingShapes";

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Base Background */}
      <div className="absolute inset-0 bg-gradient-glow" />

      {/* Multi-Layer Animation System */}
      {!shouldReduceMotion && (
        <>
          {/* Layer 1: Animated Grid Background (Depth: Furthest) */}
          <AnimatedGrid className="z-0 opacity-30" />

          {/* Layer 2: Floating 3D Shapes (Depth: Far) */}
          <FloatingShapes className="z-10 opacity-60" shapeCount={4} />

          {/* Layer 3: Connection Network (Depth: Mid) */}
          <ConnectionNetwork className="z-20 opacity-70" nodeCount={8} />

          {/* Layer 4: Interactive Particle Field (Depth: Near) */}
          <ParticleField className="z-30 opacity-50" particleCount={40} />
        </>
      )}

      {/* Gradient Overlay for Depth */}
      <div className="absolute inset-0 z-40 gradient-overlay" />

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-50 w-full max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8"
      >
        {/* Logo + Tagline */}
        <motion.h1
          variants={fadeInDown}
          className="mb-4 font-display text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <motion.span
            className="gradient-text inline-block"
            animate={
              !shouldReduceMotion
                ? {
                    textShadow: [
                      "0 0 18px rgba(236, 72, 153, 0.4)",
                      "0 0 30px rgba(236, 72, 153, 0.6)",
                      "0 0 18px rgba(236, 72, 153, 0.4)",
                    ],
                  }
                : {}
            }
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            MicroCollab
          </motion.span>
        </motion.h1>

        <motion.p
          variants={staggerItem}
          className="mb-2 text-xl font-medium text-white sm:text-2xl md:text-3xl"
        >
          Find help fast. Collaborate smart.
        </motion.p>
        <motion.p
          variants={staggerItem}
          className="mb-12 text-base text-emerald-400 sm:text-lg md:text-xl"
        >
          Short sessions. Big impact.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={staggerItem}
          className="flex flex-col gap-4 sm:flex-row sm:justify-center"
        >
          <Button variant="gradient" size="lg" asChild>
            <motion.a
              href="/find-help"
              whileHover={
                !shouldReduceMotion
                  ? {
                      scale: 1.05,
                      boxShadow: "0 0 30px rgba(236, 72, 153, 0.6)",
                    }
                  : {}
              }
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Find Help Now
            </motion.a>
          </Button>

          <Button variant="outline" size="lg" asChild>
            <motion.a
              href="/offer-help"
              whileHover={
                !shouldReduceMotion
                  ? {
                      scale: 1.05,
                      boxShadow: "0 0 25px rgba(16, 185, 129, 0.5)",
                      borderColor: "rgba(16, 185, 129, 0.8)",
                    }
                  : {}
              }
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Offer Help
            </motion.a>
          </Button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          variants={fadeInUp}
          className="mt-16 flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-12"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-2 opacity-70 transition-opacity hover:opacity-100"
          >
            <div className="h-2 w-2 animate-pulse rounded-full bg-success" />
            <span className="text-sm text-steel">50+ Active Sessions</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-2 opacity-70 transition-opacity hover:opacity-100"
          >
            <div className="h-2 w-2 animate-pulse rounded-full bg-brand-sky" />
            <span className="text-sm text-steel">200+ Expert Helpers</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-2 opacity-70 transition-opacity hover:opacity-100"
          >
            <div className="h-2 w-2 animate-pulse rounded-full bg-brand-pink" />
            <span className="text-sm text-steel">4.8/5 Avg Rating</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
