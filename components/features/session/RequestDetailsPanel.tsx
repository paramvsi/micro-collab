'use client';

/**
 * RequestDetailsPanel Component
 * Displays request details during collaboration session
 */

import { FileText, Tag, Clock, User, Star } from 'lucide-react';
import type { SessionWithDetails } from '@/lib/services/types';
import Image from 'next/image';

interface RequestDetailsPanelProps {
  session: SessionWithDetails;
}

export function RequestDetailsPanel({ session }: RequestDetailsPanelProps) {
  const { request, helper, requester } = session;

  return (
    <div className="p-6 space-y-6">
      {/* Request Title */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <FileText className="h-4 w-4 text-brand-cyan" />
          <h3 className="text-sm font-semibold text-steel uppercase tracking-wide">
            Request Details
          </h3>
        </div>
        <h2 className="text-lg font-bold text-white line-clamp-2">
          {request.title}
        </h2>
      </div>

      {/* Request Description */}
      <div>
        <p className="text-sm text-steel leading-relaxed">
          {request.description}
        </p>
      </div>

      {/* Tags */}
      {request.tags && request.tags.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Tag className="h-4 w-4 text-brand-purple" />
            <h4 className="text-xs font-semibold text-steel uppercase tracking-wide">
              Skills Required
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {request.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-gradient-to-r from-brand-purple/20 to-brand-pink/20 border border-brand-purple/30 text-xs font-medium text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-purple/30 to-transparent" />

      {/* Participants */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <User className="h-4 w-4 text-brand-emerald" />
          <h4 className="text-xs font-semibold text-steel uppercase tracking-wide">
            Participants
          </h4>
        </div>

        {/* Helper */}
        <ParticipantCard
          user={helper}
          role="Helper"
          roleColor="text-brand-cyan"
        />

        {/* Requester */}
        <ParticipantCard
          user={requester}
          role="Requester"
          roleColor="text-brand-purple"
        />
      </div>

      {/* Session Status */}
      <div className="rounded-lg border border-brand-purple/20 bg-dark-card/50 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="h-4 w-4 text-brand-orange" />
          <span className="text-xs font-semibold text-steel uppercase tracking-wide">
            Session Status
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full ${
              session.status === 'active'
                ? 'bg-brand-emerald animate-pulse'
                : session.status === 'completed'
                ? 'bg-steel'
                : 'bg-warning-400'
            }`}
          />
          <span className="text-sm font-medium text-white capitalize">
            {session.status}
          </span>
        </div>
      </div>
    </div>
  );
}

interface ParticipantCardProps {
  user: {
    id: string;
    name: string;
    avatar_url?: string;
    rating: number;
  };
  role: string;
  roleColor: string;
}

function ParticipantCard({ user, role, roleColor }: ParticipantCardProps) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-dark-card/50 border border-brand-purple/20">
      {/* Avatar */}
      <div className="flex-shrink-0">
        {user.avatar_url ? (
          <Image
            src={user.avatar_url}
            alt={user.name}
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-purple to-brand-cyan flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white line-clamp-1">
          {user.name}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className={`text-xs font-medium ${roleColor}`}>
            {role}
          </span>
          <span className="text-steel/40">•</span>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-warning-400 text-warning-400" />
            <span className="text-xs text-steel">
              {user.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
