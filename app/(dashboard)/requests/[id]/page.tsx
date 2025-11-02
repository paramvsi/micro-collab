'use client';

/**
 * Request Details Page
 * Shows full request details, offers, and allows offer submission
 */

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, DollarSign, MessageSquare, Video, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRequest } from '@/lib/hooks/queries/use-requests';
import { useOffers } from '@/lib/hooks/queries/use-offers';
import { useAuthStore } from '@/lib/stores/auth-store';
import { OfferModal } from '@/components/features/offer/OfferModal';
import { OfferCard } from '@/components/features/offer/OfferCard';
import { UserProfileCard } from '@/components/features/user/UserProfileCard';
import { formatDistanceToNow } from 'date-fns';

export default function RequestDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const requestId = params.id as string;
  const { user } = useAuthStore();
  const [showOfferModal, setShowOfferModal] = useState(false);

  const { data: request, isLoading, error } = useRequest(requestId);
  const { data: offers, isLoading: offersLoading } = useOffers(requestId);

  const isOwner = user?.id === request?.created_by;
  const hasOffered = offers?.some(offer => offer.offered_by === user?.id);

  // Urgency color mapping
  const urgencyColors = {
    low: 'steel',
    normal: 'warning',
    critical: 'error'
  };

  const urgencyColor = urgencyColors[request?.urgency || 'normal'];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading request...</div>
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-error-400">Request not found</div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-[radial-gradient(circle_at_60%_40%,_rgba(99,102,241,0.05),_transparent_80%)] mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
      {/* Background Glows */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1 }}
        className="pointer-events-none absolute left-1/4 top-0 -z-10 h-96 w-96"
      >
        <div className="glow-emerald h-full w-full" />
      </motion.div>

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-4 sm:mb-6"
      >
        <Link href="/browse">
          <Button variant="ghost" size="sm" className="text-sm">
            <ArrowLeft className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Back to Browse</span>
            <span className="sm:hidden">Back</span>
          </Button>
        </Link>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Content - Request Details */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Request Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-graphite/50 backdrop-blur-sm border border-brand-purple/20 rounded-xl p-4 sm:p-6 shadow-lg"
          >
            {/* Header */}
            <div className="mb-4">
              <div className="flex items-start justify-between gap-3 sm:gap-4 mb-3">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
                  {request.title}
                </h1>
                <Badge
                  className={
                    request.urgency === 'low'
                      ? 'bg-steel-400/10 text-steel-400 border-steel-400/20'
                      : request.urgency === 'normal'
                      ? 'bg-warning-400/10 text-warning-400 border-warning-400/20'
                      : 'bg-error-400/10 text-error-400 border-error-400/20'
                  }
                >
                  {request.urgency}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {request.tags.map((tag, idx) => {
                  const tagColors = [
                    'bg-gradient-to-r from-brand-cyan/20 to-brand-sky/20 text-brand-cyan border-brand-cyan/30',
                    'bg-gradient-to-r from-brand-purple/20 to-brand-pink/20 text-brand-pink border-brand-pink/30',
                    'bg-gradient-to-r from-brand-emerald/20 to-brand-sky/20 text-brand-emerald border-brand-emerald/30',
                    'bg-gradient-to-r from-brand-orange/20 to-brand-pink/20 text-brand-orange border-brand-orange/30',
                  ];
                  return (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className={`${tagColors[idx % tagColors.length]} hover:scale-105 transition-transform`}
                    >
                      {tag}
                    </Badge>
                  );
                })}
              </div>
            </div>

            {/* Meta Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 p-3 md:p-4 bg-dark-elevated/50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-brand-sky/20 to-brand-cyan/20">
                  <Clock className="h-3 w-3 md:h-4 md:w-4 text-brand-sky" />
                </div>
                <div>
                  <div className="text-xs font-medium text-brand-sky">Duration</div>
                  <div className="text-sm font-bold text-white">{request.duration_hours}h</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg ${request.mode === 'async' ? 'bg-gradient-to-br from-brand-cyan/20 to-brand-sky/20' : 'bg-gradient-to-br from-brand-pink/20 to-brand-purple/20'}`}>
                  {request.mode === 'async' ? (
                    <MessageSquare className="h-3 w-3 md:h-4 md:w-4 text-brand-cyan" />
                  ) : (
                    <Video className="h-3 w-3 md:h-4 md:w-4 text-brand-pink" />
                  )}
                </div>
                <div>
                  <div className={`text-xs font-medium ${request.mode === 'async' ? 'text-brand-cyan' : 'text-brand-pink'}`}>Mode</div>
                  <div className="text-sm font-bold text-white">
                    {request.mode === 'async' ? 'Async' : 'Live'}
                  </div>
                </div>
              </div>
              {request.budget && (
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-brand-emerald/20 to-success-400/20">
                    <DollarSign className="h-3 w-3 md:h-4 md:w-4 text-brand-emerald" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-brand-emerald">Budget</div>
                    <div className="text-sm font-bold text-white">
                      ${request.budget}/{request.budget_type}
                    </div>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-brand-orange/20 to-warning-400/20">
                  <Calendar className="h-3 w-3 md:h-4 md:w-4 text-brand-orange" />
                </div>
                <div>
                  <div className="text-xs font-medium text-brand-orange">Posted</div>
                  <div className="text-sm font-bold text-white">
                    {formatDistanceToNow(new Date(request.created_at), { addSuffix: true })}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold gradient-text mb-3">Description</h3>
              <p className="text-steel whitespace-pre-wrap leading-relaxed">
                {request.description}
              </p>
            </div>

            {/* Preferred Time */}
            {request.preferred_time && (
              <div className="mt-6 p-4 bg-gradient-to-r from-brand-purple/10 to-brand-pink/10 rounded-lg border border-brand-purple/30 shadow-[0_0_16px_rgba(168,85,247,0.2)]">
                <div className="text-sm font-medium text-brand-purple mb-1">Preferred Time</div>
                <div className="text-white">{request.preferred_time}</div>
              </div>
            )}
          </motion.div>

          {/* Offers Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-graphite/50 backdrop-blur-sm border border-brand-purple/20 rounded-xl p-4 sm:p-6 shadow-lg"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold gradient-text">
                Offers {offers && offers.length > 0 && `(${offers.length})`}
              </h2>
              {!isOwner && !hasOffered && (
                <Button
                  variant="gradient"
                  onClick={() => setShowOfferModal(true)}
                  className="w-full sm:w-auto"
                  size="sm"
                >
                  <span className="text-sm">Submit Offer</span>
                </Button>
              )}
            </div>

            {offersLoading ? (
              <div className="text-center py-8 text-steel">Loading offers...</div>
            ) : offers && offers.length > 0 ? (
              <div className="space-y-4">
                {offers.map(offer => (
                  <OfferCard
                    key={offer.id}
                    offer={offer}
                    isOwner={isOwner}
                    requestId={requestId}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MessageSquare className="mx-auto h-12 w-12 text-steel mb-4" />
                <p className="text-lg font-medium text-white mb-2">No offers yet</p>
                <p className="text-steel">
                  {isOwner
                    ? 'Waiting for helpers to submit offers'
                    : 'Be the first to help!'}
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Sidebar - Requester Info */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <UserProfileCard userId={request.created_by} />
          </motion.div>
        </div>
      </div>

      {/* Offer Modal */}
      <OfferModal
        isOpen={showOfferModal}
        onClose={() => setShowOfferModal(false)}
        requestId={requestId}
      />
    </main>
  );
}
