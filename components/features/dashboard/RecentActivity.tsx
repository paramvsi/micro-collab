'use client';

/**
 * RecentActivity Component
 * Displays recent activity timeline with animations
 */

import { motion } from 'framer-motion';
import {
  FileText,
  MessageSquare,
  CheckCircle,
  Video,
  Star,
  Clock
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';

interface Activity {
  id: string;
  type: 'request_created' | 'offer_received' | 'session_completed' | 'feedback_received';
  title: string;
  description: string;
  timestamp: string;
  metadata?: {
    rating?: number;
    duration?: number;
    amount?: number;
  };
}

interface RecentActivityProps {
  activities: Activity[];
  maxItems?: number;
}

// Container animation for staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

// Individual item animation
const itemVariants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
    },
  },
};

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'request_created':
      return { Icon: FileText, color: 'text-brand-cyan', bg: 'bg-brand-cyan/20' };
    case 'offer_received':
      return { Icon: MessageSquare, color: 'text-brand-emerald', bg: 'bg-brand-emerald/20' };
    case 'session_completed':
      return { Icon: Video, color: 'text-brand-purple', bg: 'bg-brand-purple/20' };
    case 'feedback_received':
      return { Icon: Star, color: 'text-warning-400', bg: 'bg-warning-400/20' };
    default:
      return { Icon: Clock, color: 'text-steel', bg: 'bg-steel/20' };
  }
};

export function RecentActivity({ activities, maxItems = 5 }: RecentActivityProps) {
  const displayedActivities = activities.slice(0, maxItems);

  if (displayedActivities.length === 0) {
    return (
      <Card className="border border-brand-purple/20 bg-dark-card/50 backdrop-blur-sm p-6 sm:p-8">
        <div className="text-center py-12">
          <Clock className="h-12 w-12 text-steel/50 mx-auto mb-4" />
          <p className="text-steel text-sm">No recent activity</p>
          <p className="text-steel/60 text-xs mt-1">
            Your activity will appear here
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="border border-brand-purple/20 bg-dark-card/50 backdrop-blur-sm p-6 sm:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {displayedActivities.map((activity, index) => {
          const { Icon, color, bg } = getActivityIcon(activity.type);
          const isLast = index === displayedActivities.length - 1;

          return (
            <motion.div
              key={activity.id}
              variants={itemVariants}
              className="relative"
            >
              {/* Timeline line */}
              {!isLast && (
                <div className="absolute left-5 top-12 bottom-0 w-px bg-gradient-to-b from-brand-purple/40 to-transparent" />
              )}

              <div className="flex gap-4 group">
                {/* Icon */}
                <div className={`relative flex-shrink-0 w-10 h-10 rounded-full ${bg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pb-4">
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <h4 className="text-sm font-semibold text-white line-clamp-1">
                      {activity.title}
                    </h4>
                    <time className="flex-shrink-0 text-xs text-steel/60">
                      {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                    </time>
                  </div>

                  <p className="text-sm text-steel line-clamp-2 mb-2">
                    {activity.description}
                  </p>

                  {/* Metadata */}
                  {activity.metadata && (
                    <div className="flex items-center gap-3 text-xs">
                      {activity.metadata.rating !== undefined && (
                        <div className="flex items-center gap-1 text-warning-400">
                          <Star className="h-3 w-3 fill-current" />
                          <span>{activity.metadata.rating.toFixed(1)}</span>
                        </div>
                      )}
                      {activity.metadata.duration !== undefined && (
                        <div className="flex items-center gap-1 text-brand-cyan">
                          <Clock className="h-3 w-3" />
                          <span>{activity.metadata.duration}h</span>
                        </div>
                      )}
                      {activity.metadata.amount !== undefined && (
                        <div className="text-brand-emerald font-medium">
                          +${activity.metadata.amount}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </Card>
  );
}
