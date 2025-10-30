# Apply Landing Page Patterns to Demo Mode

## Goal
Make demo mode as visually stunning as the landing page using the same shadcn components, gradients, and hover effects.

## Pattern Library from Landing Page

### 1. Button Patterns (from HeroSection)

**Gradient Button** (Primary CTA):
```tsx
<Button variant="gradient" size="lg">
  Try Demo →
</Button>
// hover:shadow-[0_0_24px_rgba(236,72,153,0.5)] hover:scale-105
```

**Gradient Accent Button** (Secondary CTA):
```tsx
<Button variant="gradient-accent" size="lg">
  Browse Requests
</Button>
// hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-105
```

**Outline Button** (Tertiary):
```tsx
<Button variant="outline" size="lg">
  Learn More
</Button>
// hover:border-brand-emerald hover:shadow-[0_0_16px_rgba(16,185,129,0.3)]
```

### 2. Card Patterns (from CategoryHighlights)

**Interactive Card with Hover Glow**:
```tsx
<motion.div
  whileHover={{ scale: 1.02, y: -6 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.3, ease: "easeInOut" }}
  className="group relative h-full"
>
  <Card variant="interactive" className="card-hover-ring card-enhanced h-full">
    {/* Content */}
  </Card>

  {/* Hover Glow Effect */}
  <motion.div
    initial={{ opacity: 0 }}
    whileHover={{ opacity: 0.3 }}
    transition={{ duration: 0.3 }}
    className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-brand-indigo via-brand-pink to-brand-orange blur-2xl"
  />
</motion.div>
```

### 3. Background Gradients

**Section with Radial Glow**:
```tsx
<section className="section-radial-focus relative overflow-hidden">
  {/* Pink Glow Bottom Left */}
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 0.2, scale: 1 }}
    viewport={{ once: true }}
    className="absolute left-0 bottom-0 h-96 w-96"
  >
    <div className="glow-pink h-full w-full" />
  </motion.div>

  {/* Indigo Glow Top Right */}
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 0.15, scale: 1 }}
    viewport={{ once: true }}
    className="absolute right-0 top-0 h-80 w-80"
  >
    <div className="glow-indigo h-full w-full" />
  </motion.div>

  {/* Content */}
  <div className="relative z-10">
    {/* ... */}
  </div>
</section>
```

## Files to Update

### 1. RequestCard.tsx ⭐ HIGH PRIORITY

```tsx
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
    low: { color: "text-steel", icon: null, bg: "bg-steel/20" },
    normal: { color: "text-warning", icon: Clock, bg: "bg-warning/20" },
    critical: { color: "text-error", icon: Zap, bg: "bg-error/20" },
  };

  const config = urgencyConfig[request.urgency];
  const UrgencyIcon = config.icon;

  return (
    <>
      {/* Match CategoryHighlights pattern */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02, y: -6 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="group relative h-full"
      >
        <Card
          variant="interactive"
          className="card-hover-ring card-enhanced h-full"
        >
          <CardHeader>
            {/* Urgency Badge & Timestamp */}
            <div className="mb-3 flex items-start justify-between">
              <Badge
                variant="outline"
                className={cn(
                  "gap-1.5 px-3 py-1.5 font-semibold",
                  config.bg,
                  config.color
                )}
              >
                {UrgencyIcon && <UrgencyIcon className="h-3.5 w-3.5" />}
                {request.urgency.toUpperCase()}
              </Badge>
              <span className="text-xs text-steel">
                {formatDistanceToNow(request.createdAt, { addSuffix: true })}
              </span>
            </div>

            <CardTitle className="group-hover:text-brand-pink transition-colors">
              {request.title}
            </CardTitle>

            <CardDescription className="line-clamp-2">
              {request.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {request.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-brand-indigo/20 text-brand-indigo hover:bg-brand-indigo/30 border border-brand-indigo/30"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Meta Info with colored icons */}
            <div className="flex flex-wrap gap-3 text-sm text-steel">
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-brand-sky" />
                {request.duration}h
              </span>
              <span className="flex items-center gap-1.5">
                <MessageSquare className="h-4 w-4 text-brand-pink" />
                {request.mode === "async" ? "Async" : "Live"}
              </span>
              {request.budget && (
                <span className="flex items-center gap-1.5 text-brand-emerald">
                  <DollarSign className="h-4 w-4" />
                  ${request.budget.amount}
                </span>
              )}
              {request.offers.length > 0 && (
                <span className="flex items-center gap-1.5 text-brand-orange">
                  <Users className="h-4 w-4" />
                  {request.offers.length} offers
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
```

### 2. Dashboard Page ⭐ HIGH PRIORITY

Add background glows like landing page:

```tsx
export default function DashboardPage() {
  // ... existing code

  return (
    <main className="section-radial-focus relative mx-auto max-w-7xl overflow-hidden px-4 py-8">
      {/* Background Accent Glows */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute left-0 bottom-0 h-96 w-96 pointer-events-none"
      >
        <div className="glow-pink h-full w-full" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="absolute right-0 top-0 h-80 w-80 pointer-events-none"
      >
        <div className="glow-indigo h-full w-full" />
      </motion.div>

      {/* Content - relative z-10 */}
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="mb-2 font-display text-4xl font-bold">
            <span className="gradient-text">Marketplace</span> Dashboard
          </h1>
          <p className="text-lg text-steel">
            Real-time overview of the MicroCollab marketplace
          </p>
        </motion.div>

        {/* Stats */}
        <DashboardStats stats={stats} />

        {/* Activity Stream */}
        <div className="mt-8">
          <ActivityStream events={recentEvents} />
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex justify-center"
        >
          <Button variant="gradient-accent" size="xl" asChild>
            <motion.a
              href="/demo/browse"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group"
            >
              Browse Active Requests
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
```

### 3. Browse Page

Add gradient header and background:

```tsx
export default function BrowsePage() {
  // ... existing code

  return (
    <main className="section-radial-focus relative mx-auto max-w-7xl overflow-hidden px-4 py-8">
      {/* Background Glows */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.2, scale: 1 }}
        viewport={{ once: true }}
        className="absolute left-1/4 top-0 h-96 w-96 pointer-events-none"
      >
        <div className="glow-emerald h-full w-full" />
      </motion.div>

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="mb-2 font-display text-4xl font-bold">
            <span className="gradient-text">Browse</span> Requests
          </h1>
          <p className="text-lg text-steel">
            Find opportunities to help others and earn rewards
          </p>
        </motion.div>

        {/* Rest of content */}
      </div>
    </main>
  );
}
```

### 4. ActivityStream.tsx

Use Card component:

```tsx
<Card variant="surface" className="card-enhanced">
  <CardHeader>
    <div className="flex items-center gap-3">
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 p-2"
      >
        <Activity className="h-5 w-5 text-white" />
      </motion.div>
      <CardTitle className="gradient-text">Live Activity</CardTitle>
    </div>
  </CardHeader>

  <CardContent>
    {/* Event items using interactive cards */}
    {events.map((event) => (
      <motion.div key={event.id} whileHover={{ x: 4 }}>
        <Card variant="glass" className="p-4">
          {/* Event content */}
        </Card>
      </motion.div>
    ))}
  </CardContent>
</Card>
```

### 5. DemoBanner.tsx

Add gradient background and better button:

```tsx
<div className="bg-gradient-to-r from-brand-indigo/10 via-brand-pink/10 to-brand-orange/10 backdrop-blur-lg border-b border-white/10">
  <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
    <div className="flex items-center gap-3">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          boxShadow: [
            "0 0 0 0 rgba(99, 102, 241, 0.7)",
            "0 0 0 10px rgba(99, 102, 241, 0)",
            "0 0 0 0 rgba(99, 102, 241, 0)"
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="h-3 w-3 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400"
      />
      <span className="font-medium text-white">
        You're in <span className="gradient-text font-semibold">Demo Mode</span>
      </span>
    </div>

    <div className="flex items-center gap-3">
      <Button variant="gradient" size="default" asChild>
        <Link href="/auth/signup">
          Sign Up to Post Real Requests
        </Link>
      </Button>
      <button onClick={() => setIsDismissed(true)}>
        <X className="h-5 w-5" />
      </button>
    </div>
  </div>
</div>
```

## CSS Classes to Use (from globals.css)

```css
/* From globals.css */
.gradient-text {
  @apply bg-gradient-primary bg-clip-text text-transparent;
}

.glow-pink {
  @apply rounded-full bg-brand-pink/30 blur-3xl;
}

.glow-indigo {
  @apply rounded-full bg-brand-indigo/30 blur-3xl;
}

.glow-emerald {
  @apply rounded-full bg-brand-emerald/30 blur-3xl;
}

.section-radial-focus {
  @apply bg-gradient-radial from-charcoal/50 via-charcoal to-charcoal;
}

.card-hover-ring {
  @apply hover:ring-2 hover:ring-brand-pink/30 hover:ring-offset-2 hover:ring-offset-charcoal;
}

.card-enhanced {
  @apply bg-surface/80 backdrop-blur-sm;
}
```

## Implementation Order

1. ✅ **DashboardStats** - Already enhanced with gradients
2. 🔄 **RequestCard** - Use Card component with hover glow (HIGH PRIORITY)
3. 🔄 **Dashboard Page** - Add background glows
4. 🔄 **Browse Page** - Add gradient header and glows
5. 🔄 **ActivityStream** - Use Card components
6. 🔄 **DemoBanner** - Gradient background and Button component

## Testing Checklist

- [ ] All buttons use shadcn Button component
- [ ] All cards use shadcn Card component with variants
- [ ] Hover effects match landing page (scale, shadow, glow)
- [ ] Background glows animate smoothly
- [ ] Gradient text uses `.gradient-text` class
- [ ] Mobile responsive
- [ ] Animations are smooth (60fps)

---

**Result**: Demo mode will have the same visual quality as the landing page! 🎨
