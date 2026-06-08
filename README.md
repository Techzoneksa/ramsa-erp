# RAMSA ERP

Cloud-based ERP system for **Ramsa Shipping & Logistics** (Saudi Arabia).

## Environment Variables

| Variable | Purpose | Example |
|---|---|---|
| `DATABASE_URL` | **Pooled connection** — used by Prisma at runtime via pgBouncer (port 6543) | `postgresql://user:pass@pooler-host:6543/dbname?pgbouncer=true` |
| `DIRECT_URL` | **Direct connection** — used by Prisma for migrations only (port 5432, bypasses pgBouncer) | `postgresql://user:pass@direct-host:5432/dbname` |
| `AUTH_SECRET` | Auth.js encryption secret | base64 string (32 bytes) |
| `AUTH_URL` | Application base URL | `https://ramsa-erp.com` |
| `SUPABASE_URL` | Supabase project URL (optional) | `https://project.supabase.co` |
| `SUPABASE_ANON_KEY` | Supabase anonymous key (optional) | `eyJhbGciOiJIUzI1NiIs...` |

> **`DATABASE_URL` vs `DIRECT_URL`:** Prisma uses the pooled `DATABASE_URL` for query execution at runtime, but certain operations like `prisma migrate deploy` require a direct connection. Setting `directUrl = env("DIRECT_URL")` in `prisma/schema.prisma` tells Prisma to use the direct connection for schema migrations while keeping the pooled connection for everything else.  
> [Prisma docs — directUrl](https://www.prisma.io/docs/orm/prisma-schema/overview/data-sources#direct-connections-for-migrations)

## Tech Stack

- **Framework:** Next.js 16 (App Router), TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** PostgreSQL + Prisma v6 ORM
- **Auth:** Auth.js v5 (next-auth@beta) + Prisma Adapter + JWT
- **Node.js:** 22+

See [PROJECT_MAP.md](./PROJECT_MAP.md) for architecture details.
