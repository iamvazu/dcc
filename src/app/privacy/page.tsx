import React from "react";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy & SMS Terms | Debra's Classic Cleaning",
  description:
    "Privacy policy, data handling, and SMS communication terms for Debra's Classic Cleaning LLC.",
  alternates: {
    canonical: "/privacy/",
  },
};

export default function PrivacyPage() {
  return (
    <div className="bg-paper py-10 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
        <Breadcrumbs items={[{ label: "Privacy Policy", href: "/privacy/" }]} />

        <h1 className="font-display-expanded text-fluid-h2 text-ink">
          Privacy Policy &amp; SMS Terms
        </h1>
        <p className="font-mono text-xs text-ink/70">
          EFFECTIVE DATE: NOVEMBER 8, 2026 · ENTITY: {site.legalName.toUpperCase()}
        </p>

        <div className="space-y-4 text-sm text-ink/85 leading-relaxed">
          <p>
            <strong>1. Calculator Price Transparency:</strong> You may use our Commercial and Residential Instant Price Calculators without submitting any personal data. We only collect your name, phone number, email address, and facility details when you explicitly request to lock an estimate, receive a PDF quote, or schedule a Benchmark Audit.
          </p>
          <p>
            <strong>2. Speed-to-Lead SMS &amp; Phone Communications:</strong> When you submit your phone number on an estimate lock or booking form, you consent to receive an immediate confirmation text message and follow-up call from {site.legalName} ({site.phone}) regarding your requested quote or walkthrough. Message and data rates may apply. Reply STOP at any time to opt out.
          </p>
          <p>
            <strong>3. Zero Third-Party Lead Selling:</strong> We never sell, rent, or share your contact information, building square footage, or facility security details with third-party lead brokers or external marketers.
          </p>
          <p>
            <strong>4. Contact:</strong> For privacy inquiries or data deletion requests, email{" "}
            <a href={`mailto:${site.email}`} className="underline font-bold">
              {site.email}
            </a>{" "}
            or call {site.phone}.
          </p>
        </div>
      </div>
    </div>
  );
}

