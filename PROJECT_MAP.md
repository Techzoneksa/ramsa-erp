# RAMSA ERP — Project Map

## Overview
Cloud-based ERP system for **Ramsa Shipping & Logistics** company operating in Saudi Arabia. Manages shipments, fleet, drivers, agents, warehouses, financials, and integrations with government entities (TGA, Logisti, ZATCA).

## Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** PostgreSQL + Prisma ORM v6
- **Auth:** Auth.js v5 (next-auth@beta) + Prisma Adapter
- **Node.js:** 22+
- **Linting:** ESLint

## Brand Identity
| Token | Value |
|---|---|
| Primary | `#4B118F` (Purple) |
| Primary Dark | `#2D075F` |
| Accent | `#FF7900` (Orange) |
| Background | `#F7F7FA` |
| Text | `#17131F` |
| Text Secondary | `#6B6873` |
| Success | `#16A56A` |
| Error | `#D93B45` |

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                     Next.js 16                       │
│  ┌──────────────┐  ┌────────────────────────────┐   │
│  │   Proxy.ts   │  │        App Router           │   │
│  │  (Auth Guard)│  │  / → Homepage               │   │
│  │              │  │  /dashboard → Admin Panel   │   │
│  │   Matcher:   │  │  /api/auth/[...nextauth]    │   │
│  │   /dashboard │  │       Auth.js API           │   │
│  └──────────────┘  └────────────────────────────┘   │
│                         │                            │
│                    ┌────┴────┐                       │
│                    │  Auth.js│                       │
│                    │  (JWT)  │                       │
│                    └────┬────┘                       │
│                         │                            │
│                    ┌────┴────┐                       │
│                    │ Prisma  │                       │
│                    │  ORM    │                       │
│                    └────┬────┘                       │
│                         │                            │
│                    ┌────┴────┐                       │
│                    │PostgreSQL│                      │
│                    └─────────┘                       │
└─────────────────────────────────────────────────────┘
```

## Project Structure

```
D:\RMSA
├── prisma/
│   └── schema.prisma          # Database schema (8 models)
├── public/
│   └── logo.svg
├── src/
│   ├── app/
│   │   ├── api/auth/[...nextauth]/
│   │   │   └── route.ts       # Auth.js API route handler
│   │   ├── dashboard/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── dashboard-shell.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── topbar.tsx
│   │   │   ├── stat-card.tsx
│   │   │   ├── empty-state.tsx
│   │   │   └── data-table-shell.tsx
│   │   └── ui/
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       └── page-header.tsx
│   ├── data/
│   │   └── dashboard.ts
│   ├── lib/
│   │   ├── auth.ts            # Auth.js configuration
│   │   └── prisma.ts          # Prisma client singleton
│   ├── types/
│   │   └── next-auth.d.ts     # Auth.js type extensions
│   ├── proxy.ts               # Auth guard (inactive until login)
│   └── middleware.ts (removed)# Renamed to proxy.ts
├── .env                       # Local env (gitignored)
├── .env.example               # Environment variables template
├── .gitignore
├── eslint.config.mjs
├── logo.svg
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── PRD-رمسا-ERP.md
├── PROJECT_MAP.md
└── tsconfig.json
```

## Database Schema (8 models)

| Model | Table | Purpose |
|---|---|---|
| `User` | `users` | System users (employees, admins) |
| `Role` | `roles` | RBAC roles (OWNER, MANAGER, etc.) |
| `Permission` | `permissions` | Action+resource permissions |
| `UserRole` | `user_roles` | Many-to-many User ↔ Role |
| `RolePermission` | `role_permissions` | Many-to-many Role ↔ Permission |
| `Session` | `sessions` | Database sessions (if not JWT) |
| `Account` | `accounts` | OAuth provider accounts |
| `VerificationToken` | `verification_tokens` | Email verification tokens |

**User fields:** id, name, email (unique), emailVerified, phone (unique), passwordHash, image, status (ACTIVE/INACTIVE/SUSPENDED/BLOCKED), locale (AR/EN), createdAt, updatedAt

**Roles:** OWNER, GENERAL_MANAGER, OPERATIONS_MANAGER, BRANCH_MANAGER, WAREHOUSE_SUPERVISOR, ACCOUNTANT, CUSTOMER_SERVICE, COURIER, DRIVER, SYSTEM_ADMIN

## Environment Variables (.env.example)

```
DATABASE_URL  → PostgreSQL connection string
AUTH_SECRET   → NextAuth secret (generate via `openssl rand -base64 32`)
AUTH_URL      → Application base URL
```

## Completed

### Phase 0 — Brand Identity & UI Foundation
- [x] Design tokens, fonts, RTL, logo, favicon
- [x] UI primitives: Button, Input, Card, Badge, PageHeader
- [x] Brand homepage

### Phase 0.5 — Dashboard Shell & Layout
- [x] `/dashboard` route with sidebar, topbar, KPI cards
- [x] Responsive layout, RTL-first

### Phase 0.6 — Database & Auth Foundation
- [x] Prisma v6 ORM installed and configured
- [x] PostgreSQL schema with 8 models (User, Role, Permission, etc.)
- [x] RBAC design: roles, permissions, many-to-many relations
- [x] Prisma client singleton (`src/lib/prisma.ts`)
- [x] Auth.js v5 configuration with Prisma adapter
- [x] Credentials provider with bcrypt password hashing
- [x] JWT session strategy
- [x] `/api/auth/[...nextauth]` route handler
- [x] Auth guard proxy (ready but inactive until login page exists)
- [x] `next-auth` TypeScript type extensions
- [x] `.env.example` with documented variables
- [x] Prisma scripts in package.json:
  - `prisma:generate` — Generate Prisma Client
  - `prisma:validate` — Validate schema
  - `prisma:migrate:dev` — Create migration
  - `prisma:studio` — Open Prisma Studio
  - `postinstall` — Auto-generate on install
- [x] Prisma validate ✅
- [x] Prisma generate ✅
- [x] ESLint ✅
- [x] Build ✅

## Platforms (future phases)
1. **ERP Admin Panel** — Web dashboard (in progress)
2. **Client Portal** — Web portal for B2B/B2C clients
3. **Agent App** — Mobile app for pickup/delivery agents
4. **Driver App** — Mobile app for inter-city drivers
5. **API** — Integration APIs for clients & e-commerce

### Not Yet Started (next phases)
- Shipment management module
- Customer / contract / pricing management
- Branches / warehouses management
- Trip / fleet management
- Login page and real authentication flow
- E-commerce integrations
- Government integrations (TGA, ZATCA)
- Agent / driver mobile apps
- Reporting module
- Real database migration (requires DATABASE_URL)

## Key Integrations (planned)
- TGA (Transport General Authority) / Logisti
- ZATCA e-invoicing
- National Address (Saudi)
- Google Maps / location provider
- SMS, WhatsApp Business API
- Payment gateway
- Vehicle tracking devices
- E-commerce platforms: Salla, Zid, Shopify, WooCommerce
