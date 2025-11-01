'use client';

/**
 * RequestCardSkeleton Component
 * Loading skeleton for request cards with shimmer effect
 */

import { Card } from '@/components/ui/card';

export function RequestCardSkeleton() {
  return (
    <Card className="border border-brand-purple/20 bg-dark-card/50 backdrop-blur-sm p-6 animate-pulse">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 space-y-3">
          <div className="h-6 bg-white/10 rounded w-3/4" />
          <div className="h-4 bg-white/10 rounded w-full" />
          <div className="h-4 bg-white/10 rounded w-2/3" />
        </div>
        <div className="h-8 w-20 bg-white/10 rounded-full" />
      </div>

      {/* Tags */}
      <div className="flex gap-2 mb-4">
        <div className="h-6 w-16 bg-white/10 rounded-full" />
        <div className="h-6 w-20 bg-white/10 rounded-full" />
        <div className="h-6 w-24 bg-white/10 rounded-full" />
      </div>

      {/* Meta */}
      <div className="flex items-center gap-4">
        <div className="h-4 w-16 bg-white/10 rounded" />
        <div className="h-4 w-20 bg-white/10 rounded" />
        <div className="h-4 w-24 bg-white/10 rounded ml-auto" />
      </div>
    </Card>
  );
}

export function RequestCardSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <RequestCardSkeleton key={i} />
      ))}
    </>
  );
}
