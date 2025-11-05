'use client';

/**
 * QuickActions Component
 * Provides quick navigation buttons for common actions
 */

import { motion } from 'framer-motion';
import { Plus, Search, MessageSquare, User } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

interface QuickActionProps {
  role: 'requester' | 'helper' | 'both';
}

interface ActionCard {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  gradient: string;
  iconBg: string;
  iconColor: string;
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

// Individual card animation
const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 25,
    },
  },
};

export function QuickActions({ role }: QuickActionProps) {
  const getActionCards = (): ActionCard[] => {
    const requesterActions: ActionCard[] = [
      {
        title: 'Post New Request',
        description: 'Describe your problem and get expert help',
        href: '/requests/new',
        icon: Plus,
        gradient: 'from-brand-cyan/20 to-brand-sky/20',
        iconBg: 'bg-gradient-to-br from-brand-cyan/20 to-brand-sky/20',
        iconColor: 'text-brand-cyan',
      },
      {
        title: 'Browse Helpers',
        description: 'Find experienced developers to assist you',
        href: '/browse',
        icon: Search,
        gradient: 'from-brand-purple/20 to-brand-pink/20',
        iconBg: 'bg-gradient-to-br from-brand-purple/20 to-brand-pink/20',
        iconColor: 'text-brand-purple',
      },
    ];

    const helperActions: ActionCard[] = [
      {
        title: 'Browse Requests',
        description: 'Find opportunities to help and earn',
        href: '/browse',
        icon: Search,
        gradient: 'from-brand-emerald/20 to-success-400/20',
        iconBg: 'bg-gradient-to-br from-brand-emerald/20 to-success-400/20',
        iconColor: 'text-brand-emerald',
      },
      {
        title: 'My Offers',
        description: 'View and manage your submitted offers',
        href: '/profile',
        icon: MessageSquare,
        gradient: 'from-brand-purple/20 to-brand-pink/20',
        iconBg: 'bg-gradient-to-br from-brand-purple/20 to-brand-pink/20',
        iconColor: 'text-brand-purple',
      },
    ];

    const bothActions: ActionCard[] = [
      {
        title: 'Post Request',
        description: 'Get help from experts',
        href: '/requests/new',
        icon: Plus,
        gradient: 'from-brand-cyan/20 to-brand-sky/20',
        iconBg: 'bg-gradient-to-br from-brand-cyan/20 to-brand-sky/20',
        iconColor: 'text-brand-cyan',
      },
      {
        title: 'Browse Requests',
        description: 'Help others and earn',
        href: '/browse',
        icon: Search,
        gradient: 'from-brand-emerald/20 to-success-400/20',
        iconBg: 'bg-gradient-to-br from-brand-emerald/20 to-success-400/20',
        iconColor: 'text-brand-emerald',
      },
      {
        title: 'My Profile',
        description: 'Manage your account',
        href: '/profile',
        icon: User,
        gradient: 'from-brand-purple/20 to-brand-pink/20',
        iconBg: 'bg-gradient-to-br from-brand-purple/20 to-brand-pink/20',
        iconColor: 'text-brand-purple',
      },
    ];

    if (role === 'both') return bothActions;
    return role === 'requester' ? requesterActions : helperActions;
  };

  const actionCards = getActionCards();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {actionCards.map((action) => {
        const IconComponent = action.icon;

        return (
          <motion.div key={action.title} variants={cardVariants}>
            <Link href={action.href}>
              <Card className="group relative overflow-hidden border border-brand-purple/20 bg-dark-card/50 backdrop-blur-sm p-6 transition-all duration-300 hover:border-brand-purple/40 hover:bg-dark-card/80 hover:shadow-[0_0_20px_rgba(236,72,153,0.2)] cursor-pointer h-full">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="relative flex flex-col h-full">
                  <div className={`inline-flex p-3 rounded-lg ${action.iconBg} mb-4 transition-transform duration-300 group-hover:scale-110 w-fit`}>
                    <IconComponent className={`h-6 w-6 ${action.iconColor}`} />
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2 gradient-text-glow group-hover:gradient-text">
                    {action.title}
                  </h3>

                  <p className="text-sm text-steel group-hover:text-white/80 transition-colors duration-300">
                    {action.description}
                  </p>

                  {/* Arrow indicator */}
                  <div className="mt-auto pt-4 flex items-center text-brand-purple group-hover:text-brand-pink transition-colors duration-300">
                    <span className="text-sm font-medium">Go</span>
                    <svg
                      className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
