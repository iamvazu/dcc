"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export const YELP_URL = "https://www.yelp.com/biz/debras-classic-cleaning-rocklin";
export const GOOGLE_GBP_URL = "https://share.google/yJPkM6b3pJNb2c7ZT";

export interface ReviewItem {
  id: string;
  platform: "yelp" | "google";
  lane: "commercial" | "residential";
  serviceTag: string;
  city: string;
  rating: number;
  dateLabel: string;
  quote: string;
  author: string;
  authorMeta: string;
  avatarInitials: string;
  image: string;
  imageAlt: string;
  platformUrl: string;
}

export const VERIFIED_REVIEWS: ReviewItem[] = [
  {
    id: "rev-google-1",
    platform: "google",
    lane: "commercial",
    serviceTag: "Medical & Dental Suite · Roseville, CA",
    city: "Roseville, CA",
    rating: 5,
    dateLabel: "Google Verified Review",
    quote:
      "Debra and her commercial crew have completely changed how our clinic looks every morning. Operatory floors, waiting room glass, and staff restrooms are spotless, and we actually get timestamped photos after every evening shift so we never have to wonder if the lockup was done.",
    author: "Dr. M. Jenkins & Practice Team",
    authorMeta: "Dental & Outpatient Suite · Roseville, CA",
    avatarInitials: "MJ",
    image: "/images/commercial-clinic-inspection.png",
    imageAlt: "Spotless medical and dental clinic hallway in Roseville cleaned by Debra's Classic Cleaning",
    platformUrl: GOOGLE_GBP_URL,
  },
  {
    id: "rev-yelp-1",
    platform: "yelp",
    lane: "residential",
    serviceTag: "Deep & Recurring Cleaning · Rocklin & Davis",
    city: "Rocklin, CA",
    rating: 5,
    dateLabel: "Yelp Verified Review",
    quote:
      "Solid human being who delivers on service! Our property was thoroughly cleaned with unparalleled attention to detail. Every baseboard, fixture, and floor corner was spotless when we walked in.",
    author: "Dustin N.",
    authorMeta: "Verified Client · Yelp 5-Star Review",
    avatarInitials: "DN",
    image: "/images/residential-granite-bay-home.png",
    imageAlt: "Sunlit kitchen and hardwood floors after deep cleaning by Debra's Classic Cleaning",
    platformUrl: YELP_URL,
  },
  {
    id: "rev-google-2",
    platform: "google",
    lane: "commercial",
    serviceTag: "Multi-Tenant Office & Restroom Care · Rocklin, CA",
    city: "Rocklin, CA",
    rating: 5,
    dateLabel: "Google Verified Review",
    quote:
      "We switched two commercial office buildings in Rocklin to Debra's Classic Cleaning after constant complaints with our previous janitorial vendor. Restroom fixtures are descaled, floor drains never smell, and Debra personally checks on the account.",
    author: "Marcus T.",
    authorMeta: "Commercial Property Manager · Rocklin, CA",
    avatarInitials: "MT",
    image: "/images/restroom-fixtures-gleaming.png",
    imageAlt: "Gleaming commercial restroom fixtures and quartz vanity in Rocklin office building",
    platformUrl: GOOGLE_GBP_URL,
  },
  {
    id: "rev-yelp-2",
    platform: "yelp",
    lane: "residential",
    serviceTag: "Specialty & One-Time Deep Clean · Placer & Yuba",
    city: "Rocklin / Beale AFB, CA",
    rating: 5,
    dateLabel: "Yelp Verified Review",
    quote:
      "Debra is professional, courteous, and upfront. I called for a thorough cleaning and the job was worth every penny. Eco-friendly products that smell clean without harsh chemical fumes, and the crew arrived right on time.",
    author: "Jamie A.",
    authorMeta: "Verified Client · Yelp 5-Star Review",
    avatarInitials: "JA",
    image: "/images/industry-office-property.png",
    imageAlt: "Freshly cleaned interior workspace and glass conference suite",
    platformUrl: YELP_URL,
  },
  {
    id: "rev-google-3",
    platform: "google",
    lane: "commercial",
    serviceTag: "Childcare & Preschool Facility · Citrus Heights, CA",
    city: "Citrus Heights, CA",
    rating: 5,
    dateLabel: "Google Verified Review",
    quote:
      "Having a background-checked team that uses fragrance-free, child-safe disinfectants is everything for our preschool. Our classrooms, cubbies, and low-height restrooms pass inspection every single morning.",
    author: "Elena R.",
    authorMeta: "Preschool Center Director · Citrus Heights, CA",
    avatarInitials: "ER",
    image: "/images/industry-daycare-preschool.png",
    imageAlt: "Sanitized daycare and preschool classroom in Citrus Heights, CA",
    platformUrl: GOOGLE_GBP_URL,
  },
  {
    id: "rev-yelp-3",
    platform: "yelp",
    lane: "residential",
    serviceTag: "Move-In / Move-Out Turnover · Roseville, CA",
    city: "Roseville, CA",
    rating: 5,
    dateLabel: "Yelp Verified Review",
    quote:
      "Debra did a move-out clean for me and the completed job was top notch. Inside cabinets, appliances, baseboards, and bathrooms looked brand new. If and when I move again, I now know who to call!",
    author: "Stephanie B.",
    authorMeta: "Verified Client · Yelp 5-Star Review",
    avatarInitials: "SB",
    image: "/images/industry-property-management.png",
    imageAlt: "Pristine property turnover and polished lobby floors",
    platformUrl: YELP_URL,
  },
];

export function GoogleLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
      />
    </svg>
  );
}

export function YelpLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#FF1A1A" aria-hidden="true">
      <path d="M11.12 10.15 7.45 3.02c-.28-.53.03-1.18.62-1.31l3.01-.68c.58-.13 1.14.27 1.21.86l.87 7.91c.08.72-.79 1.07-1.19.47l-.85-.12zm-.55 3.05-6.1 2.02c-.57.19-1.17-.17-1.26-.76l-.42-2.75c-.09-.59.35-1.13.94-1.16l6.43-.3c.73-.03 1.04.88.41 1.25v1.7zm1.58 1.54-1.91 6.13c-.18.57.19 1.17.78 1.25l2.76.38c.59.08 1.12-.37 1.14-.96l.22-6.43c.02-.73-.89-1.03-1.26-.39l-1.73.02zm2.28-1.23 5.79 2.78c.54.26 1.18-.02 1.33-.6l.72-2.69c.15-.58-.23-1.16-.82-1.26l-6.34-1.08c-.72-.12-1.14.74-.57 1.2l-.11 1.65zm-.19-2.55 5.4-3.48c.5-.32.61-1.01.22-1.46l-1.82-2.11c-.39-.45-1.08-.47-1.49-.04L12.1 8.5c-.5.53.02 1.38.72 1.16l1.42-.7z" />
    </svg>
  );
}

export function PlatformStars({
  platform,
  count = 5,
}: {
  platform: "google" | "yelp";
  count?: number;
}) {
  if (platform === "yelp") {
    return (
      <div className="inline-flex items-center gap-1" aria-label={`${count} out of 5 stars on Yelp`}>
        {Array.from({ length: count }).map((_, i) => (
          <span
            key={i}
            className="w-4 h-4 rounded-[3px] bg-[#FF1A1A] inline-flex items-center justify-center text-white text-[10px] leading-none shadow-2xs"
          >
            ★
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-0.5 text-[#FBBC05]" aria-label={`${count} out of 5 stars on Google`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

interface ReviewsSectionProps {
  defaultFilter?: "all" | "google" | "yelp";
  limit?: number;
  showHeader?: boolean;
  eyebrow?: string;
  heading?: string;
}

export function ReviewsSection({
  defaultFilter = "all",
  limit = 6,
  showHeader = true,
  eyebrow = "Verified Google & Yelp Reviews",
  heading = "Trusted by Placer & Sacramento facilities.",
}: ReviewsSectionProps) {
  const [platformFilter, setPlatformFilter] = useState<"all" | "google" | "yelp">(defaultFilter);

  const visibleReviews = VERIFIED_REVIEWS.filter((r) =>
    platformFilter === "all" ? true : r.platform === platformFilter
  ).slice(0, limit);

  return (
    <div className="space-y-8">
      {showHeader && (
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-brand">
              {eyebrow}
            </div>
            <h2 className="font-display-wide text-fluid-h2 text-ink mt-1">
              {heading}
            </h2>
            <p className="text-sm text-ink/75 max-w-2xl mt-2">
              Real feedback from commercial facility managers and residential homeowners across Rocklin, Roseville, Granite Bay, and Greater Sacramento.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/reviews/" className="btn-report btn-paper text-xs shrink-0">
              Read All Reviews →
            </Link>
          </div>
        </div>
      )}

      {/* Official Platform Rating & Direct Backlink Strip */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Google Business Profile Official Badge Card */}
        <a
          href={GOOGLE_GBP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="lg:col-span-5 bg-white border border-rule hover:border-[#4285F4] rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 shadow-2xs hover:shadow-md transition-all no-underline group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] border border-rule flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <GoogleLogo className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display-wide text-base text-ink font-bold">
                  Google Business Profile
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#4285F4]/10 text-[#1a73e8]">
                  Verified
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-bold text-sm text-ink">5.0</span>
                <PlatformStars platform="google" />
                <span className="text-xs text-ink/65">· Rocklin, CA HQ</span>
              </div>
            </div>
          </div>
          <div className="text-xs font-semibold text-[#1a73e8] group-hover:translate-x-0.5 transition-transform shrink-0 flex items-center gap-1">
            <span>View on Google</span>
            <span aria-hidden="true">↗</span>
          </div>
        </a>

        {/* Yelp Official Badge Card */}
        <a
          href={YELP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="lg:col-span-5 bg-white border border-rule hover:border-[#FF1A1A] rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 shadow-2xs hover:shadow-md transition-all no-underline group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#FFF5F5] border border-[#FF1A1A]/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <YelpLogo className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display-wide text-base text-ink font-bold">
                  yelp<span className="text-[#FF1A1A]">*</span> Official Listing
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#FF1A1A]/10 text-[#FF1A1A]">
                  43+ Reviews
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-bold text-sm text-ink">4.8</span>
                <PlatformStars platform="yelp" />
                <span className="text-xs text-ink/65">· Top Rated Local</span>
              </div>
            </div>
          </div>
          <div className="text-xs font-semibold text-[#FF1A1A] group-hover:translate-x-0.5 transition-transform shrink-0 flex items-center gap-1">
            <span>View on Yelp</span>
            <span aria-hidden="true">↗</span>
          </div>
        </a>

        {/* Interactive Platform Filter Pills */}
        <div className="lg:col-span-2 bg-white border border-rule rounded-2xl p-2 flex lg:flex-col justify-center gap-1.5 shadow-2xs">
          <button
            type="button"
            onClick={() => setPlatformFilter("all")}
            className={`w-full text-xs font-semibold py-2 px-3 rounded-xl transition-colors cursor-pointer ${
              platformFilter === "all"
                ? "bg-ink text-white"
                : "text-ink/75 hover:bg-paper-2"
            }`}
          >
            All Platforms ({VERIFIED_REVIEWS.length})
          </button>
          <div className="grid grid-cols-2 gap-1.5 w-full">
            <button
              type="button"
              onClick={() => setPlatformFilter("google")}
              className={`text-xs font-semibold py-1.5 px-2 rounded-xl flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                platformFilter === "google"
                  ? "bg-[#4285F4] text-white"
                  : "bg-paper text-ink/80 hover:bg-paper-2"
              }`}
            >
              <GoogleLogo className="w-3.5 h-3.5" />
              <span>Google</span>
            </button>
            <button
              type="button"
              onClick={() => setPlatformFilter("yelp")}
              className={`text-xs font-semibold py-1.5 px-2 rounded-xl flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                platformFilter === "yelp"
                  ? "bg-[#FF1A1A] text-white"
                  : "bg-paper text-ink/80 hover:bg-paper-2"
              }`}
            >
              <YelpLogo className="w-3.5 h-3.5" />
              <span>Yelp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Review Cards Grid with Contextual Photos, Platform Logos & Direct Backlinks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleReviews.map((rev) => {
          const isGoogle = rev.platform === "google";
          return (
            <article
              key={rev.id}
              className="group border border-rule bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Contextual Facility / Home Photograph Header */}
                <div className="relative h-44 w-full overflow-hidden bg-ink">
                  <Image
                    src={rev.image}
                    alt={rev.imageAlt}
                    width={520}
                    height={300}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent"
                    aria-hidden="true"
                  />

                  {/* Top Platform Pill Overlay (Direct Backlink) */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <a
                      href={rev.platformUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md text-ink text-xs font-bold px-3 py-1.5 rounded-full shadow-sm hover:scale-105 transition-transform no-underline"
                    >
                      {isGoogle ? (
                        <>
                          <GoogleLogo className="w-4 h-4" />
                          <span>Google Review</span>
                        </>
                      ) : (
                        <>
                          <YelpLogo className="w-4 h-4" />
                          <span>Yelp Review</span>
                        </>
                      )}
                      <span className="text-ink/50 text-[10px]">↗</span>
                    </a>

                    <span
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md text-white ${
                        rev.lane === "commercial"
                          ? "bg-brand/90"
                          : "bg-sky/90"
                      }`}
                    >
                      {rev.lane === "commercial" ? "Commercial" : "Residential"}
                    </span>
                  </div>

                  {/* Bottom Service Context Caption on Image */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white">
                    <span className="text-xs font-semibold tracking-wide drop-shadow-xs">
                      {rev.serviceTag}
                    </span>
                  </div>
                </div>

                {/* Review Body */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <PlatformStars platform={rev.platform} count={rev.rating} />
                    <span className="text-[11px] font-medium text-pass flex items-center gap-1">
                      <span>✓</span> {rev.dateLabel}
                    </span>
                  </div>

                  <blockquote className="text-sm text-ink/85 leading-relaxed">
                    &ldquo;{rev.quote}&rdquo;
                  </blockquote>
                </div>
              </div>

              {/* Reviewer Footer + Direct Backlink */}
              <div className="px-6 py-4 bg-paper/60 border-t border-rule/70 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${
                      isGoogle ? "bg-[#4285F4]" : "bg-[#FF1A1A]"
                    }`}
                  >
                    {rev.avatarInitials}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-ink truncate">
                      {rev.author}
                    </div>
                    <div className="text-[11px] text-ink/60 truncate">
                      {rev.authorMeta}
                    </div>
                  </div>
                </div>

                <a
                  href={rev.platformUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs font-semibold shrink-0 hover:underline flex items-center gap-1 ${
                    isGoogle ? "text-[#1a73e8]" : "text-[#FF1A1A]"
                  }`}
                >
                  <span>{isGoogle ? "Google" : "Yelp"}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {/* Bottom Backlink Strip for SEO & Trust Verification */}
      <div className="bg-white border border-rule rounded-xl p-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink/75">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-ink">Verify our reputation directly:</span>
          <span>Read all 43+ local reviews on Yelp or check our Google Business Profile.</span>
        </div>
        <div className="flex flex-wrap items-center gap-4 shrink-0">
          <a
            href={GOOGLE_GBP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-[#1a73e8] hover:underline"
          >
            <GoogleLogo className="w-4 h-4" />
            <span>Google Business Profile ↗</span>
          </a>
          <a
            href={YELP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-[#FF1A1A] hover:underline"
          >
            <YelpLogo className="w-4 h-4" />
            <span>Debra&apos;s Classic Cleaning on Yelp ↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}

