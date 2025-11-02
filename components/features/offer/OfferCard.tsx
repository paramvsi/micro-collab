'use client';

/**
 * OfferCard Component
 * Displays an offer with helper info and accept/decline actions
 */

import { motion } from 'framer-motion';
import { Check, X, DollarSign, Clock, Star, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAcceptOffer, useDeclineOffer } from '@/lib/hooks/queries/use-offers';
import { formatDistanceToNow } from 'date-fns';
import type { OfferWithHelper } from '@/lib/services/types';
import { useRouter } from 'next/navigation';

interface OfferCardProps {
  offer: OfferWithHelper;
  isOwner: boolean;
  requestId: string;
}

export function OfferCard({ offer, isOwner, requestId }: OfferCardProps) {
  const router = useRouter();
  const acceptOffer = useAcceptOffer();
  const declineOffer = useDeclineOffer();

  const handleAccept = async () => {
    try {
      const session = await acceptOffer.mutateAsync(offer.id);
      // Redirect to session page
      router.push(`/sessions/${session.id}`);
    } catch (error) {
      console.error('Failed to accept offer:', error);
    }
  };

  const handleDecline = async () => {
    try {
      await declineOffer.mutateAsync(offer.id);
    } catch (error) {
      console.error('Failed to decline offer:', error);
    }
  };

  const statusColors = {
    pending: 'bg-brand-sky/10 text-brand-sky border-brand-sky/30',
    accepted: 'bg-brand-emerald/10 text-brand-emerald border-brand-emerald/30',
    declined: 'bg-steel-400/10 text-steel-400 border-steel-400/30'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark-elevated/80 border border-brand-purple/20 rounded-lg p-5 hover:border-brand-purple/40 transition-colors"
    >
      {/* Helper Info */}
      <div className="flex items-start gap-4 mb-4">
        <Avatar className="h-12 w-12 border-2 border-brand-purple/30">
          <AvatarImage src={offer.helper.avatar_url} alt={offer.helper.name} />
          <AvatarFallback className="bg-brand-purple text-white">
            {offer.helper.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-white">{offer.helper.name}</h4>
            <Badge className={statusColors[offer.status]}>
              {offer.status}
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-steel">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-brand-orange fill-brand-orange" />
              <span>{offer.helper.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Award className="h-3 w-3 text-brand-emerald" />
              <span>{offer.helper.skills.length} skills</span>
            </div>
            <div className="text-muted-foreground">
              {formatDistanceToNow(new Date(offer.created_at), { addSuffix: true })}
            </div>
          </div>
        </div>
      </div>

      {/* Helper Skills */}
      <div className="flex flex-wrap gap-1 mb-4">
        {offer.helper.skills.slice(0, 5).map(skill => (
          <Badge
            key={skill}
            className="bg-brand-purple/10 text-brand-cyan border-brand-cyan/20 text-xs"
          >
            {skill}
          </Badge>
        ))}
        {offer.helper.skills.length > 5 && (
          <Badge className="bg-steel-400/10 text-steel-400 border-steel-400/20 text-xs">
            +{offer.helper.skills.length - 5} more
          </Badge>
        )}
      </div>

      {/* Message */}
      <p className="text-sm text-steel mb-4 leading-relaxed">{offer.message}</p>

      {/* Offer Details */}
      {(offer.proposed_rate || offer.proposed_time || offer.estimated_completion) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 p-3 bg-graphite/50 rounded-lg">
          {offer.proposed_rate && (
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-brand-emerald" />
              <div>
                <div className="text-xs text-steel">Proposed Rate</div>
                <div className="text-sm font-medium text-white">${offer.proposed_rate}/hr</div>
              </div>
            </div>
          )}
          {offer.proposed_time && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-brand-sky" />
              <div>
                <div className="text-xs text-steel">Available</div>
                <div className="text-sm font-medium text-white">{offer.proposed_time}</div>
              </div>
            </div>
          )}
          {offer.estimated_completion && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-brand-orange" />
              <div>
                <div className="text-xs text-steel">Est. Time</div>
                <div className="text-sm font-medium text-white">{offer.estimated_completion}</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Actions (only for request owner and pending offers) */}
      {isOwner && offer.status === 'pending' && (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDecline}
            disabled={acceptOffer.isPending || declineOffer.isPending}
            className="flex-1 border-error-400/30 hover:bg-error-400/10 hover:border-error-400/50"
          >
            <X className="mr-2 h-4 w-4" />
            Decline
          </Button>
          <Button
            variant="gradient"
            size="sm"
            onClick={handleAccept}
            disabled={acceptOffer.isPending || declineOffer.isPending}
            className="flex-1"
          >
            <Check className="mr-2 h-4 w-4" />
            Accept & Start Session
          </Button>
        </div>
      )}

      {/* Accepted Message */}
      {offer.status === 'accepted' && (
        <div className="flex items-center gap-2 p-3 bg-brand-emerald/10 rounded-lg border border-brand-emerald/30">
          <Check className="h-4 w-4 text-brand-emerald" />
          <span className="text-sm text-brand-emerald font-medium">
            Offer accepted! Session created.
          </span>
        </div>
      )}
    </motion.div>
  );
}
