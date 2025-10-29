# 🧩 MicroCollab — Product Specification Document v1.0

## 1. Product Vision
A web-based platform connecting developers and small teams with experienced peers for **short, focused help sessions (1–4 hours)** — solving real issues like refactoring, debugging, writing tests, improving UX, or getting architectural guidance.

Unlike traditional freelance portals or job sites, **MicroCollab focuses on instant, time-boxed collaborations**, not long contracts.

> **Tagline:** *Find help fast. Collaborate smart.*

---

## 2. Key Objectives
1. Enable developers to **post short-term help requests** (code, design, QA, architecture).
2. Allow skilled helpers to **offer quick assistance** based on expertise and availability.
3. Build a **real-time matching experience** that feels intuitive and professional.
4. Provide a **demo mode** for portfolio showcasing and recruiter visibility.
5. Launch entirely on **free-tier infrastructure** (Vercel + Supabase).

---

## 3. Target Audience
- Freelance developers stuck on tough issues.  
- Small startups without full-time specialists.  
- Designers, QA engineers, or architects offering part-time mentoring.  
- Tech professionals seeking paid or voluntary short gigs.  

---

## 4. Core Features & Screens

### 1. Landing Page
**Purpose:** Convert visitors into users (Post a Request / Offer Help)

**Features**
- Hero section: brief pitch, visual of dev collaboration.
- CTA buttons: “Find Help Now” / “Offer Help”.
- Category highlights (Refactoring, Testing, Design, Architecture).
- Testimonials (seeded demo content).
- “How It Works” 3-step section.
- Footer: GitHub link, tech stack, About MicroCollab.

---

### 2. Post a Request Screen
**Purpose:** Let a user quickly describe the problem they need help with.

**Form Fields:**
- Title (e.g., “Need help refactoring a Node.js API”)
- Description (what’s the issue?)
- Tags (React, Java, UI/UX, CI/CD, etc.)
- Estimated Duration (1–4 hours)
- Urgency (Low / Normal / Critical)
- Mode (Async chat / Live session)
- Budget (optional; currency, hourly or fixed)
- Preferred time / timezone
- Submit button → creates new request (Supabase table `requests`)

**UX:**
- Use autocomplete for tags.
- Show “estimated time to find helper” tip.

---

### 3. Browse Requests / Offer Help Screen
**Purpose:** Let helpers browse open requests and offer assistance.

**Features**
- Filter by: skills, duration, urgency, mode.
- List of requests with preview cards:
  - Title, tags, duration, time left, urgency badge.
- “Offer Help” button → opens modal to message the requester.
- Realtime updates (Supabase Realtime).

**Helper Modal:**
- Short message textarea (“I can help with this in the next few hours”).
- Availability selector.
- Submit → creates record in `offers` table.

---

### 4. Request Details View
**Purpose:** Central screen for collaboration info.

**Features**
- Request summary: title, tags, description, urgency.
- Status (Open / In Progress / Completed).
- Helper offers listed with names and short messages.
- Requester can accept one offer → converts into a “Session.”
- Optional in-app chat (Supabase Realtime or simple threaded messages).

---

### 5. Session Room (after acceptance)
**Purpose:** Space for actual collaboration session.

**Features**
- Session details: project title, helper name, duration, start timer.
- Embedded chat (Supabase Realtime).
- Optional: link to Google Meet / VSCode Live Share.
- End session → triggers feedback modal.

**Feedback Modal**
- Rating (1–5 stars)
- Quick feedback text
- Mark session as complete

---

### 6. Dashboard (User Home)
**Requester View**
- Posted requests (active/completed)
- Session history with feedback
- “Post New Request” button

**Helper View**
- Help offers (pending/accepted)
- Active sessions
- Ratings summary

---

### 7. Profile & Settings
- Profile: Avatar, bio, skills, timezone, role (Helper / Requester / Both)
- Availability toggle (“Open to Help Now”)
- Notification preferences (email / in-app)
- Delete account / Export data

---

### 8. Demo Mode (for Portfolio)
**Purpose:** Let visitors experience the app without signup.

**Features**
- Preloaded fake requests and offers.
- Limited interactivity (cannot submit real data).
- Fake real-time activity stream (“3 new offers”, “1 request matched”).
- “Sign Up to Post Real Request” banner.

---

## 5. Technical Architecture

| Layer | Technology | Notes |
|--------|-------------|-------|
| **Frontend** | Next.js 15 (App Router) + React 19 + Tailwind 4 | Free, modern, deployable on Vercel |
| **Backend** | Supabase (PostgreSQL + Auth + Realtime) | Full stack in free tier |
| **Database** | Supabase DB (tables: users, requests, offers, sessions, messages) | RLS enabled |
| **Realtime** | Supabase Realtime Channels | Live updates on requests/offers |
| **Authentication** | Supabase Auth (email/magic link, optional GitHub OAuth) | |
| **Storage** | Supabase Storage (optional for attachments) | |
| **Hosting** | Vercel (frontend) + Supabase (backend) | Zero cost deployment |

---

## 6. Database Schema (Simplified)

**users**  
id | email | name | bio | skills[] | timezone | role | rating | created_at  

**requests**  
id | title | description | tags[] | duration_hours | urgency | mode | budget | status | created_by | created_at  

**offers**  
id | request_id | offered_by | message | proposed_time | status | created_at  

**sessions**  
id | request_id | helper_id | start_time | end_time | feedback | rating  

**messages**  
id | session_id | sender_id | text | created_at  

---

## 7. User Flows

**Request Flow**
1. Post request  
2. Receive offers  
3. Accept one → creates session  
4. Complete & review  

**Helper Flow**
1. Browse open requests  
2. Offer help  
3. Wait for acceptance  
4. Join session & complete  
5. Receive rating  

**Demo Flow**
1. Visit landing page → Try Demo  
2. Browse pre-seeded requests  
3. Simulate offer / match  
4. Prompt: “Sign up to go live”  

---

## 8. Design Direction
**Theme:** Modern, minimal, friendly-tech vibe  
**Primary Color:** Indigo (`#6366F1`)  
**Accent Color:** Mint Green (`#10B981`)  
**Background:** Neutral Gray (`#F9FAFB`)  
**Font:** Inter (UI) + JetBrains Mono (code tags)  
**Icon Set:** Lucide Icons  

---

## 9. Phase Plan

| Phase | Timeline | Focus |
|--------|-----------|--------|
| **Phase 1 (MVP)** | 2–3 weeks | Core posting, browsing, offers, and demo mode |
| **Phase 2** | +2 weeks | Realtime chat + session management |
| **Phase 3** | +4 weeks | Ratings, profile polish, notifications |
| **Future** | — | Payment gateway, GitHub/Slack integrations |

---

## 10. Success Metrics (Portfolio Perspective)
- Working demo mode accessible instantly  
- Live Supabase-powered interactions  
- Polished UI with visible real-time updates  
- Deployed on free-tier infrastructure  
- Clean, documented GitHub repo  
- Use-case clarity visible within 10 seconds  

---

## 11. Summary
**MicroCollab** is a fast, friendly solution for developers who need help now — not in a week.  
It bridges the gap between mentorship, freelancing, and community — creating short, impactful tech collaborations.

> **MicroCollab — Find help fast. Collaborate smart.**

