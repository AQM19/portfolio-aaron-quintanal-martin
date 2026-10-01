# Content architecture for the read-only portfolio

This web is a read-only frontend. The desktop admin (**AQPortfoil**, separate repository) owns the CRUD and
publishes immutable, versioned snapshots: one JSON document per language. The web never writes anything.

```
AQPortfoil (WPF) ──publish──▶ Neon: admin.published_snapshots
                                   │ view (current version only)
                                   ▼
                              public_api.published_content ──SELECT (web_reader)──▶ this web
                              content.<lang>.json (export)  ──HTTP──────────────────▶ this web
```

## The contract

The payload format is defined by the admin in `docs/WEB_CONTRACT.md` (source of truth) and mirrored here:

| File | Role |
|---|---|
| `src/core/content/contract.ts` | TypeScript types of `PortfolioContent` and `parsePortfolioContent`, which validates every payload before it is used. |
| `src/core/content/adapters.ts` | Maps the contract to the view models the components already use (`Project`, `Career`, `Certification`, `Skill`, `SocialLink`). |
| `src/core/content/content-source.ts` | Reads the content (`neon`, `postgres`, `json` or `local`), caches it and exposes `loadProjects`, `loadCareer`, `loadCertifications`, `loadSkills`, `loadSocialLinks`, `loadProfile`. |
| `src/core/content/rich-text.ts` | Sanitizes the HTML of long texts (same allowlist as the admin) and fills in `{age}`. |
| `src/core/content/image-hosts.ts` | Remote image origins allowed by `next/image` (shared with `next.config.ts`). |

The admin's `docs/content.example.json` is a real document with every field filled in; use it as a fixture
(for instance, serve it as `content.es.json` and run with `CONTENT_SOURCE=json`).

When the admin changes the contract, its `ContractShapeTests` fails: update `contract.ts` (and the adapters if
needed) in the same change.

## Behaviour

- **Language fallback**: if there is no document for the requested locale, the default language document is used.
- **Authoritative content**: what the admin publishes is what the web shows, empty lists included.
- **Local fallback**: if the source is not configured, fails, or returns a payload that breaks the contract
  (including an unknown `schemaVersion`), the web logs `[content] …` and renders the static config in
  `src/core/config`. The site never goes down because of the content source.
- **Freshness**: reads are cached for `CONTENT_REVALIDATE_SECONDS` (60 by default) under the cache tag
  `portfolio-content`; a publish or rollback in the admin shows up within that time, without a redeploy.
- **Images** from the admin may be site paths (`/webp/x.webp`) or URLs on an origin listed in
  `CONTENT_IMAGE_HOSTS` (host name for https, or a full origin such as `http://localhost:9000`); anything else
  is replaced with a placeholder, because `next/image` rejects it.
- **Profile** (`loadProfile`): name, rotating taglines, bio (HTML with the age filled in), picture, CV and SEO
  come from the admin's *Perfil y SEO*; `generateMetadata` uses them. Missing values fall back to
  `src/core/config/profile/profile.config.ts` and the `Index` messages.
- **Catalogs** (project statuses, stages, categories, tags) are managed in the admin and arrive translated;
  the project page shows their names (`categoryLabel`, `tagLabels`…), so new items need no code changes. The
  `Category`/`Tags` keys in `messages/*.json` are only used by the local fallback config.

## Local development against the admin

Two ways to run the web locally, depending on which database the admin is editing:

```bash
npm run dev        # Neon: .env.development.local, written by the admin's scripts/setup-neon.ps1
npm run dev:local  # the admin's Docker Postgres and S3
```

`setup-neon.ps1` (admin repository) writes `.env.development.local` (git-ignored) with `CONTENT_SOURCE=neon`,
the Neon `web_reader` connection and the Neon Storage images origin.

`npm run dev:local` reads the admin's `.env` (`../AQPortfoil/.env`, or `ADMIN_REPO`) and passes
`CONTENT_SOURCE=postgres`, the local `web_reader` and the local S3 origin to `next dev` as process variables,
which take precedence over `.env.development.local`; nothing is written to disk. The admin seeds the local database with this site's current
content (`db/seed/local-seed.json`); regenerate that file after changing the static config with
`npm run export-seed`.

## Environment variables

```bash
CONTENT_SOURCE=neon            # neon | postgres | json | local
PORTFOLIO_READ_DATABASE_URL=postgresql://web_reader:<password>@<host>/<db>?sslmode=require
CONTENT_JSON_URL=https://cdn.example.com/content.{lang}.json   # only for CONTENT_SOURCE=json
CONTENT_REVALIDATE_SECONDS=60
CONTENT_IMAGE_HOSTS=cdn.example.com
STORAGE_ENDPOINT=https://<id>.storage.<region>.aws.neon.tech   # private buckets, served by /api/assets
STORAGE_REGION=us-east-2
STORAGE_ACCESS_KEY_ID=...                                      # ideally a read-only credential
STORAGE_SECRET_ACCESS_KEY=...
STORAGE_BUCKETS=imgs,docs
```

`PORTFOLIO_READ_DATABASE_URL` uses the `web_reader` role, which can only `SELECT` the published view. Keep it
server side (never with a `NEXT_PUBLIC_` prefix).

## Not covered by the contract

The fixed interface texts (menus, buttons, section titles, "Hello, I'm") stay in `messages/*.json`, and the
navigation in `src/core/config`. The `.github/workflows/sync-content.yml` workflow predates this contract (it
downloads a single `content.json` that the web does not read) and can be removed once `neon` is in use.
