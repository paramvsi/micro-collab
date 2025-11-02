'use client';

/**
 * Browse Requests Page
 * Main marketplace page for browsing help requests with filters
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Sparkles, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRequests } from '@/lib/hooks/queries/use-requests';
import { RequestCard } from '@/components/features/request/RequestCard';
import { RequestFilters } from '@/components/features/request/RequestFilters';
import { RequestCardSkeletonGrid } from '@/components/features/request/RequestCardSkeleton';
import { RequestEmptyState } from '@/components/features/request/RequestEmptyState';
import type { RequestFilters as FilterType } from '@/types/request';
import { resetMockData } from '@/lib/mock/init';
import { useQueryClient } from '@tanstack/react-query';

// Container animation for staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
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

export default function BrowsePage() {
  const [filters, setFilters] = useState<FilterType>({});
  const [searchQuery, setSearchQuery] = useState('');
  const queryClient = useQueryClient();

  // Combine search with filters
  const combinedFilters: FilterType = {
    ...filters,
    search: searchQuery || undefined
  };

  const { data: requests, isLoading, error } = useRequests(combinedFilters);

  const hasActiveFilters =
    !!searchQuery ||
    (filters.tags && filters.tags.length > 0) ||
    (filters.urgency && filters.urgency.length > 0) ||
    !!filters.mode ||
    filters.duration_min !== undefined ||
    filters.duration_max !== undefined;

  const handleClearAll = () => {
    setFilters({});
    setSearchQuery('');
  };

  const handleResetMockData = () => {
    resetMockData();
    // Invalidate all queries to refetch with new data
    queryClient.invalidateQueries();
    window.location.reload();
  };

  return (
    <main className="relative min-h-screen bg-[radial-gradient(circle_at_60%_40%,_rgba(99,102,241,0.05),_transparent_80%)] mx-auto max-w-7xl px-4 py-8">
      {/* Background Accent Glows - matching landing page */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.2, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="pointer-events-none absolute left-1/4 top-0 -z-10 h-96 w-96"
      >
        <div className="glow-emerald h-full w-full" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.15, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="pointer-events-none absolute bottom-0 right-1/4 -z-10 h-80 w-80"
      >
        <div className="glow-pink h-full w-full" />
      </motion.div>

      {/* Content - relative positioning */}
      <div className="relative">
        {/* Header with gradient text - responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 md:mb-8"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <h1 className="mb-3 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
                <span className="gradient-text">Browse</span>{" "}
                <span className="text-white">Requests</span>
              </h1>
              <p className="flex items-center gap-2 text-base sm:text-lg">
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-brand-sky/20 to-brand-cyan/20">
                  <Search className="h-4 w-4 sm:h-5 sm:w-5 text-brand-sky" />
                </div>
                <span className="line-clamp-2 sm:line-clamp-none bg-gradient-to-r from-brand-sky via-brand-cyan to-brand-purple bg-clip-text text-transparent font-medium">
                  Find opportunities to help others and earn rewards
                </span>
              </p>

              {/* Live indicator - responsive */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-3 sm:mt-4 inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-gradient-to-r from-brand-emerald/20 via-success-400/20 to-brand-emerald/20 px-3 sm:px-4 py-1.5 sm:py-2 border border-brand-emerald/30 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-emerald opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-emerald shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                </span>
                <span className="text-xs sm:text-sm font-bold text-brand-emerald">
                  {isLoading ? 'Loading...' : `${requests?.length || 0} active requests`}
                </span>
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-brand-emerald animate-pulse" />
              </motion.div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {/* Reset Mock Data Button (dev mode only) */}
              {process.env.NEXT_PUBLIC_USE_MOCK === 'true' && (
                <Button
                  variant="outline"
                  onClick={handleResetMockData}
                  className="border-brand-purple/20 hover:bg-brand-purple/10"
                  title="Reset mock data with fresh seed"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              )}

              {/* Post Request Button */}
              <Link href="/requests/new">
                <Button variant="gradient" size="default">
                  <Plus className="mr-2 h-4 w-4" />
                  Post Request
                </Button>
              </Link>
            </div>
          </div>

          {/* Search Bar - below header */}
          <div className="relative mt-6">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded bg-gradient-to-br from-brand-purple/20 to-brand-pink/20">
              <Search className="h-4 w-4 text-brand-purple" />
            </div>
            <Input
              placeholder="Search requests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 bg-dark-elevated border-brand-purple/30 focus:border-brand-purple/60 focus:ring-brand-purple/20"
            />
          </div>
        </motion.div>

        <div className="gap-4 md:gap-6 lg:grid lg:grid-cols-[280px_1fr]">
          {/* Filters Sidebar - hidden on mobile, visible on lg+ */}
          <aside className="hidden lg:block lg:sticky lg:top-24 lg:h-fit">
            <RequestFilters filters={filters} onChange={setFilters} />
          </aside>

          {/* Request Cards Grid with staggered animation - responsive */}
          <div className="relative">
            {/* Error State */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-error-400">
                  Failed to load requests. Please try again.
                </p>
              </motion.div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
                <RequestCardSkeletonGrid count={6} />
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !error && requests?.length === 0 && (
              <RequestEmptyState
                hasFilters={hasActiveFilters}
                onClearFilters={handleClearAll}
                onCreateRequest={() => (window.location.href = '/requests/new')}
                variant={hasActiveFilters ? 'no-results' : 'no-filters'}
              />
            )}

            {/* Request Cards with staggered animation */}
            {!isLoading && !error && requests && requests.length > 0 && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="relative grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-[#1E1E26] scrollbar-thumb-rounded"
              >
                <AnimatePresence mode="popLayout">
                  {requests.map((request, index) => (
                    <motion.div
                      key={request.id}
                      variants={cardVariants}
                      initial="hidden"
                      animate="show"
                      layout
                      custom={index}
                    >
                      <RequestCard request={request} index={index} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Fade-out gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-[#0F1115]/95 pointer-events-none" />
    </main>
  );
}
