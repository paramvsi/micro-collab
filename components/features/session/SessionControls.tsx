'use client';

/**
 * SessionControls Component
 * Control buttons for video, audio, screen sharing, and ending session
 */

import { Video, VideoOff, Mic, MicOff, Monitor, MonitorOff, Phone, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SessionControlsProps {
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  isScreenSharing: boolean;
  onToggleVideo: () => void;
  onToggleAudio: () => void;
  onToggleScreenShare: () => void;
  onEndSession: () => void;
}

export function SessionControls({
  isVideoEnabled,
  isAudioEnabled,
  isScreenSharing,
  onToggleVideo,
  onToggleAudio,
  onToggleScreenShare,
  onEndSession,
}: SessionControlsProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {/* Audio Toggle */}
      <Button
        onClick={onToggleAudio}
        size="lg"
        className={`h-12 w-12 sm:h-14 sm:w-14 rounded-full p-0 transition-all ${
          isAudioEnabled
            ? 'bg-dark-card/80 hover:bg-dark-card border border-brand-purple/30 text-white'
            : 'bg-error-500 hover:bg-error-600 text-white'
        }`}
      >
        {isAudioEnabled ? (
          <Mic className="h-5 w-5 sm:h-6 sm:w-6" />
        ) : (
          <MicOff className="h-5 w-5 sm:h-6 sm:w-6" />
        )}
      </Button>

      {/* Video Toggle */}
      <Button
        onClick={onToggleVideo}
        size="lg"
        className={`h-12 w-12 sm:h-14 sm:w-14 rounded-full p-0 transition-all ${
          isVideoEnabled
            ? 'bg-dark-card/80 hover:bg-dark-card border border-brand-purple/30 text-white'
            : 'bg-error-500 hover:bg-error-600 text-white'
        }`}
      >
        {isVideoEnabled ? (
          <Video className="h-5 w-5 sm:h-6 sm:w-6" />
        ) : (
          <VideoOff className="h-5 w-5 sm:h-6 sm:w-6" />
        )}
      </Button>

      {/* Screen Share Toggle */}
      <Button
        onClick={onToggleScreenShare}
        size="lg"
        className={`h-12 w-12 sm:h-14 sm:w-14 rounded-full p-0 transition-all ${
          isScreenSharing
            ? 'bg-brand-cyan hover:bg-brand-cyan/90 text-white'
            : 'bg-dark-card/80 hover:bg-dark-card border border-brand-purple/30 text-white'
        }`}
      >
        {isScreenSharing ? (
          <MonitorOff className="h-5 w-5 sm:h-6 sm:w-6" />
        ) : (
          <Monitor className="h-5 w-5 sm:h-6 sm:w-6" />
        )}
      </Button>

      {/* Settings */}
      <Button
        size="lg"
        variant="ghost"
        className="h-12 w-12 sm:h-14 sm:w-14 rounded-full p-0 bg-dark-card/80 hover:bg-dark-card border border-brand-purple/30 text-white hidden sm:flex"
      >
        <Settings className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>

      {/* Divider */}
      <div className="h-8 w-px bg-brand-purple/20 mx-1 sm:mx-2" />

      {/* End Call Button */}
      <Button
        onClick={onEndSession}
        size="lg"
        className="h-12 w-12 sm:h-14 sm:w-14 rounded-full p-0 bg-error-500 hover:bg-error-600 text-white transition-all hover:scale-110"
      >
        <Phone className="h-5 w-5 sm:h-6 sm:w-6 rotate-[135deg]" />
      </Button>
    </div>
  );
}
