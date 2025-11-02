'use client';

/**
 * UserProfileCard Component
 * Displays user profile information
 */

import { motion } from 'framer-motion';
import { Star, Award, Clock, MapPin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useUser } from '@/lib/hooks/queries/use-user';

interface UserProfileCardProps {
  userId: string;
}

export function UserProfileCard({ userId }: UserProfileCardProps) {
  const { data: user, isLoading } = useUser(userId);

  if (isLoading) {
    return (
      <Card className="bg-graphite/50 border-brand-purple/20 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-16 w-16 bg-dark-elevated rounded-full" />
          <div className="h-4 bg-dark-elevated rounded w-3/4" />
          <div className="h-3 bg-dark-elevated rounded w-1/2" />
        </div>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="bg-graphite/50 border-brand-purple/20 p-6">
        <p className="text-steel">User not found</p>
      </Card>
    );
  }

  const statusColors = {
    available: 'bg-brand-emerald/10 text-brand-emerald border-brand-emerald/30',
    busy: 'bg-warning-400/10 text-warning-400 border-warning-400/30',
    offline: 'bg-steel-400/10 text-steel-400 border-steel-400/30'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="bg-graphite/50 backdrop-blur-sm border-brand-purple/20 p-6 shadow-lg">
        <div className="text-center mb-4">
          <Avatar className="h-20 w-20 mx-auto mb-4 border-4 border-brand-purple/30 shadow-lg">
            <AvatarImage src={user.avatar_url} alt={user.name} />
            <AvatarFallback className="bg-brand-purple text-white text-2xl">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <h3 className="text-xl font-bold text-white mb-2">{user.name}</h3>

          <Badge className={statusColors[user.availability_status]}>
            {user.availability_status}
          </Badge>
        </div>

        {/* Bio */}
        {user.bio && (
          <p className="text-sm text-steel mb-4 leading-relaxed">
            {user.bio}
          </p>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-dark-elevated/50 rounded-lg">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="h-4 w-4 text-brand-orange fill-brand-orange" />
              <span className="text-lg font-bold text-white">{user.rating.toFixed(1)}</span>
            </div>
            <div className="text-xs text-steel">Rating</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Award className="h-4 w-4 text-brand-emerald" />
              <span className="text-lg font-bold text-white">{user.sessions_completed}</span>
            </div>
            <div className="text-xs text-steel">Sessions</div>
          </div>
        </div>

        {/* Hourly Rate */}
        {user.hourly_rate && (
          <div className="flex items-center justify-between p-3 bg-brand-emerald/10 rounded-lg border border-brand-emerald/30 mb-4">
            <span className="text-sm text-steel">Hourly Rate</span>
            <span className="text-lg font-bold text-brand-emerald">${user.hourly_rate}/hr</span>
          </div>
        )}

        {/* Timezone */}
        {user.timezone && (
          <div className="flex items-center gap-2 p-3 bg-dark-elevated/50 rounded-lg mb-4">
            <MapPin className="h-4 w-4 text-brand-sky" />
            <div>
              <div className="text-xs text-steel">Timezone</div>
              <div className="text-sm font-medium text-white">{user.timezone}</div>
            </div>
          </div>
        )}

        {/* Skills */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-2">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {user.skills.slice(0, 8).map(skill => (
              <Badge
                key={skill}
                className="bg-brand-purple/10 text-brand-cyan border-brand-cyan/20 text-xs"
              >
                {skill}
              </Badge>
            ))}
            {user.skills.length > 8 && (
              <Badge className="bg-steel-400/10 text-steel-400 border-steel-400/20 text-xs">
                +{user.skills.length - 8} more
              </Badge>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
