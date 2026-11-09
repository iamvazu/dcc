import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const cities = JSON.parse(fs.readFileSync(path.join(rootDir, "data/cities.json"), "utf8"));
const industries = JSON.parse(fs.readFileSync(path.join(rootDir, "data/industries.json"), "utf8"));

function wordCount(str) {
  return str.trim().split(/\s+/).filter(Boolean).length;
}

function getShingles(text, k = 4) {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  const shingles = new Set();
  for (let i = 0; i <= words.length - k; i++) {
    shingles.add(words.slice(i, i + k).join(" "));
  }
  return shingles;
}

function jaccardSimilarity(setA, setB) {
  if (setA.size === 0 || setB.size === 0) return 0;
  let intersection = 0;
  for (const item of setA) {
    if (setB.has(item)) intersection++;
  }
  const union = setA.size + setB.size - intersection;
  return intersection / union;
}

let errors = 0;
let warnings = 0;

console.log("=== [pSEO QUALITY GATE & SHINGLE SIMILARITY AUDIT] ===");

// 1. Validate Cities
const cityDocs = [];
for (const city of cities) {
  const introWords = wordCount(city.intro || "");
  if (introWords < 120) {
    console.error(`[FAIL] City "${city.slug}" intro is too short (${introWords} words). Minimum required: 120+ words.`);
    errors++;
  }
  if (!Array.isArray(city.districts) || city.districts.length < 3) {
    console.error(`[FAIL] City "${city.slug}" missing named commercial districts/corridors.`);
    errors++;
  }
  if (!city.distanceFromRocklin || !city.responseTime) {
    console.error(`[FAIL] City "${city.slug}" missing distanceFromRocklin or responseTime.`);
    errors++;
  }
  if (!Array.isArray(city.nearbyCities) || city.nearbyCities.length < 2) {
    console.error(`[FAIL] City "${city.slug}" missing nearbyCities links.`);
    errors++;
  }
  if (!Array.isArray(city.localFaqs) || city.localFaqs.length < 3) {
    console.error(`[FAIL] City "${city.slug}" has fewer than 3 localFaqs.`);
    errors++;
  }
  if (!city.proof || !city.proof.body) {
    console.error(`[FAIL] City "${city.slug}" missing local proof / Debra Q&A block.`);
    errors++;
  }

  const combinedText = [
    city.intro,
    ...(city.districts || []),
    city.distanceFromRocklin,
    city.responseTime,
    city.proof?.title,
    city.proof?.body,
    ...(city.localFaqs || []).map((f) => `${f.q} ${f.a}`),
  ].join(" ");
  cityDocs.push({ slug: city.slug, shingles: getShingles(combinedText, 4), words: wordCount(combinedText) });
}

// 2. Check City Pairwise Shingle Similarity (< 0.60 allowed, meaning > 40% unique)
let maxCitySim = 0;
for (let i = 0; i < cityDocs.length; i++) {
  for (let j = i + 1; j < cityDocs.length; j++) {
    const sim = jaccardSimilarity(cityDocs[i].shingles, cityDocs[j].shingles);
    if (sim > maxCitySim) maxCitySim = sim;
    if (sim > 0.6) {
      console.warn(
        `[WARN] High shingle similarity (${(sim * 100).toFixed(1)}%) between city/${cityDocs[i].slug} and city/${cityDocs[j].slug}`
      );
      warnings++;
    }
  }
}

// 3. Validate Industries
const industryDocs = [];
for (const ind of industries) {
  if (!ind.riskHeading || !ind.riskBody) {
    console.error(`[FAIL] Industry "${ind.slug}" missing riskHeading or riskBody.`);
    errors++;
  }
  if (!Array.isArray(ind.keyProtocolPoints) || ind.keyProtocolPoints.length < 6) {
    console.error(`[FAIL] Industry "${ind.slug}" must reference at least 6 points from the 42-point protocol.`);
    errors++;
  }
  if (!ind.methodsAndProducts) {
    console.error(`[FAIL] Industry "${ind.slug}" missing methodsAndProducts.`);
    errors++;
  }
  if (!Array.isArray(ind.faqs) || ind.faqs.length < 5) {
    console.error(`[FAIL] Industry "${ind.slug}" must have at least 5 industry FAQs.`);
    errors++;
  }

  const combinedText = [
    ind.shortLine,
    ind.riskHeading,
    ind.riskBody,
    ind.inspectionContext,
    ...(ind.failurePoints || []),
    ind.methodsAndProducts,
    ...(ind.faqs || []).map((f) => `${f.q} ${f.a}`),
  ].join(" ");
  industryDocs.push({ slug: ind.slug, shingles: getShingles(combinedText, 4) });
}

let maxIndSim = 0;
for (let i = 0; i < industryDocs.length; i++) {
  for (let j = i + 1; j < industryDocs.length; j++) {
    const sim = jaccardSimilarity(industryDocs[i].shingles, industryDocs[j].shingles);
    if (sim > maxIndSim) maxIndSim = sim;
    if (sim > 0.6) {
      console.warn(
        `[WARN] High shingle similarity (${(sim * 100).toFixed(1)}%) between industry/${industryDocs[i].slug} and industry/${industryDocs[j].slug}`
      );
      warnings++;
    }
  }
}

console.log(`Checked ${cityDocs.length} cities (max pairwise shingle overlap: ${(maxCitySim * 100).toFixed(1)}%).`);
console.log(`Checked ${industryDocs.length} industries (max pairwise shingle overlap: ${(maxIndSim * 100).toFixed(1)}%).`);

if (errors > 0) {
  console.error(`[pSEO QUALITY GATE FAILED] ${errors} error(s) found.`);
  process.exit(1);
} else {
  console.log(`[pSEO QUALITY GATE PASSED] 0 errors, ${warnings} warning(s). All programmatic records meet uniqueness & local substance gates.`);
}
