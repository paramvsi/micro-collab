# MicroCollab Architecture Summary

**Quick Reference**: High-level architecture overview for MicroCollab UI-first development

---

## 🎯 Core Philosophy

**UI-First Development**: Build complete UI with realistic mock data, then swap to real APIs later with ONE environment variable change.

---

## 📊 Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     COMPONENT LAYER                              │
│  React components, pages, forms - NO direct state/service access│
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                  TANSTACK QUERY HOOKS                            │
│  useRequests(), useCreateRequest(), useOffers()                  │
│  → Provides: { data, isLoading, error, mutate }                  │
│  → Handles: Caching, refetching, optimistic updates              │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SERVICE INTERFACE                             │
│  requestService.getAll(), offerService.create()                  │
│  → Type-safe contracts for mock + real implementations           │
└────────────────────────┬────────────────────────────────────────┘
                         │
                    ┌────┴────┐
                    │         │
                    ▼         ▼
         ┌──────────────┐  ┌──────────────┐
         │ MOCK SERVICE │  │ API SERVICE  │
         │ (Phase 1-3)  │  │ (Phase 4+)   │
         └──────┬───────┘  └──────┬───────┘
                │                 │
                ▼                 ▼
         ┌──────────────┐  ┌──────────────┐
         │ localStorage │  │  Supabase    │
         │  + Zustand   │  │  + Realtime  │
         └──────────────┘  └──────────────┘
```

---

## 🗂️ Folder Structure

```
lib/
  ├── mock/                         # Mock data layer (Phase 1-3)
  │   ├── data/
  │   │   ├── seed-data.ts         # Initial 10 users, 20 requests, 15 offers
  │   │   └── generators.ts        # @faker-js/faker generators
  │   ├── services/
  │   │   ├── mock-request-service.ts   # localStorage CRUD
  │   │   ├── mock-offer-service.ts
  │   │   ├── mock-session-service.ts
  │   │   ├── mock-user-service.ts
  │   │   └── mock-message-service.ts
  │   └── utils/
  │       ├── storage.ts           # Type-safe localStorage wrapper
  │       └── delay.ts             # Network delay simulation (100-300ms)
  │
  ├── services/                     # Service interfaces + selectors
  │   ├── types.ts                 # TypeScript interfaces (contracts)
  │   ├── request-service.ts       # Exports mock or real based on env
  │   ├── offer-service.ts
  │   ├── session-service.ts
  │   ├── user-service.ts
  │   └── message-service.ts
  │
  ├── hooks/
  │   ├── queries/                 # Tanstack Query hooks
  │   │   ├── use-requests.ts     # useQuery for list
  │   │   ├── use-request.ts      # useQuery for single
  │   │   ├── use-create-request.ts   # useMutation
  │   │   ├── use-offers.ts
  │   │   ├── use-create-offer.ts
  │   │   ├── use-accept-offer.ts
  │   │   └── ...
  │   └── auth/
  │       ├── use-auth.ts          # Auth state hook
  │       └── use-require-auth.ts  # Protected route hook
  │
  └── stores/                       # Zustand stores
      ├── auth-store.ts            # User auth state (persist)
      ├── notification-store.ts    # Notifications (persist)
      ├── session-store.ts         # Active session state
      └── ui-store.ts              # Modal states, loading flags
```

---

## 🔧 Key Technologies

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **State Management** | Zustand + persist middleware | Global state with localStorage |
| **Data Fetching** | Tanstack Query | Caching, refetching, optimistic updates |
| **Mock Data** | @faker-js/faker | Realistic fake data generation |
| **Storage** | localStorage | Client-side persistence |
| **Forms** | React Hook Form + Zod | Validation (UI-independent) |
| **UI Components** | shadcn/ui + Tailwind | Pre-built accessible components |

---

## 🚀 Migration Strategy

### Current (Phase 1-3): Mock Mode
```typescript
// .env.local
NEXT_PUBLIC_USE_MOCK=true

// lib/services/request-service.ts
import { mockRequestService } from '@/lib/mock/services/mock-request-service';
export const requestService = mockRequestService;
```

### Future (Phase 4+): Real API Mode
```typescript
// .env.local
NEXT_PUBLIC_USE_MOCK=false  // ← ONLY CHANGE NEEDED!

// lib/services/request-service.ts
import { mockRequestService } from '@/lib/mock/services/mock-request-service';
import { apiRequestService } from '@/lib/api/services/api-request-service';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';
export const requestService = USE_MOCK ? mockRequestService : apiRequestService;
```

**Result**: Zero component changes, zero hook changes, only swap service implementation!

---

## 📝 Code Examples

### Service Interface (Type Contract)
```typescript
// lib/services/types.ts
export interface RequestService {
  getAll(filters?: RequestFilters): Promise<Request[]>;
  getById(id: string): Promise<Request | null>;
  create(data: CreateRequestDto): Promise<Request>;
  update(id: string, data: UpdateRequestDto): Promise<Request>;
  delete(id: string): Promise<void>;
}
```

### Mock Service Implementation
```typescript
// lib/mock/services/mock-request-service.ts
export const mockRequestService: RequestService = {
  async getAll(filters) {
    await delay(150); // Simulate network
    const requests = storage.get<Request[]>(STORAGE_KEYS.REQUESTS) || [];
    return applyFilters(requests, filters);
  },

  async create(data) {
    await delay(200);
    const requests = storage.get<Request[]>(STORAGE_KEYS.REQUESTS) || [];
    const newRequest = { id: nanoid(), ...data, createdAt: new Date() };
    requests.push(newRequest);
    storage.set(STORAGE_KEYS.REQUESTS, requests);
    return newRequest;
  }
};
```

### Tanstack Query Hook
```typescript
// lib/hooks/queries/use-requests.ts
import { useQuery } from '@tanstack/react-query';
import { requestService } from '@/lib/services/request-service';

export function useRequests(filters?: RequestFilters) {
  return useQuery({
    queryKey: ['requests', filters],
    queryFn: () => requestService.getAll(filters),
    staleTime: 30000 // 30 seconds
  });
}
```

### Component Usage
```typescript
// app/(dashboard)/browse/page.tsx
'use client';

export default function BrowsePage() {
  const [filters, setFilters] = useState({});
  const { data: requests, isLoading } = useRequests(filters);

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div>
      <RequestFilters onChange={setFilters} />
      {requests?.map(r => <RequestCard key={r.id} request={r} />)}
    </div>
  );
}
```

---

## ✅ Architecture Benefits

### 1. Complete UI Development Without Backend
- Build entire UI with realistic data
- Test all user flows end-to-end
- Deploy demo version immediately
- Portfolio-ready project

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

## 📚 Documentation Links

- **[MicroCollabPlan.md](./MicroCollabPlan.md)** - Main development plan with phases
- **[MicroCollabUIPlan.md](./MicroCollabUIPlan.md)** - Detailed UI-first architecture guide
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - This file (quick reference)

---

## 🎯 Development Workflow

1. **Define Service Interface** (`lib/services/types.ts`)
2. **Implement Mock Service** (`lib/mock/services/*.ts`)
3. **Create Tanstack Query Hook** (`lib/hooks/queries/*.ts`)
4. **Build Component** (`app/**/*.tsx`) using hook
5. **Test** with mock data
6. **Deploy Demo** to Vercel
7. **(Later) Implement Real API Service** (`lib/api/services/*.ts`)
8. **Change Environment Variable** → Production ready!

---

**Quick Start**: See [MicroCollabUIPlan.md](./MicroCollabUIPlan.md) for detailed implementation guide.
