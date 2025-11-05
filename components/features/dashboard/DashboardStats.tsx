'use client';

/**
 * DashboardStats Component
 * Displays key metrics with gradient cards and animations
 */

import { motion } from 'framer-motion';
import {
  FileText,
  MessageSquare,
  CheckCircle,
  TrendingUp,
  Clock,
  DollarSign,
  Star,
  Users
} from 'lucide-react';
import { Card } from '@/components/ui/card';

interface StatCardData {
  label: string;
  value: number | string;
  icon: React.ElementType;
  gradient: string;
  iconBg: string;
  iconColor: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

interface DashboardStatsProps {
  role: 'requester' | 'helper' | 'both';
  stats: {
    totalRequests?: number;
    activeRequests?: number;
    completedRequests?: number;
    totalOffers?: number;
    acceptedOffers?: number;
    activeSessions?: number;
    completedSessions?: number;
    rating?: number;
    totalEarnings?: number;
  };
}

// Container animation for staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
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
};

export function DashboardStats({ role, stats }: DashboardStatsProps) {
  // Define stat cards based on role
  const getStatCards = (): StatCardData[] => {
    const requesterCards: StatCardData[] = [
      {
        label: 'Active Requests',
        value: stats.activeRequests || 0,
        icon: FileText,
        gradient: 'from-brand-cyan/20 to-brand-sky/20',
        iconBg: 'bg-gradient-to-br from-brand-cyan/20 to-brand-sky/20',
        iconColor: 'text-brand-cyan',
        trend: { value: 10, isPositive: true },
      },
      {
        label: 'Total Requests',
        value: stats.totalRequests || 0,
        icon: Clock,
        gradient: 'from-brand-purple/20 to-brand-pink/20',
        iconBg: 'bg-gradient-to-br from-brand-purple/20 to-brand-pink/20',
        iconColor: 'text-brand-purple',
        trend: { value: 25, isPositive: true },
      },
      {
        label: 'Offers Received',
        value: stats.totalOffers || 0,
        icon: MessageSquare,
        gradient: 'from-brand-emerald/20 to-success-400/20',
        iconBg: 'bg-gradient-to-br from-brand-emerald/20 to-success-400/20',
        iconColor: 'text-brand-emerald',
        trend: { value: 18, isPositive: true },
      },
      {
        label: 'Completed',
        value: stats.completedRequests || 0,
        icon: CheckCircle,
        gradient: 'from-brand-orange/20 to-warning-400/20',
        iconBg: 'bg-gradient-to-br from-brand-orange/20 to-warning-400/20',
        iconColor: 'text-brand-orange',
        trend: { value: 12, isPositive: true },
      },
    ];

    const helperCards: StatCardData[] = [
      {
        label: 'Active Offers',
        value: stats.totalOffers || 0,
        icon: MessageSquare,
        gradient: 'from-brand-cyan/20 to-brand-sky/20',
        iconBg: 'bg-gradient-to-br from-brand-cyan/20 to-brand-sky/20',
        iconColor: 'text-brand-cyan',
        trend: { value: 12, isPositive: true },
      },
      {
        label: 'Offers Accepted',
        value: stats.acceptedOffers || 0,
        icon: CheckCircle,
        gradient: 'from-brand-emerald/20 to-success-400/20',
        iconBg: 'bg-gradient-to-br from-brand-emerald/20 to-success-400/20',
        iconColor: 'text-brand-emerald',
        trend: { value: 8, isPositive: true },
      },
      {
        label: 'Active Sessions',
        value: stats.activeSessions || 0,
        icon: Users,
        gradient: 'from-brand-purple/20 to-brand-pink/20',
        iconBg: 'bg-gradient-to-br from-brand-purple/20 to-brand-pink/20',
        iconColor: 'text-brand-purple',
      },
      {
        label: 'Completed',
        value: stats.completedSessions || 0,
        icon: TrendingUp,
        gradient: 'from-brand-orange/20 to-warning-400/20',
        iconBg: 'bg-gradient-to-br from-brand-orange/20 to-warning-400/20',
        iconColor: 'text-brand-orange',
        trend: { value: 15, isPositive: true },
      },
      {
        label: 'Avg Rating',
        value: stats.rating ? stats.rating.toFixed(1) : '0.0',
        icon: Star,
        gradient: 'from-warning-400/20 to-brand-orange/20',
        iconBg: 'bg-gradient-to-br from-warning-400/20 to-brand-orange/20',
        iconColor: 'text-warning-400',
        trend: { value: 5, isPositive: true },
      },
      {
        label: 'Total Earnings',
        value: stats.totalEarnings ? `$${stats.totalEarnings}` : '$0',
        icon: DollarSign,
        gradient: 'from-brand-emerald/20 to-success-400/20',
        iconBg: 'bg-gradient-to-br from-brand-emerald/20 to-success-400/20',
        iconColor: 'text-brand-emerald',
        trend: { value: 20, isPositive: true },
      },
    ];

    // For "both" role, show a combined view
    if (role === 'both') {
      return [
        ...requesterCards.slice(0, 2),
        ...helperCards.slice(0, 4),
      ];
    }

    return role === 'requester' ? requesterCards : helperCards;
  };

  const statCards = getStatCards();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
    >
      {statCards.map((stat, index) => {
        const IconComponent = stat.icon;

        return (
          <motion.div key={stat.label} variants={cardVariants} className="h-full">
            <Card
              className={`
                group relative h-full overflow-hidden border border-brand-purple/20 bg-dark-card/50 backdrop-blur-sm p-4 sm:p-6
                transition-all duration-300 hover:border-brand-purple/40 hover:bg-dark-card/80
                hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]
              `}
            >
              {/* Gradient accent on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="relative h-full flex flex-col">
                {/* Header with icon */}
                <div className="flex items-start justify-between mb-3">
                  <p className="text-sm font-medium text-steel line-clamp-1">
                    {stat.label}
                  </p>
                  <div className={`p-2 rounded-lg ${stat.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                    <IconComponent className={`h-4 w-4 ${stat.iconColor}`} />
                  </div>
                </div>

                {/* Value */}
                <div className="flex-1 flex items-center">
                  <p className="text-2xl sm:text-3xl font-bold text-white">
                    {stat.value}
                  </p>
                </div>

                {/* Trend indicator */}
                {stat.trend && (
                  <div className={`flex items-center gap-1 text-xs font-medium ${
                    stat.trend.isPositive ? 'text-brand-emerald' : 'text-error-400'
                  }`}>
                    <TrendingUp className={`h-3 w-3 ${!stat.trend.isPositive && 'rotate-180'}`} />
                    <span>{stat.trend.isPositive ? '+' : ''}{stat.trend.value}% this month</span>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
