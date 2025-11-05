'use client';

/**
 * Session Collaboration Room Page
 * Real-time collaboration space with video, chat, and code sharing
 */

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Monitor,
  MonitorOff,
  Phone,
  MessageSquare,
  FileText,
  Code,
  Settings,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { useSession } from '@/lib/hooks/queries/use-sessions';
import { useAuthStore } from '@/lib/stores/auth-store';
import { VideoCall } from '@/components/features/session/VideoCall';
import { SessionChat } from '@/components/features/session/SessionChat';
import { RequestDetailsPanel } from '@/components/features/session/RequestDetailsPanel';
import { SessionControls } from '@/components/features/session/SessionControls';
import { SessionTimer } from '@/components/features/session/SessionTimer';
import { Button } from '@/components/ui/button';

export default function SessionRoomPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.id as string;
  const { user } = useAuthStore();

  // Fetch session data
  const { data: session, isLoading } = useSession(sessionId);

  // Session state
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [showDetails, setShowDetails] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Check if user is authorized for this session
  useEffect(() => {
    if (session && user) {
      const isAuthorized =
        session.helper_id === user.id || session.requester_id === user.id;

      if (!isAuthorized) {
        router.push('/dashboard');
      }
    }
  }, [session, user, router]);

  // Handle session end
  const handleEndSession = () => {
    // TODO: Implement session end logic
    router.push(`/sessions/${sessionId}/feedback`);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-purple/20 border-t-brand-purple" />
          <span className="text-steel">Loading session...</span>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Session not found</h2>
          <p className="text-steel mb-4">This session does not exist or has been removed.</p>
          <Button onClick={() => router.push('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const isHelper = user?.id === session.helper_id;
  const otherUser: { id: string; name: string; avatar_url?: string; rating: number } =
    isHelper ? session.requester : session.helper;

  return (
    <div className="relative flex h-screen flex-col bg-dark overflow-hidden">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between border-b border-brand-purple/20 bg-dark-card/80 backdrop-blur-sm px-4 py-3"
      >
        <div className="flex items-center gap-4">
          <h1 className="text-lg sm:text-xl font-bold text-white line-clamp-1">
            <span className="gradient-text">{session.request.title}</span>
          </h1>
          <SessionTimer
            startTime={session.actual_start || session.scheduled_start || session.created_at}
            status={session.status}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            className="hidden lg:flex"
          >
            <FileText className="h-4 w-4 mr-2" />
            Details
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowChat(!showChat)}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Chat
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </motion.header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Request Details (Desktop only) */}
        {showDetails && (
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block w-80 border-r border-brand-purple/20 bg-dark-card/50 overflow-y-auto"
          >
            <RequestDetailsPanel session={session} />
          </motion.aside>
        )}

        {/* Center - Video Call Area */}
        <div className="flex flex-1 flex-col">
          {/* Video Grid */}
          <div className="flex-1 relative bg-dark/50">
            <VideoCall
              session={session}
              currentUserId={user?.id || ''}
              isVideoEnabled={isVideoEnabled}
              isAudioEnabled={isAudioEnabled}
              isScreenSharing={isScreenSharing}
            />
          </div>

          {/* Control Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 sm:gap-4 border-t border-brand-purple/20 bg-dark-card/80 backdrop-blur-sm px-4 py-4"
          >
            <SessionControls
              isVideoEnabled={isVideoEnabled}
              isAudioEnabled={isAudioEnabled}
              isScreenSharing={isScreenSharing}
              onToggleVideo={() => setIsVideoEnabled(!isVideoEnabled)}
              onToggleAudio={() => setIsAudioEnabled(!isAudioEnabled)}
              onToggleScreenShare={() => setIsScreenSharing(!isScreenSharing)}
              onEndSession={handleEndSession}
            />
          </motion.div>
        </div>

        {/* Right Sidebar - Chat */}
        {showChat && (
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full sm:w-80 lg:w-96 border-l border-brand-purple/20 bg-dark-card/50 flex flex-col"
          >
            <SessionChat
              sessionId={session.id}
              currentUserId={user?.id || ''}
              otherUser={otherUser}
            />
          </motion.aside>
        )}
      </div>
    </div>
  );
}
