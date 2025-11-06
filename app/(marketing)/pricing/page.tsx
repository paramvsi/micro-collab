"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X, HelpCircle, Zap, Crown, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface PricingTier {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  icon: React.ComponentType<{ className?: string }>;
  popular?: boolean;
  features: string[];
  limitations: string[];
  cta: string;
  ctaLink: string;
}

const tiers: PricingTier[] = [
  {
    name: "Free",
    description: "Perfect for getting started",
    monthlyPrice: 0,
    yearlyPrice: 0,
    icon: Zap,
    features: [
      "5 requests per month",
      "Browse all requests",
      "Send up to 10 offers",
      "Basic profile",
      "Community support",
      "Session history",
    ],
    limitations: [
      "Limited request visibility",
      "Standard response time",
      "No priority support",
    ],
    cta: "Get Started Free",
    ctaLink: "/signup",
  },
  {
    name: "Pro",
    description: "For active collaborators",
    monthlyPrice: 29,
    yearlyPrice: 290,
    icon: Crown,
    popular: true,
    features: [
      "Unlimited requests",
      "Unlimited offers",
      "Priority request listing",
      "Enhanced profile with portfolio",
      "Priority support",
      "Advanced analytics",
      "Custom availability schedule",
      "Verified badge",
      "Early access to features",
    ],
    limitations: [],
    cta: "Start Free Trial",
    ctaLink: "/signup?plan=pro",
  },
  {
    name: "Enterprise",
    description: "For teams and organizations",
    monthlyPrice: 99,
    yearlyPrice: 990,
    icon: Building2,
    features: [
      "Everything in Pro",
      "Team management (up to 50 members)",
      "Dedicated account manager",
      "Custom integrations",
      "SSO / SAML authentication",
      "Advanced security features",
      "Usage analytics & reporting",
      "Custom contract terms",
      "24/7 priority support",
      "Onboarding & training",
    ],
    limitations: [],
    cta: "Contact Sales",
    ctaLink: "mailto:sales@microcollab.com",
  },
];

const comparisonFeatures = [
  {
    category: "Core Features",
    features: [
      { name: "Requests per month", free: "5", pro: "Unlimited", enterprise: "Unlimited" },
      { name: "Offers per month", free: "10", pro: "Unlimited", enterprise: "Unlimited" },
      { name: "Session duration", free: "60 min", pro: "Unlimited", enterprise: "Unlimited" },
      { name: "Profile type", free: "Basic", pro: "Enhanced", enterprise: "Custom" },
    ],
  },
  {
    category: "Support & Success",
    features: [
      { name: "Support", free: "Community", pro: "Priority", enterprise: "24/7 Dedicated" },
      { name: "Response time", free: "48 hours", pro: "4 hours", enterprise: "1 hour" },
      { name: "Onboarding", free: false, pro: false, enterprise: true },
      { name: "Account manager", free: false, pro: false, enterprise: true },
    ],
  },
  {
    category: "Advanced Features",
    features: [
      { name: "Analytics", free: false, pro: true, enterprise: true },
      { name: "Custom integrations", free: false, pro: false, enterprise: true },
      { name: "SSO / SAML", free: false, pro: false, enterprise: true },
      { name: "Team management", free: false, pro: false, enterprise: true },
    ],
  },
];

const faqs = [
  {
    question: "Can I change plans later?",
    answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any charges.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. Enterprise customers can also pay via invoice.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes! Pro plans come with a 14-day free trial. No credit card required. You can cancel anytime during the trial period.",
  },
  {
    question: "How do refunds work?",
    answer: "We offer a 30-day money-back guarantee. If you're not satisfied with your Pro or Enterprise plan, contact us for a full refund.",
  },
  {
    question: "Do you offer discounts for non-profits?",
    answer: "Yes! We offer 50% discounts for qualified non-profit organizations and educational institutions. Contact us for details.",
  },
];

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  const getPrice = (tier: PricingTier) => {
    return billingPeriod === "monthly" ? tier.monthlyPrice : tier.yearlyPrice;
  };

  const getSavings = (tier: PricingTier) => {
    if (tier.monthlyPrice === 0) return 0;
    const yearlyMonthly = tier.yearlyPrice / 12;
    const savings = ((tier.monthlyPrice - yearlyMonthly) / tier.monthlyPrice) * 100;
    return Math.round(savings);
  };

  return (
    <div className="min-h-screen bg-slate-950 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-6 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
            Pricing Plans
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Start free, upgrade as you grow. All plans include access to our community.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <Label htmlFor="billing-toggle" className="text-slate-300">
            Monthly
          </Label>
          <Switch
            id="billing-toggle"
            checked={billingPeriod === "yearly"}
            onCheckedChange={(checked) =>
              setBillingPeriod(checked ? "yearly" : "monthly")
            }
          />
          <Label htmlFor="billing-toggle" className="text-slate-300">
            Yearly
            <Badge className="ml-2 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
              Save up to 17%
            </Badge>
          </Label>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            const price = getPrice(tier);
            const savings = getSavings(tier);

            return (
              <Card
                key={tier.name}
                className={`p-8 bg-slate-800/50 border-slate-700 relative ${
                  tier.popular ? "ring-2 ring-emerald-500 border-emerald-500" : ""
                }`}
              >
                {tier.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white">
                    Most Popular
                  </Badge>
                )}

                <div className="mb-6">
                  <div className="h-12 w-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                  <p className="text-slate-400">{tier.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white">${price}</span>
                    {price > 0 && (
                      <span className="text-slate-400">
                        /{billingPeriod === "monthly" ? "month" : "year"}
                      </span>
                    )}
                  </div>
                  {billingPeriod === "yearly" && savings > 0 && (
                    <p className="text-sm text-emerald-400 mt-1">
                      Save {savings}% with yearly billing
                    </p>
                  )}
                </div>

                <Button
                  asChild
                  className={`w-full mb-6 ${
                    tier.popular
                      ? "bg-emerald-500 hover:bg-emerald-600"
                      : "bg-slate-700 hover:bg-slate-600"
                  }`}
                >
                  <Link href={tier.ctaLink}>{tier.cta}</Link>
                </Button>

                <div className="space-y-3">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-300">{feature}</span>
                    </div>
                  ))}
                  {tier.limitations.map((limitation) => (
                    <div key={limitation} className="flex items-start gap-3">
                      <X className="h-5 w-5 text-slate-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-500">{limitation}</span>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Feature Comparison Table */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Compare Plans
          </h2>
          <Card className="p-6 bg-slate-800/50 border-slate-700 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">
                    Features
                  </th>
                  <th className="text-center py-4 px-4 text-white font-semibold">
                    Free
                  </th>
                  <th className="text-center py-4 px-4 text-white font-semibold">
                    Pro
                  </th>
                  <th className="text-center py-4 px-4 text-white font-semibold">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((category) => (
                  <>
                    <tr key={category.category}>
                      <td
                        colSpan={4}
                        className="py-4 px-4 text-sm font-semibold text-emerald-400 bg-emerald-500/5"
                      >
                        {category.category}
                      </td>
                    </tr>
                    {category.features.map((feature) => (
                      <tr
                        key={feature.name}
                        className="border-b border-slate-700/50"
                      >
                        <td className="py-3 px-4 text-slate-300">{feature.name}</td>
                        <td className="py-3 px-4 text-center text-slate-400">
                          {typeof feature.free === "boolean" ? (
                            feature.free ? (
                              <Check className="h-5 w-5 text-emerald-400 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-slate-600 mx-auto" />
                            )
                          ) : (
                            feature.free
                          )}
                        </td>
                        <td className="py-3 px-4 text-center text-slate-400">
                          {typeof feature.pro === "boolean" ? (
                            feature.pro ? (
                              <Check className="h-5 w-5 text-emerald-400 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-slate-600 mx-auto" />
                            )
                          ) : (
                            feature.pro
                          )}
                        </td>
                        <td className="py-3 px-4 text-center text-slate-400">
                          {typeof feature.enterprise === "boolean" ? (
                            feature.enterprise ? (
                              <Check className="h-5 w-5 text-emerald-400 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-slate-600 mx-auto" />
                            )
                          ) : (
                            feature.enterprise
                          )}
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6 bg-slate-800/50 border-slate-700">
                <div className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-slate-400">{faq.answer}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16">
          <Card className="p-12 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border-emerald-500/20 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Still have questions?
            </h2>
            <p className="text-lg text-slate-400 mb-6">
              Our team is here to help you choose the right plan
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="bg-emerald-500 hover:bg-emerald-600"
              >
                <Link href="mailto:sales@microcollab.com">Contact Sales</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                <Link href="/help">View FAQ</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
