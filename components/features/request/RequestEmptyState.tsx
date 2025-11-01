'use client';

/**
 * RequestEmptyState Component
 * Empty state for when no requests match filters
 */

import { motion } from 'framer-motion';
import { Search, Filter, FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface RequestEmptyStateProps {
  hasFilters?: boolean;
  onClearFilters?: () => void;
  onCreateRequest?: () => void;
  variant?: 'no-results' | 'first-time' | 'no-filters';
}

export function RequestEmptyState({
  hasFilters = false,
  onClearFilters,
  onCreateRequest,
  variant = 'no-results'
}: RequestEmptyStateProps) {
  const content = {
    'no-results': {
      icon: Search,
      title: 'No requests found',
      description: 'Try adjusting your filters to see more results',
      action: hasFilters ? 'Clear Filters' : null,
      onAction: onClearFilters
    },
    'first-time': {
      icon: FileQuestion,
      title: 'No requests yet',
      description: 'Be the first to post a help request and connect with experienced developers',
      action: 'Post Your First Request',
      onAction: onCreateRequest
    },
    'no-filters': {
      icon: Filter,
      title: 'All caught up!',
      description: 'There are no open requests at the moment. Check back soon or post your own.',
      action: 'Post a Request',
      onAction: onCreateRequest
    }
  }[variant];

  const Icon = content.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="col-span-full"
    >
      <Card className="border-brand-purple/20 bg-dark-card/50 backdrop-blur-sm p-12">
        <div className="flex flex-col items-center text-center max-w-md mx-auto">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
            className="mb-6"
          >
            <div className="h-24 w-24 rounded-full bg-brand-purple/10 flex items-center justify-center">
              <Icon className="h-12 w-12 text-brand-purple" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-semibold text-white mb-3"
          >
            {content.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground mb-8"
          >
            {content.description}
          </motion.p>

          {/* Action Button */}
          {content.action && content.onAction && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                onClick={content.onAction}
                className="bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink hover:opacity-90 transition-opacity"
              >
                {content.action}
              </Button>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
