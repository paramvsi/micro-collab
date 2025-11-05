'use client';

/**
 * ProfileStats Component
 * Display user statistics in a grid layout
 */

import { motion } from 'framer-motion';
import {
  FileText,
  MessageSquare,
  Video,
  Star,
  DollarSign,
  TrendingUp,
} from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ProfileStatsProps {
  stats: {
    totalRequests: number;
    totalOffers: number;
    completedSessions: number;
    rating: number;
    totalEarnings: number;
    sessionsCompleted: number;
  };
  role: 'requester' | 'helper' | 'both';
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
    },
  },
};

export function ProfileStats({ stats, role }: ProfileStatsProps) {
  const statCards = [
    {
      label: 'Total Requests',
      value: stats.totalRequests,
      icon: FileText,
      gradient: 'from-brand-cyan/20 to-brand-sky/20',
      iconBg: 'bg-gradient-to-br from-brand-cyan/20 to-brand-sky/20',
      iconColor: 'text-brand-cyan',
      show: role === 'requester' || role === 'both',
    },
    {
      label: 'Total Offers',
      value: stats.totalOffers,
      icon: MessageSquare,
      gradient: 'from-brand-purple/20 to-brand-pink/20',
      iconBg: 'bg-gradient-to-br from-brand-purple/20 to-brand-pink/20',
      iconColor: 'text-brand-purple',
      show: true,
    },
    {
      label: 'Completed Sessions',
      value: stats.completedSessions,
      icon: Video,
      gradient: 'from-brand-emerald/20 to-success-400/20',
      iconBg: 'bg-gradient-to-br from-brand-emerald/20 to-success-400/20',
      iconColor: 'text-brand-emerald',
      show: true,
    },
    {
      label: 'Average Rating',
      value: stats.rating > 0 ? stats.rating.toFixed(1) : '0.0',
      icon: Star,
      gradient: 'from-warning-400/20 to-brand-orange/20',
      iconBg: 'bg-gradient-to-br from-warning-400/20 to-brand-orange/20',
      iconColor: 'text-warning-400',
      show: true,
    },
    {
      label: 'Total Earnings',
      value: `$${stats.totalEarnings}`,
      icon: DollarSign,
      gradient: 'from-brand-emerald/20 to-success-400/20',
      iconBg: 'bg-gradient-to-br from-brand-emerald/20 to-success-400/20',
      iconColor: 'text-brand-emerald',
      show: role === 'helper' || role === 'both',
    },
    {
      label: 'Success Rate',
      value: '100%',
      icon: TrendingUp,
      gradient: 'from-brand-purple/20 to-brand-pink/20',
      iconBg: 'bg-gradient-to-br from-brand-purple/20 to-brand-pink/20',
      iconColor: 'text-brand-purple',
      show: true,
    },
  ].filter((stat) => stat.show);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {statCards.map((stat) => {
        const IconComponent = stat.icon;

        return (
          <motion.div key={stat.label} variants={cardVariants}>
            <Card
              className={`
                group relative overflow-hidden border border-brand-purple/20 bg-dark-card/50 backdrop-blur-sm p-6
                transition-all duration-300 hover:border-brand-purple/40 hover:bg-dark-card/80
                hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]
              `}
            >
              {/* Gradient accent on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div className="relative h-full flex flex-col">
                {/* Header with icon */}
                <div className="flex items-start justify-between mb-3">
                  <p className="text-sm font-medium text-steel line-clamp-1">
                    {stat.label}
                  </p>
                  <div
                    className={`p-2 rounded-lg ${stat.iconBg} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <IconComponent className={`h-4 w-4 ${stat.iconColor}`} />
                  </div>
                </div>

                {/* Value */}
                <div className="flex-1 flex items-center">
                  <p className="text-2xl sm:text-3xl font-bold text-white">
                    {stat.value}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
