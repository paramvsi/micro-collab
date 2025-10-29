"use client";

import { motion } from "framer-motion";
import { fadeInUp, scrollReveal } from "@/lib/animations";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function CategoryHighlights() {
  const categories = [
    {
      name: "Frontend",
      description: "React, Vue, Angular, CSS, UI/UX",
      icon: "🎨",
      gradient: "from-brand-pink to-brand-orange",
      activeHelpers: 45,
    },
    {
      name: "Backend",
      description: "Node.js, Python, Go, APIs, Databases",
      icon: "⚙️",
      gradient: "from-brand-indigo to-brand-pink",
      activeHelpers: 38,
    },
    {
      name: "DevOps",
      description: "Docker, K8s, CI/CD, Cloud, Infrastructure",
      icon: "🚀",
      gradient: "from-brand-emerald to-brand-sky",
      activeHelpers: 22,
    },
    {
      name: "Mobile",
      description: "React Native, Flutter, iOS, Android",
      icon: "📱",
      gradient: "from-brand-sky to-brand-indigo",
      activeHelpers: 18,
    },
    {
      name: "Testing",
      description: "Unit Tests, E2E, Test Automation, QA",
      icon: "🧪",
      gradient: "from-brand-orange to-brand-pink",
      activeHelpers: 15,
    },
    {
      name: "Architecture",
      description: "System Design, Patterns, Refactoring",
      icon: "🏗️",
      gradient: "from-brand-pink to-brand-indigo",
      activeHelpers: 28,
    },
  ];

  // Card animation variant
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.08,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  return (
    <section className="section-alt-2 relative overflow-hidden">
      {/* Background Accent */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.2, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute left-0 bottom-0 h-96 w-96"
      >
        <div className="glow-pink h-full w-full" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          {...scrollReveal}
          variants={fadeInUp}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 font-display text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Expertise <span className="gradient-text">Across</span> All Tech
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-steel">
            Connect with experienced developers in every domain. From frontend
            polish to backend optimization.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              className="group relative h-full"
            >
              {/* Category Card with Shadcn */}
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <Card variant="interactive" className="h-full relative overflow-visible">
                  <CardHeader>
                    {/* Icon & Name */}
                    <div className="mb-4 flex items-center gap-4">
                      <motion.div
                        initial={{ rotate: 0 }}
                        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="text-5xl"
                      >
                        {category.icon}
                      </motion.div>
                      <CardTitle>{category.name}</CardTitle>
                    </div>

                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>

                  <CardFooter>
                    <Badge variant="success" className="gap-2">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="h-2 w-2 rounded-full bg-success"
                      />
                      {category.activeHelpers} helpers available
                    </Badge>
                  </CardFooter>

                  {/* Hover Glow Effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.25 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute inset-0 -z-10 rounded-xl bg-gradient-to-r ${category.gradient} blur-xl`}
                  />
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          {...scrollReveal}
          variants={fadeInUp}
          className="mt-12 text-center"
        >
          <Button variant="gradient-accent" size="lg" asChild>
            <motion.a
              href="/categories"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Browse All Categories
            </motion.a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
