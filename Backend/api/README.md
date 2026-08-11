# UniforTrade API

REST backend for **UniforTrade**, a circular-economy marketplace for the Unifor
campus. It manages listings, the reserve → contact → handoff lifecycle between
two students, user profiles, categories, ratings, notifications and public
statistics.

Part of a larger project — see the [root README](../../README.md) for the
product pitch and the frontend.

---

## Stack

| Concern | Choice |
| --- | --- |
| Language | Java **26** (Gradle toolchain) |
| Framework | Spring Boot **4.1.0** (`spring-boot-starter-webmvc`) |
| Build | Gradle **9.5.1** (wrapper included) |
| Persistence | Spring Data JPA / Hibernate + **MariaDB** |
| Security | Spring Security + **jjwt 0.12.6** (HS256), BCrypt |
| Validation | Jakarta Bean Validation with custom constraints |
| Docs | springdoc-openapi **3.1.0** (Swagger UI) |
| Boilerplate | Lombok |
| Tests | JUnit 5 + MockMvc (82 integration tests) |

---

## Prerequisites

- **JDK 26** (the Gradle toolchain targets 26; older JDKs will not compile)
- **MariaDB** running on `localhost:3306`

> There is no `docker-compose.yml` in this repository. Create the databases
> manually with the SQL below.

### Database setup

The app uses two schemas: one for development, one for the test suite.

```sql
CREATE DATABASE unifortrade      CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE unifortrade_test CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE USER 'unifortrade'@'localhost' IDENTIFIED BY 'admin';
GRANT ALL PRIVILEGES ON unifortrade.*      TO 'unifortrade'@'localhost';
GRANT ALL PRIVILEGES ON unifortrade_test.* TO 'unifortrade'@'localhost';
FLUSH PRIVILEGES;
```

Credentials and the JWT secret live in `src/main/resources/application.properties`.
They are **development-only values committed on purpose** so the project runs
with zero setup; override them with the usual Spring env vars
(`SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_PASSWORD`, `APP_JWT_SECRET`, …)
anywhere real.

---

## Running

```bash
cd Backend/api

./gradlew bootRun     # start on http://localhost:8080
./gradlew build       # compile + test + jar
./gradlew test        # tests only (needs the unifortrade_test schema)
./gradlew bootJar     # -> build/libs/api-0.0.1-SNAPSHOT.jar
```

| Resource | URL |
| --- | --- |
| API | `http://localhost:8080` |
| Swagger UI | `http://localhost:8080/swagger-ui.html` |
| OpenAPI JSON | `http://localhost:8080/v3/api-docs` |

`spring.jpa.hibernate.ddl-auto=create-drop`, so **the schema is rebuilt on every
boot and dropped on shutdown**. There is no migration tooling; `DataSeeder`
repopulates demo data on each start.

### Seeded demo data

Inserted on boot, but only when no category exists yet (so it is idempotent).
5 categories, 3 users and 10 listings (2 of them donations).

| Unifor ID | Password | Name | Role |
| --- | --- | --- | --- |
| `202601` | `demo_password_1` | Ava Martins | USER |
| `202602` | `demo_password_2` | Jordan Lee | USER |
| `202603` | `admin` | Admin Demo | **ADMIN** |

---

## Architecture

Feature-sliced packages under `com.unifortrade.api`, each owning its own
controller / service / repository / entity / DTO / mapper layers, plus a
`common` slice for cross-cutting concerns.

```
src/main/java/com/unifortrade/api/
├── auth/            login, refresh, JWT, roles & permissions
├── category/        listing categories (+ slug generation)
├── listing/         listings, search specifications
│   └── claim/       Claim entity — the reservation record
├── notification/    in-app notifications
├── rating/          user-to-user ratings
├── stats/           public landing-page counters
├── user/            users, profiles, contact info
└── common/          config, BaseEntity, error handling, validation, utils
```

Two conventions worth knowing:

- **Everything soft-deletes.** `BaseEntity` carries `isDeleted`, every entity
  declares `@SQLRestriction("is_deleted = false")`, and no `BaseEntity` subtype
  is ever hard-deleted. `BaseEntity` also supplies the identity `id` and audited
  `createdAt` / `lastUpdatedAt` timestamps.
- **All relationships are unidirectional `@ManyToOne`.** There are no
  `@OneToMany` inverse sides — ownership is queried, not navigated.

---

## Domain model

| Entity | Key fields |
| --- | --- |
| `User` | `uniforId` (unique, 6 digits), `passwordHash`, embedded `Profile` (name, bio, picture) and `ContactInfo` (unique phone + email), `role` |
| `Listing` | `title`, `description`, `type`, `price`, `gallery` (ordered `@ElementCollection`), `status`, `category`, `owner` |
| `Claim` | `listing`, `claimer`, `status`, `resolvedAt` — one row per reservation attempt |
| `Category` | `name`, unique `slug`, `imageUrl` |
| `Rating` | `rater`, `rated`, `score`, `comment` — unique per (rater, rated) pair |
| `Notification` | `user`, `message`, `dismissed`, `linkType`, `linkId` |

**Enums**

- `ListingType` — `SALE`, `DONATION`
- `ListingStatus` — `ACTIVE`, `CLAIMED`, `COMPLETED`
- `ClaimStatus` — `ACTIVE`, `CANCELLED`, `COMPLETED`
- `LinkType` — `LISTING`, `USER`

`type` is never supplied by the client: `Listing.resolveType()` derives it from
the price (`0` → `DONATION`, otherwise `SALE`) on create and on every patch, so
editing a price can flip a listing between the two.

### The transaction lifecycle

This is the core of the product — two students meeting on campus to hand over an
item.

```
        ┌────────┐   POST /{id}/claim    ┌─────────┐  POST /{id}/complete  ┌───────────┐
        │ ACTIVE │ ────────────────────► │ CLAIMED │ ────────────────────► │ COMPLETED │
        └────────┘                       └─────────┘   (owner only)        └───────────┘
             ▲                                │
             └────────────────────────────────┘
                   DELETE /{id}/claim
                (either party may cancel)
```

1. **Claim** — any authenticated user except the owner reserves an `ACTIVE`
   listing. A `Claim` is created and the owner is notified.
2. **Contact** — `GET /{id}/contact` returns *the other party's* phone and
   email, and is restricted to the owner and the current claimer. This is the
   handoff point.
3. **Complete** — only the owner can confirm delivery.
4. **Cancel** — either party can back out while `CLAIMED`; the listing returns
   to `ACTIVE` and the other party is notified.

Ratings are gated on this flow: you can only rate someone you have a
`COMPLETED` claim with, only once, and never yourself. Deleting a listing is
blocked while a claim is active.

---

## API

29 endpoints. Auth column: **Public** = no token needed; **Auth** = any logged-in
user; otherwise the required permission is named.

### Authentication — `/auth`

| Method | Path | Body | Returns | Auth |
| --- | --- | --- | --- | --- |
| POST | `/auth/login` | `LoginRequest(uniforId, password)` | `AuthResponse` | Public |
| POST | `/auth/refresh` | `RefreshRequest(refreshToken)` | `AuthResponse` | Public |
| POST | `/auth/logout` | — | `204` | Public (no-op, see below) |

`AuthResponse` = `{ accessToken, refreshToken, tokenType: "Bearer" }`.

### Listings — `/api/listings`

| Method | Path | Returns | Auth |
| --- | --- | --- | --- |
| GET | `/api/listings` | `PageResponse<ListingSummaryResponse>` | Public |
| GET | `/api/listings/{id}` | `ListingResponse` | Public |
| POST | `/api/listings` | `201` + `ListingResponse` | `listing:create` |
| PATCH | `/api/listings/{id}` | `ListingResponse` | `listing:update:own`\|`:any` |
| DELETE | `/api/listings/{id}` | `204` | `listing:delete:own`\|`:any` |
| POST | `/api/listings/{id}/claim` | `ListingResponse` | `listing:claim` |
| DELETE | `/api/listings/{id}/claim` | `ListingResponse` | `listing:claim` (owner or claimer) |
| POST | `/api/listings/{id}/complete` | `ListingResponse` | `listing:complete` (owner only) |
| GET | `/api/listings/{id}/contact` | `ContactResponse` | `listing:contact` (owner or claimer) |

`GET /api/listings` accepts flat query parameters, combined with `AND`:

| Param | Effect |
| --- | --- |
| `keyword` | case-insensitive match on title **or** description |
| `categoryId`, `ownerId` | exact match |
| `type` | `SALE` \| `DONATION` |
| `status` | `ACTIVE` \| `CLAIMED` \| `COMPLETED` |
| `minPrice`, `maxPrice` | inclusive price bounds |
| `page`, `size`, `sort` | Spring `Pageable` (default size 20) |

Filtering is built with **JPA Criteria Specifications** (`ListingSpecification`):
each filter contributes a predicate only when present, unset filters yield
`null` and are discarded before the predicates are combined. Responses are
wrapped in `PageResponse<T>` = `{ content, page, size, totalElements, totalPages, last }`.

### Users — `/api/users`

| Method | Path | Returns | Auth |
| --- | --- | --- | --- |
| POST | `/api/users` | `201` + `CurrentUserResponse` | **Public — this is registration** |
| GET | `/api/users/{id}` | `ProfileResponse` | Public |
| GET | `/api/users/uniforId/{uniforId}` | `ProfileResponse` | Public |
| PATCH | `/api/users/{id}` | `CurrentUserResponse` | `user:update:any` |
| DELETE | `/api/users/{id}` | `204` | `user:delete:any` |
| GET | `/api/users/me` | `CurrentUserResponse` | Auth |
| PATCH | `/api/users/me` | `CurrentUserResponse` | `user:update:own` |
| DELETE | `/api/users/me` | `204` | `user:delete:own` |

`ProfileResponse` deliberately exposes only `{ id, name }`; contact details are
reachable only through the claim flow. Deleting a user soft-deletes their
listings too, but leaves ratings and claims intact.

### Categories, ratings, notifications, stats

| Method | Path | Returns | Auth |
| --- | --- | --- | --- |
| GET | `/api/categories` | `List<CategoryResponse>` | Public |
| GET | `/api/categories/{id}` | `CategoryResponse` | Public |
| POST | `/api/categories` | `201` + `CategoryResponse` | `category:create` (ADMIN) |
| DELETE | `/api/categories/{id}` | `204` | `category:delete` (ADMIN) |
| POST | `/api/users/{userId}/ratings` | `201` + `RatingResponse` | `rating:create` |
| GET | `/api/users/{userId}/ratings` | `UserRatingsResponse` | Public |
| GET | `/api/users/me/notifications` | `List<NotificationResponse>` | Auth |
| POST | `/api/users/me/notifications/{id}/dismiss` | `NotificationResponse` | Auth |
| GET | `/api/stats` | `StatsResponse` | Public |

`UserRatingsResponse` = `{ ratings, average, count }` (`average` is `null` with
no ratings). `StatsResponse` = `{ completedClaimsCount,
completedSaleClaimsCount, completedDonationClaimsCount, registeredUsersCount }`,
which feeds the landing page counters.

Category slugs are generated by `SlugUtil` — diacritics are stripped
(`Cálculo` → `calculo`), non-alphanumerics collapse to hyphens, and a numeric
suffix is appended on collision. Slugs stay reserved after a soft delete.

---

## Security

`SecurityConfig` is stateless: CSRF disabled, no sessions, and a
`JwtAuthenticationFilter` ahead of the username/password filter.

**Authorization is entirely method-level.** The filter chain uses
`anyRequest().permitAll()` and every protected operation carries a
`@PreAuthorize`. Two consequences worth knowing before you test the API:

- Anything without `@PreAuthorize` is genuinely public.
- An unauthenticated call to a protected endpoint raises `AccessDeniedException`
  and therefore returns **`403 Forbidden`, not `401 Unauthorized`**. `401` is
  reserved for bad credentials and invalid refresh tokens.

### Tokens

| | Access | Refresh |
| --- | --- | --- |
| Lifetime | 60 minutes | 30 days |
| Claims | `sub` (uniforId), `uid`, `jti`, `iss`, `type: access` | `sub`, `jti`, `iss`, `type: refresh` |

Send it as `Authorization: Bearer <accessToken>`.

Authorities are **re-read from the database on every request** rather than
trusted from the token, so a role change takes effect immediately on tokens
already issued. The flip side: refresh tokens are not persisted, so there is no
server-side revocation and `POST /auth/logout` cannot invalidate anything — it
exists so the client can clear its own storage. A `jti` denylist would be the
natural next step.

### Roles and permissions

Two roles, `ROLE_USER` and `ROLE_ADMIN`, mapped to explicit permission strings
(no implicit "admin can do everything").

- **Both roles:** `listing:create`, `listing:update:own`, `listing:delete:own`,
  `listing:claim`, `listing:complete`, `listing:contact`, `rating:create`,
  `user:update:own`, `user:delete:own`
- **ADMIN only:** `listing:update:any`, `listing:delete:any`, `user:update:any`,
  `user:delete:any`, `category:create`, `category:delete`

The `:own` / `:any` split is intentional. The controller only checks that the
caller holds *one of the two*; the service resolves which one actually applies
once the resource is loaded and its owner is known.

---

## Validation and errors

Each validated field has its own composed constraint annotation
(`TitleConstraints`, `PriceConstraints`, `UniforIdConstraints`, …), each with a
nested `Validator`. They share a `required` flag, which is what lets the *same*
annotation serve a create DTO (`required = true`) and a patch DTO
(`required = false`) without duplicating the rules.

| Field | Rule |
| --- | --- |
| `uniforId` | exactly 6 digits |
| `password` | 8–72 chars, at least one letter and one digit |
| `name` | 2–100 chars, letters/spaces/apostrophes/hyphens |
| `title` | 3–100 chars |
| `description` | 10–500 chars |
| `price` | ≥ 0, ≤ 8 integer digits, ≤ 2 decimals |
| `gallery` | 1–10 absolute `http(s)` URLs, ≤ 2048 chars each |
| `score` | integer 1–5 |
| `phoneNumber` | `+` optional, 7–15 digits |

`GlobalExceptionHandler` renders every failure in one shape:

```json
{
  "timestamp": "2026-08-10T12:00:00Z",
  "status": 400,
  "error": "Validation Failed",
  "message": "One or more fields are invalid",
  "details": ["title: Title must be at least 3 characters"]
}
```

`details` is an empty array for non-validation errors. Mappings: `400` bad
request, `401` unauthorized, `403` forbidden / access denied, `404` not found,
`409` conflict (duplicate email or phone, and referential integrity), `500`
otherwise.

---

## Tests

82 integration tests across 9 classes. There are no mocks and no `@WebMvcTest`
slices — every test drives the real stack through `MockMvc` against a real
MariaDB schema.

```bash
./gradlew test
./gradlew test --tests 'com.unifortrade.api.listing.ListingControllerTest'
```

Report: `build/reports/tests/test/index.html`.

`support/IntegrationTest` is the shared base: `@SpringBootTest` +
`@AutoConfigureMockMvc` + `@Transactional` (each test rolls back), plus helpers
for registering and logging in users, minting admins, and creating listings. It
allocates unique 6-digit Unifor IDs from a counter starting at 300000, well
clear of the seeded `202601–202603`.

One rule when adding tests: **the seeder's rows are committed and survive test
rollback**, so never assert on absolute row counts and never hardcode a seeded
ID.

---

## Known gaps

Honest notes rather than surprises:

- `OpenApiConfig` declares a `bearerAuth` scheme but no `@SecurityRequirement`
  is attached to any operation, so Swagger UI renders no padlocks and
  "Try it out" will not send the bearer token on protected routes.
- The catch-all `500` handler returns the raw exception message to the client.
- `logout` is client-side only (see Security).
