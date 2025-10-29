# 🎨 MicroCollab – Brand Guidelines v1.0

## 1. Brand Overview
**Brand Name:** MicroCollab  
**Tagline:** *Find help fast. Collaborate smart.*  
**Vision:** Create a space where developers and small teams can instantly connect for focused, high‑impact collaborations — technical, creative, or strategic — without the friction of long contracts.

**Brand Essence:** *Empathy meets efficiency.*

---

## 2. Brand Personality
| Trait | Description |
|-------|--------------|
| **Modern** | Reflects the future of work — quick, global, digital-first. |
| **Energetic** | Vibrant gradients and fluid motion convey agility and collaboration. |
| **Trustworthy** | Minimalist layouts and professional typography establish reliability. |
| **Inclusive** | Designed for developers, designers, testers, and mentors alike. |
| **Optimistic** | Bright tones and encouraging microcopy inspire confidence and flow. |

---

## 3. Logo Guidelines
**Logo Type:** Wordmark with motion‑friendly icon.
- **Symbol:** Abstract intertwining arcs representing two collaborators joining forces — can animate subtly as a gradient pulse.
- **Primary Lockup:** “Micro” in neutral dark, “Collab” in vibrant gradient.
- **Minimum Padding:** Equal to the height of the letter “M.”
- **Background Flexibility:** Works on light or dark with gradient‑inverted variant.

---

## 4. Color System

### 🌈 Core Gradient (Primary)
A dynamic gradient symbolizing collaboration energy:
```
Gradient A → B: #6366F1 → #EC4899 → #F97316
```
*(Indigo → Pink → Warm Orange)*  
Direction: 135° angle for modern depth.

### **Secondary Gradient (Accent)**
```
Gradient A → B: #10B981 → #3B82F6
```
*(Emerald → Sky Blue)*  
Used for hover states, CTAs, and success highlights.

### **Neutral Palette**
| Role | Color | HEX |
|------|--------|-----|
| **Background Dark** | Charcoal Black | `#0F1115` |
| **Background Light** | Porcelain White | `#F9FAFB` |
| **Surface** | Graphite Gray | `#1E1E26` |
| **Text Primary** | White / Black (auto) | `#FFFFFF` / `#111827` |
| **Text Secondary** | Steel Gray | `#9CA3AF` |
| **Borders** | Smoky Gray | `#27272A` |

### **Feedback Colors**
| State | HEX | Usage |
|--------|-----|--------|
| **Success** | `#22C55E` | Confirmations, session created |
| **Warning** | `#EAB308` | Urgent requests |
| **Error** | `#F43F5E` | Validation errors |
| **Info** | `#38BDF8` | Notifications, status hints |

---

## 5. Typography

| Type | Font | Weight | Usage |
|------|------|---------|--------|
| **Display** | **Plus Jakarta Sans** | 700 / 800 | Headings, CTAs |
| **Body** | **Inter** | 400 / 500 | Descriptive text, paragraphs |
| **Code / Monospace** | **IBM Plex Mono** | 400 | Skill tags, technical content |

**Example Hierarchy:**
```
H1 – Plus Jakarta Sans 800, 40px
H2 – Plus Jakarta Sans 700, 28px
H3 – Inter 600, 20px
Body – Inter 400, 16px
Code – IBM Plex Mono 400, 14px
```

---

## 6. Visual Language

| Element | Description |
|----------|-------------|
| **Layout** | Card-based modular design with soft shadows and layered depth. |
| **Motion** | Smooth slide-ins and opacity fades (Framer Motion). Emphasize connection: components join fluidly. |
| **Buttons** | Rounded-lg, gradient backgrounds, subtle glow hover (`shadow-[0_0_12px_#EC489955]`). |
| **Cards** | Semi-transparent glass surfaces (`bg-white/5` in dark mode, `backdrop-blur-md`). |
| **Icons** | Lucide Icons with gradient mask fills. |
| **Charts** | Use pastel tints of primary gradient for harmony. |

---

## 7. UI Theme

### **Dark Mode (Default)**
- Background: `#0F1115`
- Surfaces: Glass cards with gradient edges.
- Accent glow: Indigo→Pink→Orange gradient border.
- Text: White primary, Steel Gray secondary.

### **Light Mode**
- Background: `#F9FAFB`
- Accent gradient for headings and buttons.
- Subtle shadows using warm gray tones.

---

## 8. Imagery & Illustration
- Style: Minimalist 3D or line-art scenes showing collaboration.
- Colors: Match gradient palette, soft shadows, slight tilt for energy.
- Example prompts: hands connecting puzzle pieces, developers sharing screen, minimal workspace setups.

---

## 9. Brand Voice
| Tone | Description | Example |
|------|--------------|----------|
| **Supportive** | Encouraging peer-to-peer tone | “You’re not alone — post your challenge, get help fast.” |
| **Efficient** | Respectful of time | “3-hour availability left — grab your helper now.” |
| **Transparent** | Clear communication | “This session is time-boxed to 2 hours.” |
| **Friendly-Professional** | Confident yet approachable | “Let’s fix that together.” |

---

## 10. Components Design Tokens
```css
--gradient-primary: linear-gradient(135deg, #6366F1, #EC4899, #F97316);
--gradient-accent: linear-gradient(135deg, #10B981, #3B82F6);
--color-bg-dark: #0F1115;
--color-bg-light: #F9FAFB;
--color-surface: #1E1E26;
--color-text-primary: #FFFFFF;
--color-text-secondary: #9CA3AF;
--radius-base: 0.75rem;
--font-display: 'Plus Jakarta Sans', sans-serif;
--font-body: 'Inter', sans-serif;
--font-mono: 'IBM Plex Mono', monospace;
--transition: all 0.3s ease-in-out;
```

---

## 11. Accessibility & Inclusivity
- Maintain WCAG contrast ratio 4.5:1.
- All gradient text must have solid fallback color.
- Focus rings visible on all interactive elements.
- Keyboard navigation for modals and chat input ensured.
- Text labels and ARIA attributes for assistive tools.

---

## 12. Marketing Elements
**Visual Hooks:** Gradient glow borders, dynamic pulse patterns, motion dots representing active collaboration.  
**Landing Tagline Block:**
> *Find help fast. Collaborate smart.*  
> *Short sessions. Big impact.*

**Social Preview Banner:**  
Background gradient: Indigo→Pink→Orange  
Headline: “MicroCollab — Where Developers Help Developers.”

---

## 13. Summary
**MicroCollab** represents the modern collaborative spirit of developers — fast, focused, and friendly. Its vibrant gradients, elegant typography, and fluid motion embody the energy of shared creation while staying professional and trustworthy.

> 🌈 *A new rhythm for collaboration.*

