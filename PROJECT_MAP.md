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
│   ├── schema.prisma          # Database schema (8 models)
│   └── migrations/
│       ├── migration_lock.toml
│       └── 20260608114801_init_auth_and_rbac/
│           └── migration.sql  # Initial migration (offline-generated)
├── public/
│   └── logo.svg
├── src/
│   ├── app/
│   │   ├── api/auth/[...nextauth]/
│   │   │   └── route.ts       # Auth.js API route handler
│   │   ├── login/
│   │   │   └── page.tsx           # تسجيل الدخول
│   │   ├── unauthorized/
│   │   │   └── page.tsx           # غير مصرح بالوصول
│   │   ├── dashboard/
│   │   │   ├── layout.tsx         # يتحقق من الجلسة ويعرض Shell
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
│   │   ├── auth.ts            # Auth.js config + JWT callbacks (adds roles)
│   │   ├── prisma.ts          # Prisma client singleton
│   │   └── seed-admin.server.ts  # Shared seedAdmin function (server-only)
│   ├── types/
│   │   └── next-auth.d.ts     # Auth.js type extensions (id, roles)
│   └── proxy.ts               # Auth guard — يحمي /dashboard و /unauthorized
├── prisma/
│   ├── schema.prisma          # Database schema (8 models)
│   ├── seed.ts                # بذر أول مستخدم SYSTEM_ADMIN
│   └── migrations/
│       ├── migration_lock.toml
│       └── 20260608114801_init_auth_and_rbac/
│           └── migration.sql
├── scripts/
│   └── check-env.mjs          # Pre-flight env var validation
├── .env                       # Local env (gitignored)
├── .env.example               # Environment variables template (with placeholders & docs)
├── README.md                  # Project overview & env var docs
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

## Environment Variables

See [.env.example](./.env.example) for placeholders and [README.md](./README.md#environment-variables) for the full reference.

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Pooled connection (pgBouncer, port 6543) — Prisma runtime |
| `DIRECT_URL` | Direct connection (port 5432) — Prisma migrations |
| `AUTH_SECRET` | Auth.js encryption secret (base64, 32 bytes) |
| `AUTH_URL` | Application base URL |
| `SUPABASE_URL` | Supabase project URL (optional) |
| `SUPABASE_ANON_KEY` | Supabase anonymous key (optional) |

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
- [x] `next-auth` TypeScript type extensions (id, roles in Session & JWT)
- [x] `.env.example` with documented variables (9 vars)
- [x] `directUrl = env("DIRECT_URL")` in schema.prisma (line 8)
- [x] Pre-flight env guard (`scripts/check-env.mjs`) fails fast if `DATABASE_URL` or `DIRECT_URL` is missing
- [x] Offline migration SQL generated via `prisma migrate diff --from-empty`
- [x] Migration saved to `prisma/migrations/<timestamp>_init_auth_and_rbac/`
- [x] `migration_lock.toml` created (postgresql provider)

### Phase 0.7 — Real Authentication (تسجيل الدخول)
- [x] `/login` page — RTL, RMSA branding, بريد + كلمة مرور + إظهار/إخفاء + تحميل + أخطاء
- [x] `/unauthorized` page — رسالة "غير مصرح بالوصول"
- [x] `src/proxy.ts` — Auth guard نشط: يحمي `/dashboard` و `/unauthorized`، يعيد التوجيه إلى `/login`
- [x] المستخدم المسجل يفتح `/login` → يُحوّل إلى `/dashboard`
- [x] الزائر غير المسجل يفتح `/dashboard` → يُحوّل إلى `/login`
- [x] `src/app/dashboard/layout.tsx` — التحقق من الجلسة قبل عرض المحتوى + `dynamic = "force-dynamic"`
- [x] Fix: منع خطأ `Static generation failed due to dynamic usage on /dashboard` بإضافة `export const dynamic = "force-dynamic"`
- [x] Build diagnostic (commit dea041a): prisma validate ✅, prisma generate ✅, tsc --noEmit ✅, eslint ✅, next build ✅ Exit 0
- [x] التحقق من عدم وجود ملف `6a280f3e8d89b.next.config.ts` — غير موجود في working tree ولا git history
- [x] `src/components/dashboard/topbar.tsx` — يعرض اسم المستخدم + دوره + زر تسجيل خروج حقيقي
- [x] `src/lib/auth.ts` — JWT callback يحفظ role codes في الـ token
- [x] `src/lib/seed-admin.server.ts` — دالة مشتركة `seedAdmin()` + كلاس `SeedError` مع stage/code/errorName/target
- [x] `prisma/seed.ts` — يستخدم `seedAdmin()` من المصدر المشترك (للتطوير المحلي فقط)
- [x] `tsx` — مثبّت كـ devDependency لتشغيل seed
- [x] Prisma scripts في package.json:
  - `build` — Hostinger pipeline: `prisma migrate deploy && prisma generate && next build`
  - `deploy` — Deployment pipeline (مع pre-flight guard): `node scripts/check-env.mjs && prisma migrate deploy && prisma generate && next build`
  - `prisma:seed` — `tsx prisma/seed.ts` (يدويًا، ليس تلقائيًا)
  - `seed:admin` — `tsx prisma/seed.ts` (مرادف لـ prisma:seed)
  - `prisma:generate` — Generate Prisma Client
  - `prisma:validate` — Validate schema
  - `prisma:migrate:dev` — Create migration (dev)
  - `prisma:migrate:deploy` — Apply migrations (production)
  - `prisma:studio` — Open Prisma Studio
  - `postinstall` — Auto-generate on install
- [x] Prisma validate ✅
- [x] Prisma generate ✅
- [x] ESLint ✅
- [x] Build ✅

### Phase 0.8 — Browser-based First Admin Setup
- [x] `/setup` page — واجهة إنشاء أول مدير من المتصفح
  - صفحة سيرفر: `src/app/setup/page.tsx` — تفحص `user.count()` وتُعيد التوجيه إلى `/login` إذا وُجد مستخدم
  - نموذج عميل: `src/app/setup/setup-form.tsx` — الاسم، البريد، كلمة المرور، تأكيد كلمة المرور، إظهار/إخفاء
  - Server Action: `src/app/setup/actions.ts` — تنشئ أول مستخدم SYSTEM_ADMIN
  - `export const dynamic = "force-dynamic"` — تمنع static prerendering
  - تصميم مطابق لهوية RMSA (نفس تخطيط /login)
- [x] آلية منع إنشاء عدة مديرين:
  - فحص `user.count()` داخل `$transaction` في Server Action
  - يرمي `SETUP_ALREADY_COMPLETED` إذا وُجد مستخدم
  - فحص عند تحميل الصفحة (server-side redirect)
  - استباق: لا يمكن إنشاء مستخدم ثانٍ من هذا المسار
- [x] إنشاء المستخدم الأول:
  - `bcrypt.hash(password, 12)` — تشفير كلمة المرور
  - `prisma.$transaction(async (tx) => { ... })` — عملية ذرية
  - التحقق من صحة البريد (regex)، طول كلمة المرور (≥10)، تطابق التأكيد
  - upsert لدور SYSTEM_ADMIN
  - إنشاء User + UserRole في نفس العملية
  - خطأ آمن: `SETUP_ALREADY_COMPLETED` (لا تعرض تفاصيل حساسة)
  - تسجيل stage فقط في السيرفر (`console.log` بدون passwordHash)
- [x] بعد النجاح: رسالة نجاح + تحويل تلقائي إلى `/login` بعد 2 ثانية
- [x] حذف الأسلوب القديم:
  - حُذف: `src/app/api/setup/seed-admin/route.ts` — API Route المؤقتة
  - أُزيلت متغيرات البيئة: `SETUP_SECRET`, `SEED_ADMIN_NAME`, `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`
  - `.env.example` — محدّث بدون المتغيرات المذكورة
- [x] `src/lib/seed-admin.server.ts` + `prisma/seed.ts` — بقيا للتطوير المحلي (لا تعتمدان على SETUP_SECRET)

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
- E-commerce integrations
- Government integrations (TGA, ZATCA)
- Agent / driver mobile apps
- Reporting module
- Real database migration applied on Hostinger via `npm run build` (runs `prisma migrate deploy` automatically)

## Key Integrations (planned)
- TGA (Transport General Authority) / Logisti
- ZATCA e-invoicing
- National Address (Saudi)
- Google Maps / location provider
- SMS, WhatsApp Business API
- Payment gateway
- Vehicle tracking devices
- E-commerce platforms: Salla, Zid, Shopify, WooCommerce
