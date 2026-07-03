# MPRVVN — Madhya Pradesh Rajya Van Vikas Nigam Portal

Bilingual (English / हिन्दी) public website **and** content-management admin for
Madhya Pradesh Rajya Van Vikas Nigam Limited. All public content is rendered from
the database and is editable from the admin panel.

> **Deployment:** see **[DEPLOYMENT.md](./DEPLOYMENT.md)**.
> **Security posture:** see **[SECURITY.md](./SECURITY.md)**.

## Tech stack

- **Next.js 16** (App Router, Turbopack, `output: standalone`) + **React 19** + **TypeScript**
- **PostgreSQL** via **Prisma 6** (works with any Postgres: Neon, RDS, Cloud SQL, self-hosted)
- **Auth.js (NextAuth v5)** — credentials + bcrypt, JWT sessions, login lockout
- **Tailwind CSS v4** + **shadcn/ui** + **Framer Motion** + **lucide-react**
- i18n via native `app/[lang]` routing + server dictionaries; DB content localized via a `Translation` overlay (English is the source of truth)

## Prerequisites

- Node.js **>= 20.9** (see `.nvmrc` → 22)
- A PostgreSQL database
- npm

## Environment

Copy `.env.example` → `.env` and fill in:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Pooled/runtime Postgres connection |
| `DIRECT_URL` | Direct connection for `prisma migrate` (same as above if not pooled) |
| `AUTH_SECRET` | Auth.js secret — generate with `npx auth secret` |
| `AUTH_TRUST_HOST` | `true` behind a TLS-terminating proxy |
| `NEXT_PUBLIC_SITE_URL` | Public origin (build-time; canonical/OG/sitemap) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Only for seeding / `create-admin` |

## Local development

```bash
npm install                 # also runs `prisma generate`
npx prisma migrate dev      # apply migrations to your dev DB
npm run db:seed             # ONE-TIME: load PDF content (⚠ wipes existing rows)
npm run create-admin        # create/rotate the admin (reads ADMIN_EMAIL/PASSWORD)
npm run dev                 # https://mprvvn.vercel.app  → redirects to /en
```

Admin panel: `/admin` (sign in at `/admin/login`).

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` / `npm start` | Production build / start |
| `npm run lint` | ESLint |
| `npm run db:migrate:deploy` | Apply migrations (production-safe) |
| `npm run db:seed` | Bootstrap content — **destructive**, fresh DB only |
| `npm run create-admin` | Create/rotate admin without touching content |

## Content & editing

- Every public page reads from the DB; edit via **/admin** (Notices, About,
  Forestry, Deposit/CSR, Auctions, Officers, Page Sections, …).
- **Source of truth:** content was seeded strictly from the official MPRVVN
  document. Hindi shows English until an editor provides a translation — nothing
  is auto-translated or fabricated.
- The homepage "Notices" (What's New / Tenders / Careers / Employee Corner) seeded
  rows are flagged `isSample` and should be replaced with real notices.

## Project layout

```
src/app/[lang]/(site)/[[...slug]]   # all public pages (catch-all, DB-driven)
src/app/admin                       # CMS (protected)
src/lib/public-content.ts           # public data access (+ localize overlay)
src/lib/admin/                      # config-driven CMS engine
src/i18n/                           # locales, dictionaries, loader
prisma/                             # schema, migrations, seed, create-admin
```
