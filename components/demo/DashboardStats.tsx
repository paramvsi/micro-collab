"use client";

import { motion } from "framer-motion";
import { FileText, Users, Video, TrendingUp, Clock, Zap } from "lucide-react";
import type { DemoStats } from "@/types/demo";
import { cn } from "@/lib/utils";

interface Stat {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: "indigo" | "emerald" | "pink" | "orange" | "sky";
  gradient: string;
  subtext?: string;
  trend?: number;
}

export function DashboardStats({ stats }: { stats: DemoStats }) {
  const statCards: Stat[] = [
    {
      label: "Active Requests",
      value: stats.activeRequests,
      icon: <FileText className="h-10 w-10" />,
      color: "indigo",
      gradient: "from-indigo-500/20 via-purple-500/20 to-pink-500/20",
      subtext: "Ready to help",
      trend: 12,
    },
    {
      label: "Helpers Online",
      value: stats.availableHelpers,
      icon: <Users className="h-10 w-10" />,
      color: "emerald",
      gradient: "from-emerald-500/20 via-teal-500/20 to-cyan-500/20",
      subtext: "Available now",
      trend: 8,
    },
    {
      label: "Live Sessions",
      value: stats.activeSessions,
      icon: <Video className="h-10 w-10" />,
      color: "pink",
      gradient: "from-pink-500/20 via-rose-500/20 to-red-500/20",
      subtext: "In progress",
    },
    {
      label: "Completed Today",
      value: stats.completedSessions,
      icon: <Zap className="h-10 w-10" />,
      color: "orange",
      gradient: "from-orange-500/20 via-amber-500/20 to-yellow-500/20",
      subtext: "Success rate 98%",
      trend: 15,
    },
    {
      label: "Total Offers",
      value: stats.totalOffers,
      icon: <TrendingUp className="h-10 w-10" />,
      color: "sky",
      gradient: "from-sky-500/20 via-blue-500/20 to-indigo-500/20",
      subtext: "Growing",
      trend: 23,
    },
    {
      label: "Avg Response",
      value: 8,
      icon: <Clock className="h-10 w-10" />,
      color: "indigo",
      gradient: "from-violet-500/20 via-purple-500/20 to-fuchsia-500/20",
      subtext: "minutes",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: index * 0.1,
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
          whileHover={{
            scale: 1.05,
            y: -8,
            transition: { duration: 0.2 },
          }}
          className="group relative overflow-hidden"
        >
          {/* Gradient Background */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
              stat.gradient
            )}
          />

          {/* Glow Effect */}
          <div
            className={cn(
              "absolute -inset-0.5 rounded-lg opacity-0 blur transition-opacity duration-500 group-hover:opacity-70",
              stat.color === "indigo" && "bg-indigo-500",
              stat.color === "emerald" && "bg-emerald-500",
              stat.color === "pink" && "bg-pink-500",
              stat.color === "orange" && "bg-orange-500",
              stat.color === "sky" && "bg-sky-500"
            )}
          />

          {/* Card Content */}
          <div className="relative rounded-lg border border-smoky bg-graphite/90 p-6 backdrop-blur-xl transition-all duration-300 group-hover:border-transparent">
            {/* Icon with animated background */}
            <div className="mb-4 flex items-start justify-between">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className={cn(
                  "rounded-xl p-3 shadow-lg",
                  stat.color === "indigo" &&
                    "bg-gradient-to-br from-indigo-500 to-purple-600",
                  stat.color === "emerald" &&
                    "bg-gradient-to-br from-emerald-500 to-teal-600",
                  stat.color === "pink" &&
                    "bg-gradient-to-br from-pink-500 to-rose-600",
                  stat.color === "orange" &&
                    "bg-gradient-to-br from-orange-500 to-amber-600",
                  stat.color === "sky" &&
                    "bg-gradient-to-br from-sky-500 to-blue-600"
                )}
              >
                <div className="text-white">{stat.icon}</div>
              </motion.div>

              {/* Trend Indicator */}
              {stat.trend && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-1"
                >
                  <TrendingUp className="h-3 w-3 text-emerald-400" />
                  <span className="text-xs font-semibold text-emerald-400">
                    +{stat.trend}%
                  </span>
                </motion.div>
              )}
            </div>

            {/* Value */}
            <motion.div
              key={stat.value}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: index * 0.1 + 0.2,
              }}
              className={cn(
                "mb-1 font-display text-5xl font-bold",
                "bg-gradient-to-br bg-clip-text text-transparent",
                stat.color === "indigo" && "from-indigo-400 to-purple-400",
                stat.color === "emerald" && "from-emerald-400 to-teal-400",
                stat.color === "pink" && "from-pink-400 to-rose-400",
                stat.color === "orange" && "from-orange-400 to-amber-400",
                stat.color === "sky" && "from-sky-400 to-blue-400"
              )}
            >
              {stat.value}
            </motion.div>

            {/* Label */}
            <div className="mb-1 text-sm font-medium text-white">
              {stat.label}
            </div>

            {/* Subtext */}
            {stat.subtext && (
              <div className="text-xs text-steel">{stat.subtext}</div>
            )}

            {/* Animated border on hover */}
            <div className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-white to-transparent" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
