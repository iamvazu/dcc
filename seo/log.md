# SEO Autopilot Shipped Changelog

- `2026-11-16` — Shipped `/llms.txt`, `/llms-full.txt`, AI crawler rules in `/robots.txt` (`src/app/robots.ts`), and `GeoCircle` + `OfferCatalog` + `AggregateRating` + `hasMap` in `SitewideLocalBusinessSchema` (`src/components/JsonLd.tsx`).
- `2026-11-16` — Installed Google Tag (`GTM-M5BHVJGS`) in `<head>` of `src/app/layout.tsx`.
- `2026-11-20` — Removed global `canonical: "/"` trap from `src/app/layout.tsx` and added dedicated server `layout.tsx` metadata with self-referencing canonicals for `/benchmark-audit/`, `/government-contracting/`, `/contact/`, `/careers/`, and `/resources/`.
- `2026-11-20` — Added `export const dynamicParams = false` to all 5 dynamic route templates (`/commercial-cleaning/[slug]`, `/commercial-cleaning/[slug]/[citySlug]`, `/house-cleaning/[slug]`, `/pricing/[slug]`, `/add-ons/[service]`).
- `2026-11-20` — Added SSR 2026 Residential & Commercial HTML pricing tables + `ServiceSchema` JSON-LD directly to `/pricing/` (`src/app/pricing/page.tsx`).
- `2026-11-20` — Created `scripts/sync-llms-txt.mjs` wired into `npm run build` so `public/llms.txt` derives city, industry, service, and checkpoint counts directly from `data/*.json`.
- `2026-11-20` — Tightened `<title>` tags across homepage, hubs, and programmatic templates to 45–57 characters (`seo/title-optimization-report.md`).
- `2026-11-20` — Added `scripts/internal-link-graph.mjs`, `src/components/ProductCallout.tsx`, `src/components/VerifiedCleanBadge.tsx`, and 21 contextual upper-40% links across 8 source pages, reducing `orphanMoneyPages` from 3 to `0` (`seo/internal-links-report.md`).
- `2026-11-21` — Shipped Content Coverage Batch 1 (`3` new cost/comparison pages in `data/services.json`: `/pricing/house-cleaning-cost-roseville/`, `/pricing/move-out-cleaning-cost-rocklin-sacramento/`, and `/pricing/w2-cleaners-vs-janitorial-franchises-sacramento/`), automatically wired into `/pricing/`, `/resources/`, `/sitemap.xml`, and `public/llms.txt`.
