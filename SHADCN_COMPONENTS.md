# Shadcn UI Components - MicroCollab Brand Edition

**Version**: 1.0
**Last Updated**: October 2025
**Framework**: Shadcn UI + MicroCollab Brand Guidelines

---

## 🎨 Overview

This document provides a complete reference for Shadcn UI components customized with MicroCollab's brand gradients, glow effects, and design system.

All components feature:
- ✨ **Brand Gradients** (Indigo → Pink → Orange | Emerald → Sky Blue)
- 🌟 **Glow Effects** on hover (Pink, Emerald, Indigo glows)
- 🎭 **Glass Morphism** variants
- 📱 **Responsive Design** (mobile-first)
- ♿ **Accessibility** (WCAG 2.1 AA compliant)

---

## 🔘 Button Component

### Installation
```bash
npx shadcn@latest add button
```

### Variants

#### `variant="gradient"` - Primary Brand Gradient
**Indigo → Pink → Orange gradient with pink glow on hover**

```tsx
<Button variant="gradient" size="lg">
  Find Help Now
</Button>
```

**Features**:
- Background: `from-brand-indigo via-brand-pink to-brand-orange`
- Hover: Pink glow `shadow-[0_0_24px_rgba(236,72,153,0.5)]`
- Scale: `hover:scale-105`, `active:scale-95`
- Use: Primary CTAs, important actions

---

#### `variant="gradient-accent"` - Accent Gradient
**Emerald → Sky Blue gradient with emerald glow**

```tsx
<Button variant="gradient-accent" size="lg">
  Get Started
</Button>
```

**Features**:
- Background: `from-brand-emerald to-brand-sky`
- Hover: Emerald glow `shadow-[0_0_20px_rgba(16,185,129,0.4)]`
- Scale: `hover:scale-105`
- Use: Secondary CTAs, success actions

---

#### `variant="outline"` - Outline with Emerald Glow
**Transparent with border, emerald glow on hover**

```tsx
<Button variant="outline" size="lg">
  Learn More
</Button>
```

**Features**:
- Border: `border-2 border-white/20`
- Hover: Emerald border + glow `shadow-[0_0_16px_rgba(16,185,129,0.3)]`
- Background: `hover:bg-brand-emerald/10`
- Use: Secondary actions, cancel buttons

---

#### `variant="glass"` - Glass Morphism
**Glass effect with backdrop blur**

```tsx
<Button variant="glass" size="default">
  Explore
</Button>
```

**Features**:
- Background: `bg-white/5 backdrop-blur-md`
- Border: `border border-white/10`
- Hover: Pink border glow
- Use: Overlay buttons, modal actions

---

#### `variant="ghost"` - Minimal Ghost
**Transparent, subtle hover**

```tsx
<Button variant="ghost">
  Skip
</Button>
```

**Features**:
- Transparent background
- Hover: `bg-white/10 text-brand-emerald`
- Use: Tertiary actions, navigation

---

#### `variant="destructive"` - Destructive Action
**Error red with glow**

```tsx
<Button variant="destructive">
  Delete Account
</Button>
```

**Features**:
- Background: `bg-error`
- Hover: Red glow `shadow-[0_0_16px_rgba(244,63,94,0.4)]`
- Use: Delete, cancel, dangerous actions

---

### Sizes

```tsx
<Button size="sm">Small</Button>     // h-9, px-4
<Button size="default">Default</Button> // h-11, px-6
<Button size="lg">Large</Button>     // h-12, px-8
<Button size="xl">Extra Large</Button> // h-14, px-10
<Button size="icon">🔥</Button>      // h-11, w-11
```

---

### Usage Examples

#### Hero Section CTA
```tsx
<div className="flex gap-4">
  <Button variant="gradient" size="lg">
    Find Help Now
  </Button>
  <Button variant="outline" size="lg">
    Offer Help
  </Button>
</div>
```

#### With Framer Motion
```tsx
<Button variant="gradient" size="lg" asChild>
  <motion.a
    href="/signup"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    Sign Up
  </motion.a>
</Button>
```

#### With Loading State
```tsx
<Button variant="gradient" disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Loading...
</Button>
```

---

## 🃏 Card Component

### Installation
```bash
npx shadcn@latest add card
```

### Variants

#### `variant="surface"` - Surface with Indigo Glow
**Default card with indigo → pink glow transition**

```tsx
<Card variant="surface">
  <CardHeader>
    <CardTitle>Feature Card</CardTitle>
    <CardDescription>Description text</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>
```

**Features**:
- Background: `bg-surface` (#1E1E26)
- Border: `border-white/5`
- Default Glow: Indigo `shadow-[0_0_12px_rgba(99,102,241,0.15)]`
- Hover Glow: Pink `shadow-[0_0_18px_rgba(236,72,153,0.35)]`
- Hover Border: `border-brand-pink/30`
- Use: Feature cards, content blocks

---

#### `variant="glass"` - Glass Morphism
**Glass effect with backdrop blur**

```tsx
<Card variant="glass">
  <CardHeader>
    <CardTitle>Glass Card</CardTitle>
  </CardHeader>
</Card>
```

**Features**:
- Background: `bg-white/5 backdrop-blur-md`
- Border: `border-white/10`
- Hover: `bg-white/8 border-white/20`
- Use: Overlays, hero sections, testimonials

---

#### `variant="interactive"` - Interactive Card
**Clickable card with scale and strong glow**

```tsx
<Card variant="interactive" className="cursor-pointer">
  <CardHeader>
    <CardTitle>Category Card</CardTitle>
  </CardHeader>
</Card>
```

**Features**:
- Background: `bg-surface`
- Cursor: `cursor-pointer`
- Hover: Scale `hover:scale-[1.02]`
- Hover Glow: Strong pink `shadow-[0_0_24px_rgba(236,72,153,0.3)]`
- Hover Border: `border-brand-pink/50`
- Use: Category cards, clickable items, navigation cards

---

#### `variant="gradient-border"` - Gradient Border
**Animated gradient border on hover**

```tsx
<Card variant="gradient-border">
  <CardContent>Premium feature</CardContent>
</Card>
```

**Features**:
- Background: `bg-surface`
- Border: Gradient (Indigo → Pink → Orange) on hover
- Pseudo-element animation
- Use: Premium features, highlighted content

---

#### `variant="outline"` - Minimal Outline
**Transparent with border**

```tsx
<Card variant="outline">
  <CardContent>Minimal card</CardContent>
</Card>
```

**Features**:
- Background: `bg-transparent`
- Border: `border-white/20`
- Hover: Emerald border `border-brand-emerald/50`
- Use: Secondary content, minimal layouts

---

### Card Subcomponents

#### CardHeader
```tsx
<CardHeader className="space-y-1.5 p-6">
  <CardTitle>Title</CardTitle>
  <CardDescription>Description</CardDescription>
</CardHeader>
```

#### CardTitle
- Font: `font-display` (Plus Jakarta Sans)
- Size: `text-xl`
- Weight: `font-bold`
- Color: `text-white`

#### CardDescription
- Font: `font-body` (Inter)
- Size: `text-sm`
- Color: `text-steel` (#9CA3AF)
- Line height: `leading-relaxed`

#### CardContent
```tsx
<CardContent className="p-6 pt-0">
  Main content area
</CardContent>
```

#### CardFooter
```tsx
<CardFooter className="flex items-center p-6 pt-0">
  <Button>Action</Button>
</CardFooter>
```

---

### Usage Examples

#### Feature Card with Hover Glow
```tsx
<Card variant="surface" className="h-full">
  <CardHeader>
    <div className="text-5xl mb-4">🚀</div>
    <CardTitle>Fast Matching</CardTitle>
    <CardDescription>
      Get matched with expert developers in minutes
    </CardDescription>
  </CardHeader>
</Card>
```

#### Interactive Category Card
```tsx
<Card variant="interactive" onClick={handleClick}>
  <CardHeader>
    <div className="flex items-center gap-4">
      <span className="text-5xl">🎨</span>
      <CardTitle>Frontend</CardTitle>
    </div>
    <CardDescription>
      React, Vue, Angular, CSS, UI/UX
    </CardDescription>
  </CardHeader>
  <CardFooter>
    <Badge variant="success">45 helpers available</Badge>
  </CardFooter>
</Card>
```

#### Testimonial Card with Glass Effect
```tsx
<Card variant="glass">
  <CardHeader>
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => <Star key={i} />)}
    </div>
    <CardDescription>
      "Amazing experience! Got help in 2 hours."
    </CardDescription>
  </CardHeader>
  <CardFooter>
    <div className="flex items-center gap-3">
      <Avatar>👩‍💻</Avatar>
      <div>
        <p className="font-semibold text-white">Sarah Chen</p>
        <p className="text-xs text-steel">Frontend Developer</p>
      </div>
    </div>
  </CardFooter>
</Card>
```

---

## 🏷️ Badge Component

### Installation
```bash
npx shadcn@latest add badge
```

### Variants

#### `variant="gradient"` - Primary Gradient Badge
```tsx
<Badge variant="gradient">New</Badge>
```
- Gradient: Indigo → Pink → Orange
- Glow: Pink `shadow-[0_0_16px_rgba(236,72,153,0.4)]`
- Use: New features, promotions

---

#### `variant="gradient-accent"` - Accent Gradient
```tsx
<Badge variant="gradient-accent">Featured</Badge>
```
- Gradient: Emerald → Sky Blue
- Glow: Emerald `shadow-[0_0_12px_rgba(16,185,129,0.3)]`
- Use: Featured items, highlights

---

#### `variant="glass"` - Glass Badge
```tsx
<Badge variant="glass">Premium</Badge>
```
- Background: `bg-white/5 backdrop-blur-sm`
- Border: `border-white/10`
- Use: Overlays, hero sections

---

#### `variant="success"` - Success State
```tsx
<Badge variant="success">Available</Badge>
```
- Background: `bg-success/20` (Emerald)
- Text: `text-emerald-400`
- Use: Success states, available status

---

#### `variant="warning"` - Warning State
```tsx
<Badge variant="warning">Limited</Badge>
```
- Background: `bg-warning/20` (Yellow)
- Text: `text-warning`
- Use: Warnings, limited availability

---

#### `variant="error"` - Error State
```tsx
<Badge variant="error">Offline</Badge>
```
- Background: `bg-error/20` (Red)
- Text: `text-error`
- Use: Errors, offline status

---

#### `variant="info"` - Info State
```tsx
<Badge variant="info">Beta</Badge>
```
- Background: `bg-info/20` (Sky Blue)
- Text: `text-info`
- Use: Info messages, beta features

---

#### `variant="outline"` - Outline Badge
```tsx
<Badge variant="outline">Draft</Badge>
```
- Border: `border-white/30`
- Background: `bg-transparent`
- Hover: Emerald glow
- Use: Secondary status, tags

---

### Usage Examples

#### Tech Stack Tags
```tsx
<div className="flex gap-2">
  <Badge variant="glass">Next.js 16</Badge>
  <Badge variant="glass">TypeScript</Badge>
  <Badge variant="glass">Supabase</Badge>
</div>
```

#### Status Indicators
```tsx
<Badge variant="success">
  <div className="h-2 w-2 rounded-full bg-success animate-pulse mr-2" />
  Online
</Badge>
```

#### Category Tags
```tsx
<Badge variant="gradient-accent">Frontend</Badge>
<Badge variant="outline">React</Badge>
<Badge variant="outline">Performance</Badge>
```

---

## 🎨 Complete Example: Feature Card

```tsx
<Card variant="interactive" className="group">
  <CardHeader>
    <div className="flex justify-between items-start">
      <div className="text-5xl mb-4">💻</div>
      <Badge variant="success">Available</Badge>
    </div>
    <CardTitle className="gradient-text">Quick Sessions</CardTitle>
    <CardDescription>
      Get expert help in 1-4 hour focused sessions.
      Perfect for debugging, refactoring, or learning.
    </CardDescription>
  </CardHeader>

  <CardContent>
    <div className="flex gap-2">
      <Badge variant="glass">React</Badge>
      <Badge variant="glass">TypeScript</Badge>
      <Badge variant="glass">Next.js</Badge>
    </div>
  </CardContent>

  <CardFooter>
    <Button variant="gradient" className="w-full">
      Book Session
    </Button>
  </CardFooter>
</Card>
```

---

## 🚀 Best Practices

### Button Guidelines
1. **Primary CTA**: Use `variant="gradient"` for main actions
2. **Secondary CTA**: Use `variant="outline"` for secondary actions
3. **Destructive**: Always use `variant="destructive"` for dangerous actions
4. **Loading**: Disable button and show spinner during async operations

### Card Guidelines
1. **Interactive**: Use `variant="interactive"` for clickable cards
2. **Glass**: Use `variant="glass"` over hero sections or images
3. **Content**: Use `variant="surface"` for standard content cards
4. **Consistency**: Maintain consistent padding and spacing

### Badge Guidelines
1. **Status**: Use semantic variants (success, warning, error) for status
2. **Tags**: Use `variant="outline"` or `variant="glass"` for tags
3. **Highlights**: Use gradient variants sparingly for important highlights
4. **Spacing**: Always use consistent gap spacing between badges

---

## 🎯 Accessibility

### Keyboard Navigation
- All buttons support keyboard navigation (Enter/Space)
- Focus visible with emerald ring
- Tab order follows visual order

### Screen Readers
- Use semantic HTML (`<button>`, `<a>`)
- Provide `aria-label` for icon-only buttons
- Use `aria-describedby` for descriptions

### Color Contrast
- All text meets WCAG 2.1 AA standards
- White text on gradient backgrounds: 4.5:1 minimum
- Steel text for descriptions: 4.5:1 minimum

---

**Need Help?** Check the component files in `/components/ui/` or refer to [Shadcn UI Docs](https://ui.shadcn.com)
