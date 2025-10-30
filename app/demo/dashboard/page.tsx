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
    <main className="section-radial-focus relative mx-auto max-w-7xl overflow-hidden px-4 py-8">
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
        {/* Header with gradient text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="mb-3 font-display text-4xl font-bold md:text-5xl">
            <span className="gradient-text">Marketplace</span>{" "}
            <span className="text-white">Dashboard</span>
          </h1>
          <p className="flex items-center gap-2 text-lg text-steel">
            <Sparkles className="h-5 w-5 text-brand-emerald" />
            Real-time overview of the MicroCollab marketplace
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <DashboardStats stats={stats} />
        </motion.div>

        {/* Activity Stream Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <ActivityStream events={recentEvents} maxHeight={500} />
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center"
        >
          <Button variant="gradient-accent" size="xl" asChild>
            <motion.a
              href="/demo/browse"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group"
            >
              Browse Active Requests
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
