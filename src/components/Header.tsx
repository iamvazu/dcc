"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "./BrandLogo";
import { cities, industries, residentialServices, site } from "@/lib/data";
import { IconPhone } from "./Icons";
import { trackEvent } from "@/lib/analytics";

export function Header() {
  const pathname = usePathname() || "/";
  const [openMenu, setOpenMenu] = useState<"commercial" | "residential" | null>(null);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const isResidentialLane =
    pathname.startsWith("/house-cleaning") ||
    pathname.startsWith("/pricing/house-cleaning-calculator");

  const tier1Cities = cities.filter((c) => c.tier === 1);
  const tier2Cities = cities.filter((c) => c.tier === 2).slice(0, 6);

  return (
    <header
      className="border-b border-rule bg-white/95 backdrop-blur-md sticky top-0 z-40 no-print"
      onMouseLeave={() => setOpenMenu(null)}
    >
      {/* Top Utility Bar */}
      <div className="bg-ink text-paper border-b border-white/10 px-4 sm:px-6 py-1.5 text-xs">
        <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="font-medium text-paper/90">
              Serving Placer, Sacramento, Yolo &amp; Yuba Counties
            </span>
            <span className="hidden md:inline text-paper/40">·</span>
            <span className="hidden md:inline text-paper/75">
              SBA Certified Women-Owned (WOSB / EDWOSB) · CA Small Business Cert #2040639
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/guarantee/" className="text-paper/80 hover:text-white">
              30-Day Walkaway Guarantee
            </Link>
            <Link href="/benchmark-audit/" className="text-flag font-semibold hover:underline">
              Book Free Facility Walkthrough →
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-24 flex items-center justify-between gap-6">
        <BrandLogo />

        {/* Desktop Nav Links — consistent across every page, never wraps */}
        <nav
          className="hidden lg:flex items-center gap-1 xl:gap-2 shrink-0"
          aria-label="Primary Navigation"
        >
          {/* Commercial Mega-Menu Trigger */}
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("commercial")}
          >
            <Link
              href="/commercial-cleaning/"
              aria-expanded={openMenu === "commercial"}
              onClick={() => setOpenMenu(null)}
              className={`px-3 py-2 font-display-wide text-sm whitespace-nowrap flex items-center gap-1 cursor-pointer transition-colors ${
                pathname.startsWith("/commercial-cleaning")
                  ? "text-brand"
                  : "text-ink hover:text-brand"
              }`}
            >
              <span>Commercial</span>
              <span className="text-xs opacity-70">▾</span>
            </Link>
          </div>

          {/* House Cleaning Dropdown Trigger */}
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("residential")}
          >
            <Link
              href="/house-cleaning/"
              aria-expanded={openMenu === "residential"}
              onClick={() => setOpenMenu(null)}
              className={`px-3 py-2 font-display-wide text-sm whitespace-nowrap flex items-center gap-1 cursor-pointer transition-colors ${
                pathname.startsWith("/house-cleaning")
                  ? "text-brand"
                  : "text-ink hover:text-brand"
              }`}
            >
              <span>House Cleaning</span>
              <span className="text-xs opacity-70">▾</span>
            </Link>
          </div>

          <Link
            href="/pricing/"
            onMouseEnter={() => setOpenMenu(null)}
            className={`px-3 py-2 font-display-wide text-sm whitespace-nowrap transition-colors ${
              pathname.startsWith("/pricing")
                ? "text-brand"
                : "text-ink hover:text-brand"
            }`}
          >
            Pricing
          </Link>
          <Link
            href="/protocol/"
            onMouseEnter={() => setOpenMenu(null)}
            className={`px-3 py-2 font-display-wide text-sm whitespace-nowrap transition-colors ${
              pathname.startsWith("/protocol")
                ? "text-brand"
                : "text-ink hover:text-brand"
            }`}
          >
            Our Protocol
          </Link>
          <Link
            href="/government-contracting/"
            onMouseEnter={() => setOpenMenu(null)}
            className={`px-3 py-2 font-display-wide text-sm whitespace-nowrap transition-colors ${
              pathname.startsWith("/government-contracting")
                ? "text-brand"
                : "text-ink hover:text-brand"
            }`}
          >
            Government
          </Link>
          <Link
            href="/about/"
            onMouseEnter={() => setOpenMenu(null)}
            className={`px-3 py-2 font-display-wide text-sm whitespace-nowrap transition-colors ${
              pathname.startsWith("/about")
                ? "text-brand"
                : "text-ink hover:text-brand"
            }`}
          >
            About
          </Link>
        </nav>

        {/* Desktop Phone + Primary CTA — always identical and single-line */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <a
            href={`tel:${site.phoneRaw}`}
            onClick={() => trackEvent("call_click", { page_type: "header_desktop" })}
            className="text-sm font-bold text-ink hover:text-brand whitespace-nowrap tabular-nums"
          >
            {site.phone}
          </a>
          <Link
            href={
              isResidentialLane
                ? "/pricing/house-cleaning-calculator/"
                : "/pricing/commercial-cleaning-calculator/"
            }
            onClick={() =>
              trackEvent("calc_start", {
                calculator_type: isResidentialLane ? "residential" : "commercial",
                page_type: "header_cta",
              })
            }
            className="btn-report btn-brand text-sm py-2.5 px-5 whitespace-nowrap"
          >
            Get Instant Price
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="flex lg:hidden items-center gap-2">
          <a
            href={`tel:${site.phoneRaw}`}
            onClick={() => trackEvent("call_click", { page_type: "header_mobile" })}
            className="btn-report btn-paper px-3 py-2 min-h-[44px]"
            aria-label={`Call ${site.phone}`}
          >
            <IconPhone size={18} />
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Toggle Navigation Menu"
            className="btn-report btn-ink px-3.5 py-2 min-h-[44px] font-mono text-xs uppercase"
          >
            {mobileOpen ? "Close ✕" : "Menu ☰"}
          </button>
        </div>
      </div>

      {/* Desktop Mega-Menu: Commercial (Industries Left, Cities Right, Benchmark Audit Card) */}
      {openMenu === "commercial" && (
        <div className="hidden lg:block border-t border-rule bg-white shadow-xl">
          <div className="max-w-[1280px] mx-auto px-6 py-6 grid grid-cols-12 gap-6">
            {/* Industries Column (5 cols) */}
            <div className="col-span-5 pr-4 border-r border-rule">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand">
                  FACILITY INDUSTRIES (11)
                </span>
                <Link
                  href="/commercial-cleaning/"
                  onClick={() => setOpenMenu(null)}
                  className="font-mono text-xs underline text-ink hover:text-brand"
                >
                  Commercial Hub →
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                {industries.map((ind) => (
                  <Link
                    key={ind.slug}
                    href={`/commercial-cleaning/${ind.slug}/`}
                    onClick={() => setOpenMenu(null)}
                    className="text-sm py-1 text-ink hover:text-brand font-medium flex items-center justify-between border-b border-rule/50"
                  >
                    <span>{ind.name}</span>
                    <span className="font-mono text-xs text-ink/50">→</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Cities Column (4 cols) */}
            <div className="col-span-4 pr-4 border-r border-rule">
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-ink/75 mb-3">
                SERVICE AREAS (PLACER · SACRAMENTO · YOLO)
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                {[...tier1Cities, ...tier2Cities].map((city) => (
                  <Link
                    key={city.slug}
                    href={`/commercial-cleaning/${city.slug}-ca/`}
                    onClick={() => setOpenMenu(null)}
                    className="font-mono text-xs py-1 text-ink hover:text-brand flex items-center justify-between border-b border-rule/40"
                  >
                    <span>{city.name}, CA</span>
                    {city.tier === 1 && (
                      <span className="text-[10px] text-pass font-bold">T1</span>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Book a Benchmark Audit Card (3 cols) */}
            <div className="col-span-3 bg-ink text-paper p-5 rounded-[4px] flex flex-col justify-between">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-widest text-flag font-bold">
                  FREE ON-SITE AUDIT
                </span>
                <h3 className="font-display-wide text-lg text-paper mt-1">
                  Find out what your facility actually scores.
                </h3>
                <p className="text-xs text-paper/80 mt-2 leading-relaxed">
                  20-minute walkthrough. We grade your building across 42 points and leave you the written report—yours to keep either way.
                </p>
              </div>
              <div className="mt-4 space-y-2">
                <Link
                  href="/benchmark-audit/"
                  onClick={() => setOpenMenu(null)}
                  className="btn-report btn-brand btn-on-ink w-full text-xs"
                >
                  Book a Benchmark Audit
                </Link>
                <Link
                  href="/pricing/commercial-cleaning-calculator/"
                  onClick={() => setOpenMenu(null)}
                  className="block text-center font-mono text-xs text-paper/85 hover:text-white underline pt-1"
                >
                  Or get a 60-sec online estimate →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Mega-Menu: Residential House Cleaning */}
      {openMenu === "residential" && (
        <div className="hidden lg:block border-t border-rule bg-white shadow-xl">
          <div className="max-w-[1280px] mx-auto px-6 py-6 grid grid-cols-12 gap-6">
            <div className="col-span-5 pr-4 border-r border-rule">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-sky">
                  RESIDENTIAL HOUSE CLEANING LANE
                </span>
                <Link
                  href="/house-cleaning/"
                  onClick={() => setOpenMenu(null)}
                  className="font-mono text-xs underline text-ink hover:text-sky"
                >
                  House Cleaning Hub →
                </Link>
              </div>
              <div className="space-y-1.5">
                {residentialServices.map((srv) => (
                  <Link
                    key={srv.slug}
                    href={`/house-cleaning/${srv.slug}/`}
                    onClick={() => setOpenMenu(null)}
                    className="block py-1.5 text-sm font-medium text-ink hover:text-sky border-b border-rule/50"
                  >
                    {srv.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="col-span-4 pr-4 border-r border-rule">
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-ink/75 mb-3">
                HOME CLEANING COMMUNITIES
              </div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                {cities.slice(0, 10).map((city) => (
                  <Link
                    key={city.slug}
                    href={`/house-cleaning/${city.slug}-ca/`}
                    onClick={() => setOpenMenu(null)}
                    className="font-mono text-xs py-1 text-ink hover:text-sky border-b border-rule/40"
                  >
                    {city.name}, CA
                  </Link>
                ))}
              </div>
            </div>

            <div className="col-span-3 bg-paper-2 border-2 border-ink p-5 rounded-[4px] flex flex-col justify-between">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-widest text-sky font-bold">
                  60-SECOND HOME ESTIMATE
                </span>
                <h3 className="font-display-wide text-lg text-ink mt-1">
                  See your house cleaning price before entering an email.
                </h3>
                <p className="text-xs text-ink/80 mt-2">
                  Save up to 20% on weekly or 15% on biweekly service. Backed by 43+ five-star local reviews.
                </p>
              </div>
              <Link
                href="/pricing/house-cleaning-calculator/"
                onClick={() => setOpenMenu(null)}
                className="btn-report btn-sky w-full text-xs mt-4"
              >
                Launch Home Calculator →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t-2 border-ink bg-paper px-4 py-5 space-y-5 max-h-[82vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-2.5">
            <Link
              href="/pricing/commercial-cleaning-calculator/"
              onClick={() => setMobileOpen(false)}
              className="btn-report btn-brand text-xs text-center"
            >
              Commercial Price Calc
            </Link>
            <Link
              href="/pricing/house-cleaning-calculator/"
              onClick={() => setMobileOpen(false)}
              className="btn-report btn-sky text-xs text-center"
            >
              House Cleaning Calc
            </Link>
          </div>

          <div className="space-y-2 border-t border-rule pt-3">
            <div className="font-mono text-xs font-bold uppercase text-brand">
              Commercial Facility Cleaning
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <Link
                href="/commercial-cleaning/"
                onClick={() => setMobileOpen(false)}
                className="font-semibold underline py-1"
              >
                All Commercial Services
              </Link>
              <Link
                href="/benchmark-audit/"
                onClick={() => setMobileOpen(false)}
                className="font-semibold text-brand underline py-1"
              >
                Free Benchmark Audit
              </Link>
              {industries.slice(0, 6).map((ind) => (
                <Link
                  key={ind.slug}
                  href={`/commercial-cleaning/${ind.slug}/`}
                  onClick={() => setMobileOpen(false)}
                  className="text-ink/85 py-1"
                >
                  {ind.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-2 border-t border-rule pt-3">
            <div className="font-mono text-xs font-bold uppercase text-sky">
              Residential House Cleaning
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <Link
                href="/house-cleaning/"
                onClick={() => setMobileOpen(false)}
                className="font-semibold underline py-1"
              >
                House Cleaning Hub
              </Link>
              {residentialServices.map((srv) => (
                <Link
                  key={srv.slug}
                  href={`/house-cleaning/${srv.slug}/`}
                  onClick={() => setMobileOpen(false)}
                  className="text-ink/85 py-1"
                >
                  {srv.name.replace(" House Cleaning", "")}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 border-t border-rule pt-3 font-display-wide text-sm">
            <Link href="/pricing/" onClick={() => setMobileOpen(false)} className="py-1.5">
              Pricing & Cost Guides
            </Link>
            <Link href="/protocol/" onClick={() => setMobileOpen(false)} className="py-1.5">
              42-Point Protocol
            </Link>
            <Link href="/guarantee/" onClick={() => setMobileOpen(false)} className="py-1.5">
              Our Guarantee
            </Link>
            <Link href="/government-contracting/" onClick={() => setMobileOpen(false)} className="py-1.5">
              Government (WOSB)
            </Link>
            <Link href="/reviews/" onClick={() => setMobileOpen(false)} className="py-1.5">
              Client Reviews
            </Link>
            <Link href="/about/" onClick={() => setMobileOpen(false)} className="py-1.5">
              About Debra
            </Link>
            <Link href="/careers/" onClick={() => setMobileOpen(false)} className="py-1.5">
              Careers
            </Link>
            <Link href="/contact/" onClick={() => setMobileOpen(false)} className="py-1.5">
              Contact & Dispatch
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

