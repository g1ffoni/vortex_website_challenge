# UniforTrade

**A circular-economy marketplace for the Unifor campus.** Students list the
things they no longer need — textbooks, scientific calculators, lab coats,
electronic components, furniture — for sale or for free, and other students
claim them, arrange a handoff on campus, and rate each other afterwards.

Built for the **Laboratório Vortex (UNIFOR)** full-stack internship challenge.

> Every semester the same textbooks get thrown away while incoming students buy
> them new. UniforTrade closes that loop inside the one place where buyer and
> seller already meet every day: the campus itself.

| | |
| --- | --- |
| 🖥️ **Landing page** | Desktop marketing site with live statistics and a filterable public showcase |
| 📱 **PWA** | Installs to a phone's home screen, works offline for already-loaded data |
| 🔌 **API** | 29 REST endpoints, JWT auth, 82 integration tests |

---

## Live demo

| | |
| --- | --- |
| Frontend | _not deployed — add link here_ |
| API | _not deployed — add link here_ |
| Swagger UI | `http://localhost:8080/swagger-ui.html` when running locally |

<!-- TODO (optional bonus): if you deploy, put the real URLs above.
     Frontend → Vercel/Netlify · API → Render/Railway/Fly.io -->

<!-- TODO: add 2–3 screenshots — desktop landing page, mobile listing form,
     and the install-to-home-screen prompt. They carry a lot of weight in a
     README and take five minutes to capture. -->

---

## How it works

The heart of the product is a two-sided handoff between students:

```
   Ava lists a calculator          Jordan reserves it         They swap contact details
            │                              │                            │
            ▼                              ▼                            ▼
      ┌──────────┐                   ┌───────────┐              ┌──────────────┐
      │  ACTIVE  │ ────────────────► │  CLAIMED  │ ───────────► │  COMPLETED   │
      └──────────┘   POST /claim     └───────────┘  POST        └──────────────┘
            ▲                              │      /complete            │
            └──────────────────────────────┘    (owner confirms)       ▼
                    DELETE /claim                              they can now rate
                (either side can back out)                       each other
```

Contact details are never public. They are released only to the two people
involved in an active claim, which keeps the marketplace usable without exposing
every student's phone number.

---

## Architecture

```
┌─────────────────────────┐         ┌──────────────────────────┐       ┌───────────┐
│   Next.js 16 (PWA)      │  HTTPS  │   Spring Boot 4 REST API │  JDBC │  MariaDB  │
│                         │ ──JSON─►│                          │ ─────►│           │
│  App Router · React 19  │◄────────│  JWT · JPA · Validation  │◄──────│  8 tables │
│  SWR · CSS Modules      │         │  Specifications          │       │           │
│  Service Worker         │         └──────────────────────────┘       └───────────┘
└─────────────────────────┘                     │
         ▲                                      │ springdoc
         │        Orval codegen                 ▼
         └────────────────────────────── openapi.yaml
```

The OpenAPI schema is the contract between the two halves: the backend publishes
it, and Orval generates a fully typed TypeScript client from it, so a change to
a backend DTO surfaces as a compile error in the frontend.

---

## Tech stack

### Backend
Java 26 · Spring Boot 4.1.0 · Spring Security · Spring Data JPA · Hibernate ·
MariaDB · jjwt 0.12.6 · Jakarta Bean Validation · springdoc-openapi · Lombok ·
Gradle 9.5.1 · JUnit 5 + MockMvc

### Frontend
Next.js 16.3.0 (App Router) · React 19.2.8 · TypeScript 5 · SWR 2.5 ·
Orval 8.23 + axios · CSS Modules · hand-written Service Worker

---

## Running it locally

Three steps, in order. You need **JDK 26**, **Node.js 20+** and **MariaDB**.

### 1. Database

```sql
CREATE DATABASE unifortrade      CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE unifortrade_test CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE USER 'unifortrade'@'localhost' IDENTIFIED BY 'admin';
GRANT ALL PRIVILEGES ON unifortrade.*      TO 'unifortrade'@'localhost';
GRANT ALL PRIVILEGES ON unifortrade_test.* TO 'unifortrade'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Backend → `http://localhost:8080`

```bash
cd Backend/api
./gradlew bootRun
```

The schema is created on boot and seeded with 5 categories, 3 users and
10 listings.

### 3. Frontend → `http://localhost:3000`

```bash
cd Frontend/unifortrade
npm install
npm run dev
```

### Demo logins

| Unifor ID | Password | Role |
| --- | --- | --- |
| `202601` | `demo_password_1` | User (Ava Martins) |
| `202602` | `demo_password_2` | User (Jordan Lee) |
| `202603` | `admin` | **Admin** |

To exercise the full flow, reserve one of Ava's listings while logged in as
Jordan.

### Testing the PWA

The service worker is disabled in development on purpose (see the
[frontend README](Frontend/unifortrade/README.md#pwa)). To install the app or
test offline behaviour:

```bash
cd Frontend/unifortrade
npm run build && npm start
```

Then open `http://localhost:3000` in Chrome DevTools' device toolbar → the
install prompt appears, and Application → Service Workers shows it active.

---

## Repository layout

```
.
├── Backend/api/              Spring Boot REST API      → see its README
│   └── src/main/java/com/unifortrade/api/
│       ├── auth/ category/ listing/ notification/
│       ├── rating/ stats/ user/        feature slices
│       └── common/                     config, errors, validation
│
├── Frontend/unifortrade/     Next.js PWA               → see its README
│   ├── src/app/              routes + manifest
│   ├── src/components/       UI, layout, PWA, sections
│   ├── src/features/         domain hooks
│   ├── src/lib/              API client, auth, formatting
│   └── public/sw.js          service worker
│
└── README.md                 you are here
```

📘 **[Backend documentation](Backend/api/README.md)** — full endpoint reference,
domain model, auth and permissions, validation rules.

📗 **[Frontend documentation](Frontend/unifortrade/README.md)** — routes, PWA
and caching strategies, data layer, design tokens.

---

## Requirements checklist

### Mandatory

| Requirement | Status | Where |
| --- | --- | --- |
| Structured REST API | ✅ | 29 endpoints, 8 controllers |
| CRUD for listings (create, list, filter, delete) | ✅ | `ListingController` |
| Working persistence | ✅ | MariaDB via Spring Data JPA |
| JSON in and out | ✅ | Throughout |
| Modern frontend framework | ✅ | Next.js 16 + React 19 |
| Valid `manifest.json` | ✅ | `src/app/manifest.ts` → `/manifest.webmanifest` |
| Service worker, installable | ✅ | `public/sw.js` |
| Full responsiveness | ✅ | Mobile-first, breakpoints at 640/768/1024px |

### Bonus

| Requirement | Status | Where |
| --- | --- | --- |
| JWT authentication | ✅ | Access + refresh, single-flight refresh on the client |
| Robust error handling and validation | ✅ | `GlobalExceptionHandler` + per-field constraint annotations |
| Real relational database | ✅ | MariaDB |
| Service-worker caching / offline | ✅ | Three caches, cache-first and network-first strategies |
| TypeScript on the frontend | ✅ | `strict` mode, typed API client |
| Polished UI, loading states, transitions | ✅ | Design-token system, skeletons, spinners, empty states |
| Deployment | ⬜ | Not deployed |

Beyond the brief: the reserve → contact → confirm lifecycle, a ratings system
gated on completed transactions, in-app notifications, admin role and
permissions, soft deletes across every entity, and 82 integration tests.

---

## 🤖 Diário de Bordo da IA

### Utilized Tools

Claude — architecture discussions, debugging, and exploring implementation alternatives, especially around the Next.js frontend, API communication, PWA caching, and the overall separation of responsibilities between frontend and backend.

Claude Code — working directly with the codebase to investigate bugs, understand existing implementations, make targeted changes, and iterate on frontend and backend code.

### Prompt Engineering Strategy

>how should i write my sw file? what should i consider? it's my first time doing it

>what advantage does SWR provide over the regular fetch() API?

>is there a way to auto generate typescript objects from my spring boot DTOs?

### Critical Thinking

One question I had while using AI was about the caching method used by the service worker. In the beginning, the AI recommended that some of the API calls follow a cache-first strategy because it would allow the app to function better offline.

Initially, it sounded reasonable, but I quickly noticed that the chosen method could create problems for this project. API listings can frequently be updated but if I opt for the response that comes from the cache, I could show old listings even if new data is already available.

I realized this after considering what would happen when one user launches the app after another user has created, changed, or deleted a listing. The cache-first approach would rather present an outdated response than update information from the API.

I made the service worker call the API using the network-first strategy to make sure the app gets the most recent information from the backend server rather than from the cache. I used more or less the same method for navigating pages while keeping the cache-first strategy for other static assets and images since those items don't require updating in the same way.

---

## Author

<!-- TODO: your name, course/semester, and GitHub/LinkedIn links. -->

Developed for the Laboratório Vortex 2026 selection process.
