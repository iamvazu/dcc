import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ServiceSchema } from "@/components/JsonLd";
import { addOns, site } from "@/lib/data";

export function generateStaticParams() {
  return addOns.map((a) => ({ service: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service } = await params;
  const addon = addOns.find((a) => a.slug === service);
  if (!addon) return {};

  return {
    title: `${addon.name} | Debra's Classic Cleaning`,
    description: `${addon.shortDescription} Serving Rocklin, Roseville & Sacramento commercial facilities. ${addon.priceSummary}.`,
    alternates: {
      canonical: `/add-ons/${addon.slug}/`,
    },
  };
}

export default async function AddOnServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const addon = addOns.find((a) => a.slug === service);
  if (!addon) notFound();

  return (
    <div className="divide-y-2 divide-ink">
      <ServiceSchema
        name={addon.name}
        serviceType="Commercial Facility Maintenance Add-On"
        description={addon.shortDescription}
        url={`/add-ons/${addon.slug}/`}
        priceRangeText={addon.priceSummary}
      />

      <section className="bg-paper py-10 sm:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
          <Breadcrumbs
            items={[
              { label: "Commercial Cleaning", href: "/commercial-cleaning/" },
              { label: addon.name, href: `/add-ons/${addon.slug}/` },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-5">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-brand">
                COMMERCIAL ADD-ON SPECIFICATION · {addon.priceSummary.toUpperCase()}
              </div>
              <h1 className="font-display-expanded text-fluid-h2 text-ink">
                {addon.name}
              </h1>
              <p className="text-lg text-ink/85 leading-relaxed">
                {addon.shortDescription}
              </p>

              <div className="p-6 border-2 border-ink bg-paper-2 rounded-[4px] space-y-3">
                <div className="font-mono text-xs font-bold uppercase text-ink">
                  TECHNICAL SCOPE &amp; EXECUTION
                </div>
                <p className="text-base text-ink/85 leading-relaxed">{addon.body}</p>
              </div>

              <div className="space-y-2">
                <div className="font-mono text-xs font-bold uppercase text-ink/70">
                  RECOMMENDED FOR:
                </div>
                <div className="flex flex-wrap gap-2">
                  {addon.idealFor.map((f) => (
                    <span
                      key={f}
                      className="font-mono text-xs px-3 py-1.5 border border-ink bg-paper font-semibold"
                    >
                      ✓ {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <aside className="lg:col-span-4 border-2 border-ink bg-ink text-paper p-6 rounded-[4px] space-y-4">
              <div className="font-mono text-xs font-bold text-flag uppercase">
                ADD TO YOUR MONTHLY RECEIPT
              </div>
              <div className="font-mono text-xl font-bold text-paper">
                {addon.priceSummary}
              </div>
              <p className="text-xs text-paper/80 leading-relaxed">
                Toggle this add-on directly inside our Commercial Calculator to see how it fits into your monthly maintenance program, or request a standalone project quote.
              </p>
              <Link
                href="/pricing/commercial-cleaning-calculator/"
                className="btn-report btn-brand btn-on-ink w-full text-xs"
              >
                Bundle in Commercial Calculator →
              </Link>
              <Link
                href="/benchmark-audit/"
                className="btn-report btn-paper w-full text-xs"
              >
                Book On-Site Walkthrough
              </Link>
              <div className="pt-2 border-t border-paper/20 font-mono text-xs text-paper/75">
                Direct dispatch:{" "}
                <a href={`tel:${site.phoneRaw}`} className="underline text-white">
                  {site.phone}
                </a>
              </div>
            </aside>
          </div>

          {/* Sibling Add-ons */}
          <div className="pt-8 border-t-2 border-ink space-y-3">
            <div className="font-mono text-xs font-bold uppercase text-ink/75">
              OTHER COMMERCIAL FACILITY ADD-ONS:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {addOns
                .filter((a) => a.slug !== addon.slug)
                .map((a) => (
                  <Link
                    key={a.slug}
                    href={`/add-ons/${a.slug}/`}
                    className="p-3 border border-ink bg-paper-2 hover:bg-ink hover:text-paper font-mono text-xs rounded-[2px] no-underline"
                  >
                    <div className="font-bold">{a.name}</div>
                    <div className="text-[10px] opacity-75 mt-1">{a.priceSummary}</div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

