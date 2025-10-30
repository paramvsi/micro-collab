"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import {
  FileText,
  HandHeart,
  Play,
  CheckCircle2,
  Sparkles,
  Activity,
} from "lucide-react";
import type { DemoEvent, DemoEventType } from "@/types/demo";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function ActivityStream({
  events,
  maxHeight = 500,
}: {
  events: DemoEvent[];
  maxHeight?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to top when new event arrives
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [events[0]?.id]);

  const getEventConfig = (type: DemoEventType) => {
    const configs = {
      request_posted: {
        icon: FileText,
        color: "indigo",
        bgGradient: "from-indigo-500 to-purple-600",
        borderColor: "border-l-brand-indigo",
        glowColor: "shadow-indigo-500/50",
      },
      offer_sent: {
        icon: HandHeart,
        color: "emerald",
        bgGradient: "from-emerald-500 to-teal-600",
        borderColor: "border-l-brand-emerald",
        glowColor: "shadow-emerald-500/50",
      },
      session_started: {
        icon: Play,
        color: "pink",
        bgGradient: "from-pink-500 to-rose-600",
        borderColor: "border-l-brand-pink",
        glowColor: "shadow-pink-500/50",
      },
      session_completed: {
        icon: CheckCircle2,
        color: "emerald",
        bgGradient: "from-emerald-500 to-green-600",
        borderColor: "border-l-emerald-500",
        glowColor: "shadow-emerald-500/50",
      },
      offer_accepted: {
        icon: Sparkles,
        color: "orange",
        bgGradient: "from-orange-500 to-amber-600",
        borderColor: "border-l-brand-orange",
        glowColor: "shadow-orange-500/50",
      },
    };

    return (
      configs[type] || {
        icon: Activity,
        color: "sky",
        bgGradient: "from-sky-500 to-blue-600",
        borderColor: "border-l-brand-sky",
        glowColor: "shadow-sky-500/50",
      }
    );
  };

  return (
    <Card variant="surface" className="card-enhanced">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 p-2 shadow-lg"
            >
              <Activity className="h-5 w-5 text-white" />
            </motion.div>
            <CardTitle className="text-2xl">
              <span className="gradient-text">Live</span>{" "}
              <span className="text-white">Activity</span>
            </CardTitle>
          </div>

          {/* Live Indicator */}
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-sm font-medium text-emerald-400">Live</span>
          </motion.div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Activity Feed */}
        <div
          ref={containerRef}
          className="space-y-3 overflow-y-auto pr-2"
          style={{ maxHeight: `${maxHeight}px` }}
        >
          <AnimatePresence mode="popLayout">
            {events.map((event, index) => {
              const config = getEventConfig(event.type);
              const Icon = config.icon;

              return (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, x: -50, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 50, scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    delay: index * 0.03,
                  }}
                  whileHover={{
                    scale: 1.02,
                    x: 4,
                    transition: { duration: 0.2 },
                  }}
                  className="group relative"
                >
                  {/* Gradient Background Glow on Hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.2 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "absolute -inset-0.5 rounded-lg bg-gradient-to-r opacity-0 blur transition-opacity duration-300",
                      config.color === "indigo" &&
                        "from-indigo-500 via-purple-500 to-pink-500",
                      config.color === "emerald" &&
                        "from-emerald-500 via-teal-500 to-cyan-500",
                      config.color === "pink" &&
                        "from-pink-500 via-rose-500 to-red-500",
                      config.color === "orange" &&
                        "from-orange-500 via-amber-500 to-yellow-500",
                      config.color === "sky" &&
                        "from-sky-500 via-blue-500 to-indigo-500"
                    )}
                  />

                  {/* Event Card */}
                  <div
                    className={cn(
                      "relative rounded-lg border-l-4 bg-graphite/50 p-4 backdrop-blur-sm transition-all duration-300",
                      config.borderColor,
                      "border-y border-r border-smoky hover:bg-graphite/70"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon with Gradient Background */}
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: "spring",
                          delay: index * 0.03 + 0.1,
                        }}
                        whileHover={{
                          rotate: [0, -10, 10, -10, 0],
                          scale: 1.1,
                        }}
                        className={cn(
                          "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg",
                          config.bgGradient
                        )}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </motion.div>

                      {/* Content */}
                      <div className="flex-1 space-y-2">
                        {/* Message */}
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.03 + 0.15 }}
                          className="font-medium leading-relaxed text-white"
                        >
                          {event.message}
                        </motion.p>

                        {/* Link to request */}
                        {event.data.request && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.03 + 0.2 }}
                          >
                            <Link
                              href={`/demo/requests/${event.data.request.id}`}
                              className={cn(
                                "inline-flex items-center gap-1 text-sm font-medium transition-colors",
                                config.color === "indigo" &&
                                  "text-indigo-400 hover:text-indigo-300",
                                config.color === "emerald" &&
                                  "text-emerald-400 hover:text-emerald-300",
                                config.color === "pink" &&
                                  "text-pink-400 hover:text-pink-300",
                                config.color === "orange" &&
                                  "text-orange-400 hover:text-orange-300",
                                config.color === "sky" &&
                                  "text-sky-400 hover:text-sky-300"
                              )}
                            >
                              View request →
                            </Link>
                          </motion.div>
                        )}

                        {/* Timestamp */}
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.03 + 0.25 }}
                          className="flex items-center gap-2 text-xs text-steel"
                        >
                          <span className="inline-block h-1 w-1 rounded-full bg-steel" />
                          {formatDistanceToNow(event.timestamp, {
                            addSuffix: true,
                          })}
                        </motion.p>
                      </div>
                    </div>

                    {/* Hover accent line */}
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Empty State */}
          {events.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center rounded-lg border border-dashed border-smoky bg-graphite/30 py-12 text-center"
            >
              <Activity className="mb-4 h-12 w-12 text-steel" />
              <p className="text-steel">Waiting for activity...</p>
              <p className="mt-1 text-xs text-steel/70">
                Events will appear here in real-time
              </p>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
