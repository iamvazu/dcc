"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { costGuides, protocol } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";

export default function ResourcesPage() {
  const [email, setEmail] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  const handleChecklistDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/lead/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        leadType: "checklist_pdf_download",
        email,
      }),
    });
    trackEvent("checklist_download", {
      page_type: "resources_hub",
    });
    setUnlocked(true);
  };

  return (
    <div className="divide-y-2 divide-ink">
      <section className="bg-paper py-10 sm:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">
          <Breadcrumbs items={[{ label: "Facility Resources", href: "/resources/" }]} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-brand">
                FACILITY MANAGER TOOLKIT · CHECKLISTS &amp; RATE GUIDES
              </div>
              <h1 className="font-display-expanded text-fluid-h1 text-ink">
                Inspection sheets &amp; local cost benchmarks.
              </h1>
              <p className="text-lg text-ink/85 leading-relaxed">
                Download our printable 42-Point Commercial Facility Inspection Sheet to audit your current janitorial crew tonight—or explore our 2026 Placer &amp; Sacramento rate guides below.
              </p>
            </div>

            {/* Gated 42-Point Checklist PDF Card */}
            <div className="lg:col-span-5 border-2 border-ink bg-paper-2 p-6 rounded-[4px] shadow-[4px_4px_0px_#17201E] space-y-4">
              <div className="font-mono text-xs font-bold uppercase text-brand">
                FREE PDF DOWNLOAD · FORM DCC-42
              </div>
              <h2 className="font-display-wide text-xl text-ink">
                Printable 42-Point Facility Inspection Scorecard (PDF)
              </h2>
              <p className="text-xs text-ink/80 leading-relaxed">
                Includes all 6 facility zones ({protocol.zones.map((z) => z.label).join(", ")}), point numbers PT. 01–42, and supervisor pass/fail grading columns.
              </p>

              {unlocked ? (
                <div className="space-y-3 pt-2">
                  <div className="font-mono text-xs font-bold text-pass">
                    ✓ CHECKLIST UNLOCKED &amp; EMAILED TO {email.toUpperCase()}
                  </div>
                  <Link
                    href="/protocol/"
                    onClick={() => window.print()}
                    className="btn-report btn-ink w-full text-xs"
                  >
                    Open &amp; Print Master 42-Point Sheet Now →
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleChecklistDownload} className="space-y-3">
                  <label htmlFor="chk-email" className="block font-mono text-[11px] uppercase">
                    Enter Work Email for Instant PDF Access *
                  </label>
                  <input
                    id="chk-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@facility.com"
                    className="w-full min-h-[48px] px-3 border-2 border-ink bg-paper text-sm rounded-[4px]"
                  />
                  <button type="submit" className="btn-report btn-brand w-full text-xs">
                    Unlock &amp; Download 42-Point Checklist PDF →
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Cost Guides Directory */}
          <div className="pt-8 border-t-2 border-ink space-y-6">
            <h2 className="font-display-wide text-2xl sm:text-3xl text-ink">
              2026 Sacramento &amp; Placer County Cost Guides
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {costGuides.map((g) => (
                <Link
                  key={g.slug}
                  href={`/pricing/${g.slug}/`}
                  className="border-2 border-ink bg-paper p-6 rounded-[4px] hover:bg-paper-2 transition-colors flex flex-col justify-between gap-4 no-underline"
                >
                  <div className="space-y-2">
                    <div className="font-mono text-xs font-bold text-brand uppercase">
                      {g.city}, CA · COST GUIDE
                    </div>
                    <h3 className="font-display-wide text-lg text-ink">{g.title}</h3>
                    <p className="text-xs text-ink/80 line-clamp-3">{g.directAnswer}</p>
                  </div>
                  <span className="font-mono text-xs font-bold underline text-ink">
                    Read Guide →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

