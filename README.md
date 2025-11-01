# 🧩 MicroCollab

> **Find help fast. Collaborate smart.**

A marketplace platform connecting developers and small teams with experienced peers for short, focused help sessions (1-4 hours).

![MicroCollab](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Latest-3ECF8E?style=for-the-badge&logo=supabase)

## ✨ Features

### Core Features
- 🔍 **Browse Requests** - Filter and search for help opportunities
- 📝 **Post Requests** - Describe your problem and get offers
- 💬 **Real-time Chat** - Collaborate in session rooms with live messaging
- ⭐ **Rating System** - Bidirectional feedback for quality assurance
- 🎯 **Demo Mode** - Try the platform with simulated marketplace activity
- 👥 **Dual Roles** - Act as Requester, Helper, or both

### Tech Highlights
- ⚡ **Next.js 16** with App Router and React Server Components
- 🎨 **Tailwind CSS v4** with custom design tokens
- 🔐 **Supabase Auth** with Row Level Security
- 📊 **Real-time Updates** via Supabase Realtime
- 🧪 **Full Testing Suite** with Vitest and Playwright
- 🚀 **Free Tier Deployment** on Vercel + Supabase

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 16, React 19, TypeScript 5 |
| **Styling** | Tailwind CSS v4, shadcn/ui, Radix UI |
| **State** | Zustand (persist), Tanstack Query |
| **Forms** | React Hook Form + Zod |
| **Mock Data** | @faker-js/faker, localStorage |
| **Backend** | Supabase (Auth + PostgreSQL + Realtime) - *Future* |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Testing** | Vitest, Playwright, Testing Library |
| **Deployment** | Vercel (frontend) + Supabase (backend) |

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ and npm
- Supabase account (free tier)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/microcollab.git
   cd microcollab
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with your Supabase credentials:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3003](http://localhost:3003)

## 📁 Project Structure

```
microcollab/
├── app/                    # Next.js App Router
│   ├── (marketing)/        # Landing page
│   ├── (dashboard)/        # Protected routes
│   ├── demo/               # Public demo mode
│   └── api/                # API routes (future)
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── features/           # Feature-specific components
│   └── layout/             # Shared layouts
├── lib/
│   ├── mock/               # Mock data layer (Phase 1-3)
│   │   ├── data/           # Seed data + generators (@faker-js/faker)
│   │   ├── services/       # Mock services (localStorage CRUD)
│   │   └── utils/          # Storage wrapper + delay simulation
│   ├── services/           # Service interfaces + selectors
│   ├── hooks/
│   │   ├── queries/        # Tanstack Query hooks
│   │   └── auth/           # Auth hooks
│   ├── stores/             # Zustand stores (persist middleware)
│   └── utils/              # Utility functions
├── types/                  # TypeScript type definitions
└── config/                 # App configuration
```

**Key Architecture Points:**
- Components **never** access services directly → Always use Tanstack Query hooks
- Services follow **interface contracts** → Enables seamless mock↔real swapping
- All state persists via **Zustand + localStorage** → Survives page refreshes
- Mock services simulate **100-300ms delays** → Realistic loading states

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🎮 Demo Mode

MicroCollab features a fully functional demo marketplace that showcases the platform without requiring authentication. Perfect for exploring features and understanding the workflow.

### Features
- **Live Simulation** - Auto-generated marketplace activity every 45 seconds
- **Interactive Browsing** - Filter requests by skills, urgency, and duration
- **Mock Offers** - Submit demo offers and see real-time updates
- **Activity Feed** - Watch the marketplace come alive with real-time events
- **Realistic Data** - 10-15 pre-populated requests with professional templates

### Access Demo Mode

**From Landing Page**: Click the **"Try Demo →"** button on the hero section

**Direct URLs**:
```
/demo/dashboard - Overview with stats and live activity
/demo/browse - Browse and filter help requests
/demo/requests/[id] - View request details and offers
```

📖 **[Complete Demo Guide](./DEMO_QUICKSTART.md)** - Detailed walkthrough of all features

### Technical Implementation
- **Mock Data**: Faker.js for realistic data generation
- **State Management**: Zustand store with auto-simulation
- **Animations**: Framer Motion for smooth transitions
- **Type-Safe**: Full TypeScript coverage with strict mode
- **Zero Custom CSS**: 100% Tailwind utility classes

## 📚 Documentation

### Core Documentation
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Quick reference guide for architecture
- **[MicroCollabUIPlan.md](./MicroCollabUIPlan.md)** - Detailed UI-first development plan
- **[MicroCollabPlan.md](./MicroCollabPlan.md)** - Comprehensive phase-by-phase plan

### Technical Specs
- [Product Spec](./microcollab_product_spec_v_1.md) - Product requirements
- [Demo Mode Implementation](./DEMO_MODE_IMPL.md) - Complete demo mode specification

### Architecture Highlights
- **UI-First Development**: Build complete UI with mock data, swap to APIs later
- **Service Layer Pattern**: Interface-based services for seamless mock→real migration
- **Tanstack Query**: Data fetching abstraction with caching and optimistic updates
- **localStorage Persistence**: Client-side data storage with Zustand persist
- **Type-Safe Contracts**: Service interfaces ensure compile-time safety
- **One-Variable Migration**: Change `NEXT_PUBLIC_USE_MOCK=false` → Production ready!

## 🗺️ Roadmap

- [x] **Phase 1A** - Project initialization and setup
- [x] **Phase 1B** - Landing page and demo mode ✨
- [ ] **Phase 1C** - Core marketplace features
- [ ] **Phase 1D** - Session collaboration room
- [ ] **Phase 2** - Real-time integration
- [ ] **Phase 3** - Payments and integrations

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Supabase](https://supabase.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)

---

**Made with ❤️ for the developer community**
