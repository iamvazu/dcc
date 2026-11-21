#!/usr/bin/env node
import { readFileSync, readdirSync, statSync, mkdirSync, writeFileSync } from "node:fs";
import { join, sep } from "node:path";

const ROOTS = ["src/app", "src/components"];
const EXT = /\.(mdx?|[jt]sx?)$/;
const CHROME = /(layout\.[jt]sx?$|(nav|header|footer|StickyMobileBar|Breadcrumbs)[^/]*\.[jt]sx?$)/i;
const MONEY =
  /^\/(pricing|commercial-cleaning|house-cleaning|benchmark-audit|government-contracting|add-ons)(\/|$)/;
const SITE = (process.env.SITE ?? "https://debrasclassiccleaning.com").replace(/\/+$/, "");

const walk = (dir, out = []) => {
  let names;
  try {
    names = readdirSync(dir);
  } catch {
    return out;
  }
  for (const n of names) {
    if (n === "node_modules" || n.startsWith(".")) continue;
    const p = join(dir, n);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (EXT.test(n)) out.push(p);
  }
  return out;
};

const norm = (p) => (p.length > 1 ? p.replace(/\/+$/, "") : p);

function routeOf(file) {
  const f = file.split(sep).join("/");
  const m = f.match(/^src\/app\/(?:(.*)\/)?page\.[jt]sx?$/);
  if (m) {
    const r = (m[1] ?? "").replace(/\([^)]*\)\/?/g, "");
    return norm("/" + r);
  }
  return null;
}

const pages = new Map();
const inbound = new Map();
const sitewide = new Set();

for (const file of [...new Set(ROOTS.flatMap((r) => walk(r)))]) {
  let text = readFileSync(file, "utf8");
  if (SITE) text = text.split(SITE).join("");
  const links = new Set();
  for (const re of [/\]\((\/[^)\s"'#?]*)/g, /href=\{?\s*["'`](\/[^"'`#?\s]*)/g]) {
    for (const m of text.matchAll(re)) {
      if (!m[1].includes("${")) links.add(norm(m[1]));
    }
  }
  if (CHROME.test(file)) {
    links.forEach((l) => sitewide.add(l));
    continue;
  }
  const route = routeOf(file);
  if (!route) {
    // Component file: attribute its contextual links to pages that import it, or track as contextual helper
    const compName = file.split(sep).pop().replace(/\.[jt]sx?$/, "");
    for (const appFile of walk("src/app")) {
      const appRoute = routeOf(appFile);
      if (!appRoute) continue;
      const appText = readFileSync(appFile, "utf8");
      if (appText.includes(compName)) {
        for (const l of links) {
          if (l !== appRoute) {
            (inbound.get(l) ?? inbound.set(l, new Set()).get(l)).add(appRoute);
          }
        }
      }
    }
    continue;
  }
  pages.set(route, file);
  for (const l of links) {
    if (l !== route) {
      (inbound.get(l) ?? inbound.set(l, new Set()).get(l)).add(route);
    }
  }
}

const rows = [...pages]
  .map(([route, file]) => ({
    route,
    file: file.split(sep).join("/"),
    contextualInbound: inbound.get(route)?.size ?? 0,
    linkedFrom: [...(inbound.get(route) ?? [])],
    inNavOrFooter: sitewide.has(route),
    money: MONEY.test(route) && !route.includes("["),
  }))
  .sort((a, b) => a.contextualInbound - b.contextualInbound);

const output = {
  generatedAt: new Date().toISOString(),
  orphanMoneyPages: rows.filter((r) => r.money && r.contextualInbound < 3).map((r) => r.route),
  pages: rows,
};

const outPath = process.argv[2];
if (outPath) {
  mkdirSync("seo", { recursive: true });
  writeFileSync(outPath, JSON.stringify(output, null, 2), "utf8");
} else {
  console.log(JSON.stringify(output, null, 2));
}
