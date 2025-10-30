"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import {
  ArrowLeft,
  Clock,
  MessageSquare,
  DollarSign,
  User,
} from "lucide-react";
import { useDemoStore } from "@/lib/stores/demo-store";
import { cn } from "@/lib/utils";
import {
  badgeBase,
  badgeUrgencyLow,
  badgeUrgencyNormal,
  badgeUrgencyCritical,
} from "@/lib/utils/tailwind-patterns";

export default function RequestDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { requests, loadInitialData } = useDemoStore();
  const request = requests.find((r) => r.id === params.id);

  useEffect(() => {
    if (requests.length === 0) {
      loadInitialData();
    }
  }, [requests.length, loadInitialData]);

  if (!request) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-lg border border-smoky bg-graphite/50 p-12 text-center">
          <p className="text-steel">Request not found</p>
          <Link
            href="/demo/browse"
            className="mt-4 inline-block text-brand-indigo hover:underline"
          >
            ← Back to Browse
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Back Button */}
      <Link
        href="/demo/browse"
        className="mb-6 inline-flex items-center gap-2 text-steel transition-colors hover:text-brand-indigo"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Browse
      </Link>

      {/* Request Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 rounded-lg border border-brand-indigo/20 bg-gradient-card p-8"
      >
        <div className="mb-4 flex items-start justify-between">
          <h1 className="font-display text-3xl font-bold text-white">
            {request.title}
          </h1>
          <span
            className={cn(
              badgeBase,
              request.urgency === "low" && badgeUrgencyLow,
              request.urgency === "normal" && badgeUrgencyNormal,
              request.urgency === "critical" && badgeUrgencyCritical
            )}
          >
            {request.urgency.toUpperCase()}
          </span>
        </div>

        {/* Meta */}
        <div className="mb-6 flex flex-wrap gap-4 text-sm text-steel">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {request.duration} hours
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            {request.mode === "async" ? "Async Chat" : "Live Session"}
          </span>
          {request.budget && (
            <span className="flex items-center gap-1 text-brand-emerald">
              <DollarSign className="h-4 w-4" />$
              {request.budget.amount}/{request.duration}h
            </span>
          )}
          <span className="flex items-center gap-1">
            <User className="h-4 w-4" />
            Posted by {request.requester.name}
          </span>
        </div>

        {/* Description */}
        <p className="mb-6 leading-relaxed text-white">
          {request.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {request.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-brand-indigo/20 px-3 py-1 text-sm font-medium text-brand-indigo"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Offers Section */}
      <div className="rounded-lg border border-smoky bg-graphite/50 p-6">
        <h2 className="mb-6 font-display text-2xl font-bold text-white">
          Offers Received ({request.offers.length})
        </h2>

        {request.offers.length === 0 ? (
          <div className="py-12 text-center">
            <p className="mb-4 text-steel">
              No offers yet. Be the first to help!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {request.offers.map((offer) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-lg border border-smoky bg-charcoal/50 p-6 transition-colors hover:border-brand-emerald/50"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{offer.helper.avatar}</span>
                    <div>
                      <h3 className="font-semibold text-white">
                        {offer.helper.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-steel">
                        <span className="flex items-center gap-1">
                          ⭐ {offer.helper.rating}
                        </span>
                        <span>•</span>
                        <span>{offer.helper.sessionsCompleted} sessions</span>
                      </div>
                    </div>
                  </div>
                  <span className="rounded-full bg-brand-emerald/20 px-3 py-1 text-sm text-brand-emerald">
                    {offer.availability}
                  </span>
                </div>

                <p className="mb-4 text-white">{offer.message}</p>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      toast.success("Offer accepted! (Demo mode)", {
                        description:
                          "In production, this would start a real session.",
                      });
                    }}
                    className="rounded-lg bg-gradient-accent px-4 py-2 font-semibold text-white transition-transform hover:scale-105"
                  >
                    Accept Offer (Demo)
                  </button>
                  <button
                    onClick={() => {
                      toast.info(
                        "In production, you could view the helper's full profile."
                      );
                    }}
                    className="rounded-lg border border-smoky bg-graphite px-4 py-2 text-white transition-colors hover:border-brand-indigo"
                  >
                    View Profile
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
