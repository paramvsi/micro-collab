"use client";

import { motion } from "framer-motion";
import { fadeInUp, scrollReveal } from "@/lib/animations";
import { Card, CardHeader, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Frontend Developer",
      avatar: "👩‍💻",
      rating: 5,
      quote:
        "Got unstuck on a tricky React performance issue in just 2 hours. My helper was patient, knowledgeable, and taught me debugging techniques I'll use forever.",
      tech: ["React", "Performance"],
      gradient: "from-brand-pink to-brand-orange",
    },
    {
      name: "Marcus Johnson",
      role: "Backend Engineer",
      avatar: "👨‍💻",
      rating: 5,
      quote:
        "Needed help architecting a scalable API. Found an expert who not only solved my problem but explained the trade-offs clearly. Worth every penny.",
      tech: ["Node.js", "Architecture"],
      gradient: "from-brand-indigo to-brand-pink",
    },
    {
      name: "Priya Sharma",
      role: "Full Stack Developer",
      avatar: "👩‍🔬",
      rating: 5,
      quote:
        "The quality of helpers on MicroCollab is outstanding. I've used it 3 times now for different issues. Fast responses, great communication, real solutions.",
      tech: ["TypeScript", "DevOps"],
      gradient: "from-brand-emerald to-brand-sky",
    },
  ];

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    }),
  };

  // Counter animation variants
  const counterVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <section className="section-testimonial-spotlight relative overflow-hidden">
      {/* Pulsing energy overlay */}
      <div className="section-pulse-overlay" />

      {/* Background Accent Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.2, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2"
      >
        <div className="glow-indigo h-full w-full" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div {...scrollReveal} variants={fadeInUp} className="mb-16 text-center">
          <h2 className="section-heading font-display text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Loved By <span className="gradient-text">Developers</span>
          </h2>
          <p className="section-subtext mx-auto max-w-2xl">
            Real feedback from developers who found the help they needed.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="mb-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              className="group relative"
            >
              {/* Testimonial Card with enhanced glow */}
              <motion.div whileHover={{ scale: 1.03, y: -8 }} transition={{ duration: 0.3 }}>
                <Card variant="glass" className="testimonial-card relative h-full overflow-visible">
                  <CardHeader>
                    {/* Rating Stars with stagger */}
                    <div className="mb-4 flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.15 + i * 0.05 + 0.3 }}
                          className="text-warning text-xl"
                        >
                          ⭐
                        </motion.span>
                      ))}
                    </div>

                    {/* Quote with improved typography */}
                    <CardDescription className="testimonial-quote mb-4">
                      &ldquo;{testimonial.quote}&rdquo;
                    </CardDescription>

                    {/* Tech Tags with slide in */}
                    <div className="flex flex-wrap gap-2">
                      {testimonial.tech.map((tech, techIndex) => (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.15 + techIndex * 0.1 + 0.4 }}
                        >
                          <Badge variant="glass" className="hover:scale-110">
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardHeader>

                  <CardFooter className="testimonial-divider pt-6">
                    {/* Author with avatar ring */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.5 }}
                      className="flex items-center gap-3"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        className="avatar-ring text-3xl"
                      >
                        {testimonial.avatar}
                      </motion.div>
                      <div>
                        <div className="font-semibold text-white">{testimonial.name}</div>
                        <div className="testimonial-meta">{testimonial.role}</div>
                      </div>
                    </motion.div>
                  </CardFooter>

                  {/* Glow Effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.3 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute inset-0 -z-10 rounded-xl bg-gradient-to-r ${testimonial.gradient} blur-xl`}
                  />
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Trust Stats with gradient numbers */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ staggerChildren: 0.15 }}
          className="mt-16 grid gap-8 text-center sm:grid-cols-2 md:grid-cols-3"
        >
          <motion.div variants={counterVariants} className="group">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="stat-gradient font-display mb-2 text-4xl"
            >
              4.8/5
            </motion.div>
            <div className="testimonial-meta">Average Rating</div>
          </motion.div>
          <motion.div variants={counterVariants} className="group">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="stat-gradient font-display mb-2 text-4xl"
            >
              500+
            </motion.div>
            <div className="testimonial-meta">Sessions Completed</div>
          </motion.div>
          <motion.div variants={counterVariants} className="group sm:col-span-2 md:col-span-1">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="stat-gradient font-display mb-2 text-4xl"
            >
              98%
            </motion.div>
            <div className="testimonial-meta">Satisfaction Rate</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
