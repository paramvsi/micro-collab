"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDemoStore } from "@/lib/stores/demo-store";
import { RequestFilters } from "@/components/demo/RequestFilters";
import { RequestCard } from "@/components/demo/RequestCard";
import { Search, Sparkles } from "lucide-react";

// Container animation for staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Individual card animation
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -10,
    transition: {
      duration: 0.2,
    },
  },
};

export default function BrowsePage() {
  const { requests, loadInitialData, startSimulation } = useDemoStore();

  useEffect(() => {
    loadInitialData();
    startSimulation();
  }, [loadInitialData, startSimulation]);

  return (
    <main className="relative min-h-screen bg-[radial-gradient(circle_at_60%_40%,_rgba(99,102,241,0.05),_transparent_80%)] mx-auto max-w-7xl px-4 py-8">
      {/* Background Accent Glows - matching landing page */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.2, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="pointer-events-none absolute left-1/4 top-0 -z-10 h-96 w-96"
      >
        <div className="glow-emerald h-full w-full" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.15, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="pointer-events-none absolute bottom-0 right-1/4 -z-10 h-80 w-80"
      >
        <div className="glow-pink h-full w-full" />
      </motion.div>

      {/* Content - relative positioning */}
      <div className="relative">
        {/* Header with gradient text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="mb-3 font-display text-4xl font-bold md:text-5xl">
            <span className="gradient-text">Browse</span>{" "}
            <span className="text-white">Requests</span>
          </h1>
          <p className="flex items-center gap-2 text-lg text-steel">
            <Search className="h-5 w-5 text-brand-sky" />
            Find opportunities to help others and earn rewards
          </p>

          {/* Live indicator */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-emerald/20 px-4 py-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-emerald opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-emerald" />
            </span>
            <span className="text-sm font-medium text-brand-emerald">
              {requests.length} active requests
            </span>
            <Sparkles className="h-4 w-4 text-brand-emerald" />
          </motion.div>
        </motion.div>

        <div className="gap-6 lg:grid lg:grid-cols-[280px_1fr]">
          {/* Filters Sidebar */}
          <aside className="mb-6 lg:sticky lg:top-24 lg:mb-0 lg:h-fit">
            <RequestFilters />
          </aside>

          {/* Request Cards Grid with staggered animation */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="relative grid gap-6 sm:grid-cols-2 xl:grid-cols-2 scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-[#1E1E26] scrollbar-thumb-rounded"
          >
            <AnimatePresence mode="popLayout">
              {requests.map((request, index) => (
                <motion.div
                  key={request.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  layout
                  custom={index}
                >
                  <RequestCard request={request} />
                </motion.div>
              ))}

              {requests.length === 0 && (
                <motion.div
                  key="empty-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="col-span-full rounded-xl border border-dashed border-smoky bg-graphite/30 p-12 text-center backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <Search className="mx-auto mb-4 h-12 w-12 text-steel" />
                  </motion.div>
                  <p className="mb-2 text-lg font-medium text-white">
                    No requests match your filters
                  </p>
                  <p className="text-steel">
                    Try adjusting your filters to see more opportunities
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Fade-out gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-[#0F1115]/95 pointer-events-none" />
    </main>
  );
}
