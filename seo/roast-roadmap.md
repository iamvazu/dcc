# SEO Roast Roadmap: debrasclassiccleaning.com (2026-11-20)

Verdict: Five high-intent client pages (`/benchmark-audit/`, `/government-contracting/`, `/contact/`, `/careers/`, `/resources/`) inherited the homepage `canonical: "/"` from `src/app/layout.tsx`, telling Google to drop them from the index, while `/pricing/` hid itemized dollar rates behind interactive calculators instead of plain server HTML.

| # | Tier | Issue | Revenue impact | Fix | Owner | Status |
|---|---|---|---|---|---|---|
| 1 | FATAL | `src/app/layout.tsx` set global `canonical: "/"` while 5 `"use client"` route pages lacked route-level metadata | Google de-indexes `/benchmark-audit/`, `/government-contracting/`, `/contact/`, `/careers/`, and `/resources/` as duplicates of `/` | Removed global `canonical: "/"` fallback; added dedicated server `layout.tsx` metadata with self-referencing canonicals for all 5 routes | agent | shipped in PR |
| 2 | FATAL | Dynamic routes (`[slug]`, `[citySlug]`, `[service]`) lacked `export const dynamicParams = false` | Unknown URL params can trigger runtime evaluation instead of strict static 404 | Added `export const dynamicParams = false` across all 5 dynamic route segments | agent | shipped in PR |
| 3 | REVENUE | `/pricing/` hub had calculator cards but no server-rendered HTML rate table | AI search crawlers (`GPTBot`, `OAI-SearchBot`, `PerplexityBot`, `ClaudeBot`) hitting `/pricing/` could not extract per-bedroom or per-sqft dollar tables | Added SSR 2026 Residential & Commercial HTML rate tables + `ServiceSchema` JSON-LD directly on `/pricing/` | agent | shipped in PR |
| 4 | REVENUE | `public/llms.txt` was static and could drift from `data/*.json` counts | Contradictory city/service counts reduce LLM citation trust | Added `scripts/sync-llms-txt.mjs` wired into `npm run build` to generate `public/llms.txt` directly from `data/*.json` | agent | shipped in PR |
| 5 | REVENUE | 3 core money hubs (`/government-contracting`, `/commercial-cleaning`, `/house-cleaning`) had `< 3` contextual inbound body links | Link equity stranded on informational/support pages instead of flowing to money hubs | Injected upper-40% contextual links + `<ProductCallout />` blocks across 8 source pages (`orphanMoneyPages: []`) | agent | shipped in PR |
| 6 | REVENUE | Hub & programmatic `<title>` tags ranged 78–103 chars | SERP truncation hid primary city and service modifiers | Tightened titles to 45–56 chars via `seo-title-optimization` | agent | shipped in PR |
| 7 | COMPOUNDING | No built-in customer backlink loop | Every backlink requires manual outreach | Shipped `<VerifiedCleanBadge />` HTML embed generator on `/resources/` for local clinics, offices, and daycares | agent | shipped in PR |
| 8 | COMPOUNDING | Local directory & citation gap vs top Placer/Sacramento janitorial competitors | Money pages need 15–25 local & WOSB authority referring domains to lock Top 3 | Submit ready-to-paste listings in `seo/directories.md` (Rocklin/Roseville Chambers, Cal eProcure, SAM.gov, Yelp, Nextdoor, BBB) | founder | next |

## Fluff (ignore until rows above ship)
- Minor decorative badge width hints on secondary footer seals
