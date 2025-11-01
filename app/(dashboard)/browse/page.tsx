'use client';

/**
 * Browse Requests Page
 * Main marketplace page for browsing help requests with filters
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRequests } from '@/lib/hooks/queries/use-requests';
import { RequestCard } from '@/components/features/request/RequestCard';
import { RequestFilters } from '@/components/features/request/RequestFilters';
import { RequestCardSkeletonGrid } from '@/components/features/request/RequestCardSkeleton';
import { RequestEmptyState } from '@/components/features/request/RequestEmptyState';
import type { RequestFilters as FilterType } from '@/types/request';

export default function BrowsePage() {
  const [filters, setFilters] = useState<FilterType>({});
  const [searchQuery, setSearchQuery] = useState('');

  // Combine search with filters
  const combinedFilters: FilterType = {
    ...filters,
    search: searchQuery || undefined
  };

  const { data: requests, isLoading, error } = useRequests(combinedFilters);

  const hasActiveFilters =
    searchQuery ||
    (filters.tags && filters.tags.length > 0) ||
    filters.urgency ||
    filters.mode ||
    filters.duration_min !== undefined ||
    filters.duration_max !== undefined;

  const handleClearAll = () => {
    setFilters({});
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-dark-base">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-20 bg-dark-base/80 backdrop-blur-lg border-b border-brand-purple/20 px-6 py-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink bg-clip-text text-transparent mb-2">
              Browse Help Requests
            </h1>
            <p className="text-sm text-muted-foreground">
              {isLoading
                ? 'Loading requests...'
                : requests?.length
                ? `${requests.length} request${requests.length === 1 ? '' : 's'} available`
                : 'No requests found'}
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full max-w-md hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search requests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-dark-elevated border-brand-purple/20"
            />
          </div>

          {/* Post Request Button */}
          <Link href="/requests/new">
            <Button className="bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink hover:opacity-90 transition-opacity">
              <Plus className="mr-2 h-4 w-4" />
              Post Request
            </Button>
          </Link>
        </div>

        {/* Mobile Search */}
        <div className="relative mt-4 lg:hidden">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search requests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-dark-elevated border-brand-purple/20"
          />
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <RequestFilters filters={filters} onChange={setFilters} />
          </aside>

          {/* Request Cards Grid */}
          <main className="lg:col-span-3">
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
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
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

            {/* Request Cards */}
            {!isLoading && !error && requests && requests.length > 0 && (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {requests.map((request, index) => (
                  <RequestCard
                    key={request.id}
                    request={request}
                    index={index}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
