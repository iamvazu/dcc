# Debra's Classic Cleaning LLC — Website Redesign ("The Inspection Report")

Commercial-first Next.js (App Router) + TypeScript + Tailwind CSS website for **Debra's Classic Cleaning LLC** (Rocklin, CA · WOSB/EDWOSB · CA Small Business Micro · CAGE `9Z5E9` · NAICS `561720`).

Every page drives one of two primary actions:
1. **Get an instant price** from the Commercial or Residential calculator (showing the live receipt range *before* asking for contact details).
2. **Book a free 20-minute Facility Benchmark Audit** (`/benchmark-audit/`).

---

## Quick Start

```bash
# Install dependencies
npm install

# Run the pSEO Quality Gate & Shingle Similarity Audit
npm run verify:pseo

# Start local development server
npm run dev

# Build all ~100 static & programmatic pages for production
npm run build
```

---

## Architecture & Phase Deliverables

- **Phase 1 — Design System & Signature Components (`/dev/styleguide/`)**:
  - Color tokens in `src/app/globals.css`: `--ink` (`#17201E`), `--paper` (`#F5F3EE`), `--paper-2` (`#ECE8DF`), `--rule` (`#CFC8BA`), `--brand` (`#B5175E`), `--sky` (`#1B8FC4`), `--pass` (`#2F7D4F`), `--flag` (`#E8A317`).
  - Self-hosted Google Fonts via `next/font/google`: **Archivo** (variable width axis), **Public Sans**, **IBM Plex Mono**.
  - 7 Signature Components: `LiveScorecard`, `ProtocolExplorer`, `CertStrip`, `PriceReceipt`, `CoverageMap`, `GuaranteeSeal`, `StickyMobileBar`.
- **Phase 2 — Homepage (`/`)**:
  - All 14 sections in exact PRD order, paired with custom documentary-style photography in `public/images/`.
- **Phase 3 — Instant Price Calculators (`/pricing/*`)**:
  - `/pricing/commercial-cleaning-calculator/` & `/pricing/house-cleaning-calculator/`
  - Live URL state persistence (`?zip=...&type=...&sqft=...`) so estimates can be shared.
  - `/api/lead/` endpoint for HubSpot Forms/Deals + Twilio 10-second Speed-to-Lead SMS dispatch.
- **Phase 4 — Commercial Hub & pSEO Matrix (`/commercial-cleaning/*`)**:
  - 11 Industry pages (`/commercial-cleaning/[industry]/`)
  - 16 Commercial City pages (`/commercial-cleaning/[city]-ca/`)
  - 30 Tier-1 Industry-by-City combo pages (`/commercial-cleaning/[industry]/[city]-ca/`)
  - 6 Commercial Add-on pages (`/add-ons/[service]/`)
  - Automated build-time quality gate (`scripts/verify-pseo-quality.mjs`).
- **Phase 5 — Residential Lane, Audit Landing & Government (`/house-cleaning/*`, `/benchmark-audit/`, `/government-contracting/`)**:
  - Warmer `--sky` palette + residential crest lockup on `/house-cleaning/*` (5 services + 16 city pages).
  - Distraction-free `/benchmark-audit/` landing page (no main nav, max 4 fields).
  - Printable one-page Federal/State Capability Statement at `/government-contracting/`.
- **Phase 6 — Technical SEO Layer**:
  - `LocalBusiness` + `ProfessionalService`, `Service`, `FAQPage`, `BreadcrumbList`, and `Organization` JSON-LD schemas (`src/components/JsonLd.tsx`).
  - Dynamic Open Graph card (`src/app/opengraph-image.tsx`), `sitemap.xml` (`src/app/sitemap.ts`), `robots.txt` (`src/app/robots.ts`), and 301 redirects (`next.config.ts`).

---

## How to Edit Prices Without a Developer (`data/pricing.json`)

Open `data/pricing.json` and edit any number:
- **`serviceZips` / `zipToCity`**: Add or remove 5-digit ZIP codes served.
- **`residential`**: Update `base`, `perBedroom`, `perBathroom`, `perHalfBath`, `serviceMultiplier`, `frequencyDiscount`, or `addOns`.
- **`commercial`**: Update `billableRate`, `productionRateSqftPerHour` per facility type, `minutesPerRestroom`, `monthlyMinimum`, or `addOnsMonthly`.

Commit and push (or redeploy on Vercel) and both calculators update automatically across the entire site.

---

## How to Add a City (`data/cities.json`)

Add a new object to `data/cities.json`. To pass the build-time pSEO Quality Gate (`scripts/verify-pseo-quality.mjs`), every city record **must** include:
1. `slug` (lowercase, e.g. `"marysville"`) and `name` (`"Marysville"`)
2. `tier` (`1` for full industry-by-city combo matrix, `2` for city pages)
3. `intro` of **at least 120 words** with <60% 4-word shingle overlap against sibling cities
4. `districts` (array of 3+ named local business corridors/districts)
5. `distanceFromRocklin` and `responseTime`
6. `nearbyCities` (array of 2+ valid city slugs)
7. `localFaqs` (array of 3+ city-specific Q&As)
8. `proof` (`{ title, body }`)

Run `npm run verify:pseo` to confirm the new city passes before building.

---

## How to Add an Industry (`data/industries.json`)

Add a new object to `data/industries.json` with:
- `slug`, `name`, `pluralName`, `calcKey`, `isTier1Combo`
- `riskHeading`, `riskBody`, `inspectionContext`, `failurePoints` (3 items)
- `keyProtocolPoints` (array of 6+ point IDs from `1` to `42` in `data/protocol.json`)
- `methodsAndProducts`, `proof`, and `faqs` (5+ Q&As).

---

## Deployment (Vercel)

1. Push this repository to GitHub/GitLab.
2. Import into Vercel (Framework Preset: **Next.js**).
3. Optional environment variables for live CRM/SMS:
   - `HUBSPOT_PORTAL_ID` and `HUBSPOT_FORM_GUID`
   - `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER`
4. Vercel will run `npm run build` (which runs `verify-pseo-quality.mjs` followed by `next build`).

