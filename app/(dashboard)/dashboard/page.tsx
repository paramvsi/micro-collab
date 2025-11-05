'use client';

/**
 * Dashboard Page
 * Main dashboard with role-based views, stats, active sessions, and quick actions
 */

import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Sparkles, TrendingUp } from 'lucide-react';
import { useAuthStore } from '@/lib/stores/auth-store';
import { useMyRequests } from '@/lib/hooks/queries/use-requests';
import { useMyOffers } from '@/lib/hooks/queries/use-offers';
import { useMySessions } from '@/lib/hooks/queries/use-sessions';
import { DashboardStats } from '@/components/features/dashboard/DashboardStats';
import { ActiveSessions } from '@/components/features/dashboard/ActiveSessions';
import { QuickActions } from '@/components/features/dashboard/QuickActions';
import { RecentActivity } from '@/components/features/dashboard/RecentActivity';
import { initializeMockData } from '@/lib/mock/init';

export default function DashboardPage() {
  const { user, login } = useAuthStore();

  // Initialize mock data and auto-login for development
  useEffect(() => {
    const initializeAndLogin = async () => {
      // Initialize mock data
      initializeMockData();

      // Auto-login as first seeded user if not logged in
      if (!user) {
        // Small delay to ensure localStorage is updated
        await new Promise(resolve => setTimeout(resolve, 100));

        // Get first user from seeded data
        const users = JSON.parse(localStorage.getItem('microcollab_users') || '[]');
        if (users.length > 0) {
          const firstUser = users[0];
          await login(firstUser.email, firstUser.name);
        } else {
          // Fallback to creating demo user
          await login('demo@microcollab.com', 'Demo User');
        }
      }
    };

    initializeAndLogin();
  }, [user, login]);

  // Fetch data
  const { data: myRequests, isLoading: requestsLoading } = useMyRequests(user?.id || '');
  const { data: myOffers, isLoading: offersLoading } = useMyOffers(user?.id || '');
  const { data: mySessions, isLoading: sessionsLoading } = useMySessions(user?.id || '');

  // Calculate stats based on role
  const stats = useMemo(() => {
    const requests = myRequests || [];
    const offers = myOffers || [];
    const sessions = mySessions || [];

    return {
      totalRequests: requests.length,
      activeRequests: requests.filter(r => r.status === 'open').length,
      completedRequests: requests.filter(r => r.status === 'completed').length,
      totalOffers: offers.length,
      acceptedOffers: offers.filter(o => o.status === 'accepted').length,
      activeSessions: sessions.filter(s => s.status === 'active' || s.status === 'scheduled').length,
      completedSessions: sessions.filter(s => s.status === 'completed').length,
      rating: user?.rating || 0,
      totalEarnings: 0, // TODO: Calculate from completed sessions
    };
  }, [myRequests, myOffers, mySessions, user]);

  // Get active sessions
  const activeSessions = useMemo(() => {
    return (mySessions || []).filter(s => s.status === 'active' || s.status === 'scheduled');
  }, [mySessions]);

  // Generate recent activity from requests, offers, and sessions
  const recentActivity = useMemo(() => {
    const activities: any[] = [];

    // Add recent requests
    (myRequests || []).slice(0, 2).forEach(request => {
      activities.push({
        id: `req-${request.id}`,
        type: 'request_created' as const,
        title: 'Request Posted',
        description: request.title,
        timestamp: request.created_at,
      });
    });

    // Add recent offers
    (myOffers || []).slice(0, 2).forEach(offer => {
      activities.push({
        id: `offer-${offer.id}`,
        type: 'offer_received' as const,
        title: offer.status === 'accepted' ? 'Offer Accepted' : 'New Offer Received',
        description: offer.message || 'Someone wants to help with your request',
        timestamp: offer.created_at,
      });
    });

    // Add recent sessions
    (mySessions || [])
      .filter(s => s.status === 'completed')
      .slice(0, 2)
      .forEach(session => {
        activities.push({
          id: `session-${session.id}`,
          type: 'session_completed' as const,
          title: 'Session Completed',
          description: `Collaborated for ${session.duration_minutes || 60} minutes`,
          timestamp: session.end_time || session.created_at,
          metadata: {
            duration: Math.floor((session.duration_minutes || 60) / 60),
            rating: 5.0,
            amount: 50,
          },
        });
      });

    // Sort by timestamp (most recent first)
    return activities.sort((a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }, [myRequests, myOffers, mySessions]);

  const isLoading = requestsLoading || offersLoading || sessionsLoading;

  return (
    <main className="relative min-h-screen bg-[radial-gradient(circle_at_50%_20%,_rgba(99,102,241,0.06),_transparent_80%)] mx-auto max-w-7xl px-4 py-8">
      {/* Background Accent Glows */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1 }}
        className="pointer-events-none absolute left-1/4 top-0 -z-10 h-96 w-96"
      >
        <div className="glow-emerald h-full w-full" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="pointer-events-none absolute right-1/4 bottom-0 -z-10 h-80 w-80"
      >
        <div className="glow-pink h-full w-full" />
      </motion.div>

      {/* Content */}
      <div className="relative">
        {/* Header - Always visible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 md:mb-8"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <h1 className="mb-3 font-display text-3xl font-bold sm:text-4xl md:text-5xl text-white">
                <span className="gradient-text">Dashboard</span>
              </h1>
              <div className="flex items-center gap-2 text-base sm:text-lg text-steel">
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-brand-emerald/20 to-success-400/20">
                  <LayoutDashboard className="h-4 w-4 sm:h-5 sm:w-5 text-brand-emerald" />
                </div>
                <span className="line-clamp-2 sm:line-clamp-none text-steel font-medium">
                  {user?.name ? `Welcome back, ${user.name}!` : 'Loading your dashboard...'}
                </span>
              </div>

              {/* Role Badge */}
              {user?.role && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-3 sm:mt-4 inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-gradient-to-r from-brand-purple/20 via-brand-pink/20 to-brand-orange/20 px-3 sm:px-4 py-1.5 sm:py-2 border border-brand-purple/30 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                >
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-brand-purple" />
                  <span className="text-xs sm:text-sm font-bold capitalize">
                    <span className="bg-gradient-to-r from-brand-purple via-brand-pink to-brand-orange bg-clip-text text-transparent">
                      {user.role === 'both' ? 'Requester & Helper' : user.role}
                    </span>
                  </span>
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-brand-pink animate-pulse" />
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        {!isLoading && user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 md:mb-12"
          >
            <DashboardStats role={user.role} stats={stats} />
          </motion.div>
        )}

        {/* Loading State */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center py-12"
          >
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-purple/20 border-t-brand-purple" />
              <span className="text-steel">Loading dashboard...</span>
            </div>
          </motion.div>
        )}

        {/* Active Sessions Section */}
        {!isLoading && activeSessions.length > 0 && user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 md:mb-12"
          >
            <div className="mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                <span className="gradient-text">Active Sessions</span>
              </h2>
              <p className="text-steel text-sm mt-1">
                Your ongoing collaboration sessions
              </p>
            </div>
            <ActiveSessions sessions={activeSessions} currentUserId={user.id} />
          </motion.div>
        )}

        {/* Two Column Layout: Recent Activity + Quick Actions */}
        {!isLoading && user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12"
          >
            {/* Recent Activity */}
            <div>
              <div className="mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  <span className="gradient-text">Recent Activity</span>
                </h2>
                <p className="text-steel text-sm mt-1">
                  Your latest actions and updates
                </p>
              </div>
              <RecentActivity activities={recentActivity} maxItems={6} />
            </div>

            {/* Quick Actions */}
            <div>
              <div className="mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  <span className="gradient-text">Quick Actions</span>
                </h2>
                <p className="text-steel text-sm mt-1">
                  Common tasks and navigation
                </p>
              </div>
              <QuickActions role={user.role} />
            </div>
          </motion.div>
        )}
      </div>

      {/* Fade-out gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-[#0F1115]/95 pointer-events-none" />
    </main>
  );
}
