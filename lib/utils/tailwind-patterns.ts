import { cn } from "@/lib/utils";

// Card patterns
export const cardBase = "bg-graphite/50 border border-smoky rounded-lg";
export const cardInteractive =
  "transition-all duration-300 hover:border-brand-pink/50 hover:shadow-card-hover hover:-translate-y-1";
export const cardFull = cn(cardBase, cardInteractive);

// Button patterns
export const buttonPrimary =
  "bg-gradient-primary text-white font-semibold px-6 py-3 rounded-lg transition-transform hover:scale-105";
export const buttonSecondary =
  "bg-graphite border border-brand-indigo/50 text-white font-semibold px-6 py-3 rounded-lg hover:border-brand-indigo hover:shadow-glow-indigo";
export const buttonGhost =
  "text-brand-indigo hover:bg-brand-indigo/10 px-4 py-2 rounded-lg transition-colors";

// Badge patterns
export const badgeBase =
  "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium";
export const badgeUrgencyLow = cn(badgeBase, "bg-urgency-low/20 text-urgency-low");
export const badgeUrgencyNormal = cn(
  badgeBase,
  "bg-urgency-normal/20 text-urgency-normal"
);
export const badgeUrgencyCritical = cn(
  badgeBase,
  "bg-urgency-critical/20 text-urgency-critical"
);

// Input patterns
export const inputBase =
  "bg-graphite border border-smoky rounded-lg px-4 py-2 text-white focus:border-brand-indigo focus:ring-2 focus:ring-brand-indigo/20 transition-colors";

// Text patterns
export const textHeading = "font-display font-bold text-white";
export const textBody = "text-white leading-relaxed";
export const textMuted = "text-steel";
export const textGradient = "bg-gradient-primary bg-clip-text text-transparent";
