# Security Posture — MPRVVN Portal

Security measures implemented in the application, and what the hosting
environment must provide. Aimed at government-portal expectations (GIGW + common
web-security baselines).

## Implemented in the app

### HTTP security headers (`next.config.ts` → `headers()`)
Applied to every route:
- **Content-Security-Policy** — `default-src 'self'`, `frame-ancestors 'none'`,
  `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`,
  `upgrade-insecure-requests`. *(Caveat: `script-src`/`style-src` currently allow
  `'unsafe-inline'` for the JSON-LD tag and Next.js hydration; see follow-ups.)*
- **Strict-Transport-Security** — 2 years, `includeSubDomains; preload`.
- **X-Frame-Options: DENY**, **X-Content-Type-Options: nosniff**,
  **Referrer-Policy: strict-origin-when-cross-origin**,
  **Permissions-Policy** (camera/mic/geolocation/topics disabled),
  **X-DNS-Prefetch-Control: off**.

### Authentication & authorization
- **Auth.js v5**, credentials provider, passwords hashed with **bcrypt** (cost 12).
- **JWT sessions**, 8-hour expiry; secure `__Host-`/`__Secure-` httpOnly,
  SameSite=Lax cookies in production (automatic).
- **Brute-force lockout**: account locks for 15 min after 5 consecutive failed
  logins (`User.failedLoginCount` / `lockedUntil`).
- **No user enumeration**: identical generic error + timing equalization for
  unknown emails.
- **Role-enforced access**: `requireAdmin()` requires `role === ADMIN` and is
  re-checked at the data layer on every admin page and Server Action — not only
  by the proxy's optimistic cookie check.
- Admin routes are **`noindex`** and excluded from the sitemap.

### Input handling & data safety
- Admin writes are **whitelisted** to fields declared in the resource config
  (no mass-assignment); the model is resolved from a fixed registry (no injection).
- Server Actions have built-in CSRF protection (Next.js); Auth.js protects its
  own endpoints.
- Login input validated with **zod**.
- **Error hygiene**: DB/internal errors are logged server-side and never surfaced
  to users; friendly `error`/`global-error`/`not-found` boundaries are in place.
- Content was seeded **only** from the official source document — no fabricated data.

### Secrets
- `.env` is git-ignored; only `.env.example` is tracked. `AUTH_SECRET` and DB
  credentials come from the host's environment/secret manager.

## The host MUST provide

- **TLS** everywhere (HSTS is sent assuming HTTPS); keep `AUTH_TRUST_HOST=true`
  behind the proxy.
- **Edge rate limiting / WAF** for `/admin/login` and form endpoints (app-level
  lockout is a backstop, not a substitute for network-level protection).
- **Database**: least-privilege DB user, encrypted at rest/in transit, backups +
  point-in-time recovery.
- A real contact + expiry in `public/.well-known/security.txt`.

## Recommended follow-ups (not yet implemented)

- **Nonce-based strict CSP** (drop `'unsafe-inline'` for scripts) via `proxy.ts`.
- **Admin audit log** (who changed what, when).
- **MFA / 2FA** for admin accounts; optional CAPTCHA on login.
- **Granular roles** (EDITOR vs ADMIN) if non-admin content editors are added.
- **`npm audit`** in CI; periodic dependency updates.

## Reporting a vulnerability

See `public/.well-known/security.txt`.
