"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { DemoRequest } from "@/types/demo";
import { useDemoStore } from "@/lib/stores/demo-store";
import { cn } from "@/lib/utils";
import { inputBase } from "@/lib/utils/tailwind-patterns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function OfferModal({
  isOpen,
  onClose,
  request,
}: {
  isOpen: boolean;
  onClose: () => void;
  request: DemoRequest;
}) {
  const [message, setMessage] = useState("");
  const { createOffer } = useDemoStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (message.length < 20) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
    createOffer(request.id, message);

    toast.success("Offer sent! (Demo mode)", {
      description: "In production, the requester would be notified.",
    });

    setIsSubmitting(false);
    onClose();
    setMessage("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg border border-smoky bg-graphite">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-white">
            Offer to Help
          </DialogTitle>
          <DialogDescription className="text-steel">
            Send a message to the requester about how you can help with:
          </DialogDescription>
        </DialogHeader>

        {/* Request Preview */}
        <div className="my-4 rounded-lg border border-smoky bg-charcoal/50 p-4">
          <h4 className="mb-2 font-semibold text-white">{request.title}</h4>
          <div className="flex gap-2">
            {request.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded bg-brand-indigo/20 px-2 py-1 text-xs text-brand-indigo"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div>
          <label className="mb-2 block text-sm font-medium text-steel">
            Your Message ({message.length}/500)
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, 500))}
            placeholder="Hi! I can help with this. I have experience with..."
            className={cn(
              inputBase,
              "min-h-32 resize-none",
              message.length < 20 && "border-urgency-critical/50",
              message.length >= 20 && "border-brand-emerald/50"
            )}
          />
          {message.length < 20 && (
            <p className="mt-1 text-xs text-urgency-critical">
              Minimum 20 characters required
            </p>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-smoky"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={message.length < 20 || isSubmitting}
            className="bg-gradient-accent text-white hover:scale-105"
          >
            {isSubmitting ? "Sending..." : "Send Offer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
