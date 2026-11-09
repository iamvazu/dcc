import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { costGuides, site } from "@/lib/data";

export function generateStaticParams() {
  return costGuides.map((g) => ({
    slug: g.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = costGuides.find((g) => g.slug === slug);
  if (!guide) return {};

  return {
    title: `${guide.topic} Cost ${guide.city} | Debra's Classic Cleaning`,
    description: `${guide.directAnswer.slice(0, 148)}...`,
    alternates: {
      canonical: `/pricing/${guide.slug}/`,
    },
  };
}

export default async function CostGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = costGuides.find((g) => g.slug === slug);
  if (!guide) notFound();

  const isResidential = guide.slug.includes("house-cleaning");

  return (
    <div className="divide-y-2 divide-ink">
      <section className="bg-paper py-10 sm:py-14">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
          <Breadcrumbs
            items={[
              { label: "Pricing", href: "/pricing/" },
              { label: `${guide.topic} Cost (${guide.city})`, href: `/pricing/${guide.slug}/` },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-6">
              <div>
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-brand">
                  2026 LOCAL COST BENCHMARK · {guide.city.toUpperCase()}, CA
                </div>
                <h1 className="font-display-expanded text-fluid-h2 text-ink mt-1">
                  {guide.title}
                </h1>
              </div>

              {/* Answer-Engine-Ready Direct Summary Paragraph (PRD 6.2) */}
              <div className="border-2 border-ink bg-paper-2 p-6 rounded-[4px] shadow-[4px_4px_0px_#17201E] space-y-2">
                <div className="font-mono text-xs font-bold uppercase text-pass">
                  DIRECT ANSWER SUMMARY (2026 PLACER &amp; SACRAMENTO RATES)
                </div>
                <p className="text-base text-ink leading-relaxed font-medium">
                  {guide.directAnswer}
                </p>
              </div>

              {/* Itemized Rate Table */}
              <div className="space-y-3">
                <h2 className="font-display-wide text-2xl text-ink">
                  How much does {guide.topic.toLowerCase()} cost in {guide.city}?
                </h2>
                <div className="border-2 border-ink rounded-[4px] overflow-x-auto bg-paper">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-ink text-paper font-mono text-xs uppercase">
                        <th className="p-3.5 border-r border-paper/20">Facility / Home Size</th>
                        <th className="p-3.5 border-r border-paper/20">Cadence</th>
                        <th className="p-3.5 border-r border-paper/20">Typical Rate Range</th>
                        <th className="p-3.5">Per-Visit / Alt Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-rule font-mono text-xs sm:text-sm">
                      {guide.tableRows.map((row, i) => (
                        <tr key={i} className={i % 2 === 1 ? "bg-paper-2/60" : "bg-paper"}>
                          <td className="p-3.5 font-sans font-semibold text-ink border-r border-rule">
                            {row.facility}
                          </td>
                          <td className="p-3.5 text-ink/80 border-r border-rule">{row.frequency}</td>
                          <td className="p-3.5 font-bold text-brand border-r border-rule">
                            {row.monthlyRange}
                          </td>
                          <td className="p-3.5 text-ink/85">{row.perVisit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Key Cost Drivers */}
              <div className="space-y-4 pt-2">
                <h2 className="font-display-wide text-2xl text-ink">
                  3 Factors That Move Your Quote Up or Down
                </h2>
                <div className="space-y-3">
                  {guide.factors.map((f, idx) => (
                    <div
                      key={idx}
                      className="p-4 border border-ink bg-paper-2 rounded-[4px] flex items-start gap-3"
                    >
                      <span className="font-mono text-xs font-bold px-2 py-0.5 bg-ink text-paper shrink-0">
                        0{idx + 1}
                      </span>
                      <p className="text-sm text-ink/85 leading-relaxed">{f}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 4-Col Conversion Sidebar */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-5">
              <div className="border-2 border-ink bg-ink text-paper p-6 rounded-[4px] space-y-4">
                <div className="font-mono text-xs font-bold text-flag uppercase">
                  CALCULATE YOUR EXACT SPACE
                </div>
                <h3 className="font-display-wide text-xl text-paper">
                  Get a live receipt estimate in 60 seconds.
                </h3>
                <p className="text-xs text-paper/80 leading-relaxed">
                  No email required to see your price range. Enter your square footage, restrooms, and schedule window now.
                </p>
                <Link
                  href={
                    isResidential
                      ? "/pricing/house-cleaning-calculator/"
                      : "/pricing/commercial-cleaning-calculator/"
                  }
                  className={`btn-report ${
                    isResidential ? "btn-sky" : "btn-brand"
                  } btn-on-ink w-full text-xs`}
                >
                  Open {isResidential ? "House" : "Commercial"} Calculator →
                </Link>
                {!isResidential && (
                  <Link
                    href="/benchmark-audit/"
                    className="btn-report btn-paper w-full text-xs"
                  >
                    Book Free 20-Min Benchmark Audit
                  </Link>
                )}
              </div>

              <div className="border-2 border-ink bg-paper p-5 rounded-[4px] space-y-3">
                <div className="font-mono text-xs font-bold uppercase text-ink/70">
                  OTHER LOCAL COST GUIDES
                </div>
                <ul className="space-y-2 text-xs font-mono">
                  {costGuides
                    .filter((g) => g.slug !== guide.slug)
                    .map((g) => (
                      <li key={g.slug}>
                        <Link
                          href={`/pricing/${g.slug}/`}
                          className="text-ink hover:text-brand underline"
                        >
                          {g.topic} Cost in {g.city} →
                        </Link>
                      </li>
                    ))}
                </ul>
                <div className="pt-2 border-t border-rule font-mono text-xs text-ink/75">
                  Questions? Call Debra at{" "}
                  <a href={`tel:${site.phoneRaw}`} className="font-bold underline">
                    {site.phone}
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

