# Deployment Guide — MPRVVN Portal

This app is host-agnostic. It builds to a self-contained Next.js **standalone**
server and ships with a **Dockerfile**. Deploy it on any infrastructure that can
run Node 20.9+ (VM, container platform, Kubernetes, or a Node PaaS) with a
PostgreSQL database.

---

## 1. Provision

- A **PostgreSQL** database (managed or self-hosted). Note the connection string.
- A runtime that can serve Node and terminate TLS (reverse proxy / load balancer).

## 2. Configure environment

Set these in your platform's secret manager (do **not** commit `.env`):

```
DATABASE_URL=postgresql://USER:PASS@HOST:5432/DB?sslmode=require
DIRECT_URL=postgresql://USER:PASS@HOST:5432/DB?sslmode=require
AUTH_SECRET=<output of: npx auth secret>
AUTH_TRUST_HOST=true
NEXT_PUBLIC_SITE_URL=https://www.your-domain.gov.in
```

> `NEXT_PUBLIC_SITE_URL` is inlined at **build time** (canonical URLs, OpenGraph,
> sitemap). Set it before building. For Docker, pass `--build-arg NEXT_PUBLIC_SITE_URL=…`.

## 3. Database: migrate, then bootstrap once

```bash
npm ci                      # installs deps; postinstall runs `prisma generate`
npm run db:migrate:deploy   # applies prisma/migrations to your DB (non-destructive)
```

**First-time content** (fresh database only — this is destructive, it wipes rows):

```bash
ADMIN_EMAIL=admin@your-domain.gov.in ADMIN_PASSWORD='<strong-password>' npm run db:seed
```

Or, if you migrate content another way, **skip the seed** and just create the admin:

```bash
ADMIN_EMAIL=admin@your-domain.gov.in ADMIN_PASSWORD='<strong-password>' npm run create-admin
```

> ⚠ Never run `npm run db:seed` against a database that already has real content —
> it calls `reset()` and deletes all rows. Use `create-admin` for routine admin
> changes; it never touches content.

## 4. Build & run

**Node (standalone):**

```bash
npm run build
# serve:
node .next/standalone/server.js     # listens on $PORT (default 3000), $HOSTNAME
```

**Docker:**

```bash
docker build --build-arg NEXT_PUBLIC_SITE_URL=https://www.your-domain.gov.in -t mprvvn .
docker run -p 3000:3000 --env-file .env mprvvn
# run migrations against your DB from the image when needed:
docker run --env-file .env mprvvn npx prisma migrate deploy
```

Put the app behind your TLS-terminating reverse proxy (nginx / ALB / API gateway).
Keep `AUTH_TRUST_HOST=true` so Auth.js trusts the forwarded host.

## 5. Post-deploy checklist

- [ ] `https://DOMAIN/` redirects to `/en`; `/hi` works.
- [ ] `/admin/login` works; you can sign in with the created admin.
- [ ] **Change the admin password** from the placeholder via `create-admin`.
- [ ] Security headers present (`curl -I https://DOMAIN` → HSTS, CSP, X-Frame-Options…).
- [ ] `https://DOMAIN/robots.txt` and `/sitemap.xml` resolve with your real domain.
- [ ] `.well-known/security.txt` updated with a real contact + expiry.
- [ ] Replace sample homepage notices (flagged `isSample`) via the admin panel.
- [ ] DB backups / point-in-time recovery enabled on your Postgres.

## 6. Notes

- **Migrations** are the source of schema truth (`prisma/migrations`). Always use
  `db:migrate:deploy` in production — never `migrate dev` (it can reset).
- **Hindi content:** the `Translation` table holds locale overlays; until filled,
  Hindi pages fall back to English. A per-record translation editor is a planned
  enhancement.
- **Media:** image fields are URLs today (no upload pipeline yet). External image
  hosts are allowed by `next.config.ts` `images.remotePatterns`.
