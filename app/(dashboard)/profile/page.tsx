'use client';

/**
 * Profile Page
 * User profile with editable information, stats, and settings
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  MapPin,
  Clock,
  Star,
  Award,
  TrendingUp,
  Settings,
  Edit3,
  Save,
  X,
  CheckCircle,
  Code,
  DollarSign,
} from 'lucide-react';
import { useAuthStore } from '@/lib/stores/auth-store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProfileHeader } from '@/components/features/profile/ProfileHeader';
import { ProfileStats } from '@/components/features/profile/ProfileStats';
import { ProfileInfo } from '@/components/features/profile/ProfileInfo';
import { SkillsManager } from '@/components/features/profile/SkillsManager';
import { AvailabilitySettings } from '@/components/features/profile/AvailabilitySettings';
import { useMyRequests } from '@/lib/hooks/queries/use-requests';
import { useMyOffers } from '@/lib/hooks/queries/use-offers';
import { useMySessions } from '@/lib/hooks/queries/use-sessions';

export default function ProfilePage() {
  const { user, updateUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user data for stats
  const { data: myRequests } = useMyRequests(user?.id || '');
  const { data: myOffers } = useMyOffers(user?.id || '');
  const { data: mySessions } = useMySessions(user?.id || '');

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-purple/20 border-t-brand-purple" />
          <span className="text-steel">Loading profile...</span>
        </div>
      </div>
    );
  }

  // Calculate profile completion
  const profileFields = [
    user.name,
    user.email,
    user.bio,
    user.skills && user.skills.length > 0,
    user.timezone,
    user.avatar_url,
    user.hourly_rate,
  ];
  const completedFields = profileFields.filter(Boolean).length;
  const profileCompletion = Math.round((completedFields / profileFields.length) * 100);

  // Calculate stats
  const stats = {
    totalRequests: myRequests?.length || 0,
    totalOffers: myOffers?.length || 0,
    completedSessions: mySessions?.filter(s => s.status === 'completed').length || 0,
    rating: user.rating || 0,
    totalEarnings: 0, // TODO: Calculate from completed sessions
    sessionsCompleted: user.sessions_completed || 0,
  };

  return (
    <main className="relative min-h-screen bg-[radial-gradient(circle_at_50%_20%,_rgba(99,102,241,0.06),_transparent_80%)] mx-auto max-w-7xl px-4 py-8">
      {/* Background Accent Glows */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1 }}
        className="pointer-events-none absolute left-1/4 top-0 -z-10 h-96 w-96"
      >
        <div className="glow-purple h-full w-full" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="pointer-events-none absolute right-1/4 bottom-0 -z-10 h-80 w-80"
      >
        <div className="glow-cyan h-full w-full" />
      </motion.div>

      {/* Content */}
      <div className="relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 md:mb-8"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="mb-3 font-display text-3xl font-bold sm:text-4xl md:text-5xl text-white">
                <span className="gradient-text">Profile</span>
              </h1>
              <p className="text-steel text-sm sm:text-base">
                Manage your profile and preferences
              </p>
            </div>

            {/* Edit Toggle */}
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? 'default' : 'outline'}
              className={isEditing ? 'bg-gradient-to-r from-brand-purple to-brand-pink' : ''}
            >
              {isEditing ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>
        </motion.div>

        {/* Profile Completion Bar */}
        {profileCompletion < 100 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <Card className="border border-warning-400/30 bg-gradient-to-r from-warning-400/10 to-brand-orange/10 backdrop-blur-sm p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 p-2 rounded-lg bg-warning-400/20">
                  <TrendingUp className="h-5 w-5 text-warning-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-white mb-1">
                    Complete Your Profile ({profileCompletion}%)
                  </h3>
                  <p className="text-xs text-steel mb-3">
                    A complete profile helps you get more collaboration opportunities
                  </p>
                  <div className="relative h-2 rounded-full bg-dark-card/50 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${profileCompletion}%` }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-warning-400 to-brand-orange rounded-full"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 md:mb-8"
        >
          <ProfileHeader user={user} isEditing={isEditing} onUpdate={updateUser} />
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 md:mb-8"
        >
          <ProfileStats stats={stats} role={user.role} />
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {/* Profile Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <ProfileInfo user={user} isEditing={isEditing} onUpdate={updateUser} />
            </motion.div>

            {/* Skills Manager */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <SkillsManager user={user} isEditing={isEditing} onUpdate={updateUser} />
            </motion.div>
          </div>

          {/* Right Column - Settings */}
          <div className="space-y-6 md:space-y-8">
            {/* Availability Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <AvailabilitySettings user={user} isEditing={isEditing} onUpdate={updateUser} />
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="border border-brand-purple/20 bg-dark-card/50 backdrop-blur-sm p-6">
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <Award className="h-4 w-4 text-brand-emerald" />
                  Achievements
                </h3>
                <div className="space-y-3">
                  <AchievementItem
                    icon={CheckCircle}
                    label="First Session"
                    completed={stats.completedSessions > 0}
                  />
                  <AchievementItem
                    icon={Star}
                    label="5-Star Rating"
                    completed={stats.rating >= 5.0}
                  />
                  <AchievementItem
                    icon={Code}
                    label="10 Sessions"
                    completed={stats.sessionsCompleted >= 10}
                  />
                  <AchievementItem
                    icon={TrendingUp}
                    label="Top Contributor"
                    completed={false}
                  />
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Fade-out gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-[#0F1115]/95 pointer-events-none" />
    </main>
  );
}

interface AchievementItemProps {
  icon: React.ElementType;
  label: string;
  completed: boolean;
}

function AchievementItem({ icon: Icon, label, completed }: AchievementItemProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
          completed
            ? 'bg-gradient-to-br from-brand-emerald/20 to-success-400/20 border border-brand-emerald/30'
            : 'bg-dark-card/50 border border-brand-purple/20'
        }`}
      >
        <Icon
          className={`h-4 w-4 ${completed ? 'text-brand-emerald' : 'text-steel/50'}`}
        />
      </div>
      <span
        className={`text-sm ${completed ? 'text-white font-medium' : 'text-steel/60'}`}
      >
        {label}
      </span>
    </div>
  );
}
