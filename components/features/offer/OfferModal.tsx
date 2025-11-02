'use client';

/**
 * OfferModal Component
 * Modal for submitting offers on help requests
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Loader2, Send, DollarSign, Clock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useCreateOffer } from '@/lib/hooks/queries/use-offers';
import { useAuthStore } from '@/lib/stores/auth-store';

const offerSchema = z.object({
  message: z.string().min(20, 'Message must be at least 20 characters').max(500, 'Message must be less than 500 characters'),
  proposed_rate: z.number().min(0, 'Rate must be positive').optional(),
  proposed_time: z.string().optional(),
  estimated_completion: z.string().optional(),
});

type OfferFormData = z.infer<typeof offerSchema>;

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestId: string;
}

export function OfferModal({ isOpen, onClose, requestId }: OfferModalProps) {
  const { user } = useAuthStore();
  const createOffer = useCreateOffer();

  const form = useForm<OfferFormData>({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      message: '',
      proposed_rate: undefined,
      proposed_time: '',
      estimated_completion: '',
    }
  });

  const { watch, formState: { errors, isSubmitting } } = form;
  const watchedMessage = watch('message') || '';

  const onSubmit = async (data: OfferFormData) => {
    if (!user) {
      console.error('No user found');
      return;
    }

    try {
      await createOffer.mutateAsync({
        request_id: requestId,
        offered_by: user.id,
        message: data.message,
        proposed_rate: data.proposed_rate,
        proposed_time: data.proposed_time || undefined,
        estimated_completion: data.estimated_completion || undefined,
      });

      form.reset();
      onClose();
    } catch (error) {
      console.error('Failed to create offer:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-graphite border-brand-purple/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">Submit Your Offer</DialogTitle>
          <DialogDescription className="text-steel">
            Introduce yourself and explain how you can help with this request
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-white">
              Your Message <span className="text-error-400">*</span>
            </Label>
            <Textarea
              id="message"
              placeholder="Explain your experience with similar issues and how you plan to help..."
              className="bg-dark-elevated border-brand-purple/20 min-h-[150px] text-white"
              {...form.register('message')}
            />
            <div className="flex items-center justify-between text-xs">
              <span className="text-error-400">{errors.message?.message}</span>
              <span className="text-muted-foreground">
                {watchedMessage.length}/500
              </span>
            </div>
          </div>

          {/* Proposed Rate & Time */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Proposed Rate */}
            <div className="space-y-2">
              <Label htmlFor="proposed_rate" className="text-white flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-brand-emerald" />
                Proposed Rate (Optional)
              </Label>
              <Input
                id="proposed_rate"
                type="number"
                placeholder="50"
                className="bg-dark-elevated border-brand-purple/20 text-white"
                {...form.register('proposed_rate', { valueAsNumber: true })}
              />
              <p className="text-xs text-steel">Hourly rate in USD</p>
            </div>

            {/* Proposed Time */}
            <div className="space-y-2">
              <Label htmlFor="proposed_time" className="text-white flex items-center gap-2">
                <Clock className="h-4 w-4 text-brand-sky" />
                Available Time (Optional)
              </Label>
              <Input
                id="proposed_time"
                type="text"
                placeholder="e.g., Tomorrow at 3 PM EST"
                className="bg-dark-elevated border-brand-purple/20 text-white"
                {...form.register('proposed_time')}
              />
            </div>
          </div>

          {/* Estimated Completion */}
          <div className="space-y-2">
            <Label htmlFor="estimated_completion" className="text-white">
              Estimated Completion (Optional)
            </Label>
            <Input
              id="estimated_completion"
              type="text"
              placeholder="e.g., 2-3 hours, Same day, Within a week"
              className="bg-dark-elevated border-brand-purple/20 text-white"
              {...form.register('estimated_completion')}
            />
            <p className="text-xs text-steel">How long do you think this will take?</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="gradient"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Offer
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
