'use client';

/**
 * ProfileHeader Component
 * User avatar, name, and role display with edit capabilities
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Camera, Mail, MapPin, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import type { User as UserType } from '@/lib/services/types';

interface ProfileHeaderProps {
  user: UserType;
  isEditing: boolean;
  onUpdate: (data: Partial<UserType>) => void;
}

export function ProfileHeader({ user, isEditing, onUpdate }: ProfileHeaderProps) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSave = () => {
    onUpdate({ name, email });
  };

  return (
    <Card className="border border-brand-purple/20 bg-dark-card/50 backdrop-blur-sm overflow-hidden">
      {/* Cover Background */}
      <div className="relative h-32 sm:h-40 bg-gradient-to-r from-brand-purple via-brand-pink to-brand-cyan">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark-card/50" />
      </div>

      {/* Profile Content */}
      <div className="relative px-6 pb-6">
        {/* Avatar */}
        <div className="relative -mt-16 sm:-mt-20 mb-4">
          <div className="relative inline-block">
            {user.avatar_url ? (
              <Image
                src={user.avatar_url}
                alt={user.name}
                width={128}
                height={128}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-dark-card shadow-xl"
              />
            ) : (
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-dark-card shadow-xl bg-gradient-to-br from-brand-purple to-brand-cyan flex items-center justify-center">
                <User className="h-12 w-12 sm:h-16 sm:w-16 text-white" />
              </div>
            )}

            {/* Edit Avatar Button */}
            {isEditing && (
              <Button
                size="sm"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full p-0 bg-gradient-to-r from-brand-purple to-brand-pink"
              >
                <Camera className="h-4 w-4" />
              </Button>
            )}

            {/* Online Status */}
            <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3">
              <div
                className={`h-4 w-4 rounded-full border-2 border-dark-card ${
                  user.availability_status === 'available'
                    ? 'bg-brand-emerald'
                    : user.availability_status === 'busy'
                    ? 'bg-warning-400'
                    : 'bg-steel'
                }`}
              />
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="space-y-3">
          {/* Name */}
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={handleSave}
              className="w-full sm:w-auto text-2xl sm:text-3xl font-bold text-white bg-dark-card/50 border border-brand-purple/30 rounded-lg px-3 py-2 focus:outline-none focus:border-brand-purple/60"
            />
          ) : (
            <h2 className="text-2xl sm:text-3xl font-bold text-white">{user.name}</h2>
          )}

          {/* Email & Role */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            {isEditing ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleSave}
                className="flex-1 min-w-[200px] text-steel bg-dark-card/50 border border-brand-purple/30 rounded-lg px-3 py-2 focus:outline-none focus:border-brand-purple/60"
              />
            ) : (
              <div className="flex items-center gap-2 text-steel">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
            )}

            {/* Role Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-brand-purple/20 to-brand-pink/20 border border-brand-purple/30">
              <Star className="h-3 w-3 text-brand-purple" />
              <span className="text-xs font-semibold text-white capitalize">
                {user.role === 'both' ? 'Requester & Helper' : user.role}
              </span>
            </div>

            {/* Rating */}
            {user.rating > 0 && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-warning-400/10 border border-warning-400/30">
                <Star className="h-3 w-3 fill-warning-400 text-warning-400" />
                <span className="text-xs font-semibold text-white">
                  {user.rating.toFixed(1)}
                </span>
              </div>
            )}
          </div>

          {/* Timezone */}
          {user.timezone && (
            <div className="flex items-center gap-2 text-sm text-steel">
              <MapPin className="h-4 w-4" />
              <span>{user.timezone}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
