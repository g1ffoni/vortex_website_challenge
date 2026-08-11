# UniforTrade Frontend

The web client for **UniforTrade**, a circular-economy marketplace for the
Unifor campus. One codebase serves two experiences: a rich marketing landing
page on desktop, and an installable app-shell PWA on mobile.

Part of a larger project — see the [root README](../../README.md) for the
product pitch and the [API docs](../../Backend/api/README.md) for the backend.

---

## Stack

| Concern | Choice |
| --- | --- |
| Framework | **Next.js 16.3.0**, App Router, React Compiler enabled |
| UI | **React 19.2.8** |
| Language | **TypeScript 5** (`strict`) |
| Data fetching | **SWR 2.5** |
| API client | **Orval 8.23** codegen + **axios**, from `openapi.yaml` |
| Styling | Plain **CSS Modules** on a two-tier design-token system |
| PWA | Hand-written service worker (no Workbox) + Next metadata manifest |

No CSS framework, no component library, no state-management library — React,
SWR and CSS Modules only.

---

## Getting started

**Prerequisites:** Node.js 20+ and the [backend](../../Backend/api/README.md)
running on `http://localhost:8080`.

```bash
cd Frontend/unifortrade

npm install
npm run dev          # http://localhost:3000
```

### Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server on port 3000 |
| `npm run build` | Production build |
| `npm start` | Serve the production build — **required to test the PWA** |
| `npm run lint` | ESLint (flat config, `core-web-vitals` + TypeScript) |
| `npm run generate:api` | Regenerate the typed API client from `openapi.yaml` |

### Environment

```ini
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Only this one variable. It falls back to `http://localhost:8080` if unset, so
local development works out of the box.

---

## Routes

| Route | Rendering | Purpose | Auth |
| --- | --- | --- | --- |
| `/` | Server | Landing page — hero, live stats, how-it-works, categories, latest listings, CTA | Public |
| `/listings` | Server + client browser | Search, filter by type and category, paginated grid | Public |
| `/listings/[id]` | Server + client detail | Gallery, status, owner, and the reserve / cancel / confirm actions | Public to read |
| `/listings/new` | Client | Create-listing form with live image preview and a donation toggle | Required |
| `/dashboard` | Client | "My listings" — the user's own items, newest first | Required |
| `/login`, `/register` | Client | Credential forms | Public |
| `/profile/[id]` | Server + client view | Avatar, rating average, reviews; edit form on your own profile | Public to read |
| `/manifest.webmanifest` | Metadata route | Generated from `src/app/manifest.ts` | Public |

Auth-gated pages **render a locked panel rather than redirecting**, so an
unauthenticated visitor always sees where they are and a way in. There is no
middleware and no server-side auth check — tokens live in `localStorage`, which
is a deliberate simplification for the scope of this challenge.

---

## PWA

The requirement is that the app installs to a phone's home screen and behaves
like a native app. Three pieces deliver that.

### 1. Manifest — `src/app/manifest.ts`

Typed as `MetadataRoute.Manifest` and served at `/manifest.webmanifest`.

| Field | Value |
| --- | --- |
| `name` | UniforTrade — Circular economy on campus |
| `short_name` | UniforTrade |
| `start_url` / `scope` | `/` |
| `display` | `standalone` |
| `orientation` | `portrait-primary` |
| `theme_color` | `#2563eb` |
| `background_color` | `#f8fafc` |
| `icons` | 192×192, 512×512, plus a 512×512 **maskable** icon |

`layout.tsx` supplies the matching `viewport.themeColor`, the Apple
web-app meta tags and a 180×180 `apple-touch-icon`.

### 2. Service worker — `public/sw.js`

Written by hand so the caching behaviour is explicit. Three versioned caches,
all keyed off a single `VERSION` constant — bump it and `activate` purges
everything older:

| Cache | Holds |
| --- | --- |
| `unifortrade-static-v1` | `/_next/static/*` bundles and images |
| `unifortrade-pages-v1` | Visited HTML pages |
| `unifortrade-api-v1` | API responses |

**Lifecycle:** `install` precaches `/offline.html` and the 192px icon using
`allSettled` (so one missing file cannot fail the whole install), then
`skipWaiting()`. `activate` deletes every cache not in the current set, then
`clients.claim()` to take over already-open tabs.

**Fetch routing**, in order:

1. Not a `GET` → ignored entirely. Mutations must never be cached or replayed.
2. **Navigation** → *network-first* into the pages cache, falling back to the
   cached page and finally to `/offline.html`.
3. **`/_next/static/*` or an image** → *cache-first*. Safe because Next
   content-hashes these filenames, so a cached name can never be stale.
4. **`/api/*` or `/auth/*`** → *network-first* into the API cache, so
   previously-loaded listings stay viewable offline.
5. Anything else → straight to the network, untouched.

Two things to be aware of: the API cache has no expiry or size cap, and API
requests are matched on **pathname only**, so cross-origin calls to the backend
on `:8080` match too — which is what makes offline viewing work in development.

### 3. Registration and install prompt

`ServiceWorkerRegister` registers `/sw.js` on mount — **but only in
production**. In development it does the opposite, actively unregistering any
existing worker and clearing caches, because the cache-first rule for
`/_next/static/*` assumes content-hashed filenames and `next dev` does not
produce them; a stale dev bundle would otherwise be served forever.

> **To test the PWA you must run `npm run build && npm start`.** The service
> worker never registers under `npm run dev`.

`InstallPrompt` captures the `beforeinstallprompt` event, suppresses Chrome's
default mini-infobar and shows a custom banner instead, positioned above the
bottom navigation on mobile. iOS/Safari never fires that event, so the banner
stays hidden there and users install via *Share → Add to Home Screen*.

`public/offline.html` is a self-contained fallback page with inline CSS and a
retry button, so it renders with zero network access.

---

## Data layer

```
openapi.yaml ──orval──► src/lib/api/generated/**  ──wrapped by──►  src/features/**
                              (do not edit)                        (what pages import)
```

**`src/lib/api/generated/`** is generated by Orval in `tags-split` mode — one
folder per backend controller, plus typed models. Every request is routed
through the custom mutator in `src/lib/api/mutator.ts`. This directory is
excluded from linting and should never be hand-edited; run `npm run generate:api`
after changing `openapi.yaml`.

**`src/lib/api/mutator.ts`** is where the cross-cutting HTTP behaviour lives:

- an axios instance based on `NEXT_PUBLIC_API_URL`;
- a request interceptor attaching `Authorization: Bearer <accessToken>`;
- a **single-flight 401 refresh** — on a 401 the original request is retried
  once after refreshing, and concurrent 401s share one in-flight refresh call
  rather than each firing their own. The refresh itself uses bare `axios` to
  avoid re-entering its own interceptor;
- an `ApiError` class carrying `status` and the backend's `details[]`, which is
  what lets forms surface per-field validation messages.

**`src/features/<name>/`** wraps the generated hooks in named, documented ones —
`useListings`, `useCreateListing`, `useClaimListing` — and re-exports them from a
barrel. Components import from the barrel and never from `generated/` directly.
This exists partly to give Orval's numeric-suffix names (`useCreate2`,
`useDelete1`) meaningful identities.

One hook deliberately breaks the pattern. `use-listings.ts` calls the API
directly instead of using the generated search hook: OpenAPI models the filter
and pageable arguments as nested objects, but Spring binds them as **flat**
top-level query parameters. Axios' default serializer would emit
`filters[keyword]=…`, which Spring silently ignores — so the query string is
built manually.

Cache invalidation is explicit rather than global: mutations call `mutate()` on
the specific query they affect. Logging out is the one broad invalidation, and
wipes the entire SWR cache so nothing leaks on a shared machine.

### Auth state

`src/features/auth/context/auth-context.tsx` treats `localStorage` as an
external store via **`useSyncExternalStore`**, rather than mirroring it into
`useState`. That choice buys two things: the server snapshot is `null` so SSR
and first client render agree (no hydration mismatch), and subscribing to both
the native `storage` event and a custom event gives **cross-tab sync** for free.

The derived user object is memoised at module level. Returning a fresh object on
each store read would fail React's `Object.is` check and loop the component
forever — worth knowing before refactoring that file.

The access token is decoded client-side (payload only, no signature check —
the backend is the only verifier) purely to read the user's id and Unifor ID.

---

## Design system

Two tiers of CSS custom properties, then CSS Modules per component.

**`styles/abstracts/primitive-variables.css`** — raw values with no meaning
attached: a full **OKLCH** colour ramp (22 families × 50–950), a numeric spacing
scale where 8px is the base unit, font sizes, radii, border widths and z-index
layers.

**`styles/abstracts/functional-variables.css`** — semantic aliases following
`--{category}-{property}-{context}-{emphasis}-{state}`, e.g.
`--color-background-brand-bold-hovered`, `--color-text-subtle`,
`--elevation-shadow-overlay`. **Components reference only this tier**, never a
raw primitive, so the whole palette can be retuned in one file.

`styles/globals/` then applies those tokens: a modern `reset.css`, `base.css`
for element defaults and focus rings, and `typography.css` mapping the semantic
type scale onto headings.

### Responsiveness

Mobile-first, with `min-width` breakpoints at **640px**, **768px** and
**1024px**. The desktop-to-app-shell transformation is mostly two rules that
mirror each other at 768px:

- `Header`'s horizontal nav is hidden below 768px and replaced by a hamburger.
- `BottomNav` — a four-tab bar with a raised centre "List" action — is fixed to
  the bottom below 768px and hidden above it.

Both bars use translucent backgrounds with `backdrop-filter`, and the bottom bar
and install prompt respect `env(safe-area-inset-bottom)` so nothing collides
with the iPhone home indicator.

There is currently **no dark mode**.

---

## Project structure

```
src/
├── app/                  routes (App Router) + manifest.ts
├── components/
│   ├── page-layout/      Header, Footer, BottomNav, NotificationBell
│   ├── pwa/              ServiceWorkerRegister, InstallPrompt
│   ├── sections/         landing-page sections
│   └── ui/               Button, Field, Badge, ItemCard, Spinner, Alert, …
├── features/             one folder per domain: hooks + barrel
├── lib/
│   ├── api/              generated client + axios mutator
│   ├── auth/             token storage, JWT decoding
│   └── format.ts         price and date formatting
└── styles/               design tokens + globals

public/                   icons, sw.js, offline.html
openapi.yaml              codegen source of truth
```

---

## Known gaps

- `useUpdateListing` exists but no edit-listing screen consumes it.
- Creating a listing does not invalidate the listings cache; the flow navigates
  to the new item's detail page instead.
- Notifications poll every 30 seconds rather than using websockets.
- Prices are formatted as BRL under an `en-US` locale, so they render as
  `R$ 45.00` rather than `R$ 45,00`.
