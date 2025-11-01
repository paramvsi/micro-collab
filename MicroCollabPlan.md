# MicroCollab Development Plan
**Version:** 1.1
**Last Updated:** 2025-01-11

---

## 🎯 Development Strategy

**PRIMARY FOCUS: UI-First Development** → See [@MicroCollabUIPlan.md](./MicroCollabUIPlan.md) for detailed implementation

This plan follows a **mock-first architecture** enabling complete UI development without backend dependency. All features use localStorage + Zustand + Tanstack Query, allowing seamless API migration later with ONE environment variable change.

---

## Executive Summary

MicroCollab is a marketplace platform connecting developers and small teams with experienced peers for **short, focused help sessions (1-4 hours)**. Unlike traditional freelance portals, MicroCollab focuses on instant, time-boxed collaborations for debugging, refactoring, testing, UX improvements, and architectural guidance. Built with Next.js 15, TypeScript, Tailwind CSS v4, and deployed on Vercel's free tier.

**Development Philosophy:** Build complete UI with realistic mock data (localStorage persistence) first, then swap to real APIs later without any component changes.

**Tech Stack:** Next.js 15 + TypeScript + App Router | **Zustand + localStorage** (state + persistence) | **Tanstack Query** (data fetching abstraction) | React Hook Form + Zod | shadcn/ui + Tailwind CSS v4 | **@faker-js/faker** (mock data) | Lucide Icons | Recharts | Framer Motion | Vitest + Playwright | Vercel deployment

**Migration Strategy:** Change `NEXT_PUBLIC_USE_MOCK=false` → Real APIs active → Zero UI changes

---

## Architecture Overview

**UI-First Architecture:** All data flows through **service interfaces** that abstract mock providers (localStorage) and real providers (Supabase). Components use **Tanstack Query hooks**, never directly accessing services. This creates a **swap-able data layer** requiring zero component changes during API migration.

```
Components → Tanstack Query Hooks → Service Interface → Mock/Real Service → localStorage/Supabase
```

**See [@MicroCollabUIPlan.md](./MicroCollabUIPlan.md) for:**
- Complete data flow architecture
- Service interface patterns
- Tanstack Query setup
- localStorage persistence strategy
- Mock service implementations
- API migration guide

**Marketplace Architecture:** Dual user roles (Requester/Helper) with role-based dashboards, request/offer matching system, session collaboration rooms, real-time notifications, and bidirectional rating system. Demo mode simulates marketplace activity with fake requests, offers, and matching events.

**Folder Structure:**
```
app/
  (marketing)/        # Landing page
  (dashboard)/        # Protected routes
    dashboard/        # Role-based home (Requester/Helper)
    requests/         # Request management
      new/            # Post new request
      [id]/           # Request details + offers
    browse/           # Browse open requests
    sessions/         # Active/completed sessions
      [id]/           # Session collaboration room
    profile/          # User profile & settings
  demo/               # Public demo mode
  api/                # Next.js API routes
    requests/         # Request CRUD
    offers/           # Offer management
    sessions/         # Session management
    messages/         # Chat messages
components/
  ui/                 # shadcn components
  features/           # Feature modules
    request/          # Request cards, forms, filters
    offer/            # Offer modals, cards
    session/          # Session room, chat, timer
    dashboard/        # Dashboard widgets
    profile/          # Profile editor
  layout/             # Shared layouts
lib/
  api/mock/           # Mock data providers
  api/supabase/       # Supabase clients (Phase 2)
  services/           # Business logic layer
    request-service   # Request operations
    offer-service     # Offer management
    session-service   # Session lifecycle
    message-service   # Real-time chat
    user-service      # Profile & settings
  hooks/              # Custom React hooks
  stores/             # Zustand stores
    request-store     # Request state
    session-store     # Active session
    notification-store # Real-time notifications
  utils/              # Utilities
types/                # TypeScript definitions
  request.ts          # Request types
  offer.ts            # Offer types
  session.ts          # Session types
  user.ts             # User profile
config/               # App configuration
```

---

## Phase 1: MVP Foundation (3 Weeks)

### Week 1: Foundation + Landing + Demo Mode

**Setup & Infrastructure (Days 1-2)**
- Initialize Next.js 15 with TypeScript and App Router
- Configure Tailwind CSS v4 with MicroCollab design tokens (Indigo #6366F1, Mint Green #10B981, Neutral Gray #F9FAFB)
- Install and configure shadcn/ui base components (Button, Card, Input, Dialog, Toast, Badge, Select, Textarea)
- Setup Supabase project and configure authentication (email/magic link)
- Configure ESLint, Prettier, Husky pre-commit hooks
- Create project structure with service layer architecture
- Initialize Vercel project with environment variables (Supabase keys)
- Install Lucide Icons for consistent iconography

**Landing Page (Days 3-4)**
- Hero section with value proposition: "Find help fast. Collaborate smart."
- Tagline with gradient text effect (Inter font): short-term collaboration focus
- CTA buttons: "Find Help Now" (Indigo) and "Offer Help" (Mint Green outline)
- Category highlights: Refactoring, Testing, Design, Architecture cards with icons
- "How It Works" 3-step section: Post Request → Get Offers → Collaborate
- Testimonials section with seeded demo content (avatar, name, role, feedback)
- Footer with GitHub link, tech stack badge, About MicroCollab
- SEO implementation: Metadata API, Open Graph tags, Twitter Cards, robots.txt, sitemap
- Responsive design: mobile-first approach for all breakpoints (375px, 768px, 1920px)
- Accessibility: WCAG 2.1 AA compliance, keyboard navigation, ARIA labels, focus indicators

**Demo Mode Marketplace (Days 5-7)**
- Create mock data service with realistic requests, offers, and sessions (`lib/api/mock/demo-service.ts`)
- Demo dashboard with marketplace activity feed: "3 new requests posted", "5 helpers available"
- Browse requests screen with filter controls (tags, duration, urgency, mode)
- Request cards with preview: title, tags, duration, urgency badge, time posted
- Simulated "Offer Help" flow with modal and fake submission
- Live activity stream: Real-time simulation of offers, acceptances, completed sessions
- Auto-simulation logic: 45-second loop generating marketplace events (new request, offer sent, session started)
- Request details view with fake offers list and acceptance simulation
- "Exit Demo / Sign Up to Post Real Request" banner with pulse effect
- Toast notifications for demo events (indigo: new request, mint: offer accepted)
- Unit tests for mock service and marketplace utilities (Vitest)

---

### Week 2: Core Marketplace Features

**Post Request Flow (Days 8-10)**
- Protected route setup with Supabase Auth middleware (`app/(dashboard)/requests/new/page.tsx`)
- Request form with validation schema (React Hook Form + Zod):
  - Title (required, 10-100 chars): "Need help refactoring a Node.js API"
  - Description (required, 50-1000 chars): detailed problem explanation
  - Tags (required, 1-5 tags): autocomplete from predefined list (React, Node.js, UI/UX, Testing)
  - Estimated Duration (required): 1-4 hours with slider or select
  - Urgency (required): Low / Normal / Critical with badge preview
  - Mode (required): Async chat / Live session toggle
  - Budget (optional): currency selector + hourly/fixed toggle
  - Preferred time/timezone (optional): datetime picker + timezone select
- Form UI with indigo focus rings, mint green success states, error messages
- Tag autocomplete component with keyboard navigation and recent tags
- "Estimated time to find helper" tip based on tags and urgency
- API route: `/api/requests` (POST) calling request service
- Mock request service with CRUD operations and in-memory persistence
- Success flow: Toast notification → Redirect to request details page
- Zustand store for request draft persistence (`lib/stores/request-store.ts`)

**Browse Requests Screen (Days 11-13)**
- Browse interface layout: Filter sidebar + Request cards grid (`app/(dashboard)/browse/page.tsx`)
- Filter controls with Radix UI components:
  - Skills/Tags: Multi-select with checkboxes (React, TypeScript, Python, UI/UX)
  - Duration: Range slider (1-4 hours) with value display
  - Urgency: Checkbox group (Low, Normal, Critical)
  - Mode: Radio group (Async chat, Live session, Any)
  - Sort: Dropdown (Newest, Most Urgent, Best Match)
- Request preview cards with hover glow effect (indigo border):
  - Title (truncated to 60 chars)
  - Tags as badges with icon + text
  - Duration badge with clock icon
  - Urgency badge with color coding (gray, amber, coral)
  - Time posted ("5 minutes ago", "2 hours ago")
  - "Offer Help" button with mint green hover state
- "Offer Help" modal dialog (shadcn/ui Dialog):
  - Short message textarea (required, 20-500 chars): "I can help with this in the next few hours"
  - Availability selector: Date/time picker with timezone display
  - Character count indicator with gradient (gray → mint when valid)
  - Submit button → Creates record in offers table
- Real-time updates preparation: Zustand store for live request list
- API routes: `/api/requests` (GET with filters), `/api/offers` (POST)
- Mock offers service with request association
- Empty state: "No requests match your filters" with illustration
- Loading states: Skeleton cards during fetch

**Request Details + Offer Management (Day 14)**
- Request details page layout (`app/(dashboard)/requests/[id]/page.tsx`)
- Request summary card with gradient background:
  - Title, tags, description (full text)
  - Urgency badge, duration, mode, budget (if provided)
  - Preferred time/timezone
  - Status indicator (Open → In Progress → Completed)
- Helper offers section:
  - List of offers with helper info (avatar, name, rating, message)
  - Offer timestamp and availability
  - "Accept Offer" button (only for request owner)
- Accept offer flow:
  - Confirmation dialog: "Accept [Helper Name]'s offer?"
  - Creates session record, updates request status to "In Progress"
  - Sends notification to helper (preparation for realtime)
  - Redirects to session room
- Requester-only actions: Edit request (if no offers), Delete request
- API routes: `/api/requests/[id]` (GET, PATCH, DELETE), `/api/requests/[id]/offers` (GET)
- Mock session service for offer acceptance

---

### Week 3: Session Room + Dashboard + Profile

**Session Collaboration Room (Days 15-17)**
- Session room layout (`app/(dashboard)/sessions/[id]/page.tsx`)
- Session header with project details:
  - Request title, helper/requester names with avatars
  - Session duration estimate and elapsed timer
  - Status indicator (Active, Paused, Completed)
- Live timer component with play/pause/stop controls (JetBrains Mono):
  - Large timer display with pulsing animation when active
  - Control buttons: Pause (amber), Resume (mint), End Session (coral)
- Embedded chat interface (preparation for Supabase Realtime):
  - Message list with auto-scroll to bottom
  - Message input with send button and enter-to-send
  - Sender identification (You vs. Helper/Requester)
  - Timestamp for each message
  - Typing indicator placeholder
- External tool integration section:
  - "Join Google Meet" button with link input
  - "Open VSCode Live Share" button with session link
  - Copy session details to clipboard
- Session notes textarea (auto-save to Zustand store)
- End session button → Triggers feedback modal
- API routes: `/api/sessions/[id]` (GET, PATCH), `/api/messages` (GET, POST)
- Mock message service with session association

**Feedback & Rating System (Days 18-19)**
- Feedback modal dialog (triggered on session end):
  - Rating selector: 5-star interactive component with hover effects
  - Quick feedback chips: "Helpful", "Expert", "Clear Communication", "Fast Response"
  - Detailed feedback textarea (optional, 10-500 chars)
  - Submit button → Updates session record with feedback
- Rating display component for user profiles and offer cards
- Session completion flow:
  - Mark session as completed
  - Update user ratings (average calculation)
  - Redirect to dashboard with success toast
- API routes: `/api/sessions/[id]/feedback` (POST)
- Mock feedback service with rating aggregation

**Role-Based Dashboard (Days 20-21)**
- Dashboard layout with role detection (`app/(dashboard)/dashboard/page.tsx`)
- **Requester View:**
  - Quick action: "Post New Request" prominent button (indigo, top-right)
  - Posted requests section: Cards with status badges (Open, In Progress, Completed)
  - Active sessions: Cards with timer, helper info, "Join Session" button
  - Session history: List with date, helper name, rating given, "View Details" link
  - Stats summary: Total requests, active sessions, average rating received
- **Helper View:**
  - Availability toggle: "Open to Help Now" switch (mint green when active)
  - Help offers section: Cards with request preview, offer status (Pending, Accepted, Declined)
  - Active sessions: Cards with timer, requester info, "Join Session" button
  - Session history: List with date, requester name, rating received, earnings (if budget)
  - Stats summary: Total offers sent, sessions completed, average rating, total earnings
- **Both Roles View:** (users can be both Requester and Helper)
  - Tabbed interface: "As Requester" / "As Helper" toggle
  - Unified navigation with role-aware menu items
- Real-time notification badge on dashboard items (preparation for Phase 2)
- API routes: `/api/dashboard` (GET with role-based data aggregation)
- Zustand store for dashboard state and notifications

**Profile & Settings (Day 21)**
- Profile page layout (`app/(dashboard)/profile/page.tsx`)
- Profile section:
  - Avatar upload with Supabase Storage (Phase 2, UI only in Phase 1)
  - User info: Name, email (from Supabase Auth), bio textarea
  - Skills/expertise: Multi-select tags (React, Node.js, Python, UI/UX, Testing, Architecture)
  - Timezone selector with autocomplete (moment-timezone list)
  - Role preference: Requester / Helper / Both (radio group)
- Availability settings (Helper role):
  - "Open to Help Now" toggle with status indicator
  - Preferred hours: Weekly schedule grid (optional)
  - Response time commitment: Select (Within 1 hour, Same day, Flexible)
- Notification preferences:
  - Email notifications toggle: New offers, Session reminders, Feedback received
  - In-app notifications toggle (preparation for Phase 2)
- Account management:
  - Change password button (Supabase Auth integration)
  - Export data button (JSON download, UI only in Phase 1)
  - Delete account button in danger zone (coral red card with confirmation)
- API routes: `/api/profile` (GET, PATCH), `/api/profile/avatar` (POST for Phase 2)
- Mock user service with profile CRUD operations

**Phase 1 Final Polish (Day 21)**
- Comprehensive E2E tests with Playwright (critical flows):
  - Demo mode navigation and simulation
  - Post request flow (form validation, submission, redirect)
  - Browse and filter requests
  - Offer help flow (modal, message submission)
  - Request details and offer acceptance
  - Session room interaction and chat simulation
  - Dashboard role switching and data display
  - Profile editing and settings update
- Performance optimization:
  - Lighthouse audit targeting >90 score (Performance, Accessibility, Best Practices, SEO)
  - Image optimization via Next.js Image component
  - Code splitting with dynamic imports for heavy components (Recharts in Phase 2+)
  - Bundle size monitoring with webpack-bundle-analyzer
- SEO audit:
  - Verify all pages have proper metadata and Open Graph tags
  - Generate sitemap.xml via next-sitemap
  - Configure robots.txt for proper crawling
  - Structured data (JSON-LD) for marketplace/organization
- Accessibility testing:
  - WCAG 2.1 AA compliance verification using axe-core
  - Keyboard navigation testing for all interactive elements
  - Focus management with visible focus indicators (indigo ring)
  - Color contrast ratio >4.5:1 verified for all text
  - Screen reader testing with NVDA/VoiceOver
- Responsive design verification:
  - Test on mobile (375px), tablet (768px), desktop (1920px)
  - Touch target sizes ≥44px for mobile
  - Horizontal scrolling prevention
- Production deployment to Vercel:
  - Environment variables configuration
  - Custom domain setup (optional)
  - Preview deployments for PRs
- README creation:
  - Project overview with live demo link
  - Tech stack documentation
  - Setup instructions for local development
  - Screenshots of key features
  - Contribution guidelines

---

## Phase 2: Real-time Integration + Advanced Features (2 Weeks)

### Week 4: Supabase Realtime Integration

**Database Setup (Days 1-2)**
- Create Supabase project and configure database schema:
  - **users** table: id, email, name, bio, skills[], timezone, role, rating, avatar_url, availability_status, created_at
  - **requests** table: id, title, description, tags[], duration_hours, urgency, mode, budget, status, created_by, created_at, updated_at
  - **offers** table: id, request_id, offered_by, message, proposed_time, status, created_at
  - **sessions** table: id, request_id, helper_id, requester_id, start_time, end_time, status, created_at
  - **messages** table: id, session_id, sender_id, text, created_at
  - **notifications** table: id, user_id, type, content, read, created_at
- Implement Row Level Security (RLS) policies:
  - Users can only read/update their own profile
  - Requests visible to all authenticated users
  - Offers visible to request owner and offer sender
  - Sessions visible to participants only
  - Messages visible to session participants only
  - Notifications visible to owner only
- Setup Supabase client in `lib/api/supabase/client.ts` with environment variables
- Create database types generation: `supabase gen types typescript`
- Database indexes for performance: request tags, offer request_id, message session_id

**Service Layer Swap (Days 3-4)**
- Create Supabase service implementations matching mock service interfaces:
  - `lib/api/supabase/request-service.ts`
  - `lib/api/supabase/offer-service.ts`
  - `lib/api/supabase/session-service.ts`
  - `lib/api/supabase/message-service.ts`
  - `lib/api/supabase/user-service.ts`
- Replace mock services with Supabase services in API routes (zero UI changes due to interface)
- Environment variable toggle for mock vs. real data: `USE_MOCK_DATA=false`
- Data migration utilities: Export mock data, transform to Supabase format, import
- Integration testing with real database (separate test database on Supabase)
- Error handling for network failures and database errors
- Query optimization: Use Supabase query builder efficiently, minimize round trips

**Real-time Subscriptions (Day 5)**
- Implement Supabase Realtime channels for live updates:
  - Browse requests: Subscribe to `requests` table changes (INSERT, UPDATE)
  - Request details: Subscribe to `offers` table changes for specific request
  - Session room: Subscribe to `messages` table changes for specific session
  - Dashboard: Subscribe to user-specific notifications
- Create custom hooks for real-time subscriptions:
  - `useRealtimeRequests()`: Live request list updates
  - `useRealtimeOffers(requestId)`: Live offer updates for request
  - `useRealtimeMessages(sessionId)`: Live chat messages
  - `useRealtimeNotifications()`: User notification stream
- Update components to use real-time hooks
- Optimistic UI updates with Zustand: Immediate feedback before server confirmation
- Connection status indicator: Online/Offline badge with retry logic
- Performance testing: Verify real-time latency <500ms for typical updates

### Week 5: Notifications + Advanced Features

**Notification System (Days 1-2)**
- In-app notification center:
  - Notification bell icon in header with unread count badge
  - Dropdown panel with notification list (shadcn/ui Dropdown Menu)
  - Notification types: New offer, Offer accepted, Session starting, Feedback received
  - Mark as read functionality
  - "View all notifications" link to dedicated page
- Real-time notification delivery via Supabase Realtime
- Zustand notification store with persistent unread count
- Toast notifications for high-priority events (indigo for info, mint for success)
- API routes: `/api/notifications` (GET, PATCH for mark as read)
- Email notifications (optional, using Supabase Edge Functions + SendGrid):
  - New offer received (for requesters)
  - Offer accepted (for helpers)
  - Session reminder (15 minutes before preferred time)
  - Feedback received (for both parties)

**Advanced Filtering & Search (Days 3-4)**
- Enhanced browse functionality:
  - Full-text search in request titles and descriptions (Supabase FTS)
  - Tag-based search with autocomplete and suggestions
  - Saved filter presets: "My Skills", "Urgent Requests", "Live Sessions Only"
  - Sort options: Relevance (search-based), Newest, Highest Budget, Best Match
- Request matching algorithm (simple version):
  - Match helper skills with request tags (weighted score)
  - Prioritize urgent requests for available helpers
  - Consider timezone compatibility for live sessions
- "Suggested for You" section on dashboard (helpers):
  - Display requests matching helper's skills
  - Consider availability status and past session history
- API routes: `/api/search` (GET with full-text query), `/api/suggestions` (GET)

**UI/UX Enhancements (Day 5)**
- Loading states and skeleton screens:
  - Request cards skeleton during fetch
  - Chat message loading spinner
  - Dashboard stats shimmer effect
- Error boundaries and fallbacks:
  - Catch component errors and display friendly message
  - Retry mechanism for failed requests
  - Offline mode detection with user guidance
- Animations with Framer Motion:
  - Request card entrance animations (stagger effect)
  - Modal slide-in transitions
  - Notification toast animations
  - Session timer pulse effect
- Dark mode support (optional):
  - Next Themes integration with system preference detection
  - Dark color palette: Deep indigo, dark cyan, charcoal backgrounds
  - Theme toggle in profile settings
- Accessibility improvements:
  - Enhanced keyboard navigation for filters and modals
  - Improved screen reader announcements for live updates
  - Focus trap in modal dialogs

---

## Phase 3: Advanced Features (Future, Optional)

### Payment Integration (2 weeks)
- Stripe Connect integration for marketplace payments:
  - Stripe Connect account creation for helpers (onboarding flow)
  - Payment intent creation on session acceptance
  - Escrow system: Hold payment until session completion
  - Automatic payout to helper after successful feedback
  - Platform fee deduction (e.g., 10% commission)
- Pricing configuration:
  - Helper-set hourly rates in profile settings
  - Request-specific budget display and negotiation
  - Currency support (USD, EUR, GBP)
- Payment dashboard:
  - Transaction history for requesters and helpers
  - Earnings overview with charts (Recharts)
  - Payout settings and bank account connection
- Invoice generation and email delivery
- Refund policy and dispute resolution UI (manual process)

### External Integrations (1 week)
- GitHub integration:
  - OAuth connection in profile settings
  - Repository link attachment to requests
  - Commit access for helpers (if authorized)
  - Session summary posted as GitHub issue comment
- Slack integration:
  - Workspace connection for team accounts
  - Notification delivery to Slack channel
  - Quick session start via Slack commands
  - Session summary posted to team channel
- Google Calendar integration:
  - Sync session times with calendar
  - Automatic event creation on offer acceptance
  - Calendar invite sent to both parties

### Team & Enterprise Features (2 weeks)
- Team accounts:
  - Organization profiles with multiple members
  - Team request posting (any member can post)
  - Shared budget pool and payment method
  - Team dashboard with aggregated analytics
- Helper teams:
  - Multiple helpers collaborate on single request
  - Shared session room with multi-party chat
  - Split earnings between helpers
- Admin panel for team owners:
  - Member management (invite, remove, role assignment)
  - Spending limits and approval workflows
  - Team analytics and reporting

### Advanced Analytics (1 week)
- Requester analytics:
  - Request success rate (% accepted within 24 hours)
  - Average time to first offer
  - Most requested topics (tag frequency)
  - Session duration trends
  - Budget efficiency (value per hour)
- Helper analytics:
  - Offer acceptance rate (% of offers leading to sessions)
  - Session completion rate
  - Average rating trend over time
  - Earnings breakdown by skill/tag
  - Peak activity hours (when most offers sent)
- Platform analytics (admin view):
  - Total GMV (Gross Marketplace Volume)
  - Active users (DAU, WAU, MAU)
  - Request → Session conversion funnel
  - Top helpers and requesters (leaderboard)
  - Category trends (which skills most in demand)
- Data visualization with Recharts:
  - Line charts for trends over time
  - Donut charts for category breakdown
  - Bar charts for comparative metrics

---

## Quality Standards (Applied Every Phase)

### 🎨 UI Excellence & Component Standards (CRITICAL - Every Phase)

**UI First Principles:**
- ✨ **Polish is Priority** - Every component must be visually perfect before moving forward
- 📱 **Mobile-First Responsive** - All UI must work flawlessly on 375px → 1920px
- 🎯 **Micro-interactions** - Hover states, transitions, loading states, empty states
- 🌈 **Gradient Consistency** - Use brand gradients (Indigo→Pink→Orange) consistently
- 💫 **Glow Effects** - Pink/emerald glows on interactive elements for premium feel
- 🎭 **Glass Morphism** - Apply glass-card utility for depth and modern aesthetic

**Component Architecture:**
- 📦 **Atomic Design** - Atoms → Molecules → Organisms → Templates → Pages
- 🔧 **Single Responsibility** - Each component does ONE thing exceptionally well
- 🧩 **Composition Over Props** - Use children and slots, avoid prop drilling
- 🎨 **Styled Components** - Tailwind utilities only, no inline styles except dynamic values
- 📏 **Max 150 Lines** - If component exceeds 150 lines, split into smaller components
- 🔄 **Reusability** - Write components to be used across multiple contexts

**Component Structure Template:**
```tsx
// components/features/example/example-card.tsx
import { cn } from "@/lib/utils";

interface ExampleCardProps {
  title: string;
  className?: string;
  children?: React.ReactNode;
}

export function ExampleCard({ title, className, children }: ExampleCardProps) {
  return (
    <div className={cn("glass-card rounded-lg p-6", className)}>
      <h3 className="gradient-text font-display text-2xl font-bold">{title}</h3>
      {children}
    </div>
  );
}
```

**Responsive Design Standards:**
- 📱 **Mobile** (375px-767px): Single column, touch-friendly (44px targets), hamburger menu
- 💻 **Tablet** (768px-1023px): Two columns, hybrid navigation, optimized spacing
- 🖥️ **Desktop** (1024px+): Multi-column grids, full navigation, hover states
- 🎯 **Breakpoint Strategy**: `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px)

**Code Quality:** TypeScript strict mode enabled | ESLint rules enforced via Husky pre-commit hooks | Single Responsibility Principle for components and services | Reusable component architecture | Clear naming conventions (camelCase for functions/variables, PascalCase for components/types) | No `any` types allowed (use `unknown` with type guards if necessary) | Comprehensive JSDoc comments for complex business logic | Consistent file organization (index.ts exports, co-location of tests) | Max 150 lines per component file

**Testing:** 80%+ code coverage target | Unit tests (Vitest) for utilities, services, and hooks | Integration tests for API routes with database mocking | E2E tests (Playwright) for critical user flows: demo mode, post request, browse/filter, offer help, accept offer, session room interaction, chat messaging, dashboard navigation, profile editing | Component tests with React Testing Library for interactive UI | Accessibility tests in E2E suite using axe-core | Visual regression testing for key pages (optional: Percy/Chromatic)

**Performance:** Lighthouse score >90 for all metrics (Performance, Accessibility, Best Practices, SEO) | First Contentful Paint (FCP) <1.5s on 4G network | Time to Interactive (TTI) <3s | Largest Contentful Paint (LCP) <2.5s | Cumulative Layout Shift (CLS) <0.1 | Bundle size monitoring with webpack-bundle-analyzer | Code splitting with dynamic imports for heavy components (Recharts, Framer Motion) | Image optimization via Next.js Image component with WebP format | Database query optimization with proper indexing | Real-time subscription management (cleanup on unmount)

**SEO:** Semantic HTML5 structure with proper heading hierarchy | Next.js Metadata API on all pages with unique titles and descriptions | Open Graph tags for social media sharing | Twitter Card meta tags | Auto-generated sitemap.xml via next-sitemap package | robots.txt configuration for proper crawling (allow all public pages) | Structured data (JSON-LD) for marketplace, organization, and product pages | Canonical URLs to prevent duplicate content | Alt text for all images | Fast page load times for better ranking

**Accessibility:** WCAG 2.1 AA compliance minimum (target AAA where feasible) | Keyboard navigation for all interactive elements (Tab, Enter, Escape, Arrow keys) | ARIA labels and roles for semantic meaning | Landmark regions (header, main, nav, footer) | Focus management with visible focus indicators (indigo ring, 2px offset) | Color contrast ratio >4.5:1 for normal text, >3:1 for large text | Screen reader testing with NVDA (Windows) and VoiceOver (macOS/iOS) | Skip to main content link | Form labels and error announcements | Live region announcements for dynamic content (chat messages, notifications) | Touch target sizes ≥44px for mobile | No motion for users with `prefers-reduced-motion`

---

## Todo: Phase 1A Kickoff (Week 1, Days 1-2)

### Project Initialization
- [ ] Run `npx create-next-app@latest microcollab --typescript --tailwind --app`
- [ ] Initialize Git repository: `git init && git add . && git commit -m "Initial commit: MicroCollab project setup"`
- [ ] Create GitHub repository "microcollab" and push code: `git remote add origin <url> && git push -u origin main`
- [ ] Install core dependencies: `npm install zustand react-hook-form zod lucide-react framer-motion @supabase/supabase-js @supabase/auth-helpers-nextjs`
- [ ] Run `npx shadcn-ui@latest init` and configure with MicroCollab theme (Indigo/Mint Green palette)
- [ ] Create `.env.local` with placeholder environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Tailwind Configuration
- [ ] Update `tailwind.config.ts` with MicroCollab design tokens:
  - **Primary Colors:** indigo-500 (#6366F1), indigo-600 (#4F46E5), indigo-700 (#4338CA)
  - **Accent Colors:** mint-500 (#10B981), mint-600 (#059669), coral-500 (#FF6B6B), amber-500 (#FFD93D)
  - **Neutral Colors:** gray-50 (#F9FAFB), gray-100 (#F3F4F6), gray-800 (#1F2937), gray-900 (#111827)
  - **Fonts:** Inter (sans), JetBrains Mono (mono)
- [ ] Test design tokens by creating sample button variants in Storybook or test page
- [ ] Configure dark mode support: `darkMode: 'class'` in Tailwind config
- [ ] Add custom animations: `pulse-slow`, `slide-in`, `fade-in` for marketplace interactions

### Supabase Setup
- [ ] Create Supabase project at supabase.com (select free tier, choose region closest to target users)
- [ ] Copy project URL and anon key to `.env.local`
- [ ] Create initial database schema in Supabase SQL Editor (users, requests, offers tables - basic structure)
- [ ] Enable email authentication in Supabase Auth settings (magic link + password)
- [ ] Configure email templates for authentication (welcome, password reset)
- [ ] Test Supabase connection: Create test client in `lib/api/supabase/client.ts` and verify auth

### shadcn/ui Component Installation
- [ ] Install base components: `npx shadcn-ui@latest add button card input dialog toast badge select textarea`
- [ ] Install form components: `npx shadcn-ui@latest add form label checkbox radio-group slider`
- [ ] Install utility components: `npx shadcn-ui@latest add dropdown-menu avatar skeleton separator`
- [ ] Customize component variants in `components/ui/` to match MicroCollab design (indigo primary, mint success)
- [ ] Create component preview page: `app/components-preview/page.tsx` to verify all installed components

### Project Structure Setup
- [ ] Create folder structure as defined in Architecture Overview (app routes, components, lib, types, config)
- [ ] Create base layout component: `components/layout/main-layout.tsx` with header and footer
- [ ] Create navigation component: `components/layout/navigation.tsx` with role-aware menu items
- [ ] Setup route groups: `app/(marketing)`, `app/(dashboard)`, `app/demo`
- [ ] Create TypeScript types: `types/request.ts`, `types/offer.ts`, `types/session.ts`, `types/user.ts`, `types/message.ts`
- [ ] Create barrel exports: `index.ts` files in major folders for clean imports

### Development Environment
- [ ] Configure ESLint: Extend Next.js config with strict TypeScript rules, add import sorting plugin
- [ ] Configure Prettier: Create `.prettierrc` with tab width 2, single quotes, semicolons, Tailwind class sorting
- [ ] Install Husky: `npx husky-init && npm install`
- [ ] Add pre-commit hook: `npx husky add .husky/pre-commit "npm run lint && npm run type-check"`
- [ ] Create npm scripts in `package.json`:
  - `"dev": "next dev -p 3003"` (avoid port conflicts with CodePulse)
  - `"build": "next build"`
  - `"start": "next start"`
  - `"lint": "next lint"`
  - `"format": "prettier --write ."`
  - `"type-check": "tsc --noEmit"`
  - `"test": "vitest"`
  - `"test:e2e": "playwright test"`

### Vercel Deployment Setup
- [ ] Create Vercel project at vercel.com and link to GitHub repository
- [ ] Add environment variables in Vercel dashboard:
  - `NEXT_PUBLIC_SUPABASE_URL` (from Supabase project settings)
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (from Supabase project settings)
  - `SUPABASE_SERVICE_ROLE_KEY` (for server-side operations, Phase 2)
- [ ] Configure deployment settings: Auto-deploy on push to `main`, preview deployments on PRs
- [ ] Deploy initial version and verify successful deployment (blank Next.js app)
- [ ] Setup custom domain (optional): Configure DNS A/CNAME records, verify in Vercel
- [ ] Test deployment: Visit live URL and check for SSL certificate, proper routing

### Testing Infrastructure
- [ ] Install Vitest: `npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom`
- [ ] Create `vitest.config.ts` with React plugin and jsdom environment configuration
- [ ] Create `lib/utils/test-utils.tsx`: Custom render function with providers (Zustand, React Hook Form)
- [ ] Install Playwright: `npm install -D @playwright/test`
- [ ] Run `npx playwright install` to install browsers (Chromium, Firefox, WebKit)
- [ ] Create `playwright.config.ts` with base URL `http://localhost:3003` and test directory `e2e/`
- [ ] Create sample unit test: `lib/utils/format-duration.test.ts` (test time formatting utility)
- [ ] Create sample E2E test: `e2e/landing.spec.ts` (test landing page loads, CTA buttons visible)
- [ ] Install axe-core for accessibility testing: `npm install -D @axe-core/playwright`

### Mock Data Service Foundation
- [ ] Create mock data types in `types/mock-data.ts` (demo requests, offers, sessions, users)
- [ ] Create mock data generator: `lib/mock/data/generators.ts` with @faker-js/faker integration
- [ ] Install Tanstack Query: `npm install @tanstack/react-query @tanstack/react-query-devtools`
- [ ] Create storage utility: `lib/mock/utils/storage.ts` (type-safe localStorage wrapper)
- [ ] Create delay utility: `lib/mock/utils/delay.ts` (simulate network latency 100-300ms)
- [ ] Create service interfaces: `lib/services/types.ts` with interface definitions for all services
- [ ] Create mock request service: `lib/mock/services/mock-request-service.ts` with localStorage CRUD
- [ ] Create mock offer service: `lib/mock/services/mock-offer-service.ts` with localStorage CRUD
- [ ] Create mock session service: `lib/mock/services/mock-session-service.ts` with localStorage CRUD
- [ ] Create mock user service: `lib/mock/services/mock-user-service.ts` with localStorage CRUD
- [ ] Create mock message service: `lib/mock/services/mock-message-service.ts` with localStorage CRUD
- [ ] Create service selectors: `lib/services/request-service.ts` (exports mock or real based on env)
- [ ] Create Tanstack Query hooks: `lib/hooks/queries/use-requests.ts`, `use-create-request.ts`, etc.
- [ ] Create auth store: `lib/stores/auth-store.ts` with Zustand persist middleware
- [ ] Create notification store: `lib/stores/notification-store.ts` with Zustand persist middleware
- [ ] Create Tanstack Query provider: `app/providers.tsx` with QueryClientProvider
- [ ] Test mock services: Unit tests verifying localStorage CRUD operations work correctly
- [ ] Test Tanstack Query hooks: Hook tests with React Testing Library

---

## 📚 Implementation Reference

**🎯 ALWAYS FOLLOW:** [@MicroCollabUIPlan.md](./MicroCollabUIPlan.md) for detailed architecture patterns

**Key Principles:**
1. **Never access services directly from components** → Always use Tanstack Query hooks
2. **All state persistence via Zustand + localStorage** → No useState for global state
3. **Service interfaces match real API contracts** → Type-safe migration path
4. **Simulate network delays in mock services** → Realistic loading states
5. **Optimistic updates for all mutations** → Smooth UX without backend

**Migration Checklist (Future):**
- [ ] Create real API services implementing service interfaces
- [ ] Change `NEXT_PUBLIC_USE_MOCK=false` in `.env.local`
- [ ] Verify all Tanstack Query hooks work with real APIs
- [ ] Test error handling with real network failures
- [ ] Deploy to production with Supabase backend

---

**Ready to begin Phase 1A implementation!** 🚀

**Next step:** Initialize Next.js project and configure mock-first architecture following [@MicroCollabUIPlan.md](./MicroCollabUIPlan.md).
