# AI SEO Content Coverage Plan & Batch Manifest (`aiseotracker` / `ai-seo-report` / `content-coverage`)

## 1. AI SEO Tracker MCP Connection Status (`aiseotracker` & `ai-seo-report`)
- **MCP Endpoint Configured:** `https://aiseotracker.com/api/agent/mcp` (saved to `.cursor/mcp.json`).
- **Live MCP Status:** Not yet authenticated via browser OAuth in this session. Per `aiseotracker/SKILL.md` and `ai-seo-report/SKILL.md` rules (*"Do not invent projectSlug, ranks, or citation URLs when MCP is not connected"*), live MCP rank tables are never fabricated.
- **How to Activate Live AI Mention Scanning:**
  1. Connect the `aiseotracker` MCP server (`https://aiseotracker.com/api/agent/mcp`) via OAuth sign-in, OR create a project for `debrasclassiccleaning.com` at https://aiseotracker.com.
  2. Track the 25 buyer prompts prepared in `seo/ai-prompts.md`.
  3. Once scanned, run `"tldr the report"` (`ai-seo-report`) to pull live ChatGPT, Perplexity, Gemini, Copilot, and Google AI Overview ranks.

---

## 2. Phase 1–4 Content Coverage Plan (Missing Prompt Clusters in Repository)

Based on our audit of `src/app/` and `data/services.json` (`6` existing cost guides, `11` industries, `5` residential services, `16` cities), here are the **5 highest-intent missing prompt clusters** where buyers ask ChatGPT, Perplexity, and Google specific questions that do not yet have dedicated pages:

| # | Prompt Cluster | Search Intent | Proposed URL Slug | Action | Proposed SEO Title (<60 chars) | Target Money Page Routed To |
|---|---|---|---|---|---|---|
| 1 | *"How much does house cleaning cost in Roseville CA?"* | Pricing / Local | `/pricing/house-cleaning-cost-roseville/` | `new` (in `data/services.json` `costGuides`) | `House Cleaning Cost in Roseville, CA (2026 Price Guide)` | `/pricing/house-cleaning-calculator/?zip=95661` |
| 2 | *"How much does move out cleaning cost in Sacramento & Rocklin?"* | Pricing / Transactional | `/pricing/move-out-cleaning-cost-rocklin-sacramento/` | `new` (in `data/services.json` `costGuides`) | `Move-Out Cleaning Cost in Rocklin & Sacramento (2026)` | `/house-cleaning/move-out-cleaning/` |
| 3 | *"In-house W-2 cleaners vs janitorial franchise brokers in Sacramento"* | Comparison / Commercial | `/pricing/w2-cleaners-vs-janitorial-franchises-sacramento/` | `new` (in `data/services.json` `costGuides`) | `W-2 Cleaners vs. Janitorial Franchises in Sacramento` | `/commercial-cleaning/` & `/benchmark-audit/` |
| 4 | *"Dental office infection control & after-hours cleaning checklist California"* | How-To / Checklist | `/commercial-cleaning/dental-office/` | `consolidate` | `Dental Office Cleaning Rocklin, Roseville & Sacramento` | `/commercial-cleaning/dental-office/` |
| 5 | *"Title 22 daycare & preschool cleaning requirements California"* | Compliance / Guide | `/commercial-cleaning/daycare-preschool/` | `consolidate` | `Daycare & Preschool Cleaning Rocklin, Roseville & Sacramento` | `/commercial-cleaning/daycare-preschool/` |

---

## 3. Content Batch Manifest v1

```text
CONTENT BATCH MANIFEST v1
Project: debrasclassiccleaning.com
Planned at: 2026-11-20
MCP snapshot: pending_oauth_connect
Phase: plan (awaiting owner approval for 3 new costGuides entries)

| slug | action | prompt cluster | phase | notes |
| --- | --- | --- | --- | --- |
| house-cleaning-cost-roseville | new | how much does house cleaning cost in roseville ca | planned | Add to data/services.json costGuides |
| move-out-cleaning-cost-rocklin-sacramento | new | move out cleaning cost rocklin roseville sacramento | planned | Add to data/services.json costGuides |
| w2-cleaners-vs-janitorial-franchises-sacramento | new | local commercial cleaners vs janitorial franchise brokers | planned | Add to data/services.json costGuides |
| dental-office | consolidate | dental office cleaning checklist california | done | Consolidated on /commercial-cleaning/dental-office/ |
| daycare-preschool | consolidate | california title 22 daycare cleaning checklist | done | Consolidated on /commercial-cleaning/daycare-preschool/ |
```
