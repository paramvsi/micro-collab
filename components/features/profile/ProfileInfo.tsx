'use client';

/**
 * ProfileInfo Component
 * Editable user bio and hourly rate
 */

import { useState } from 'react';
import { User, DollarSign, FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';
import type { User as UserType } from '@/lib/services/types';

interface ProfileInfoProps {
  user: UserType;
  isEditing: boolean;
  onUpdate: (data: Partial<UserType>) => void;
}

export function ProfileInfo({ user, isEditing, onUpdate }: ProfileInfoProps) {
  const [bio, setBio] = useState(user.bio || '');
  const [hourlyRate, setHourlyRate] = useState(user.hourly_rate?.toString() || '');

  const handleSaveBio = () => {
    onUpdate({ bio });
  };

  const handleSaveRate = () => {
    onUpdate({ hourly_rate: parseFloat(hourlyRate) || 0 });
  };

  return (
    <Card className="border border-brand-purple/20 bg-dark-card/50 backdrop-blur-sm p-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <User className="h-5 w-5 text-brand-cyan" />
        About
      </h3>

      {/* Bio */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-steel mb-2">
          Bio
        </label>
        {isEditing ? (
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            onBlur={handleSaveBio}
            placeholder="Tell others about yourself, your expertise, and what you're looking for..."
            rows={4}
            className="w-full resize-none rounded-lg border border-brand-purple/30 bg-dark-card px-4 py-3 text-sm text-white placeholder:text-steel/50 focus:border-brand-purple/60 focus:outline-none"
          />
        ) : (
          <p className="text-sm text-steel leading-relaxed">
            {user.bio || 'No bio added yet. Click edit to add information about yourself.'}
          </p>
        )}
      </div>

      {/* Hourly Rate */}
      {(user.role === 'helper' || user.role === 'both') && (
        <div>
          <label className="block text-sm font-medium text-steel mb-2 flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-brand-emerald" />
            Hourly Rate
          </label>
          {isEditing ? (
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-steel">
                $
              </span>
              <input
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                onBlur={handleSaveRate}
                placeholder="50"
                min="0"
                step="5"
                className="w-full sm:w-48 rounded-lg border border-brand-purple/30 bg-dark-card pl-7 pr-4 py-2.5 text-sm text-white placeholder:text-steel/50 focus:border-brand-purple/60 focus:outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-steel text-sm">
                /hour
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-gradient-to-r from-brand-emerald/10 to-success-400/10 border border-brand-emerald/30">
              <span className="text-lg font-bold text-white">
                ${user.hourly_rate || 0}
              </span>
              <span className="text-sm text-steel">/hour</span>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
