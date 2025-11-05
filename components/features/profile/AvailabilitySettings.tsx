'use client';

/**
 * AvailabilitySettings Component
 * Manage user availability status and timezone
 */

import { useState } from 'react';
import { Clock, Globe, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import type { User as UserType } from '@/lib/services/types';

interface AvailabilitySettingsProps {
  user: UserType;
  isEditing: boolean;
  onUpdate: (data: Partial<UserType>) => void;
}

const AVAILABILITY_OPTIONS = [
  {
    value: 'available' as const,
    label: 'Available',
    description: 'Ready to collaborate',
    color: 'bg-brand-emerald',
    borderColor: 'border-brand-emerald',
    bgColor: 'bg-brand-emerald/10',
  },
  {
    value: 'busy' as const,
    label: 'Busy',
    description: 'Limited availability',
    color: 'bg-warning-400',
    borderColor: 'border-warning-400',
    bgColor: 'bg-warning-400/10',
  },
  {
    value: 'offline' as const,
    label: 'Offline',
    description: 'Not available',
    color: 'bg-steel',
    borderColor: 'border-steel',
    bgColor: 'bg-steel/10',
  },
];

const COMMON_TIMEZONES = [
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Asia/Kolkata',
  'Australia/Sydney',
  'Pacific/Auckland',
];

export function AvailabilitySettings({ user, isEditing, onUpdate }: AvailabilitySettingsProps) {
  const [availability, setAvailability] = useState(user.availability_status || 'available');
  const [timezone, setTimezone] = useState(user.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone);

  const handleAvailabilityChange = (value: 'available' | 'busy' | 'offline') => {
    setAvailability(value);
    onUpdate({ availability_status: value });
  };

  const handleTimezoneChange = (value: string) => {
    setTimezone(value);
    onUpdate({ timezone: value });
  };

  const currentOption = AVAILABILITY_OPTIONS.find((opt) => opt.value === availability);

  return (
    <Card className="border border-brand-purple/20 bg-dark-card/50 backdrop-blur-sm p-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Clock className="h-5 w-5 text-brand-orange" />
        Availability
      </h3>

      {/* Availability Status */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-steel mb-3">
          Status
        </label>
        <div className="space-y-2">
          {AVAILABILITY_OPTIONS.map((option) => {
            const isSelected = availability === option.value;

            return (
              <button
                key={option.value}
                onClick={() => isEditing && handleAvailabilityChange(option.value)}
                disabled={!isEditing}
                className={`
                  w-full flex items-center gap-3 p-3 rounded-lg border transition-all
                  ${
                    isSelected
                      ? `${option.borderColor} ${option.bgColor}`
                      : 'border-brand-purple/20 bg-dark-card/30 hover:border-brand-purple/40'
                  }
                  ${isEditing ? 'cursor-pointer' : 'cursor-default'}
                `}
              >
                {/* Status Indicator */}
                <div
                  className={`flex-shrink-0 h-3 w-3 rounded-full ${option.color} ${
                    isSelected && option.value === 'available' ? 'animate-pulse' : ''
                  }`}
                />

                {/* Label & Description */}
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-white">{option.label}</p>
                  <p className="text-xs text-steel/60">{option.description}</p>
                </div>

                {/* Check Icon */}
                {isSelected && (
                  <Check className="flex-shrink-0 h-4 w-4 text-white" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Timezone */}
      <div>
        <label className="block text-sm font-medium text-steel mb-2 flex items-center gap-2">
          <Globe className="h-4 w-4 text-brand-cyan" />
          Timezone
        </label>
        {isEditing ? (
          <select
            value={timezone}
            onChange={(e) => handleTimezoneChange(e.target.value)}
            className="w-full rounded-lg border border-brand-purple/30 bg-dark-card px-4 py-2.5 text-sm text-white focus:border-brand-purple/60 focus:outline-none"
          >
            <optgroup label="Common Timezones">
              {COMMON_TIMEZONES.map((tz) => (
                <option key={tz} value={tz}>
                  {tz.replace(/_/g, ' ')}
                </option>
              ))}
            </optgroup>
          </select>
        ) : (
          <p className="text-sm text-white px-3 py-2 rounded-lg bg-dark-card/50 border border-brand-purple/20">
            {user.timezone?.replace(/_/g, ' ') || 'Not set'}
          </p>
        )}
      </div>

      {/* Current Time Display */}
      {timezone && (
        <div className="mt-4 p-3 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30">
          <p className="text-xs text-steel/60 mb-1">Current Time</p>
          <p className="text-sm font-medium text-white">
            {new Date().toLocaleTimeString('en-US', {
              timeZone: timezone,
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })}
          </p>
        </div>
      )}
    </Card>
  );
}
