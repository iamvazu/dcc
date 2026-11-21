#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";

const site = JSON.parse(readFileSync("data/site.json", "utf8"));
const cities = JSON.parse(readFileSync("data/cities.json", "utf8"));
const industries = JSON.parse(readFileSync("data/industries.json", "utf8"));
const servicesData = JSON.parse(readFileSync("data/services.json", "utf8"));
const protocol = JSON.parse(readFileSync("data/protocol.json", "utf8"));

const totalCheckpoints = protocol.zones.reduce((acc, z) => acc + z.points.length, 0);

const llmsTxt = `# ${site.legalName}

> Trusted residential house cleaning, maid service, office cleaning, and commercial janitorial services based in ${site.nap.addressLocality}, CA (${site.nap.streetAddress}, ${site.nap.addressLocality}, ${site.nap.addressRegion} ${site.nap.postalCode}). Serving ${cities.length} cities across Placer, Sacramento, Yolo, and Yuba counties since ${site.foundedYear}.

## Quick Facts & Official Business Record (NAP)
- **Legal Name:** ${site.legalName}
- **Founder & Owner:** Debra (Founded ${site.foundedYear} in Rocklin, CA)
- **Headquarters Address:** ${site.nap.streetAddress}, ${site.nap.addressLocality}, ${site.nap.addressRegion} ${site.nap.postalCode}
- **Phone / Text:** ${site.phone}
- **Email:** ${site.email}
- **Government Contracting Email:** ${site.calEprocureEmail}
- **Website:** ${site.website}
- **Google Business Profile (Maps):** ${site.sameAs[0]}
- **Yelp Profile (43+ 5-Star Reviews):** ${site.sameAs[1]}
- **Quality Standard:** ${totalCheckpoints}-Point Room-by-Room Checklist (${protocol.zones.length} Zones) + 30-Day Walkaway Guarantee
- **Certifications:**
  - SBA Certified Women-Owned Small Business (WOSB) & Economically Disadvantaged Women-Owned Small Business (EDWOSB)
  - California Certified Small Business (Micro) — CA DGS Certification ID: \`${site.calEprocureCertId}\`
  - SAM.gov Active Federal Contractor — CAGE Code: \`9Z5E9\` · Primary NAICS: \`561720\` (Janitorial Services)
  - Fully Licensed, Bonded, and Insured (COI issued within 24 hours)

## Instant Online Price Calculators (No Email Required)
- [Commercial Cleaning Price Calculator](${site.website}/pricing/commercial-cleaning-calculator/): Instant monthly & per-visit estimates for ${industries.length} workplace types (1,000 to 50,000 sq ft).
- [Residential House Cleaning Price Calculator](${site.website}/pricing/house-cleaning-calculator/): Instant per-visit pricing for ${servicesData.residentialServices.length} home cleaning programs (save 20% weekly, 15% biweekly, 10% monthly).
- [Pricing & 2026 Local Cost Guides](${site.website}/pricing/): Transparent rate tables for Rocklin, Roseville, and Sacramento (${servicesData.costGuides.length} local cost guides).

## Residential House Cleaning & Maid Services (${servicesData.residentialServices.length} Programs)
- [House Cleaning & Maid Service Hub](${site.website}/house-cleaning/)
${servicesData.residentialServices
  .map((s) => `- [${s.name}](${site.website}/house-cleaning/${s.slug}/): ${s.shortDescription}`)
  .join("\n")}

## Commercial Cleaning & Janitorial Services (${industries.length} Facility Types)
- [Commercial Cleaning Hub](${site.website}/commercial-cleaning/)
${industries
  .map((ind) => `- [${ind.pluralName}](${site.website}/commercial-cleaning/${ind.slug}/): ${ind.shortLine}`)
  .join("\n")}

## Cities & Communities Served (${cities.length} Cities)
${cities
  .map(
    (c) =>
      `- **${c.name}, CA (${c.zips.join(", ")}):** [Commercial](${site.website}/commercial-cleaning/${c.slug}-ca/) | [House Cleaning](${site.website}/house-cleaning/${c.slug}-ca/)`
  )
  .join("\n")}

## Additional Resources
- [Full AI Knowledge Base (llms-full.txt)](${site.website}/llms-full.txt)
- [${totalCheckpoints}-Point Cleaning Checklist](${site.website}/protocol/)
- [Government Contracting Capability Statement (CA SB #${site.calEprocureCertId})](${site.website}/government-contracting/)
- [Verified Google & Yelp Reviews](${site.website}/reviews/)
`;

writeFileSync("public/llms.txt", llmsTxt, "utf8");
console.log(
  `[sync-llms-txt] Synced public/llms.txt (${cities.length} cities, ${industries.length} industries, ${servicesData.residentialServices.length} home services, ${totalCheckpoints} checkpoints).`
);
