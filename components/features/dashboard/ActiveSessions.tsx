'use client';

/**
 * ActiveSessions Component
 * Displays active collaboration sessions with status and quick actions
 */

import { motion } from 'framer-motion';
import { Video, MessageSquare, Clock, ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import type { SessionWithDetails } from '@/lib/services/types';

interface ActiveSessionsProps {
  sessions: SessionWithDetails[];
  currentUserId: string;
}

// Container animation
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Individual session card animation
const cardVariants = {
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
      damping: 25,
    },
  },
};

export function ActiveSessions({ sessions, currentUserId }: ActiveSessionsProps) {
  if (sessions.length === 0) {
    return (
      <Card className="border border-brand-purple/20 bg-dark-card/50 backdrop-blur-sm p-8 text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="p-4 rounded-full bg-gradient-to-br from-brand-purple/20 to-brand-pink/20 mb-4">
            <Video className="h-8 w-8 text-brand-purple" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No Active Sessions</h3>
          <p className="text-steel text-sm max-w-md">
            You don't have any active collaboration sessions at the moment.
            Browse requests or check your pending offers.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      {sessions.map((session) => {
        const isHelper = session.helper_id === currentUserId;
        const otherUser = isHelper ? session.requester : session.helper;
        const ModeIcon = session.request.mode === 'live' ? Video : MessageSquare;

        // Status color mapping
        const statusColors = {
          scheduled: 'bg-brand-sky/10 text-brand-sky border-brand-sky/20',
          active: 'bg-brand-emerald/10 text-brand-emerald border-brand-emerald/20',
          completed: 'bg-steel-500/10 text-steel-400 border-steel-500/20',
          cancelled: 'bg-error-400/10 text-error-400 border-error-400/20',
        };

        return (
          <motion.div key={session.id} variants={cardVariants}>
            <Card className="group relative overflow-hidden border border-brand-purple/20 bg-dark-card/50 backdrop-blur-sm transition-all duration-300 hover:border-brand-purple/40 hover:bg-dark-card/80 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]">
              {/* Gradient accent */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="p-4 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  {/* Session Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-3 mb-3">
                      {/* Mode Icon */}
                      <div className={`p-2 rounded-lg ${
                        session.request.mode === 'live'
                          ? 'bg-gradient-to-br from-brand-pink/20 to-brand-purple/20'
                          : 'bg-gradient-to-br from-brand-cyan/20 to-brand-sky/20'
                      }`}>
                        <ModeIcon className={`h-4 w-4 ${
                          session.request.mode === 'live' ? 'text-brand-pink' : 'text-brand-cyan'
                        }`} />
                      </div>

                      {/* Title and Status */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold text-white mb-2 line-clamp-2">
                          {session.request.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge className={statusColors[session.status]}>
                            {session.status === 'active' && (
                              <span className="flex items-center gap-1">
                                <span className="relative flex h-2 w-2">
                                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-emerald opacity-75" />
                                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-emerald" />
                                </span>
                                Live
                              </span>
                            )}
                            {session.status !== 'active' && session.status}
                          </Badge>
                          <Badge variant="secondary" className="bg-brand-purple/10 text-brand-purple border-brand-purple/20">
                            {isHelper ? 'Helping' : 'Requester'}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Collaborator Info */}
                    <div className="flex items-center gap-2 text-sm text-steel mb-3">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-cyan/20 to-brand-sky/20 flex items-center justify-center text-brand-cyan text-xs font-semibold">
                          {otherUser.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-white font-medium">{otherUser.name}</span>
                      </div>
                    </div>

                    {/* Session Metadata */}
                    <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-steel">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>
                          {session.actual_start
                            ? `Started ${formatDistanceToNow(new Date(session.actual_start), { addSuffix: true })}`
                            : session.scheduled_start
                            ? `Scheduled ${formatDistanceToNow(new Date(session.scheduled_start), { addSuffix: true })}`
                            : 'Not started'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex-shrink-0">
                    <Link href={`/sessions/${session.id}`}>
                      <Button
                        variant={session.status === 'active' ? 'gradient' : 'outline'}
                        size="sm"
                        className="w-full sm:w-auto group/btn"
                      >
                        {session.status === 'active' ? (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Join Session
                          </>
                        ) : (
                          <>
                            View Details
                          </>
                        )}
                        <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
