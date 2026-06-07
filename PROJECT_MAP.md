# RAMSA ERP — Project Map

## Overview
Cloud-based ERP system for **Ramsa Shipping & Logistics** company operating in Saudi Arabia. Manages shipments, fleet, drivers, agents, warehouses, financials, and integrations with government entities (TGA, Logisti, ZATCA).

## Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Node.js:** 22+
- **Linting:** ESLint

## Brand Identity
| Token | Value |
|---|---|
| Primary | `#4B118F` (Purple) |
| Primary Dark | `#2D075F` |
| Accent | `#FF7900` (Orange) |
| Accent Light | `#FF9E2C` |
| Background | `#F7F7FA` |
| Text | `#17131F` |
| Text Secondary | `#6B6873` |
| Success | `#16A56A` |
| Error | `#D93B45` |

## Project Structure

```
D:\RMSA
├── public/
│   ├── logo.svg              # Company logo
│   └── ...                   # Other static assets
├── src/
│   ├── app/
│   │   ├── globals.css       # Global styles + brand design tokens
│   │   ├── layout.tsx        # Root layout (fonts, metadata, RTL)
│   │   └── page.tsx          # Homepage
│   └── components/
│       └── ui/
│           ├── badge.tsx
│           ├── button.tsx
│           ├── card.tsx
│           ├── input.tsx
│           └── page-header.tsx
├── .gitignore
├── eslint.config.mjs
├── logo.svg                  # Source logo file
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── PRD-رمسا-ERP.md           # Product Requirements Document (Arabic)
├── PROJECT_MAP.md            # This file
├── tsconfig.json
└── ...
```

## Completed: Brand Identity & UI Foundation
- [x] Design tokens defined in Tailwind v4 `@theme`
- [x] Inter (Latin) + Noto Sans Arabic fonts via `next/font/google`
- [x] RTL-first layout (`dir="rtl"`, `lang="ar"`)
- [x] Logo served from `public/logo.svg`
- [x] SVG favicon pointing to logo
- [x] UI primitives: Button, Input, Card, Badge, PageHeader
- [x] Brand homepage with Arabic/English copy

## Platforms (future phases)
1. **ERP Admin Panel** — Web dashboard
2. **Client Portal** — Web portal for B2B/B2C clients
3. **Agent App** — Mobile app for pickup/delivery agents
4. **Driver App** — Mobile app for inter-city drivers
5. **API** — Integration APIs for clients & e-commerce

## Development Phases

### Phase 1 — MVP (current scope)
- Users, roles, permissions
- Customers, contracts, pricing
- Branches, warehouses
- Shipment creation, labels, barcodes
- Pickup requests, sorting, loading/unloading
- Trips, vehicles, drivers
- Agent app, basic driver app
- Tracking, POD, COD
- Basic invoicing, expenses
- Basic reports, notifications
- Audit log
- TGA integration layer
- E-invoicing readiness

### Phase 2
- Full accounting, maintenance, fuel
- Advanced COD settlement
- Client portal, customer API, webhooks
- Bulk upload, e-commerce integrations
- Route optimization, tracking devices
- Profitability reports, customer service tickets
- Lost/damaged management

### Phase 3
- AI route optimization, delay prediction
- Volume forecasting, auto vehicle assignment
- Fraud detection, OCR document reading
- BI dashboards, customer mobile app
- Pickup/delivery points, smart lockers
- International shipping

## Key Integrations
- TGA (Transport General Authority) / Logisti
- ZATCA e-invoicing
- National Address (Saudi)
- Google Maps / location provider
- SMS, WhatsApp Business API
- Payment gateway
- Vehicle tracking devices
- Barcode scanners, label printers
- E-commerce platforms: Salla, Zid, Shopify, WooCommerce
