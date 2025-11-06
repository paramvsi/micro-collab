"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

interface PricingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PricingModal({ open, onOpenChange }: PricingModalProps) {
  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for raising small requests",
      popular: false,
      features: [
        { name: "Up to 3 requests per month", included: true },
        { name: "1-hour session limit", included: true },
        { name: "Community support", included: true },
        { name: "Basic profile", included: true },
        { name: "Search and browse", included: true },
        { name: "Unlimited requests", included: false },
        { name: "Extended sessions (up to 4 hours)", included: false },
        { name: "Priority support", included: false },
        { name: "Advanced analytics", included: false },
      ],
      cta: "Get Started Free",
      gradient: "from-slate-500 to-slate-600",
    },
    {
      name: "Premium",
      price: "$19",
      period: "per month",
      description: "For professionals who need unlimited access",
      popular: true,
      features: [
        { name: "Unlimited requests", included: true },
        { name: "Extended sessions (up to 4 hours)", included: true },
        { name: "Priority matching", included: true },
        { name: "Advanced profile with portfolio", included: true },
        { name: "Detailed analytics", included: true },
        { name: "Priority support", included: true },
        { name: "Early access to new features", included: true },
        { name: "Custom badges and verification", included: true },
      ],
      cta: "Upgrade to Premium",
      gradient: "from-brand-indigo via-brand-pink to-brand-orange",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-slate-900 border-white/10">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-white text-center">
            Choose Your <span className="gradient-text">Plan</span>
          </DialogTitle>
          <DialogDescription className="text-center text-slate-400 text-base">
            Start free and upgrade anytime. No credit card required for free tier.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-2 mt-6">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <Badge variant="success" className="px-4 py-1 shadow-lg">
                    Most Popular
                  </Badge>
                </div>
              )}

              <Card
                variant={plan.popular ? "interactive" : "glass"}
                className={`h-full ${
                  plan.popular
                    ? "border-2 border-brand-pink/50 shadow-[0_0_30px_rgba(236,72,153,0.4)]"
                    : "border-white/10"
                }`}
              >
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span
                      className="text-5xl font-bold gradient-text"
                      style={
                        plan.popular
                          ? {
                              background: "linear-gradient(to right, #6366F1, #EC4899, #F97316)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              backgroundClip: "text",
                            }
                          : undefined
                      }
                    >
                      {plan.price}
                    </span>
                    <span className="text-slate-400 text-base">/ {plan.period}</span>
                  </div>
                  <CardDescription className="text-base mt-2">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className={`flex items-start gap-3 ${
                          feature.included ? "text-white" : "text-slate-500"
                        }`}
                      >
                        {feature.included ? (
                          <Check className="h-5 w-5 text-brand-pink flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="h-5 w-5 text-slate-600 flex-shrink-0 mt-0.5" />
                        )}
                        <span className="text-sm">{feature.name}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button
                    variant={plan.popular ? "gradient" : "outline"}
                    size="lg"
                    className="w-full"
                    asChild
                  >
                    <motion.a
                      href="/signup"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onOpenChange(false)}
                    >
                      {plan.cta}
                    </motion.a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 text-center text-sm text-slate-400">
          <p>All plans include access to our community of expert developers.</p>
          <p className="mt-1">Cancel anytime. No questions asked.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
