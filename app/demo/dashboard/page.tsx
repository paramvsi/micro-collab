"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useDemoStore } from "@/lib/stores/demo-store";
import { DashboardStats } from "@/components/demo/DashboardStats";
import { ActivityStream } from "@/components/demo/ActivityStream";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { stats, recentEvents, loadInitialData, startSimulation } =
    useDemoStore();

  useEffect(() => {
    loadInitialData();
    startSimulation();
  }, [loadInitialData, startSimulation]);

  return (
    <main className="relative min-h-screen bg-[radial-gradient(circle_at_50%_20%,_rgba(99,102,241,0.06),_transparent_80%)] mx-auto max-w-7xl overflow-hidden px-4 py-8">
      {/* Background Accent Glows - matching landing page */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1 }}
        className="pointer-events-none absolute bottom-0 left-0 h-96 w-96"
      >
        <div className="glow-pink h-full w-full" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="pointer-events-none absolute right-0 top-0 h-80 w-80"
      >
        <div className="glow-indigo h-full w-full" />
      </motion.div>

      {/* Content - relative z-10 to be above glows */}
      <div className="relative z-10">
        {/* Header with gradient text - responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 md:mb-8"
        >
          <h1 className="mb-3 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            <span className="gradient-text">Marketplace</span>{" "}
            <span className="text-white">Dashboard</span>
          </h1>
          <p className="flex items-center gap-2 text-base sm:text-lg text-steel">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-brand-emerald" />
            <span className="line-clamp-1 sm:line-clamp-none">Real-time overview of the MicroCollab marketplace</span>
          </p>
        </motion.div>

        {/* Stats Section - responsive spacing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 md:mb-12"
        >
          <DashboardStats stats={stats} />
        </motion.div>

        {/* Activity Stream Section - responsive spacing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 md:mb-12"
        >
          <ActivityStream events={recentEvents} maxHeight={500} />
        </motion.div>

        {/* CTA Section - responsive button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center px-4"
        >
          <Button variant="gradient-accent" size="xl" asChild className="w-full sm:w-auto">
            <motion.a
              href="/demo/browse"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group"
            >
              <span className="hidden sm:inline">Browse Active Requests</span>
              <span className="sm:hidden">Browse Requests</span>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
