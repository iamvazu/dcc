"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CoverageMap } from "@/components/CoverageMap";
import { site } from "@/lib/data";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    lane: "Commercial Facility Inquiry",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/lead/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        leadType: "contact_form",
        ...form,
        notes: form.message,
      }),
    });
    setSent(true);
  };

  return (
    <div className="divide-y-2 divide-ink">
      <section className="bg-paper py-10 sm:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">
          <Breadcrumbs items={[{ label: "Contact & Dispatch", href: "/contact/" }]} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 6 Cols: Direct Contact Channels + Exact GBP NAP Block */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-brand">
                  SPEED-TO-LEAD: UNDER 5 MINUTES (BUSINESS HOURS)
                </div>
                <h1 className="font-display-expanded text-fluid-h1 text-ink mt-1">
                  Call, text, or book your walkthrough.
                </h1>
                <p className="text-base text-ink/85 mt-2">
                  Need a price right now? Use our{" "}
                  <Link
                    href="/pricing/commercial-cleaning-calculator/"
                    className="text-brand font-bold underline"
                  >
                    Commercial Calculator
                  </Link>{" "}
                  or{" "}
                  <Link
                    href="/pricing/house-cleaning-calculator/"
                    className="text-sky font-bold underline"
                  >
                    House Cleaning Calculator
                  </Link>{" "}
                  to see a live estimate in 60 seconds without waiting for a callback.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href={`tel:${site.phoneRaw}`}
                  className="p-5 border-2 border-ink bg-paper-2 rounded-[4px] hover:bg-ink hover:text-paper transition-colors no-underline block"
                >
                  <div className="font-mono text-xs uppercase text-brand font-bold">
                    CALL DISPATCH / DEBRA
                  </div>
                  <div className="font-mono text-2xl font-bold mt-1">{site.phone}</div>
                  <div className="font-mono text-[11px] opacity-75 mt-1">
                    Mon–Sat 8am–6pm · 24/7 Emergency Client Line
                  </div>
                </a>

                <a
                  href={`sms:${site.smsRaw}?body=Hi%20Debra%2C%20I%20have%20a%20question%20about%20cleaning.`}
                  className="p-5 border-2 border-ink bg-paper-2 rounded-[4px] hover:bg-ink hover:text-paper transition-colors no-underline block"
                >
                  <div className="font-mono text-xs uppercase text-pass font-bold">
                    TEXT US DIRECTLY
                  </div>
                  <div className="font-mono text-2xl font-bold mt-1">{site.phone}</div>
                  <div className="font-mono text-[11px] opacity-75 mt-1">
                    Fastest for photos, COIs &amp; quick questions
                  </div>
                </a>
              </div>

              {/* Exact GBP NAP Block (PRD 4.8 & 6.4) */}
              <div className="border-2 border-ink bg-paper p-6 rounded-[4px] font-mono text-xs space-y-2">
                <div className="text-brand font-bold uppercase tracking-wider">
                  GOOGLE BUSINESS PROFILE VERIFIED NAP RECORD
                </div>
                <div className="text-base font-bold text-ink">{site.nap.name}</div>
                <div>{site.nap.streetAddress}</div>
                <div>
                  {site.nap.addressLocality}, {site.nap.addressRegion} {site.nap.postalCode}
                </div>
                <div>Phone: {site.phone}</div>
                <div>Email: {site.email}</div>
                <div>Cal eProcure / Contracting: caleprocure@debrasclassiccleaning.com</div>
                <div>Hours: {site.nap.hoursDisplay}</div>
                <div className="pt-2 border-t border-rule text-ink/70">
                  CA SB Cert ID: 2040639 · CAGE: 9Z5E9 · NAICS: 561720 · WOSB / EDWOSB
                </div>
              </div>
            </div>

            {/* Right 6 Cols: Direct Message Form */}
            <div className="lg:col-span-6 border-2 border-ink bg-paper-2 p-6 sm:p-8 rounded-[4px] shadow-[4px_4px_0px_#17201E]">
              {sent ? (
                <div className="space-y-3">
                  <div className="font-mono text-xs font-bold uppercase text-pass">
                    ✓ MESSAGE DISPATCHED TO DEBRA
                  </div>
                  <h2 className="font-display-wide text-2xl text-ink">
                    Thank you, {form.name}. We will respond within 5 minutes during business hours.
                  </h2>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="font-mono text-xs font-bold uppercase text-brand border-b border-rule pb-2">
                    DIRECT MESSAGE / RFP INQUIRY FORM
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="cnt-name" className="block font-mono text-xs uppercase mb-1">
                        Your Name *
                      </label>
                      <input
                        id="cnt-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full min-h-[48px] px-3 border-2 border-ink bg-paper text-sm rounded-[4px]"
                      />
                    </div>
                    <div>
                      <label htmlFor="cnt-comp" className="block font-mono text-xs uppercase mb-1">
                        Company or City
                      </label>
                      <input
                        id="cnt-comp"
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className="w-full min-h-[48px] px-3 border-2 border-ink bg-paper text-sm rounded-[4px]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="cnt-phone" className="block font-mono text-xs uppercase mb-1">
                        Phone *
                      </label>
                      <input
                        id="cnt-phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full min-h-[48px] px-3 border-2 border-ink bg-paper text-sm rounded-[4px]"
                      />
                    </div>
                    <div>
                      <label htmlFor="cnt-email" className="block font-mono text-xs uppercase mb-1">
                        Email *
                      </label>
                      <input
                        id="cnt-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full min-h-[48px] px-3 border-2 border-ink bg-paper text-sm rounded-[4px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cnt-lane" className="block font-mono text-xs uppercase mb-1">
                      Inquiry Type
                    </label>
                    <select
                      id="cnt-lane"
                      value={form.lane}
                      onChange={(e) => setForm({ ...form, lane: e.target.value })}
                      className="w-full min-h-[48px] px-3 border-2 border-ink bg-paper text-sm rounded-[4px]"
                    >
                      <option>Commercial Facility Inquiry</option>
                      <option>Free 20-Minute Benchmark Audit</option>
                      <option>Post-Construction / GC Bid Request</option>
                      <option>Government / WOSB / SB Solicitation</option>
                      <option>Residential House Cleaning</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="cnt-msg" className="block font-mono text-xs uppercase mb-1">
                      Facility Details or Question
                    </label>
                    <textarea
                      id="cnt-msg"
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Approx. square footage, city, frequency, or any special access requirements..."
                      className="w-full p-3 border-2 border-ink bg-paper text-sm rounded-[4px]"
                    />
                  </div>

                  <button type="submit" className="btn-report btn-brand w-full">
                    Send Message to Debra →
                  </button>
                </form>
              )}
            </div>
          </div>

          <CoverageMap />
        </div>
      </section>
    </div>
  );
}

