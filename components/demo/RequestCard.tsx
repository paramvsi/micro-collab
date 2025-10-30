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
        whileHover={{ scale: 1.02, y: -3 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="group relative h-full"
      >
        <Card
          variant="interactive"
          className="h-full bg-surface border border-white/5 rounded-xl transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(236,72,153,0.25)] hover:-translate-y-[3px]"
        >
          <CardHeader className="p-4 sm:p-6">
            {/* Urgency Badge & Timestamp - responsive */}
            <div className="mb-3 flex items-start justify-between gap-2">
              <Badge
                variant="outline"
                className={cn(
                  "gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-semibold",
                  config.bg,
                  config.color,
                  config.border
                )}
              >
                {UrgencyIcon && <UrgencyIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />}
                <span className="hidden sm:inline">{request.urgency.toUpperCase()}</span>
                <span className="sm:hidden">{request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)}</span>
              </Badge>
              <span className="text-xs text-steel whitespace-nowrap">
                {formatDistanceToNow(request.createdAt, { addSuffix: true })}
              </span>
            </div>

            {/* Title - responsive */}
            <CardTitle className="mb-2 text-lg sm:text-xl group-hover:text-brand-pink transition-colors leading-snug">
              {request.title}
            </CardTitle>

            {/* Description - responsive */}
            <CardDescription className="line-clamp-2 text-sm sm:text-base leading-relaxed">
              {request.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
            {/* Tags with varied colors - responsive */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
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
                      "border transition-all hover:scale-105 text-xs sm:text-sm px-2 sm:px-2.5 py-0.5 sm:py-1",
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

            {/* Color-coded interactive metrics - responsive */}
            <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm mt-2 sm:mt-3">
              <span className="text-sky-400 font-medium flex items-center gap-1 sm:gap-1.5">
                ● {request.duration}h
              </span>
              <span className={cn(
                "font-medium flex items-center gap-1 sm:gap-1.5",
                request.mode === "async" ? "text-emerald-400" : "text-pink-400"
              )}>
                ● {request.mode === "async" ? "Async" : "Live"}
              </span>
              {request.budget && (
                <span className="text-amber-300 font-medium flex items-center gap-1 sm:gap-1.5">
                  ● ${request.budget.amount}
                </span>
              )}
              {request.offers.length > 0 && (
                <span className="text-orange-400 font-medium flex items-center gap-1 sm:gap-1.5">
                  ● {request.offers.length} {request.offers.length === 1 ? "offer" : "offers"}
                </span>
              )}
            </div>
          </CardContent>

          <CardFooter className="p-4 sm:p-6 pt-0">
            <Button
              variant="gradient-accent"
              size="lg"
              className="w-full h-11 sm:h-12 text-sm sm:text-base"
              onClick={(e) => {
                e.stopPropagation();
                setIsOfferModalOpen(true);
              }}
            >
              <Users className="h-4 w-4 sm:h-5 sm:w-5" />
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
