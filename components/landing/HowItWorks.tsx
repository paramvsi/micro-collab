"use client";

import { motion } from "framer-motion";
import { fadeInUp, scrollReveal } from "@/lib/animations";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileEdit, UserCheck2, Code2, CheckCircle2 } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Post Your Request",
      description:
        "Describe what you need help with. Whether it's debugging, refactoring, or architectural guidance.",
      icon: FileEdit,
      color: "from-brand-indigo to-brand-pink",
      gradientId: "gradient-step-01",
    },
    {
      number: "02",
      title: "Get Matched",
      description:
        "Receive offers from experienced developers. Review profiles, rates, and availability.",
      icon: UserCheck2,
      color: "from-brand-pink to-brand-orange",
      gradientId: "gradient-step-02",
    },
    {
      number: "03",
      title: "Collaborate",
      description:
        "Schedule a 1-4 hour session. Work together in real-time via your preferred platform.",
      icon: Code2,
      color: "from-brand-emerald to-brand-sky",
      gradientId: "gradient-step-03",
    },
    {
      number: "04",
      title: "Get Results",
      description:
        "Close your request when done. Rate your experience and help the community grow.",
      icon: CheckCircle2,
      color: "from-brand-sky to-brand-indigo",
      gradientId: "gradient-step-04",
    },
  ];

  // Stagger animation for step cards
  const stepVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    }),
  };

  return (
    <section className="section-depth relative overflow-hidden">
      {/* SVG Gradient Definitions */}
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <defs>
          {/* Step 01: Indigo → Pink */}
          <linearGradient id="gradient-step-01" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>

          {/* Step 02: Pink → Orange */}
          <linearGradient id="gradient-step-02" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>

          {/* Step 03: Emerald → Sky */}
          <linearGradient id="gradient-step-03" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>

          {/* Step 04: Sky → Indigo */}
          <linearGradient id="gradient-step-04" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
        </defs>
      </svg>

      {/* Background Accent */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.2, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute right-0 top-0 h-96 w-96"
      >
        <div className="glow-emerald h-full w-full" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          {...scrollReveal}
          variants={fadeInUp}
          className="mb-16 text-center"
        >
          <h2 className="section-heading font-display text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="section-subtext mx-auto max-w-2xl">
            Get the <span className="gradient-subtext font-semibold">help you need</span> in four simple steps. Fast, focused, and collaborative.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={stepVariants}
              className="group relative h-full"
            >
              {/* Step Card with enhanced glow */}
              <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ duration: 0.3 }}>
                <Card variant="glass" className="card-glow h-full relative overflow-visible">
                  <CardHeader>
                    {/* Step Number with gradient */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                      className={`mb-4 inline-block bg-gradient-to-r ${step.color} bg-clip-text text-5xl font-bold text-transparent`}
                    >
                      {step.number}
                    </motion.div>

                    {/* Icon with bounce and gradient */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.4, type: "spring", stiffness: 200 }}
                      className="mb-4"
                    >
                      <step.icon
                        size={56}
                        strokeWidth={1.5}
                        style={{
                          stroke: `url(#${step.gradientId})`,
                          filter: "drop-shadow(0 4px 12px rgba(236, 72, 153, 0.3))",
                        }}
                        className="transition-all duration-300 group-hover:scale-110"
                      />
                    </motion.div>

                    <CardTitle>{step.title}</CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </CardHeader>

                  {/* Hover Glow Effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.2 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute inset-0 -z-10 rounded-xl bg-gradient-to-r ${step.color} blur-xl`}
                  />
                </Card>
              </motion.div>

              {/* Connector Line (hidden on last item or mobile) */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                  className="absolute right-0 top-1/2 hidden h-0.5 w-full origin-left -translate-y-1/2 lg:block"
                >
                  <div
                    className={`h-full w-1/2 translate-x-full bg-gradient-to-r ${step.color} opacity-30`}
                  />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
