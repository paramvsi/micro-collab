# Demo Mode Marketplace Implementation Guide

**Version**: 1.0
**Phase**: 1, Week 1, Days 5-7
**Status**: Planning Complete, Ready for Implementation

---

## Table of Contents

1. [Overview & Architecture](#1-overview--architecture)
2. [Brand & Design System Refactoring](#2-brand--design-system-refactoring)
3. [Mock Data Service Design](#3-mock-data-service-design)
4. [Feature Implementation Breakdown](#4-feature-implementation-breakdown)
5. [Component Specifications](#5-component-specifications)
6. [Animation Choreography](#6-animation-choreography)
7. [Responsive Design Matrix](#7-responsive-design-matrix)
8. [Implementation Phases](#8-implementation-phases)
9. [File Structure](#9-file-structure)
10. [Quality Checklist](#10-quality-checklist)

---

## 1. Overview & Architecture

### 1.1 Phase Objectives

Build an **interactive demo marketplace** that showcases MicroCollab's core functionality without requiring authentication. Users can:

- Browse realistic help requests
- View request details and offers
- Simulate offering help
- Watch live marketplace activity
- Experience the platform before signing up

### 1.2 Success Criteria

- ✅ **Zero custom CSS**: All styling via Tailwind utility classes
- ✅ **Brand consistency**: Match landing page gradient system and colors
- ✅ **Smooth animations**: Framer Motion with reduced motion support
- ✅ **Full responsive**: 375px mobile → 1920px desktop
- ✅ **Auto-simulation**: 45-second loop generating realistic events
- ✅ **Type-safe**: TypeScript strict mode with complete interfaces

### 1.3 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Demo Mode Layer                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Dashboard  │  │    Browse    │  │   Request    │      │
│  │     Stats    │  │   Requests   │  │   Details    │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │               │
│         └──────────────────┼──────────────────┘               │
│                            │                                  │
│                  ┌─────────▼─────────┐                       │
│                  │   Demo Store      │                       │
│                  │   (Zustand)       │                       │
│                  └─────────┬─────────┘                       │
│                            │                                  │
│                  ┌─────────▼─────────┐                       │
│                  │  Mock Data        │                       │
│                  │  Service          │                       │
│                  ├───────────────────┤                       │
│                  │ • Request Gen     │                       │
│                  │ • Event Simulator │                       │
│                  │ • Auto Loop       │                       │
│                  └───────────────────┘                       │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### 1.4 Data Flow

```
Auto-Simulation Loop (45s interval)
  ↓
Generate Random Event
  ├── New Request Posted (40% probability)
  ├── Offer Sent (35% probability)
  ├── Session Started (15% probability)
  └── Session Completed (10% probability)
  ↓
Update Demo Store State
  ↓
Trigger UI Updates
  ├── Activity Stream (new event card)
  ├── Dashboard Stats (increment counters)
  ├── Toast Notification (indigo/mint themed)
  └── Request List (add/update card)
```

### 1.5 Technology Stack Confirmation

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4.0 (zero custom CSS)
- **Animations**: Framer Motion 11.x
- **State**: Zustand 5.x
- **UI Components**: Radix UI primitives + shadcn/ui
- **TypeScript**: 5.x strict mode
- **Testing**: Vitest + React Testing Library

---

## 2. Brand & Design System Refactoring

### 2.1 Current State Analysis

**Problem**: `globals.css` has grown to **816 lines** with many custom classes that could be Tailwind utilities.

**Solution**: Migrate to Tailwind-first approach while preserving brand identity.

### 2.2 Tailwind Config Expansion

**File**: `tailwind.config.ts`

```typescript
// Add to theme.extend
const config: Config = {
  theme: {
    extend: {
      colors: {
        brand: {
          indigo: "#6366F1",
          pink: "#EC4899",
          orange: "#F97316",
          emerald: "#10B981",
          sky: "#3B82F6",
        },
        // Add demo-specific colors
        demo: {
          "banner-bg": "rgba(99, 102, 241, 0.05)",
          "card-hover": "rgba(236, 72, 153, 0.1)",
        },
        // Urgency color scale
        urgency: {
          low: "#9CA3AF",      // Gray
          normal: "#EAB308",   // Amber
          critical: "#F43F5E", // Coral
        },
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #6366F1, #EC4899, #F97316)",
        "gradient-accent": "linear-gradient(135deg, #10B981, #3B82F6)",
        "gradient-card": "linear-gradient(135deg, rgba(99,102,241,0.05), rgba(236,72,153,0.05))",
      },
      boxShadow: {
        "glow-indigo": "0 0 24px rgba(99, 102, 241, 0.3)",
        "glow-pink": "0 0 24px rgba(236, 72, 153, 0.3)",
        "card-hover": "0 8px 32px rgba(99, 102, 241, 0.15)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "slide-up": "slideUp 0.3s ease-out",
        "fade-in": "fadeIn 0.2s ease-in",
        "scale-in": "scaleIn 0.2s ease-out",
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
};
```

### 2.3 Standard Component Class Patterns

**Reusable Tailwind Compositions** (use via `cn()` utility):

```typescript
// lib/utils/tailwind-patterns.ts
export const cardBase = "bg-graphite/50 border border-smoky rounded-lg";
export const cardInteractive = "transition-all duration-300 hover:border-brand-pink/50 hover:shadow-card-hover hover:-translate-y-1";
export const cardFull = cn(cardBase, cardInteractive);

export const buttonPrimary = "bg-gradient-primary text-white font-semibold px-6 py-3 rounded-lg transition-transform hover:scale-105";
export const buttonSecondary = "bg-graphite border border-brand-indigo/50 text-white font-semibold px-6 py-3 rounded-lg hover:border-brand-indigo hover:shadow-glow-indigo";

export const badgeBase = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium";
export const badgeUrgencyLow = cn(badgeBase, "bg-urgency-low/20 text-urgency-low");
export const badgeUrgencyNormal = cn(badgeBase, "bg-urgency-normal/20 text-urgency-normal");
export const badgeUrgencyCritical = cn(badgeBase, "bg-urgency-critical/20 text-urgency-critical");

export const inputBase = "bg-graphite border border-smoky rounded-lg px-4 py-2 text-white focus:border-brand-indigo focus:ring-2 focus:ring-brand-indigo/20 transition-colors";
```

### 2.4 Globals.css Cleanup Strategy

**Phase 1** (Immediate): Extract reusable patterns to tailwind.config
**Phase 2** (Post-demo): Deprecate redundant classes
**Phase 3** (Future): Remove unused utilities

**Keep in globals.css**:
- CSS variable definitions (`:root`)
- Base layer resets
- Font imports
- Complex pseudo-selectors not supported by Tailwind

**Migrate to Tailwind**:
- Gradient backgrounds → `bg-gradient-*` utilities
- Glow effects → `shadow-glow-*` utilities
- Card styles → Composed utility patterns
- Button styles → Composed utility patterns

---

## 3. Mock Data Service Design

### 3.1 TypeScript Type Definitions

**File**: `types/demo.ts`

```typescript
// Request Types
export type RequestUrgency = "low" | "normal" | "critical";
export type RequestMode = "async" | "live";
export type RequestStatus = "open" | "in-progress" | "completed";

export interface DemoRequest {
  id: string;
  title: string;
  description: string;
  tags: string[];
  urgency: RequestUrgency;
  mode: RequestMode;
  duration: number; // hours (1-4)
  budget?: { amount: number; currency: string };
  createdAt: Date;
  status: RequestStatus;
  requester: DemoUser;
  offers: DemoOffer[];
}

// Offer Types
export interface DemoOffer {
  id: string;
  requestId: string;
  helper: DemoUser;
  message: string;
  availability: string; // "Available now", "In 2 hours", etc.
  createdAt: Date;
  status: "pending" | "accepted" | "declined";
}

// User Types
export interface DemoUser {
  id: string;
  name: string;
  avatar: string; // emoji or URL
  rating: number; // 1-5
  sessionsCompleted: number;
  skills: string[];
}

// Session Types
export interface DemoSession {
  id: string;
  requestId: string;
  requester: DemoUser;
  helper: DemoUser;
  startedAt: Date;
  completedAt?: Date;
  duration: number; // minutes
  rating?: number;
  feedback?: string;
}

// Activity Event Types
export type DemoEventType =
  | "request_posted"
  | "offer_sent"
  | "offer_accepted"
  | "session_started"
  | "session_completed";

export interface DemoEvent {
  id: string;
  type: DemoEventType;
  timestamp: Date;
  data: {
    request?: DemoRequest;
    offer?: DemoOffer;
    session?: DemoSession;
  };
  message: string; // "Sarah posted a new React request"
}

// Stats Types
export interface DemoStats {
  totalRequests: number;
  activeRequests: number;
  totalOffers: number;
  activeSessions: number;
  completedSessions: number;
  availableHelpers: number;
}
```

### 3.2 Mock Data Generators

**File**: `lib/api/mock/data-generators.ts`

```typescript
import { faker } from "@faker-js/faker";
import type { DemoRequest, DemoUser, DemoOffer } from "@/types/demo";

// Predefined skill pools for realistic data
const SKILLS = [
  "React", "TypeScript", "Node.js", "Python", "UI/UX",
  "Testing", "DevOps", "GraphQL", "Next.js", "Tailwind",
  "PostgreSQL", "MongoDB", "AWS", "Docker", "Git"
];

const REQUEST_TEMPLATES = [
  {
    title: "Need help refactoring React components",
    description: "I have a legacy React app with large components. Need help breaking them down into smaller, reusable pieces with proper TypeScript types.",
    tags: ["React", "TypeScript", "Refactoring"],
  },
  {
    title: "API rate limiting implementation",
    description: "Building a Node.js API and need to implement rate limiting with Redis. Looking for someone with experience in this area.",
    tags: ["Node.js", "Redis", "Backend"],
  },
  {
    title: "Tailwind migration from CSS modules",
    description: "Want to migrate my Next.js project from CSS modules to Tailwind. Need guidance on best practices and responsive design patterns.",
    tags: ["Tailwind", "Next.js", "CSS"],
  },
  // ... 20+ more templates
];

export function generateUser(): DemoUser {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    avatar: faker.helpers.arrayElement(["👨‍💻", "👩‍💻", "🧑‍💻", "👨‍🔧", "👩‍🔬"]),
    rating: faker.number.float({ min: 4.0, max: 5.0, fractionDigits: 1 }),
    sessionsCompleted: faker.number.int({ min: 5, max: 150 }),
    skills: faker.helpers.arrayElements(SKILLS, faker.number.int({ min: 2, max: 5 })),
  };
}

export function generateRequest(): DemoRequest {
  const template = faker.helpers.arrayElement(REQUEST_TEMPLATES);
  const urgency = faker.helpers.weightedArrayElement([
    { value: "low" as const, weight: 0.3 },
    { value: "normal" as const, weight: 0.5 },
    { value: "critical" as const, weight: 0.2 },
  ]);

  return {
    id: faker.string.uuid(),
    title: template.title,
    description: template.description,
    tags: template.tags,
    urgency,
    mode: faker.helpers.arrayElement(["async", "live"]),
    duration: faker.helpers.arrayElement([1, 2, 3, 4]),
    budget: faker.datatype.boolean() ? {
      amount: faker.number.int({ min: 30, max: 150 }),
      currency: "USD",
    } : undefined,
    createdAt: faker.date.recent({ days: 1 }),
    status: "open",
    requester: generateUser(),
    offers: [],
  };
}

export function generateOffer(requestId: string): DemoOffer {
  const messages = [
    "I can help with this in the next few hours. I have 5+ years of experience with this stack.",
    "Available now! I've solved similar problems before and can guide you through the solution.",
    "I'd love to help. I can hop on a call in about 2 hours if that works for you.",
  ];

  return {
    id: faker.string.uuid(),
    requestId,
    helper: generateUser(),
    message: faker.helpers.arrayElement(messages),
    availability: faker.helpers.arrayElement([
      "Available now",
      "In 2 hours",
      "Tomorrow morning",
      "This evening",
    ]),
    createdAt: faker.date.recent({ days: 0.5 }),
    status: "pending",
  };
}
```

### 3.3 Demo Service Implementation

**File**: `lib/api/mock/demo-service.ts`

```typescript
import { generateRequest, generateOffer, generateUser } from "./data-generators";
import type { DemoRequest, DemoOffer, DemoEvent, DemoStats, DemoEventType } from "@/types/demo";

class DemoService {
  private requests: Map<string, DemoRequest> = new Map();
  private offers: Map<string, DemoOffer> = new Map();
  private events: DemoEvent[] = [];
  private simulationInterval?: NodeJS.Timeout;
  private eventListeners: Array<(event: DemoEvent) => void> = [];

  constructor() {
    this.initializeData();
  }

  // Initialize with 10-15 realistic requests
  private initializeData() {
    const initialCount = Math.floor(Math.random() * 6) + 10; // 10-15
    for (let i = 0; i < initialCount; i++) {
      const request = generateRequest();
      this.requests.set(request.id, request);

      // Add 0-3 offers per request
      const offerCount = Math.floor(Math.random() * 4);
      for (let j = 0; j < offerCount; j++) {
        const offer = generateOffer(request.id);
        this.offers.set(offer.id, offer);
        request.offers.push(offer);
      }
    }
  }

  // Start 45-second auto-simulation loop
  startAutoSimulation() {
    if (this.simulationInterval) return;

    this.simulationInterval = setInterval(() => {
      this.generateRandomEvent();
    }, 45000); // 45 seconds
  }

  stopAutoSimulation() {
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
      this.simulationInterval = undefined;
    }
  }

  // Generate random marketplace event
  private generateRandomEvent() {
    const random = Math.random();
    let eventType: DemoEventType;
    let event: DemoEvent;

    if (random < 0.4) {
      // 40% - New request posted
      const request = generateRequest();
      this.requests.set(request.id, request);
      event = this.createEvent("request_posted", request.requester.name, { request });
    } else if (random < 0.75) {
      // 35% - Offer sent
      const openRequests = Array.from(this.requests.values()).filter(r => r.status === "open");
      if (openRequests.length > 0) {
        const request = openRequests[Math.floor(Math.random() * openRequests.length)];
        const offer = generateOffer(request.id);
        this.offers.set(offer.id, offer);
        request.offers.push(offer);
        event = this.createEvent("offer_sent", offer.helper.name, { request, offer });
      }
    } else if (random < 0.9) {
      // 15% - Session started
      const requestsWithOffers = Array.from(this.requests.values())
        .filter(r => r.status === "open" && r.offers.length > 0);
      if (requestsWithOffers.length > 0) {
        const request = requestsWithOffers[Math.floor(Math.random() * requestsWithOffers.length)];
        request.status = "in-progress";
        event = this.createEvent("session_started", request.requester.name, { request });
      }
    } else {
      // 10% - Session completed
      const inProgressRequests = Array.from(this.requests.values())
        .filter(r => r.status === "in-progress");
      if (inProgressRequests.length > 0) {
        const request = inProgressRequests[Math.floor(Math.random() * inProgressRequests.length)];
        request.status = "completed";
        event = this.createEvent("session_completed", request.requester.name, { request });
      }
    }

    if (event!) {
      this.events.unshift(event);
      this.notifyListeners(event);
    }
  }

  private createEvent(type: DemoEventType, actor: string, data: any): DemoEvent {
    const messages = {
      request_posted: `${actor} posted a new request`,
      offer_sent: `${actor} offered to help`,
      offer_accepted: `${actor} accepted an offer`,
      session_started: `${actor} started a session`,
      session_completed: `${actor} completed a session`,
    };

    return {
      id: `evt-${Date.now()}-${Math.random()}`,
      type,
      timestamp: new Date(),
      data,
      message: messages[type],
    };
  }

  // Event listener pattern for real-time updates
  addEventListener(listener: (event: DemoEvent) => void) {
    this.eventListeners.push(listener);
    return () => {
      this.eventListeners = this.eventListeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(event: DemoEvent) {
    this.eventListeners.forEach(listener => listener(event));
  }

  // CRUD Operations
  getAllRequests(filters?: {
    tags?: string[];
    urgency?: string[];
    mode?: string[];
    duration?: [number, number];
  }): DemoRequest[] {
    let requests = Array.from(this.requests.values());

    if (filters) {
      if (filters.tags?.length) {
        requests = requests.filter(r =>
          r.tags.some(tag => filters.tags!.includes(tag))
        );
      }
      if (filters.urgency?.length) {
        requests = requests.filter(r => filters.urgency!.includes(r.urgency));
      }
      if (filters.mode?.length) {
        requests = requests.filter(r => filters.mode!.includes(r.mode));
      }
      if (filters.duration) {
        requests = requests.filter(r =>
          r.duration >= filters.duration![0] &&
          r.duration <= filters.duration![1]
        );
      }
    }

    return requests.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  getRequestById(id: string): DemoRequest | undefined {
    return this.requests.get(id);
  }

  createOffer(requestId: string, message: string): DemoOffer {
    const offer: DemoOffer = {
      id: `offer-${Date.now()}-${Math.random()}`,
      requestId,
      helper: generateUser(),
      message,
      availability: "Available now",
      createdAt: new Date(),
      status: "pending",
    };

    const request = this.requests.get(requestId);
    if (request) {
      request.offers.push(offer);
    }

    this.offers.set(offer.id, offer);

    // Create event
    const event = this.createEvent("offer_sent", offer.helper.name, { offer, request });
    this.events.unshift(event);
    this.notifyListeners(event);

    return offer;
  }

  getRecentEvents(limit: number = 20): DemoEvent[] {
    return this.events.slice(0, limit);
  }

  getStats(): DemoStats {
    const requests = Array.from(this.requests.values());
    return {
      totalRequests: requests.length,
      activeRequests: requests.filter(r => r.status === "open").length,
      totalOffers: this.offers.size,
      activeSessions: requests.filter(r => r.status === "in-progress").length,
      completedSessions: requests.filter(r => r.status === "completed").length,
      availableHelpers: Math.floor(Math.random() * 20) + 30, // 30-50
    };
  }
}

// Singleton instance
export const demoService = new DemoService();
```

### 3.4 Zustand Store

**File**: `lib/stores/demo-store.ts`

```typescript
import { create } from "zustand";
import { demoService } from "@/lib/api/mock/demo-service";
import type { DemoRequest, DemoEvent, DemoStats } from "@/types/demo";

interface DemoStore {
  // State
  requests: DemoRequest[];
  recentEvents: DemoEvent[];
  stats: DemoStats;
  isSimulationActive: boolean;

  // Filter state
  filters: {
    tags: string[];
    urgency: string[];
    mode: string[];
    duration: [number, number];
  };

  // Actions
  loadInitialData: () => void;
  startSimulation: () => void;
  stopSimulation: () => void;
  refreshRequests: () => void;
  updateFilters: (filters: Partial<DemoStore["filters"]>) => void;
  createOffer: (requestId: string, message: string) => void;
}

export const useDemoStore = create<DemoStore>((set, get) => ({
  // Initial state
  requests: [],
  recentEvents: [],
  stats: {
    totalRequests: 0,
    activeRequests: 0,
    totalOffers: 0,
    activeSessions: 0,
    completedSessions: 0,
    availableHelpers: 0,
  },
  isSimulationActive: false,
  filters: {
    tags: [],
    urgency: [],
    mode: [],
    duration: [1, 4],
  },

  // Load data on mount
  loadInitialData: () => {
    const requests = demoService.getAllRequests();
    const events = demoService.getRecentEvents();
    const stats = demoService.getStats();
    set({ requests, recentEvents: events, stats });
  },

  // Start auto-simulation
  startSimulation: () => {
    demoService.startAutoSimulation();

    // Listen for new events
    demoService.addEventListener((event) => {
      set((state) => ({
        recentEvents: [event, ...state.recentEvents].slice(0, 20),
        requests: demoService.getAllRequests(state.filters),
        stats: demoService.getStats(),
      }));
    });

    set({ isSimulationActive: true });
  },

  stopSimulation: () => {
    demoService.stopAutoSimulation();
    set({ isSimulationActive: false });
  },

  refreshRequests: () => {
    const { filters } = get();
    const requests = demoService.getAllRequests(filters);
    const stats = demoService.getStats();
    set({ requests, stats });
  },

  updateFilters: (newFilters) => {
    set((state) => {
      const filters = { ...state.filters, ...newFilters };
      const requests = demoService.getAllRequests(filters);
      return { filters, requests };
    });
  },

  createOffer: (requestId, message) => {
    demoService.createOffer(requestId, message);
    get().refreshRequests();
  },
}));
```

---

## 4. Feature Implementation Breakdown

### 4.1 Demo Dashboard

**Page**: `app/(demo)/dashboard/page.tsx`

**Purpose**: Entry point showing marketplace overview with activity feed and quick stats.

**Layout**:
```
┌────────────────────────────────────────────────┐
│ Demo Mode Banner (sticky top)                  │
├────────────────────────────────────────────────┤
│ Marketplace Stats Cards (grid)                 │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│ │ Active  │ │ Helpers │ │ Sessions│           │
│ │ 24 reqs │ │ 45 avail│ │ 12 live │           │
│ └─────────┘ └─────────┘ └─────────┘           │
├────────────────────────────────────────────────┤
│ Recent Activity Stream                         │
│ ┌────────────────────────────────────────────┐ │
│ │ 🟣 Sarah posted a new React request        │ │
│ │ 🟢 John offered to help with API design    │ │
│ │ 🔵 Alice started a TypeScript session      │ │
│ └────────────────────────────────────────────┘ │
├────────────────────────────────────────────────┤
│ CTA: Browse Requests (gradient button)        │
└────────────────────────────────────────────────┘
```

**Components**:

1. **DashboardStats** (`components/demo/DashboardStats.tsx`)
```typescript
interface Stat {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: "indigo" | "emerald" | "pink";
}

export function DashboardStats({ stats }: { stats: DemoStats }) {
  const statCards: Stat[] = [
    {
      label: "Active Requests",
      value: stats.activeRequests,
      icon: <DocumentIcon />,
      color: "indigo",
    },
    {
      label: "Helpers Available",
      value: stats.availableHelpers,
      icon: <UsersIcon />,
      color: "emerald",
    },
    {
      label: "Live Sessions",
      value: stats.activeSessions,
      icon: <VideoCameraIcon />,
      color: "pink",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={cn(
            "bg-graphite/50 border border-smoky rounded-lg p-6",
            "hover:border-brand-${stat.color}/50 hover:shadow-glow-${stat.color}",
            "transition-all duration-300"
          )}
        >
          <div className="flex items-center gap-4">
            <div className={`text-brand-${stat.color} text-3xl`}>
              {stat.icon}
            </div>
            <div>
              <motion.div
                key={stat.value}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-3xl font-display font-bold text-white"
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-steel">{stat.label}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
```

2. **ActivityStream** (`components/demo/ActivityStream.tsx`)
```typescript
export function ActivityStream({ events }: { events: DemoEvent[] }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-display font-bold text-white">
        Live Activity
      </h2>
      <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {events.map((event) => (
            <motion.div
              key={event.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={cn(
                "bg-graphite/30 border-l-4 rounded-lg p-4",
                "transition-colors duration-300",
                event.type === "request_posted" && "border-brand-indigo",
                event.type === "offer_sent" && "border-brand-emerald",
                event.type === "session_started" && "border-brand-pink"
              )}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">
                  {event.type === "request_posted" && "🟣"}
                  {event.type === "offer_sent" && "🟢"}
                  {event.type === "session_started" && "🔵"}
                </div>
                <div>
                  <p className="text-white font-medium">{event.message}</p>
                  <p className="text-sm text-steel">
                    {formatDistanceToNow(event.timestamp, { addSuffix: true })}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
```

---

### 4.2 Browse Requests Screen

**Page**: `app/(demo)/browse/page.tsx`

**Layout**:
```
┌────────────────────────────────────────────────────────┐
│ Filters Sidebar (left)     │  Request Cards Grid       │
│ ┌──────────────────────┐   │  ┌────────┐ ┌────────┐   │
│ │ Tags                 │   │  │ React  │ │ Node.js│   │
│ │ ☑ React              │   │  │ Help   │ │ API    │   │
│ │ ☐ TypeScript         │   │  └────────┘ └────────┘   │
│ │                      │   │                           │
│ │ Urgency              │   │  ┌────────┐ ┌────────┐   │
│ │ ● Low                │   │  │ UI/UX  │ │ Testing│   │
│ │ ● Normal             │   │  │ Design │ │ Setup  │   │
│ │ ● Critical           │   │  └────────┘ └────────┘   │
│ │                      │   │                           │
│ │ Duration: 1-4 hrs    │   │  [Load More...]          │
│ │ ═══════════          │   │                           │
│ └──────────────────────┘   │                           │
└────────────────────────────────────────────────────────┘
```

**Components**:

1. **RequestFilters** (`components/demo/RequestFilters.tsx`)
```typescript
export function RequestFilters() {
  const { filters, updateFilters } = useDemoStore();

  return (
    <aside className="bg-graphite/30 border border-smoky rounded-lg p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Filter Requests</h3>
      </div>

      {/* Tags Filter */}
      <div>
        <label className="text-sm font-medium text-steel mb-3 block">
          Skills & Technologies
        </label>
        <div className="space-y-2">
          {SKILLS.map((skill) => (
            <label key={skill} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.tags.includes(skill)}
                onChange={(e) => {
                  const newTags = e.target.checked
                    ? [...filters.tags, skill]
                    : filters.tags.filter(t => t !== skill);
                  updateFilters({ tags: newTags });
                }}
                className="w-4 h-4 rounded border-smoky bg-graphite checked:bg-brand-indigo focus:ring-brand-indigo/20"
              />
              <span className="text-white group-hover:text-brand-indigo transition-colors">
                {skill}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Urgency Filter */}
      <div>
        <label className="text-sm font-medium text-steel mb-3 block">
          Urgency Level
        </label>
        <div className="space-y-2">
          {["low", "normal", "critical"].map((level) => (
            <label key={level} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.urgency.includes(level)}
                onChange={(e) => {
                  const newUrgency = e.target.checked
                    ? [...filters.urgency, level]
                    : filters.urgency.filter(u => u !== level);
                  updateFilters({ urgency: newUrgency });
                }}
                className="w-4 h-4 rounded border-smoky bg-graphite checked:bg-brand-emerald focus:ring-brand-emerald/20"
              />
              <span className={cn(
                "text-white capitalize group-hover:text-brand-emerald transition-colors",
                level === "low" && "text-urgency-low",
                level === "normal" && "text-urgency-normal",
                level === "critical" && "text-urgency-critical"
              )}>
                {level}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Duration Slider */}
      <div>
        <label className="text-sm font-medium text-steel mb-3 block">
          Duration: {filters.duration[0]}-{filters.duration[1]} hours
        </label>
        <input
          type="range"
          min="1"
          max="4"
          step="1"
          value={filters.duration[1]}
          onChange={(e) => {
            updateFilters({ duration: [1, parseInt(e.target.value)] });
          }}
          className="w-full accent-brand-indigo"
        />
      </div>

      {/* Reset Button */}
      <button
        onClick={() => updateFilters({
          tags: [],
          urgency: [],
          mode: [],
          duration: [1, 4],
        })}
        className="w-full bg-graphite border border-smoky text-white py-2 rounded-lg hover:border-brand-pink transition-colors"
      >
        Reset Filters
      </button>
    </aside>
  );
}
```

2. **RequestCard** (`components/demo/RequestCard.tsx`)
```typescript
export function RequestCard({ request }: { request: DemoRequest }) {
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        className={cn(
          "bg-graphite/50 border border-smoky rounded-lg p-6",
          "hover:border-brand-pink/50 hover:shadow-card-hover",
          "transition-all duration-300 cursor-pointer group"
        )}
        onClick={() => setIsOfferModalOpen(true)}
      >
        {/* Urgency Badge */}
        <div className="flex items-start justify-between mb-3">
          <span className={cn(
            badgeBase,
            request.urgency === "low" && badgeUrgencyLow,
            request.urgency === "normal" && badgeUrgencyNormal,
            request.urgency === "critical" && badgeUrgencyCritical
          )}>
            {request.urgency === "critical" && "🔴 "}
            {request.urgency.toUpperCase()}
          </span>
          <span className="text-sm text-steel">
            {formatDistanceToNow(request.createdAt, { addSuffix: true })}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-brand-pink transition-colors">
          {request.title}
        </h3>

        {/* Description Preview */}
        <p className="text-steel text-sm mb-4 line-clamp-2">
          {request.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {request.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-brand-indigo/20 text-brand-indigo"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-steel">
          <span className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4" />
            {request.duration}h
          </span>
          <span className="flex items-center gap-1">
            <ChatBubbleIcon className="w-4 h-4" />
            {request.mode === "async" ? "Async" : "Live"}
          </span>
          {request.offers.length > 0 && (
            <span className="flex items-center gap-1 text-brand-emerald">
              <UserGroupIcon className="w-4 h-4" />
              {request.offers.length} offers
            </span>
          )}
        </div>

        {/* CTA Button */}
        <div className="mt-4 pt-4 border-t border-smoky">
          <button
            className="w-full bg-gradient-accent text-white font-semibold py-2 rounded-lg hover:scale-105 transition-transform"
            onClick={(e) => {
              e.stopPropagation();
              setIsOfferModalOpen(true);
            }}
          >
            Offer Help
          </button>
        </div>
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

3. **OfferModal** (`components/demo/OfferModal.tsx`)
```typescript
export function OfferModal({
  isOpen,
  onClose,
  request
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
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
    createOffer(request.id, message);

    toast.success("Offer sent! (Demo mode)", {
      description: "In production, the requester would be notified.",
      icon: "🎉",
    });

    setIsSubmitting(false);
    onClose();
    setMessage("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-graphite border border-smoky max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display text-white">
            Offer to Help
          </DialogTitle>
          <DialogDescription className="text-steel">
            Send a message to the requester about how you can help with:
          </DialogDescription>
        </DialogHeader>

        {/* Request Preview */}
        <div className="bg-charcoal/50 border border-smoky rounded-lg p-4 my-4">
          <h4 className="font-semibold text-white mb-2">{request.title}</h4>
          <div className="flex gap-2">
            {request.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-xs px-2 py-1 rounded bg-brand-indigo/20 text-brand-indigo">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div>
          <label className="text-sm font-medium text-steel mb-2 block">
            Your Message ({message.length}/500)
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, 500))}
            placeholder="Hi! I can help with this. I have experience with..."
            className={cn(
              inputBase,
              "min-h-32 resize-none",
              message.length < 20 && "border-urgency-critical/50",
              message.length >= 20 && "border-brand-emerald/50"
            )}
          />
          {message.length < 20 && (
            <p className="text-xs text-urgency-critical mt-1">
              Minimum 20 characters required
            </p>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-smoky"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={message.length < 20 || isSubmitting}
            className="bg-gradient-accent text-white hover:scale-105"
          >
            {isSubmitting ? "Sending..." : "Send Offer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

---

### 4.3 Request Details View

**Page**: `app/(demo)/requests/[id]/page.tsx`

**Layout**:
```
┌────────────────────────────────────────────────┐
│ ← Back to Browse                               │
├────────────────────────────────────────────────┤
│ Request Header (gradient background)           │
│ Title: "Need help refactoring React..."       │
│ 🟡 NORMAL  ⏱ 2h  💬 Async  💰 $50/hr         │
├────────────────────────────────────────────────┤
│ Full Description                                │
│ Lorem ipsum detailed problem explanation...    │
├────────────────────────────────────────────────┤
│ Tags: [React] [TypeScript] [Refactoring]      │
├────────────────────────────────────────────────┤
│ Offers Received (3)                            │
│ ┌────────────────────────────────────────┐    │
│ │ 👨‍💻 John Doe (⭐ 4.8)                    │    │
│ │ "I can help! I have 5+ years..."       │    │
│ │ Available: In 2 hours                   │    │
│ │ [Accept Offer (Demo)]                   │    │
│ └────────────────────────────────────────┘    │
│ ┌────────────────────────────────────────┐    │
│ │ 👩‍💻 Sarah Chen (⭐ 5.0)                │    │
│ └────────────────────────────────────────┘    │
├────────────────────────────────────────────────┤
│ [Offer Help] (if not offered yet)             │
└────────────────────────────────────────────────┘
```

**Component**: `app/(demo)/requests/[id]/page.tsx`

```typescript
export default function RequestDetailsPage({ params }: { params: { id: string } }) {
  const request = useDemoStore(state =>
    state.requests.find(r => r.id === params.id)
  );

  if (!request) {
    return <div>Request not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <Link
        href="/browse"
        className="inline-flex items-center gap-2 text-steel hover:text-brand-indigo transition-colors mb-6"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Back to Browse
      </Link>

      {/* Request Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-card border border-brand-indigo/20 rounded-lg p-8 mb-6"
      >
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-3xl font-display font-bold text-white">
            {request.title}
          </h1>
          <span className={cn(
            badgeBase,
            request.urgency === "low" && badgeUrgencyLow,
            request.urgency === "normal" && badgeUrgencyNormal,
            request.urgency === "critical" && badgeUrgencyCritical
          )}>
            {request.urgency.toUpperCase()}
          </span>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-4 text-sm text-steel mb-6">
          <span className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4" />
            {request.duration} hours
          </span>
          <span className="flex items-center gap-1">
            <ChatBubbleIcon className="w-4 h-4" />
            {request.mode === "async" ? "Async Chat" : "Live Session"}
          </span>
          {request.budget && (
            <span className="flex items-center gap-1 text-brand-emerald">
              <CurrencyDollarIcon className="w-4 h-4" />
              ${request.budget.amount}/{request.duration}h
            </span>
          )}
          <span className="flex items-center gap-1">
            <UserIcon className="w-4 h-4" />
            Posted by {request.requester.name}
          </span>
        </div>

        {/* Description */}
        <p className="text-white leading-relaxed mb-6">
          {request.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {request.tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-sm font-medium bg-brand-indigo/20 text-brand-indigo"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Offers Section */}
      <div className="bg-graphite/50 border border-smoky rounded-lg p-6">
        <h2 className="text-2xl font-display font-bold text-white mb-6">
          Offers Received ({request.offers.length})
        </h2>

        {request.offers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-steel mb-4">No offers yet. Be the first to help!</p>
            <OfferModal request={request} />
          </div>
        ) : (
          <div className="space-y-4">
            {request.offers.map((offer) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-charcoal/50 border border-smoky rounded-lg p-6 hover:border-brand-emerald/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
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
                  <span className="text-sm px-3 py-1 rounded-full bg-brand-emerald/20 text-brand-emerald">
                    {offer.availability}
                  </span>
                </div>

                <p className="text-white mb-4">{offer.message}</p>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      toast.success("Offer accepted! (Demo mode)", {
                        description: "In production, this would start a real session.",
                      });
                    }}
                    className="px-4 py-2 bg-gradient-accent text-white rounded-lg font-semibold hover:scale-105 transition-transform"
                  >
                    Accept Offer (Demo)
                  </button>
                  <button
                    onClick={() => {
                      toast.info("In production, you could view the helper's full profile.");
                    }}
                    className="px-4 py-2 bg-graphite border border-smoky text-white rounded-lg hover:border-brand-indigo transition-colors"
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
```

---

### 4.4 Live Activity Stream

**Component**: `components/demo/ActivityStream.tsx` (expanded from 4.1)

**Advanced Features**:
- Auto-scroll to newest events
- Event type icons and colors
- Relative timestamps
- Slide-in/slide-out animations
- Event grouping (future: "3 new requests in last 5 min")

```typescript
export function ActivityStream({ events, maxHeight = 400 }: {
  events: DemoEvent[];
  maxHeight?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to top when new event arrives
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [events[0]?.id]);

  const getEventIcon = (type: DemoEventType) => {
    switch (type) {
      case "request_posted":
        return { icon: "📝", color: "brand-indigo" };
      case "offer_sent":
        return { icon: "✋", color: "brand-emerald" };
      case "session_started":
        return { icon: "🎬", color: "brand-pink" };
      case "session_completed":
        return { icon: "✅", color: "success" };
      default:
        return { icon: "📢", color: "brand-sky" };
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold text-white">
          Live Activity
        </h2>
        <span className="flex items-center gap-2 text-sm text-steel">
          <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />
          Live
        </span>
      </div>

      <div
        ref={containerRef}
        className="space-y-3 overflow-y-auto"
        style={{ maxHeight: `${maxHeight}px` }}
      >
        <AnimatePresence mode="popLayout">
          {events.map((event, index) => {
            const { icon, color } = getEventIcon(event.type);
            return (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  delay: index * 0.05
                }}
                className={cn(
                  "bg-graphite/30 border-l-4 rounded-lg p-4",
                  "hover:bg-graphite/50 transition-all duration-300",
                  `border-${color}`
                )}
              >
                <div className="flex items-start gap-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: index * 0.05 + 0.1 }}
                    className="text-2xl"
                  >
                    {icon}
                  </motion.div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{event.message}</p>
                    {event.data.request && (
                      <Link
                        href={`/requests/${event.data.request.id}`}
                        className="text-sm text-brand-indigo hover:underline"
                      >
                        View request →
                      </Link>
                    )}
                    <p className="text-xs text-steel mt-1">
                      {formatDistanceToNow(event.timestamp, { addSuffix: true })}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
```

---

### 4.5 Demo Mode Banner

**Component**: `components/demo/DemoBanner.tsx`

**Purpose**: Sticky top banner reminding users they're in demo mode with CTA to sign up.

```typescript
export function DemoBanner() {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      className="sticky top-0 z-50 bg-demo-banner-bg border-b border-brand-indigo/30 backdrop-blur-lg"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-brand-indigo"
          />
          <span className="text-white font-medium">
            You're in <span className="text-brand-indigo">Demo Mode</span> —
            Explore the platform with simulated data
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/auth/signup"
            className="px-4 py-2 bg-gradient-primary text-white font-semibold rounded-lg hover:scale-105 transition-transform"
          >
            Sign Up to Post Real Requests
          </Link>
          <button
            onClick={() => setIsDismissed(true)}
            className="text-steel hover:text-white transition-colors"
            aria-label="Dismiss banner"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
```

---

## 5. Component Specifications

### 5.1 Shared Component Props Interfaces

```typescript
// components/demo/types.ts
import type { DemoRequest, DemoOffer, DemoEvent, DemoStats } from "@/types/demo";

export interface RequestCardProps {
  request: DemoRequest;
  onOfferClick?: () => void;
}

export interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: DemoRequest;
}

export interface ActivityStreamProps {
  events: DemoEvent[];
  maxHeight?: number;
}

export interface DashboardStatsProps {
  stats: DemoStats;
}

export interface RequestFiltersProps {
  // Controlled externally via Zustand store
}
```

### 5.2 Tailwind Class Composition Patterns

All components use these standardized patterns (NO custom CSS):

```typescript
// Card bases
const cardBase = "bg-graphite/50 border border-smoky rounded-lg";
const cardHover = "hover:border-brand-pink/50 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300";

// Buttons
const btnPrimary = "bg-gradient-primary text-white font-semibold px-6 py-3 rounded-lg hover:scale-105 transition-transform";
const btnSecondary = "bg-graphite border border-smoky text-white px-6 py-3 rounded-lg hover:border-brand-indigo";
const btnGhost = "text-brand-indigo hover:bg-brand-indigo/10 px-4 py-2 rounded-lg transition-colors";

// Inputs
const inputBase = "bg-graphite border border-smoky rounded-lg px-4 py-2 text-white focus:border-brand-indigo focus:ring-2 focus:ring-brand-indigo/20";

// Badges
const badgeBase = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium";
const badgeUrgency = {
  low: "bg-urgency-low/20 text-urgency-low",
  normal: "bg-urgency-normal/20 text-urgency-normal",
  critical: "bg-urgency-critical/20 text-urgency-critical",
};

// Text
const textHeading = "font-display font-bold text-white";
const textBody = "text-white leading-relaxed";
const textMuted = "text-steel";
const textGradient = "bg-gradient-primary bg-clip-text text-transparent";
```

---

## 6. Animation Choreography

### 6.1 Framer Motion Variants Library

**File**: `lib/animations/demo-animations.ts`

```typescript
import type { Variants } from "framer-motion";

// Page transitions
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// Card entrance (staggered)
export const cardStagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const cardItem: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

// Hover effects
export const cardHover: Variants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -4,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17,
    },
  },
  tap: { scale: 0.98 },
};

// Modal animations
export const modalOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export const modalContent: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: { duration: 0.2 },
  },
};

// Toast notifications
export const toastSlideIn: Variants = {
  initial: { x: 400, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
    },
  },
  exit: {
    x: 400,
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

// Stats counter
export const counterPop: Variants = {
  initial: { scale: 1.5, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

// Activity stream items
export const streamItem: Variants = {
  initial: { x: -20, opacity: 0, scale: 0.95 },
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
    },
  },
  exit: {
    x: 20,
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

// Skeleton loading
export const skeletonPulse: Variants = {
  initial: { opacity: 0.4 },
  animate: {
    opacity: [0.4, 0.8, 0.4],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};
```

### 6.2 Reduced Motion Support

All animations respect `prefers-reduced-motion`:

```typescript
// lib/hooks/useReducedMotion.ts (already exists)
export function useReducedMotion() {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldReduceMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => {
      setShouldReduceMotion(e.matches);
    };

    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  return shouldReduceMotion;
}

// Usage in components
const shouldReduceMotion = useReducedMotion();

<motion.div
  variants={shouldReduceMotion ? undefined : cardHover}
  whileHover={shouldReduceMotion ? undefined : "hover"}
  // ...
/>
```

---

## 7. Responsive Design Matrix

### 7.1 Breakpoint System

Using Tailwind's default breakpoints:

```typescript
// tailwind.config.ts (already configured)
screens: {
  sm: "640px",  // Mobile landscape / Tablet portrait
  md: "768px",  // Tablet landscape
  lg: "1024px", // Desktop
  xl: "1280px", // Large desktop
  "2xl": "1536px", // Ultra-wide
}
```

### 7.2 Component Responsive Patterns

**Dashboard Stats Grid**:
```tsx
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {/* Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns */}
</div>
```

**Browse Page Layout**:
```tsx
<div className="lg:grid lg:grid-cols-[280px_1fr] gap-6">
  {/* Mobile: Stack, Desktop: Sidebar + Content */}
  <aside className="lg:sticky lg:top-24">
    <RequestFilters />
  </aside>
  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
    {/* Request cards responsive grid */}
  </div>
</div>
```

**Request Card**:
```tsx
<motion.div className={cn(
  "p-4 sm:p-6",               // Smaller padding on mobile
  "text-base sm:text-lg",     // Smaller text on mobile
  "rounded-lg sm:rounded-xl"  // Smaller radius on mobile
)}>
```

**Modal Dialog**:
```tsx
<DialogContent className={cn(
  "max-w-full sm:max-w-lg",  // Full-width on mobile
  "m-4 sm:m-auto",            // Margin on mobile
  "max-h-[90vh] overflow-y-auto" // Scrollable on small screens
)}>
```

### 7.3 Touch Target Guidelines

All interactive elements meet 48px minimum touch target:

```tsx
// Buttons
<button className="min-h-[48px] px-6 py-3">

// Checkboxes
<input className="w-6 h-6" /> // 24px visual, 48px click area via padding

// Links
<a className="inline-block py-3"> // At least 48px tall
```

---

## 8. Implementation Phases

### Phase 1: Foundation (Day 5 - 6 hours)

**Goal**: Set up data layer, types, and basic infrastructure.

**Tasks**:
1. ✅ Create type definitions (`types/demo.ts`)
2. ✅ Implement mock data generators (`lib/api/mock/data-generators.ts`)
3. ✅ Build demo service with CRUD operations (`lib/api/mock/demo-service.ts`)
4. ✅ Set up Zustand store (`lib/stores/demo-store.ts`)
5. ✅ Extend Tailwind config with demo colors/utilities
6. ✅ Create animation variants library (`lib/animations/demo-animations.ts`)
7. ✅ Create Tailwind pattern utilities (`lib/utils/tailwind-patterns.ts`)

**Testing**:
- Unit tests for data generators (realistic output)
- Unit tests for demo service (CRUD, auto-simulation)
- Store initialization and state updates

**Deliverables**:
- Working mock data service generating 10-15 requests
- 45-second auto-simulation loop
- Type-safe Zustand store
- Tailwind utilities ready for components

---

### Phase 2: Core Features (Day 6 - 8 hours)

**Goal**: Build main UI components and pages.

**Tasks**:

**2.1 Dashboard** (2 hours)
1. ✅ Create DashboardStats component
2. ✅ Create ActivityStream component
3. ✅ Build dashboard page layout
4. ✅ Integrate with Zustand store
5. ✅ Add Framer Motion animations

**2.2 Browse Requests** (3 hours)
1. ✅ Create RequestFilters sidebar
2. ✅ Create RequestCard component
3. ✅ Build browse page with grid layout
4. ✅ Implement filter logic in store
5. ✅ Add responsive breakpoints
6. ✅ Skeleton loading states

**2.3 Request Details** (2 hours)
1. ✅ Create request details page
2. ✅ Display full request info
3. ✅ Render offers list
4. ✅ Add "Accept Offer" simulation
5. ✅ Toast notifications

**2.4 Offer Modal** (1 hour)
1. ✅ Create OfferModal component
2. ✅ Form validation (20-500 chars)
3. ✅ Submit flow with toast
4. ✅ Character counter with gradient

**Testing**:
- Component rendering tests
- User interaction flows (filters, modals)
- Responsive behavior
- Animation execution

**Deliverables**:
- Fully functional browse + details flow
- Interactive filtering
- Offer submission (demo)
- Responsive on 375px-1920px

---

### Phase 3: Polish & Integration (Day 7 - 6 hours)

**Goal**: Final polish, animations, and production readiness.

**Tasks**:

**3.1 Demo Banner** (1 hour)
1. ✅ Create DemoBanner component
2. ✅ Sticky positioning
3. ✅ Dismiss functionality
4. ✅ Pulse animation

**3.2 Enhanced Animations** (2 hours)
1. ✅ Page transition animations
2. ✅ Card hover states (all components)
3. ✅ Activity stream slide-in/out
4. ✅ Stats counter pop effect
5. ✅ Reduced motion support

**3.3 Toast Notification System** (1 hour)
1. ✅ Configure sonner/react-hot-toast
2. ✅ Custom toast styling (brand colors)
3. ✅ Event-based notifications
4. ✅ Toast icons (indigo/mint themed)

**3.4 Final Responsive Tweaks** (1 hour)
1. ✅ Test on 375px, 768px, 1024px, 1920px
2. ✅ Fix any layout issues
3. ✅ Touch target verification (48px)
4. ✅ Mobile navigation (if needed)

**3.5 Unit Testing** (1 hour)
1. ✅ Component snapshots
2. ✅ Filter logic tests
3. ✅ Store mutation tests
4. ✅ Auto-simulation tests

**Testing**:
- Full E2E user flow (dashboard → browse → details → offer)
- Cross-browser testing (Chrome, Firefox, Safari)
- Mobile device testing (iOS Safari, Chrome Mobile)
- Accessibility audit (Lighthouse, axe DevTools)

**Deliverables**:
- Production-ready demo mode
- 100% TypeScript coverage
- >80% unit test coverage
- WCAG 2.1 AA compliant
- Perfect Lighthouse scores (Performance, Accessibility, Best Practices)

---

## 9. File Structure

### 9.1 New Files to Create

```
d:\portfolio projects\MicroCollab\
├── app/
│   └── (demo)/                           # Demo mode route group
│       ├── layout.tsx                    # Demo layout with banner
│       ├── dashboard/
│       │   └── page.tsx                  # Dashboard entry point
│       ├── browse/
│       │   └── page.tsx                  # Browse requests grid
│       └── requests/
│           └── [id]/
│               └── page.tsx              # Request details
│
├── components/
│   └── demo/
│       ├── DemoBanner.tsx                # Sticky top banner
│       ├── DashboardStats.tsx            # Stats cards grid
│       ├── ActivityStream.tsx            # Live activity feed
│       ├── RequestCard.tsx               # Request preview card
│       ├── RequestFilters.tsx            # Filter sidebar
│       ├── OfferModal.tsx                # Offer submission dialog
│       └── types.ts                      # Component prop types
│
├── lib/
│   ├── api/
│   │   └── mock/
│   │       ├── demo-service.ts           # Main demo service
│   │       ├── data-generators.ts        # Mock data generators
│   │       └── event-simulator.ts        # Auto-simulation logic
│   │
│   ├── stores/
│   │   └── demo-store.ts                 # Zustand store
│   │
│   ├── animations/
│   │   └── demo-animations.ts            # Framer Motion variants
│   │
│   └── utils/
│       └── tailwind-patterns.ts          # Reusable class compositions
│
└── types/
    └── demo.ts                           # TypeScript interfaces
```

### 9.2 Modified Files

```
tailwind.config.ts          # Add demo colors, shadows, animations
app/globals.css             # (NO CHANGES - use Tailwind instead)
package.json                # Add @faker-js/faker, sonner
```

---

## 10. Quality Checklist

### 10.1 Code Quality

- [ ] **Zero custom CSS** - All styling via Tailwind utilities
- [ ] **TypeScript strict mode** - No `any` types
- [ ] **ESLint clean** - Zero warnings/errors
- [ ] **Prettier formatted** - Consistent code style
- [ ] **Component composition** - Small, focused components (<200 lines)
- [ ] **Reusable patterns** - DRY principle applied

### 10.2 Brand Consistency

- [ ] **Color palette** - Only brand colors used (indigo, pink, orange, emerald, sky)
- [ ] **Gradient system** - Primary (indigo→pink→orange), Accent (emerald→sky)
- [ ] **Typography** - Plus Jakarta Sans (display), Inter (body), IBM Plex Mono (code)
- [ ] **Border radius** - Consistent 0.75rem/1rem/1.5rem
- [ ] **Shadow system** - Brand-colored glows (indigo, pink, emerald)
- [ ] **Urgency colors** - Low (gray), Normal (amber), Critical (coral)

### 10.3 Animation Quality

- [ ] **Framer Motion** - All animations via Motion components
- [ ] **Reduced motion support** - Respect user preference
- [ ] **Spring physics** - Natural, bouncy feel (stiffness: 300-500, damping: 20-30)
- [ ] **Stagger effects** - Cards/items animate sequentially
- [ ] **Hover states** - Smooth scale/translate effects
- [ ] **Page transitions** - Fade + slide on route changes
- [ ] **Performance** - 60fps, no jank

### 10.4 Responsive Design

- [ ] **Mobile-first** - Designed for 375px first
- [ ] **Breakpoint coverage** - sm(640px), md(768px), lg(1024px), xl(1280px)
- [ ] **Touch targets** - Minimum 48x48px
- [ ] **Viewport meta** - Properly configured
- [ ] **Landscape orientation** - Tested on mobile landscape
- [ ] **Tablet layout** - Optimized for iPad/Android tablets
- [ ] **Desktop expansion** - Takes advantage of large screens

### 10.5 Accessibility (WCAG 2.1 AA)

- [ ] **Semantic HTML** - Proper heading hierarchy (h1→h2→h3)
- [ ] **ARIA labels** - Screen reader support
- [ ] **Keyboard navigation** - All interactive elements accessible
- [ ] **Focus indicators** - Visible focus states (2px indigo ring)
- [ ] **Color contrast** - 4.5:1 minimum for text
- [ ] **Alt text** - Images described (if any)
- [ ] **Form labels** - All inputs properly labeled

### 10.6 Performance

- [ ] **Lighthouse score** - 90+ for all categories
- [ ] **First Contentful Paint** - <1.8s
- [ ] **Time to Interactive** - <3.8s
- [ ] **Cumulative Layout Shift** - <0.1
- [ ] **Bundle size** - Analyzed with `next build`
- [ ] **Code splitting** - Dynamic imports for modals/heavy components
- [ ] **Image optimization** - Next.js Image component (if images added)

### 10.7 Testing

- [ ] **Unit tests** - >80% coverage (Vitest)
- [ ] **Component tests** - React Testing Library
- [ ] **Store tests** - Zustand mutations
- [ ] **Mock service tests** - CRUD operations, simulation
- [ ] **Integration tests** - User flows (browse→details→offer)
- [ ] **E2E tests** - Playwright (optional for demo mode)

### 10.8 Documentation

- [ ] **README section** - Demo mode usage instructions
- [ ] **Code comments** - Complex logic explained
- [ ] **Type documentation** - JSDoc for public APIs
- [ ] **Storybook** - Component showcase (optional)

---

## 11. Dependencies to Add

```bash
npm install @faker-js/faker sonner
```

**@faker-js/faker**: Realistic mock data generation
**sonner**: Beautiful toast notifications (or use react-hot-toast)

---

## 12. Success Metrics

Upon completion, the demo mode should achieve:

✅ **User Engagement**
- Users can explore full marketplace flow in <3 minutes
- Auto-simulation creates sense of live activity
- Clear differentiation from production mode

✅ **Technical Excellence**
- Zero custom CSS (100% Tailwind)
- TypeScript strict mode compliance
- >80% unit test coverage
- Perfect Lighthouse scores

✅ **Brand Alignment**
- Visual consistency with landing page
- Same gradient system and animations
- Smooth, premium feel

✅ **Conversion Funnel**
- Clear CTA to sign up (banner + buttons)
- Low friction to try platform
- Compelling request examples

---

## 13. Post-Implementation

After demo mode completion, next phase focuses on:

1. **Week 2**: Real request posting flow (authenticated)
2. **Integration**: Connect demo → signup funnel
3. **Analytics**: Track demo engagement metrics
4. **Iteration**: Refine based on user feedback

---

**End of Implementation Guide**

Total estimated time: **20 hours** (3 days at 6-7 hours/day)

Ready to begin implementation following this plan! 🚀
