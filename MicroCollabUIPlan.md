# MicroCollab UI-First Development Plan
**Version:** 1.0
**Last Updated:** 2025-01-11
**Focus:** Mock-first architecture with localStorage persistence, Zustand state management, and Tanstack Query for seamless API migration

---

## Architecture Philosophy

**UI-First Principle:** Build complete UI with realistic mock data using localStorage/IndexedDB persistence, ensuring zero UI changes when swapping to real APIs.

**Key Technologies:**
- **Zustand**: Global state management with persistence middleware
- **Tanstack Query**: Data fetching abstraction layer (mock → real API)
- **localStorage/IndexedDB**: Client-side data persistence via Zustand middleware
- **Mock Services**: Interface-based services matching future API contracts
- **React Hook Form + Zod**: Form validation (UI-independent)

---

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        COMPONENT LAYER                          │
│  (React components, pages, UI - NO direct state access)        │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    TANSTACK QUERY HOOKS                         │
│  useRequests(), useCreateRequest(), useOffers(), etc.           │
│  - Caching, refetching, optimistic updates                      │
│  - Returns { data, isLoading, error, mutate }                   │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      SERVICE LAYER                               │
│  requestService.getAll(), offerService.create(), etc.           │
│  - Interface definitions (same for mock + real API)             │
│  - Type-safe contracts                                           │
└────────────────────────┬────────────────────────────────────────┘
                         │
                    ┌────┴────┐
                    │         │
                    ▼         ▼
         ┌──────────────┐  ┌──────────────┐
         │ MOCK SERVICE │  │ API SERVICE  │
         │ (Phase 1-3)  │  │ (Phase 4+)   │
         │              │  │              │
         │ - localStorage│  │ - fetch API  │
         │ - Zustand    │  │ - Supabase   │
         │ - Fake delays│  │ - Real auth  │
         └──────┬───────┘  └──────┬───────┘
                │                 │
                ▼                 ▼
         ┌──────────────┐  ┌──────────────┐
         │ LOCAL STORAGE│  │  SUPABASE DB │
         │  + Zustand   │  │   + Realtime │
         └──────────────┘  └──────────────┘
```

**Migration Path:** Change ONE environment variable → All Tanstack Query hooks use real API → Zero UI changes required

---

## Phase 1: Foundation + Mock Infrastructure (Week 1)

### Day 1-2: Setup Mock Architecture

**Install Dependencies:**
```bash
npm install zustand @tanstack/react-query @tanstack/react-query-devtools
npm install @faker-js/faker date-fns nanoid
npm install react-hook-form @hookform/resolvers zod
```

**File Structure:**
```
lib/
  mock/
    data/
      seed-data.ts              # Initial seed data (10 users, 20 requests, 15 offers)
      generators.ts             # Faker-based data generators
    services/
      mock-request-service.ts   # Request CRUD with localStorage
      mock-offer-service.ts     # Offer CRUD with localStorage
      mock-session-service.ts   # Session CRUD with localStorage
      mock-user-service.ts      # User CRUD with localStorage
      mock-message-service.ts   # Message CRUD with localStorage
    utils/
      storage.ts                # localStorage wrapper with type safety
      delay.ts                  # Simulate network delays (100-300ms)

  services/
    types.ts                    # Service interface definitions
    request-service.ts          # Exports mock or real service based on env
    offer-service.ts
    session-service.ts
    user-service.ts
    message-service.ts

  stores/
    auth-store.ts               # Auth state (mock user, role)
    request-store.ts            # Request list cache (Zustand + persist)
    session-store.ts            # Active session state
    notification-store.ts       # Notification queue
    ui-store.ts                 # Modal states, loading states

  hooks/
    queries/
      use-requests.ts           # Tanstack Query: useQuery for requests
      use-request.ts            # Tanstack Query: useQuery for single request
      use-create-request.ts     # Tanstack Query: useMutation
      use-offers.ts
      use-create-offer.ts
      use-sessions.ts
      use-messages.ts
      use-profile.ts

    auth/
      use-auth.ts               # Auth hook using auth-store
      use-require-auth.ts       # Protected route hook
```

**Key Implementation Details:**

**1. Storage Utility (`lib/mock/utils/storage.ts`):**
```typescript
// Type-safe localStorage wrapper
export const storage = {
  get: <T>(key: string): T | null => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  set: <T>(key: string, value: T): void => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove: (key: string): void => {
    localStorage.removeItem(key);
  },
  clear: (): void => {
    localStorage.clear();
  }
};

// Storage keys
export const STORAGE_KEYS = {
  REQUESTS: 'microcollab:requests',
  OFFERS: 'microcollab:offers',
  SESSIONS: 'microcollab:sessions',
  MESSAGES: 'microcollab:messages',
  USERS: 'microcollab:users',
  AUTH: 'microcollab:auth',
  NOTIFICATIONS: 'microcollab:notifications'
} as const;
```

**2. Service Interface (`lib/services/types.ts`):**
```typescript
export interface RequestService {
  getAll(filters?: RequestFilters): Promise<Request[]>;
  getById(id: string): Promise<Request | null>;
  create(data: CreateRequestDto): Promise<Request>;
  update(id: string, data: UpdateRequestDto): Promise<Request>;
  delete(id: string): Promise<void>;
  getMyRequests(userId: string): Promise<Request[]>;
}

export interface OfferService {
  getByRequestId(requestId: string): Promise<Offer[]>;
  create(data: CreateOfferDto): Promise<Offer>;
  accept(offerId: string): Promise<Session>;
  decline(offerId: string): Promise<void>;
  getMyOffers(userId: string): Promise<Offer[]>;
}

// Similar interfaces for SessionService, MessageService, UserService
```

**3. Mock Request Service (`lib/mock/services/mock-request-service.ts`):**
```typescript
import { storage, STORAGE_KEYS } from '../utils/storage';
import { delay } from '../utils/delay';
import { RequestService } from '@/lib/services/types';
import { nanoid } from 'nanoid';

export const mockRequestService: RequestService = {
  async getAll(filters) {
    await delay(150); // Simulate network
    const requests = storage.get<Request[]>(STORAGE_KEYS.REQUESTS) || [];

    // Apply filters
    let filtered = requests;
    if (filters?.tags?.length) {
      filtered = filtered.filter(r =>
        r.tags.some(tag => filters.tags!.includes(tag))
      );
    }
    if (filters?.urgency) {
      filtered = filtered.filter(r => r.urgency === filters.urgency);
    }
    // ... more filters

    return filtered;
  },

  async getById(id) {
    await delay(100);
    const requests = storage.get<Request[]>(STORAGE_KEYS.REQUESTS) || [];
    return requests.find(r => r.id === id) || null;
  },

  async create(data) {
    await delay(200);
    const requests = storage.get<Request[]>(STORAGE_KEYS.REQUESTS) || [];
    const newRequest: Request = {
      id: nanoid(),
      ...data,
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    requests.push(newRequest);
    storage.set(STORAGE_KEYS.REQUESTS, requests);
    return newRequest;
  },

  // ... update, delete, getMyRequests
};
```

**4. Service Selector (`lib/services/request-service.ts`):**
```typescript
import { mockRequestService } from '@/lib/mock/services/mock-request-service';
import { apiRequestService } from '@/lib/api/services/api-request-service'; // Phase 4+

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export const requestService = USE_MOCK ? mockRequestService : apiRequestService;
```

**5. Tanstack Query Hook (`lib/hooks/queries/use-requests.ts`):**
```typescript
import { useQuery } from '@tanstack/react-query';
import { requestService } from '@/lib/services/request-service';
import { RequestFilters } from '@/types/request';

export function useRequests(filters?: RequestFilters) {
  return useQuery({
    queryKey: ['requests', filters],
    queryFn: () => requestService.getAll(filters),
    staleTime: 30000, // 30 seconds
    refetchOnWindowFocus: true
  });
}

export function useRequest(id: string) {
  return useQuery({
    queryKey: ['requests', id],
    queryFn: () => requestService.getById(id),
    enabled: !!id
  });
}
```

**6. Mutation Hook (`lib/hooks/queries/use-create-request.ts`):**
```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { requestService } from '@/lib/services/request-service';
import { CreateRequestDto } from '@/types/request';
import { toast } from 'sonner';

export function useCreateRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRequestDto) => requestService.create(data),
    onSuccess: (newRequest) => {
      // Invalidate requests list to refetch
      queryClient.invalidateQueries({ queryKey: ['requests'] });

      // Optimistically add to cache
      queryClient.setQueryData(['requests', newRequest.id], newRequest);

      toast.success('Request posted successfully!');
    },
    onError: (error) => {
      toast.error('Failed to post request');
      console.error(error);
    }
  });
}
```

**7. Auth Store (`lib/stores/auth-store.ts`):**
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (email) => {
        // Mock login - create fake user
        const mockUser: User = {
          id: nanoid(),
          email,
          name: 'Demo User',
          role: 'both',
          skills: ['React', 'TypeScript'],
          timezone: 'America/New_York',
          rating: 4.8,
          sessionsCompleted: 12,
          createdAt: new Date().toISOString()
        };
        set({ user: mockUser, isAuthenticated: true });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateProfile: (data) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null
        }));
      }
    }),
    {
      name: 'microcollab-auth'
    }
  )
);
```

**8. Component Usage (`app/(dashboard)/browse/page.tsx`):**
```typescript
'use client';

import { useRequests } from '@/lib/hooks/queries/use-requests';
import { RequestCard } from '@/components/features/request/request-card';
import { RequestFilters } from '@/components/features/request/request-filters';
import { useState } from 'react';

export default function BrowsePage() {
  const [filters, setFilters] = useState<RequestFilters>({});
  const { data: requests, isLoading, error } = useRequests(filters);

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorState error={error} />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <aside className="lg:col-span-1">
        <RequestFilters filters={filters} onChange={setFilters} />
      </aside>

      <main className="lg:col-span-3">
        <div className="grid gap-4">
          {requests?.map(request => (
            <RequestCard key={request.id} request={request} />
          ))}
        </div>
      </main>
    </div>
  );
}
```

---

## Phase 2: Core UI Features (Week 2)

### Day 3-5: Post Request + Browse + Filters

**Features:**
- ✅ Post request form with React Hook Form + Zod validation
- ✅ Browse requests page with Tanstack Query
- ✅ Filter sidebar (tags, urgency, duration, mode)
- ✅ Request cards with hover effects and animations
- ✅ Empty states and loading skeletons
- ✅ Toast notifications on create/error

**Key Files:**
- `app/(dashboard)/requests/new/page.tsx` - Post request form
- `app/(dashboard)/browse/page.tsx` - Browse interface
- `components/features/request/request-form.tsx` - Form component
- `components/features/request/request-card.tsx` - Card component
- `components/features/request/request-filters.tsx` - Filter sidebar
- `lib/hooks/queries/use-create-request.ts` - Mutation hook
- `lib/validations/request-schema.ts` - Zod schema

### Day 6-7: Request Details + Offers

**Features:**
- ✅ Request details page with full description
- ✅ Offer list component
- ✅ "Offer Help" modal with form
- ✅ Accept/decline offer actions
- ✅ Optimistic updates with Tanstack Query
- ✅ Session creation on offer acceptance

**Key Files:**
- `app/(dashboard)/requests/[id]/page.tsx` - Details page
- `components/features/offer/offer-modal.tsx` - Offer submission
- `components/features/offer/offer-card.tsx` - Offer display
- `lib/hooks/queries/use-offers.ts` - Offers query
- `lib/hooks/queries/use-create-offer.ts` - Offer mutation
- `lib/hooks/queries/use-accept-offer.ts` - Accept mutation

---

## Phase 3: Session + Dashboard + Profile (Week 3)

### Day 8-10: Session Collaboration Room

**Features:**
- ✅ Session room with real-time chat simulation
- ✅ Timer component with play/pause/stop
- ✅ Message list with auto-scroll
- ✅ Message input with optimistic updates
- ✅ Session notes with auto-save (Zustand)
- ✅ External tool links (Meet, VS Code Live Share)

**Key Files:**
- `app/(dashboard)/sessions/[id]/page.tsx` - Session room
- `components/features/session/session-timer.tsx` - Timer
- `components/features/session/chat-interface.tsx` - Chat
- `components/features/session/session-notes.tsx` - Notes
- `lib/hooks/queries/use-messages.ts` - Messages query
- `lib/hooks/queries/use-send-message.ts` - Message mutation
- `lib/stores/session-store.ts` - Session state

**Real-time Simulation:**
```typescript
// lib/mock/services/mock-message-service.ts
export const mockMessageService: MessageService = {
  async send(sessionId, data) {
    await delay(100);
    const messages = storage.get<Message[]>(STORAGE_KEYS.MESSAGES) || [];
    const newMessage = {
      id: nanoid(),
      sessionId,
      ...data,
      createdAt: new Date().toISOString()
    };
    messages.push(newMessage);
    storage.set(STORAGE_KEYS.MESSAGES, messages);

    // Trigger refetch via window event (simulates real-time)
    window.dispatchEvent(new CustomEvent('message:new', {
      detail: newMessage
    }));

    return newMessage;
  }
};

// In component - listen to custom events
useEffect(() => {
  const handleNewMessage = () => {
    queryClient.invalidateQueries(['messages', sessionId]);
  };

  window.addEventListener('message:new', handleNewMessage);
  return () => window.removeEventListener('message:new', handleNewMessage);
}, [sessionId]);
```

### Day 11-12: Dashboard

**Features:**
- ✅ Role-based dashboard (Requester/Helper/Both)
- ✅ Stats cards with gradient backgrounds
- ✅ Active sessions list
- ✅ Posted requests (Requester view)
- ✅ Sent offers (Helper view)
- ✅ Session history with ratings
- ✅ Quick actions (Post Request, Browse)

**Key Files:**
- `app/(dashboard)/dashboard/page.tsx` - Main dashboard
- `components/features/dashboard/stats-cards.tsx` - Stats
- `components/features/dashboard/active-sessions.tsx` - Sessions list
- `components/features/dashboard/request-list.tsx` - Requests
- `components/features/dashboard/offer-list.tsx` - Offers
- `lib/hooks/queries/use-dashboard.ts` - Dashboard data aggregation

### Day 13-14: Profile + Feedback

**Features:**
- ✅ Profile editor with form validation
- ✅ Skills multi-select with tags
- ✅ Timezone selector
- ✅ Availability toggle (Helper role)
- ✅ Session history with feedback
- ✅ Feedback modal (5-star rating + text)
- ✅ Rating display component

**Key Files:**
- `app/(dashboard)/profile/page.tsx` - Profile page
- `components/features/profile/profile-form.tsx` - Profile editor
- `components/features/session/feedback-modal.tsx` - Feedback form
- `components/ui/rating.tsx` - Star rating component
- `lib/hooks/queries/use-profile.ts` - Profile query
- `lib/hooks/queries/use-update-profile.ts` - Profile mutation

---

## Phase 4: Polish + Testing (Week 4)

### Day 15-16: Notifications + Activity Feed

**Features:**
- ✅ Notification center (bell icon + dropdown)
- ✅ Notification types (new offer, accepted, session start, feedback)
- ✅ Unread count badge
- ✅ Mark as read functionality
- ✅ Toast notifications for real-time events
- ✅ Activity feed on dashboard

**Implementation:**
```typescript
// lib/stores/notification-store.ts
export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,

      addNotification: (notification) => {
        set((state) => ({
          notifications: [notification, ...state.notifications],
          unreadCount: state.unreadCount + 1
        }));

        // Show toast
        toast.info(notification.content);
      },

      markAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
          ),
          unreadCount: Math.max(0, state.unreadCount - 1)
        }));
      },

      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map(n => ({ ...n, read: true })),
          unreadCount: 0
        }));
      }
    }),
    { name: 'microcollab-notifications' }
  )
);
```

### Day 17-18: Advanced Filtering + Search

**Features:**
- ✅ Full-text search in title/description
- ✅ Tag autocomplete with suggestions
- ✅ Saved filter presets
- ✅ Sort options (Newest, Urgent, Best Match)
- ✅ "Suggested for You" (match skills)
- ✅ Filter persistence in URL params

**Key Files:**
- `components/features/request/advanced-filters.tsx` - Enhanced filters
- `components/features/request/search-bar.tsx` - Search input
- `lib/hooks/use-search-params.ts` - URL state sync
- `lib/mock/utils/search.ts` - Client-side search logic

### Day 19-20: Loading States + Animations

**Features:**
- ✅ Skeleton loaders for all data states
- ✅ Loading spinners for actions
- ✅ Framer Motion animations (stagger, fade, slide)
- ✅ Empty states with illustrations
- ✅ Error boundaries with retry
- ✅ Offline detection

**Key Files:**
- `components/ui/skeleton.tsx` - Skeleton components
- `components/ui/loading-spinner.tsx` - Spinner
- `components/ui/empty-state.tsx` - Empty state
- `components/ui/error-boundary.tsx` - Error boundary
- `lib/hooks/use-online-status.ts` - Offline detection

### Day 21: Testing + Documentation

**Testing:**
- ✅ Unit tests for mock services (Vitest)
- ✅ Hook tests with React Testing Library
- ✅ Component tests for forms and cards
- ✅ E2E tests for critical flows (Playwright)
- ✅ Accessibility tests (axe-core)

**Documentation:**
- ✅ README with setup instructions
- ✅ Architecture documentation
- ✅ Mock data documentation
- ✅ API migration guide
- ✅ Component Storybook (optional)

---

## Migration to Real APIs (Phase 5 - Future)

### Step 1: Create API Services

```typescript
// lib/api/services/api-request-service.ts
import { RequestService } from '@/lib/services/types';

const supabase = createClient();

export const apiRequestService: RequestService = {
  async getAll(filters) {
    let query = supabase.from('requests').select('*');

    if (filters?.tags?.length) {
      query = query.contains('tags', filters.tags);
    }
    if (filters?.urgency) {
      query = query.eq('urgency', filters.urgency);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async create(data) {
    const { data: newRequest, error } = await supabase
      .from('requests')
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return newRequest;
  },

  // ... same interface as mock service
};
```

### Step 2: Update Environment Variable

```env
# .env.local
NEXT_PUBLIC_USE_MOCK=false  # Switch from true to false
```

### Step 3: Zero Code Changes Required

All Tanstack Query hooks automatically use real API:
- ✅ Same hook signatures
- ✅ Same return types
- ✅ Same error handling
- ✅ Same caching behavior
- ✅ No component updates needed

---

## Key Advantages

### 1. Complete UI Development Without Backend
- Build entire UI with realistic data
- Test all user flows end-to-end
- Deploy demo version immediately
- Show portfolio-ready project

### 2. Type Safety Everywhere
- Service interfaces ensure contract compliance
- TypeScript catches mismatches at compile time
- Zod validates runtime data
- Zero runtime surprises during API swap

### 3. Realistic Performance Testing
- Mock delays simulate network latency
- Test loading states accurately
- Optimize perceived performance
- Measure actual user experience

### 4. Easy Testing
- Unit test services in isolation
- Mock localStorage for tests
- Test components with React Testing Library
- E2E tests work with mock data

### 5. Seamless Migration
- Change ONE environment variable
- Zero component changes
- Zero hook changes
- Only swap service implementations

---

## Tanstack Query Best Practices

### Query Keys Strategy
```typescript
// Hierarchical query keys for cache invalidation
['requests']                    // All requests
['requests', filters]           // Filtered requests
['requests', id]                // Single request
['requests', id, 'offers']      // Request offers

['sessions']                    // All sessions
['sessions', id]                // Single session
['sessions', id, 'messages']    // Session messages
```

### Optimistic Updates
```typescript
export function useAcceptOffer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ offerId, requestId }) =>
      offerService.accept(offerId),

    onMutate: async ({ offerId, requestId }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries(['offers', requestId]);

      // Snapshot previous value
      const previousOffers = queryClient.getQueryData(['offers', requestId]);

      // Optimistically update
      queryClient.setQueryData(['offers', requestId], (old: Offer[]) =>
        old.map(o => o.id === offerId ? { ...o, status: 'accepted' } : o)
      );

      return { previousOffers };
    },

    onError: (err, variables, context) => {
      // Rollback on error
      queryClient.setQueryData(
        ['offers', variables.requestId],
        context?.previousOffers
      );
    },

    onSettled: (data, error, { requestId }) => {
      // Refetch to sync with server
      queryClient.invalidateQueries(['offers', requestId]);
    }
  });
}
```

### Prefetching
```typescript
// Prefetch request details on card hover
function RequestCard({ request }) {
  const queryClient = useQueryClient();

  const handleHover = () => {
    queryClient.prefetchQuery({
      queryKey: ['requests', request.id],
      queryFn: () => requestService.getById(request.id)
    });
  };

  return (
    <div onMouseEnter={handleHover}>
      {/* Card content */}
    </div>
  );
}
```

---

## Performance Optimizations

### 1. Pagination
```typescript
export function useRequestsInfinite(filters?: RequestFilters) {
  return useInfiniteQuery({
    queryKey: ['requests', 'infinite', filters],
    queryFn: ({ pageParam = 0 }) =>
      requestService.getAll(filters, { page: pageParam, limit: 20 }),
    getNextPageParam: (lastPage, pages) =>
      lastPage.length === 20 ? pages.length : undefined
  });
}
```

### 2. Debounced Search
```typescript
export function useSearchRequests() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 300);

  const { data, isLoading } = useQuery({
    queryKey: ['requests', 'search', debouncedQuery],
    queryFn: () => requestService.search(debouncedQuery),
    enabled: debouncedQuery.length > 2
  });

  return { data, isLoading, searchQuery, setSearchQuery };
}
```

### 3. Cache Persistence
```typescript
// app/providers.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    }
  }
});

const persister = createSyncStoragePersister({
  storage: window.localStorage
});

export function Providers({ children }) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
```

---

## Summary

**This plan enables:**
- ✅ Complete UI development without backend dependency
- ✅ Realistic mock data with localStorage persistence
- ✅ Seamless API migration with ONE environment variable
- ✅ Type-safe contracts between UI and data layer
- ✅ Optimistic updates and smooth UX
- ✅ Easy testing at all levels
- ✅ Portfolio-ready demo deployment

**Migration effort:** Change `NEXT_PUBLIC_USE_MOCK=false` → Done! 🚀
