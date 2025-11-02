'use client';

/**
 * RequestCard Component
 * Displays individual request with hover animations and color-coded urgency
 */

import { motion } from 'framer-motion';
import { Clock, Calendar, Zap, MessageSquare, Video, DollarSign } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Request } from '@/types/request';

interface RequestCardProps {
  request: Request;
  index?: number;
}

/**
 * Urgency color themes
 */
const urgencyColors = {
  low: {
    badge: 'bg-steel-500/10 text-steel-400 border-steel-500/20',
    icon: 'text-steel-400',
    glow: 'hover:shadow-[0_0_20px_rgba(148,163,184,0.15)]'
  },
  normal: {
    badge: 'bg-warning-500/10 text-warning-400 border-warning-500/20',
    icon: 'text-warning-400',
    glow: 'hover:shadow-[0_0_20px_rgba(251,191,36,0.15)]'
  },
  critical: {
    badge: 'bg-error-500/10 text-error-400 border-error-500/20',
    icon: 'text-error-400',
    glow: 'hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]'
  }
};

/**
 * Urgency icons
 */
const urgencyIcons = {
  low: Clock,
  normal: Zap,
  critical: Zap
};

export function RequestCard({ request, index = 0 }: RequestCardProps) {
  const urgencyTheme = urgencyColors[request.urgency];
  const UrgencyIcon = urgencyIcons[request.urgency];
  const ModeIcon = request.mode === 'live' ? Video : MessageSquare;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      whileHover={{ y: -4 }}
    >
      <Link href={`/requests/${request.id}`}>
        <Card
          className={`
            group relative overflow-hidden border border-brand-purple/20 bg-dark-card/50 backdrop-blur-sm
            transition-all duration-300 cursor-pointer
            hover:border-brand-purple/40 hover:bg-dark-card/80
            ${urgencyTheme.glow}
          `}
        >
          {/* Gradient accent */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-brand-cyan transition-colors duration-300">
                  {request.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {request.description}
                </p>
              </div>

              {/* Urgency badge */}
              <Badge
                variant="outline"
                className={`
                  ${urgencyTheme.badge}
                  flex items-center gap-1.5 px-3 py-1 shrink-0
                `}
              >
                <UrgencyIcon className={`h-3.5 w-3.5 ${urgencyTheme.icon}`} />
                <span className="capitalize font-medium">{request.urgency}</span>
              </Badge>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {request.tags.slice(0, 4).map((tag, idx) => {
                // Cycle through gradient colors for tags
                const tagColors = [
                  'bg-gradient-to-r from-brand-cyan/20 to-brand-sky/20 text-brand-cyan border-brand-cyan/30',
                  'bg-gradient-to-r from-brand-purple/20 to-brand-pink/20 text-brand-pink border-brand-pink/30',
                  'bg-gradient-to-r from-brand-emerald/20 to-brand-sky/20 text-brand-emerald border-brand-emerald/30',
                  'bg-gradient-to-r from-brand-orange/20 to-brand-pink/20 text-brand-orange border-brand-orange/30',
                ];
                return (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className={`${tagColors[idx % tagColors.length]} hover:scale-105 transition-transform`}
                  >
                    {tag}
                  </Badge>
                );
              })}
              {request.tags.length > 4 && (
                <Badge
                  variant="secondary"
                  className="bg-steel-400/10 text-steel-400 border-steel-400/30"
                >
                  +{request.tags.length - 4}
                </Badge>
              )}
            </div>

            {/* Meta information */}
            <div className="flex items-center gap-4 text-sm text-steel">
              {/* Duration */}
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-brand-sky" />
                <span className="text-white">{request.duration_hours}h</span>
              </div>

              {/* Mode */}
              <div className="flex items-center gap-1.5">
                <ModeIcon className={`h-4 w-4 ${request.mode === 'live' ? 'text-brand-pink' : 'text-brand-cyan'}`} />
                <span className="capitalize text-white">{request.mode}</span>
              </div>

              {/* Budget */}
              {request.budget && (
                <div className="flex items-center gap-1.5">
                  <DollarSign className="h-4 w-4 text-brand-emerald" />
                  <span className="text-white">
                    ${request.budget}
                    {request.budget_type === 'hourly' && '/hr'}
                  </span>
                </div>
              )}

              {/* Posted time */}
              <div className="flex items-center gap-1.5 ml-auto">
                <Calendar className="h-4 w-4 text-brand-orange" />
                <span className="text-steel">
                  {formatDistanceToNow(new Date(request.created_at), {
                    addSuffix: true
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Hover indicator */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
            style={{ transformOrigin: 'left' }}
          />
        </Card>
      </Link>
    </motion.div>
  );
}
