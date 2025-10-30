"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { Clock, MessageSquare, Users, Zap, DollarSign } from "lucide-react";
import type { DemoRequest } from "@/types/demo";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OfferModal } from "./OfferModal";

export function RequestCard({ request }: { request: DemoRequest }) {
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  const urgencyConfig = {
    low: { color: "text-steel", icon: null, bg: "bg-steel/20", border: "border-steel/30" },
    normal: { color: "text-warning", icon: Clock, bg: "bg-warning/20", border: "border-warning/30" },
    critical: { color: "text-error", icon: Zap, bg: "bg-error/20", border: "border-error/30" },
  };

  const config = urgencyConfig[request.urgency];
  const UrgencyIcon = config.icon;

  return (
    <>
      {/* Match CategoryHighlights pattern */}
      <motion.div
        whileHover={{ scale: 1.02, y: -6 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="group relative h-full"
      >
        <Card
          variant="interactive"
          className="card-hover-ring card-enhanced h-full"
        >
          <CardHeader>
            {/* Urgency Badge & Timestamp */}
            <div className="mb-3 flex items-start justify-between gap-2">
              <Badge
                variant="outline"
                className={cn(
                  "gap-1.5 px-3 py-1.5 font-semibold",
                  config.bg,
                  config.color,
                  config.border
                )}
              >
                {UrgencyIcon && <UrgencyIcon className="h-3.5 w-3.5" />}
                {request.urgency.toUpperCase()}
              </Badge>
              <span className="text-xs text-steel">
                {formatDistanceToNow(request.createdAt, { addSuffix: true })}
              </span>
            </div>

            {/* Title */}
            <CardTitle className="mb-2 text-xl group-hover:text-brand-pink transition-colors">
              {request.title}
            </CardTitle>

            {/* Description */}
            <CardDescription className="line-clamp-2 text-base leading-relaxed">
              {request.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Tags with varied colors */}
            <div className="flex flex-wrap gap-2">
              {request.tags.map((tag, index) => {
                // Color-coded tags matching RequestFilters
                const tagColors: Record<string, { bg: string; text: string; border: string }> = {
                  React: { bg: "bg-cyan-500/20", text: "text-cyan-400", border: "border-cyan-500/30" },
                  TypeScript: { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/30" },
                  "Node.js": { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500/30" },
                  Python: { bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500/30" },
                  "UI/UX": { bg: "bg-pink-500/20", text: "text-pink-400", border: "border-pink-500/30" },
                  Testing: { bg: "bg-purple-500/20", text: "text-purple-400", border: "border-purple-500/30" },
                  DevOps: { bg: "bg-orange-500/20", text: "text-orange-400", border: "border-orange-500/30" },
                  GraphQL: { bg: "bg-fuchsia-500/20", text: "text-fuchsia-400", border: "border-fuchsia-500/30" },
                  "Next.js": { bg: "bg-slate-400/20", text: "text-slate-300", border: "border-slate-500/30" },
                  Tailwind: { bg: "bg-teal-500/20", text: "text-teal-400", border: "border-teal-500/30" },
                };

                // Fallback colors for unknown tags
                const fallbackColors = [
                  { bg: "bg-brand-indigo/20", text: "text-brand-indigo", border: "border-brand-indigo/30" },
                  { bg: "bg-brand-pink/20", text: "text-brand-pink", border: "border-brand-pink/30" },
                  { bg: "bg-brand-emerald/20", text: "text-brand-emerald", border: "border-brand-emerald/30" },
                  { bg: "bg-brand-orange/20", text: "text-brand-orange", border: "border-brand-orange/30" },
                  { bg: "bg-brand-sky/20", text: "text-brand-sky", border: "border-brand-sky/30" },
                ];

                const colors = tagColors[tag] || fallbackColors[index % fallbackColors.length];

                return (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className={cn(
                      "border transition-all hover:scale-105",
                      colors.bg,
                      colors.text,
                      colors.border
                    )}
                  >
                    {tag}
                  </Badge>
                );
              })}
            </div>

            {/* Meta Info with colored icons */}
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="flex items-center gap-1.5 text-steel">
                <Clock className="h-4 w-4 text-brand-sky" />
                <span>{request.duration}h</span>
              </span>
              <span className="flex items-center gap-1.5 text-steel">
                <MessageSquare className="h-4 w-4 text-brand-pink" />
                <span>{request.mode === "async" ? "Async" : "Live"}</span>
              </span>
              {request.budget && (
                <span className="flex items-center gap-1.5 text-brand-emerald">
                  <DollarSign className="h-4 w-4" />
                  <span>${request.budget.amount}</span>
                </span>
              )}
              {request.offers.length > 0 && (
                <span className="flex items-center gap-1.5 text-brand-orange">
                  <Users className="h-4 w-4" />
                  <span>{request.offers.length} {request.offers.length === 1 ? "offer" : "offers"}</span>
                </span>
              )}
            </div>
          </CardContent>

          <CardFooter>
            <Button
              variant="gradient-accent"
              size="lg"
              className="w-full"
              onClick={(e) => {
                e.stopPropagation();
                setIsOfferModalOpen(true);
              }}
            >
              <Users className="h-4 w-4" />
              Offer Help
            </Button>
          </CardFooter>
        </Card>

        {/* Hover Glow Effect matching CategoryHighlights */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.3 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-brand-indigo via-brand-pink to-brand-orange blur-2xl"
        />
      </motion.div>

      <OfferModal
        isOpen={isOfferModalOpen}
        onClose={() => setIsOfferModalOpen(false)}
        request={request}
      />
    </>
  );
}
