"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";

export function DemoBanner() {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className="sticky top-0 z-50 border-b border-brand-indigo/30 bg-demo-banner-bg backdrop-blur-lg"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-2 w-2 rounded-full bg-brand-indigo"
            />
            <span className="font-medium text-white">
              You&apos;re in{" "}
              <span className="text-brand-indigo">Demo Mode</span> — Explore
              the platform with simulated data
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/auth/signup"
              className="rounded-lg bg-gradient-primary px-4 py-2 font-semibold text-white transition-transform hover:scale-105"
            >
              Sign Up to Post Real Requests
            </Link>
            <button
              onClick={() => setIsDismissed(true)}
              className="text-steel transition-colors hover:text-white"
              aria-label="Dismiss banner"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
