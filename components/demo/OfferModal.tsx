"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { DemoRequest } from "@/types/demo";
import { useDemoStore } from "@/lib/stores/demo-store";
import { cn } from "@/lib/utils";
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
      <DialogContent className="max-w-lg sm:max-w-xl border-2 border-white/20 bg-gradient-to-br from-[#1a1a24] via-[#1e1e2e] to-[#1a1a24] shadow-2xl shadow-brand-purple/20">
        {/* Glow effect */}
        <div className="absolute -inset-[2px] bg-gradient-to-r from-brand-indigo via-brand-purple to-brand-pink opacity-20 blur-xl -z-10 rounded-lg" />

        <DialogHeader className="space-y-3">
          <DialogTitle className="font-display text-2xl sm:text-3xl bg-gradient-to-r from-brand-indigo via-brand-purple to-brand-pink bg-clip-text text-transparent">
            Offer to Help
          </DialogTitle>
          <DialogDescription className="text-base text-slate-300">
            Send a message to the requester about how you can help with:
          </DialogDescription>
        </DialogHeader>

        {/* Request Preview - Enhanced */}
        <div className="my-4 rounded-xl border-2 border-brand-indigo/30 bg-gradient-to-br from-brand-indigo/10 to-brand-purple/10 p-5 backdrop-blur-sm shadow-lg">
          <h4 className="mb-3 font-semibold text-lg text-white leading-snug">{request.title}</h4>
          <div className="flex flex-wrap gap-2">
            {request.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-lg bg-brand-indigo/30 border border-brand-indigo/40 px-3 py-1.5 text-sm font-medium text-brand-indigo shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Message Input - Completely redesigned */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-semibold text-white">
              Your Message
            </label>
            <span className={cn(
              "text-sm font-medium tabular-nums",
              message.length < 20 && "text-red-400",
              message.length >= 20 && message.length < 400 && "text-emerald-400",
              message.length >= 400 && "text-amber-400"
            )}>
              {message.length}/500
            </span>
          </div>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, 500))}
            placeholder="Hi! I can help with this. I have experience with..."
            className={cn(
              "w-full min-h-32 resize-none rounded-xl px-4 py-3 text-base",
              "bg-white/10 backdrop-blur-sm",
              "text-white placeholder:text-slate-400",
              "border-2 transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1a1a24]",
              message.length < 20 && "border-red-500/40 focus:border-red-500 focus:ring-red-500/20",
              message.length >= 20 && "border-emerald-500/40 focus:border-emerald-500 focus:ring-emerald-500/20"
            )}
            autoFocus
          />

          {message.length < 20 && (
            <div className="flex items-center gap-2 px-1">
              <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              <p className="text-sm text-red-400 font-medium">
                Minimum 20 characters required ({20 - message.length} more)
              </p>
            </div>
          )}

          {message.length >= 20 && message.length < 50 && (
            <div className="flex items-center gap-2 px-1">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <p className="text-sm text-emerald-400 font-medium">
                Good start! Add more details to strengthen your offer.
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-3 mt-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="h-11 sm:h-12 border-2 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 transition-all"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={message.length < 20 || isSubmitting}
            className={cn(
              "h-11 sm:h-12 min-w-32 font-semibold text-white shadow-lg transition-all",
              "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500",
              "hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600",
              "hover:shadow-emerald-500/50 hover:scale-105",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            )}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </span>
            ) : (
              "Send Offer"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
