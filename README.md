# JetX B2B Platform

A comprehensive B2B management dashboard for car wash operations, built with Next.js 16, React 19, TypeScript, Tailwind CSS 4, and Prisma 7.

## Features

- **Dashboard** — Real-time KPIs, revenue charts, site status overview
- **Operators** — Multi-operator management with contract tracking and revenue share
- **Sites** — Multi-site monitoring with equipment, CCTV, maintenance, and pricing per site
- **Customers** — Customer profiles with vehicles, transactions, memberships, and segmentation
- **Transactions** — Full wash transaction history with filtering and analytics
- **Hardware** — Machine monitoring with sensor data, alerts, and maintenance records
- **Memberships** — Subscription plans, billing records, site assignments, and analytics
- **Pricing** — Pricing templates with wash prices, add-ons, combos, and dynamic pricing rules
- **Marketing** — Campaigns, promo codes, notification templates, and analytics
- **Tickets** — Support ticket system with messaging, priority, and category tracking
- **Team** — Team members, roles with granular permissions, invitations, and activity logs
- **Reports** — Scheduled reports with delivery history (revenue, operations, customers)
- **CCTV** — Camera management with recording playback and storage monitoring
- **Knowledge Base** — Internal articles for support and operations
- **Account Settings** — API keys, integrations, webhooks, notifications, security

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| UI | React 19 |
| Styling | Tailwind CSS 4 |
| Database | PostgreSQL (Supabase) |
| ORM | Prisma 7 (50 enums, 46 models) |
| Validation | Zod 4 |
| i18n | next-intl (English + Traditional Chinese, 3000+ keys) |
| Theme | next-themes (light/dark mode) |
| Charts | Custom SVG (BarChart, DonutChart, StackedBarChart) |
| Tables | Custom DataTable with sort, search, pagination |

## Project Structure

```
src/
├── app/
│   ├── (auth)/           # Auth pages (login, register, forgot-password, etc.)
│   ├── account/          # Account settings (API, integrations, notifications, security)
│   ├── api/              # 32 RESTful API routes (14 resource groups)
│   ├── cctv/             # CCTV monitoring
│   ├── customers/        # Customer management + [id] detail pages
│   ├── hardware/         # Machine monitoring, alerts, map view
│   ├── knowledge/        # Knowledge base articles
│   ├── marketing/        # Campaigns, promotions, notifications, analytics
│   ├── memberships/      # Plans, subscribers, site assignments, analytics
│   ├── operators/        # Operator management + [id] detail pages
│   ├── pricing/          # Pricing templates, add-ons, dynamic rules
│   ├── reports/          # Revenue, operations, customer, scheduled reports
│   ├── sites/            # Site management + [id] detail pages (6 sub-pages each)
│   ├── team/             # Team members, roles, invitations, activity log
│   ├── tickets/          # Support tickets + [id] detail + create
│   └── transactions/     # Transaction history + [id] detail
├── components/
│   ├── auth/             # Auth form components
│   ├── layout/           # Sidebar, Topbar, DashboardLayout
│   └── ui/               # BarChart, DataTable, DonutChart, StackedBarChart, TabNav, ThemeToggle, LanguageSwitcher
├── generated/prisma/     # Prisma generated client (auto-generated, do not edit)
├── i18n/                 # next-intl request config
├── lib/
│   ├── data.ts           # Static mock data (used by pages)
│   ├── prisma.ts         # Prisma client singleton
│   ├── services/         # 14 service files (data access layer via Prisma)
│   └── validations/      # Zod schemas for API input validation
messages/
├── en.json               # English translations (3000+ keys)
└── zh-TW.json            # Traditional Chinese translations
prisma/
├── schema.prisma         # Database schema (50 enums, 46 models)
└── seed.ts               # Seed script (populates all mock data)
```

## Routes

**64 page routes** across 15 modules + **32 API routes** across 14 resource groups = **96 total routes**.

### API Endpoints

| Resource | Routes | Methods |
|----------|--------|---------|
| `/api/operators` | collection + `[id]` | GET, POST, PATCH, DELETE |
| `/api/sites` | collection + `[id]` | GET, POST, PATCH, DELETE |
| `/api/customers` | collection + `[id]` | GET, POST, PATCH, DELETE |
| `/api/transactions` | collection + `[id]` | GET, POST, PATCH |
| `/api/tickets` | collection + `[id]` + `[id]/messages` | GET, POST, PATCH |
| `/api/hardware` | collection + `[id]` + `[id]/alerts` + `[id]/maintenance` | GET, PATCH, POST |
| `/api/memberships/plans` | collection + `[id]` | GET, POST, PATCH |
| `/api/memberships/subscriptions` | collection + `[id]` | GET, POST, PATCH |
| `/api/pricing` | collection + `[id]` | GET, POST, PATCH |
| `/api/marketing/campaigns` | collection + `[id]` | GET, POST, PATCH |
| `/api/marketing/promotions` | collection + `[id]` | GET, POST, PATCH |
| `/api/team` | collection + `[id]` + `/invitations` | GET, POST, PATCH |
| `/api/reports` | collection + `[id]` | GET, POST, PATCH |
| `/api/knowledge` | collection + `[id]` | GET, POST, PATCH, DELETE |

## Getting Started

### Prerequisites

- Node.js 20+
- npm (or yarn/pnpm/bun)
- A Supabase project (free tier works) for database

### Installation

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate
```

### Database Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Go to Project Settings > Database > Connection string
3. Create `.env.local`:

```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:6543/postgres?pgbouncer=true"
```

4. Push the schema and seed data:

```bash
npx prisma db push
npx prisma db seed
```

5. Verify with Prisma Studio:

```bash
npx prisma studio
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

```bash
npm run dev       # Start development server (Turbopack)
npm run build     # Production build
npm start         # Start production server
npm run lint      # ESLint
npx prisma studio # Visual database browser
npx prisma db push   # Push schema changes to database
npx prisma db seed   # Seed database with mock data
npx prisma generate  # Regenerate Prisma client after schema changes
```

## Deployment

### Vercel (Recommended)

1. Import your repository at [vercel.com/new](https://vercel.com/new)
2. Add `DATABASE_URL` environment variable
3. Deploy — Vercel auto-detects Next.js

### Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string (Supabase) |

## License

MIT
