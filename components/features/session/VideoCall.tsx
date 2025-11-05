'use client';

/**
 * VideoCall Component
 * Handles video display for collaboration sessions
 * Placeholder for WebRTC implementation
 */

import { motion } from 'framer-motion';
import { Video, VideoOff, Mic, MicOff, User, Monitor } from 'lucide-react';
import type { SessionWithDetails } from '@/lib/services/types';
import Image from 'next/image';

interface VideoCallProps {
  session: SessionWithDetails;
  currentUserId: string;
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  isScreenSharing: boolean;
}

export function VideoCall({
  session,
  currentUserId,
  isVideoEnabled,
  isAudioEnabled,
  isScreenSharing,
}: VideoCallProps) {
  const isHelper = currentUserId === session.helper_id;
  const currentUser = isHelper ? session.helper : session.requester;
  const otherUser = isHelper ? session.requester : session.helper;

  return (
    <div className="relative h-full w-full">
      {/* Main Video Area (Other User or Screen Share) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative h-full w-full bg-gradient-to-br from-dark-card/50 to-dark/80 flex items-center justify-center"
      >
        {isScreenSharing ? (
          // Screen Share View
          <div className="relative w-full h-full bg-dark-card/80 flex items-center justify-center">
            <div className="text-center">
              <Monitor className="h-24 w-24 text-brand-purple mx-auto mb-4" />
              <p className="text-white text-lg font-semibold mb-2">Screen Sharing Active</p>
              <p className="text-steel text-sm">
                {isHelper ? 'Sharing your screen' : `${otherUser.name} is sharing their screen`}
              </p>
            </div>
            {/* Screen share placeholder */}
            <div className="absolute inset-4 rounded-lg border-2 border-dashed border-brand-purple/30 bg-dark/50" />
          </div>
        ) : (
          // Video View
          <VideoParticipant
            user={otherUser}
            isVideoEnabled={true}
            isAudioEnabled={isAudioEnabled}
            isSpeaking={false}
            className="w-full h-full"
          />
        )}

        {/* Session Status Indicator */}
        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 rounded-full bg-dark-card/90 backdrop-blur-sm border border-brand-purple/30">
          <div className="h-2 w-2 rounded-full bg-error-400 animate-pulse" />
          <span className="text-xs font-medium text-white">LIVE</span>
        </div>
      </motion.div>

      {/* Picture-in-Picture (Current User) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 20, y: -20 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute bottom-4 right-4 w-48 h-36 sm:w-64 sm:h-48 rounded-lg overflow-hidden border-2 border-brand-purple/40 shadow-[0_0_30px_rgba(168,85,247,0.3)]"
      >
        <VideoParticipant
          user={currentUser}
          isVideoEnabled={isVideoEnabled}
          isAudioEnabled={isAudioEnabled}
          isSpeaking={false}
          showName
          className="w-full h-full"
        />
      </motion.div>
    </div>
  );
}

interface VideoParticipantProps {
  user: {
    id: string;
    name: string;
    avatar_url?: string;
    rating: number;
  };
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  isSpeaking: boolean;
  showName?: boolean;
  className?: string;
}

function VideoParticipant({
  user,
  isVideoEnabled,
  isAudioEnabled,
  isSpeaking,
  showName,
  className,
}: VideoParticipantProps) {
  return (
    <div className={`relative bg-dark-card ${className}`}>
      {isVideoEnabled ? (
        // Video placeholder - replace with actual video element
        <div className="relative w-full h-full bg-gradient-to-br from-brand-purple/20 via-dark-card to-brand-cyan/20 flex items-center justify-center">
          {/* Avatar as fallback */}
          <div className="relative">
            {user.avatar_url ? (
              <Image
                src={user.avatar_url}
                alt={user.name}
                width={120}
                height={120}
                className="rounded-full border-4 border-brand-purple/40"
              />
            ) : (
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-brand-purple to-brand-cyan flex items-center justify-center border-4 border-brand-purple/40">
                <User className="h-12 w-12 sm:h-16 sm:w-16 text-white" />
              </div>
            )}
          </div>

          {/* Video placeholder text */}
          <div className="absolute inset-0 flex items-center justify-center bg-dark/20">
            <p className="text-steel/50 text-sm">[Video Stream Placeholder]</p>
          </div>
        </div>
      ) : (
        // Video disabled - show avatar
        <div className="relative w-full h-full bg-dark-card flex items-center justify-center">
          <div className="text-center">
            {user.avatar_url ? (
              <Image
                src={user.avatar_url}
                alt={user.name}
                width={80}
                height={80}
                className="rounded-full mx-auto mb-2 border-2 border-brand-purple/40"
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-brand-purple to-brand-cyan flex items-center justify-center mx-auto mb-2 border-2 border-brand-purple/40">
                <User className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
            )}
            <VideoOff className="h-6 w-6 text-steel/60 mx-auto" />
          </div>
        </div>
      )}

      {/* User Info Overlay */}
      {showName && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark/90 to-transparent p-2">
          <p className="text-white text-sm font-medium line-clamp-1">{user.name}</p>
        </div>
      )}

      {/* Audio Indicator */}
      <div className="absolute top-2 right-2 p-2 rounded-full bg-dark-card/90 backdrop-blur-sm border border-brand-purple/30">
        {isAudioEnabled ? (
          <Mic
            className={`h-4 w-4 ${isSpeaking ? 'text-brand-emerald' : 'text-white'}`}
          />
        ) : (
          <MicOff className="h-4 w-4 text-error-400" />
        )}
      </div>

      {/* Speaking Indicator */}
      {isSpeaking && isAudioEnabled && (
        <div className="absolute inset-0 rounded-lg border-2 border-brand-emerald animate-pulse" />
      )}
    </div>
  );
}
