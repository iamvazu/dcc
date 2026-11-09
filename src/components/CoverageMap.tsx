"use client";

import React, { useState } from "react";
import Link from "next/link";

interface CityNode {
  slug: string;
  name: string;
  county: string;
  tier: 1 | 2;
  x: number;
  y: number;
  isHq?: boolean;
}

const MAP_CITIES: CityNode[] = [
  // Placer County
  { slug: "rocklin", name: "Rocklin (HQ)", county: "Placer", tier: 1, x: 345, y: 155, isHq: true },
  { slug: "roseville", name: "Roseville", county: "Placer", tier: 1, x: 310, y: 175 },
  { slug: "lincoln", name: "Lincoln", county: "Placer", tier: 1, x: 320, y: 115 },
  { slug: "loomis", name: "Loomis", county: "Placer", tier: 2, x: 375, y: 145 },
  { slug: "granite-bay", name: "Granite Bay", county: "Placer", tier: 2, x: 365, y: 180 },
  { slug: "auburn", name: "Auburn", county: "Placer", tier: 2, x: 430, y: 105 },
  // Sacramento County
  { slug: "citrus-heights", name: "Citrus Heights", county: "Sacramento", tier: 1, x: 305, y: 205 },
  { slug: "folsom", name: "Folsom", county: "Sacramento", tier: 1, x: 390, y: 215 },
  { slug: "fair-oaks", name: "Fair Oaks", county: "Sacramento", tier: 2, x: 335, y: 225 },
  { slug: "carmichael", name: "Carmichael", county: "Sacramento", tier: 2, x: 285, y: 230 },
  { slug: "rancho-cordova", name: "Rancho Cordova", county: "Sacramento", tier: 2, x: 325, y: 255 },
  { slug: "sacramento", name: "Sacramento", county: "Sacramento", tier: 1, x: 235, y: 255 },
  { slug: "elk-grove", name: "Elk Grove", county: "Sacramento", tier: 2, x: 255, y: 320 },
  // Yolo County
  { slug: "west-sacramento", name: "West Sacramento", county: "Yolo", tier: 2, x: 195, y: 260 },
  { slug: "davis", name: "Davis", county: "Yolo", tier: 2, x: 130, y: 265 },
  { slug: "woodland", name: "Woodland", county: "Yolo", tier: 2, x: 145, y: 200 },
];

interface CoverageMapProps {
  lane?: "commercial" | "residential";
}

export function CoverageMap({ lane = "commercial" }: CoverageMapProps) {
  const [hoveredSlug, setHoveredSlug] = useState<string>("rocklin");
  const basePath = lane === "residential" ? "/house-cleaning" : "/commercial-cleaning";
  const activeCity = MAP_CITIES.find((c) => c.slug === hoveredSlug) || MAP_CITIES[0];

  return (
    <div className="border border-rule bg-white rounded-xl shadow-xs overflow-hidden">
      <div className="bg-ink text-paper px-5 py-3.5 flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-semibold tracking-wide">
          Greater Sacramento &amp; Placer County Service Map
        </span>
        <span className="text-xs text-emerald-300 font-medium">
          Dispatched from Rocklin, CA (95765)
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* SVG Map Canvas */}
        <div className="lg:col-span-8 p-4 bg-paper/60 report-grid-bg border-b lg:border-b-0 lg:border-r border-rule/80">
          <svg
            viewBox="0 0 540 370"
            className="w-full h-auto max-h-[380px]"
            role="img"
            aria-label="Service Area Map of Placer, Sacramento, Yolo and Yuba Counties"
          >
            {/* County Polygons */}
            {/* Yuba County */}
            <polygon
              points="210,20 350,20 355,85 230,95"
              fill="#ECE8DF"
              stroke="#CFC8BA"
              strokeWidth="2"
            />
            <text x="255" y="55" className="font-mono text-[11px] fill-ink/45 uppercase">
              YUBA COUNTY
            </text>

            {/* Placer County */}
            <polygon
              points="265,95 510,55 515,185 300,195 275,145"
              fill="#F5F3EE"
              stroke="#17201E"
              strokeWidth="2"
            />
            <text x="395" y="155" className="font-mono text-[11px] fill-ink/60 font-bold uppercase">
              PLACER COUNTY
            </text>

            {/* Yolo County */}
            <polygon
              points="60,145 215,145 215,295 80,295"
              fill="#ECE8DF"
              stroke="#17201E"
              strokeWidth="1.5"
            />
            <text x="85" y="175" className="font-mono text-[11px] fill-ink/55 uppercase">
              YOLO COUNTY
            </text>

            {/* Sacramento County */}
            <polygon
              points="215,195 425,190 420,350 215,350"
              fill="#F5F3EE"
              stroke="#17201E"
              strokeWidth="2"
            />
            <text x="290" y="338" className="font-mono text-[11px] fill-ink/60 font-bold uppercase">
              SACRAMENTO COUNTY
            </text>

            {/* Major Highway Corridors (I-80, Hwy 65, Hwy 50, I-5) */}
            <path
              d="M90,280 L235,255 L310,175 L345,155 L455,90"
              stroke="#CFC8BA"
              strokeWidth="3"
              strokeDasharray="5 4"
              fill="none"
            />
            <path
              d="M310,175 L320,115 L290,45"
              stroke="#CFC8BA"
              strokeWidth="2.5"
              strokeDasharray="4 4"
              fill="none"
            />
            <path
              d="M235,255 L325,255 L390,215"
              stroke="#CFC8BA"
              strokeWidth="2.5"
              strokeDasharray="4 4"
              fill="none"
            />

            {/* City Dots */}
            {MAP_CITIES.map((city) => {
              const isHovered = city.slug === hoveredSlug;
              return (
                <g key={city.slug}>
                  <Link
                    href={`${basePath}/${city.slug}-ca/`}
                    onMouseEnter={() => setHoveredSlug(city.slug)}
                    onFocus={() => setHoveredSlug(city.slug)}
                    aria-label={`${city.name} ${lane} cleaning page`}
                  >
                    {city.isHq && (
                      <circle
                        cx={city.x}
                        cy={city.y}
                        r={12}
                        fill="rgba(181, 23, 94, 0.18)"
                      />
                    )}
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r={city.isHq ? 7 : isHovered ? 6.5 : 5}
                      fill={
                        city.isHq
                          ? "#B5175E"
                          : isHovered
                          ? "#1B8FC4"
                          : city.tier === 1
                          ? "#17201E"
                          : "#F5F3EE"
                      }
                      stroke="#17201E"
                      strokeWidth="2"
                    />
                    <text
                      x={city.x + 9}
                      y={city.y + 4}
                      className={`font-mono text-[10px] ${
                        city.isHq || isHovered
                          ? "fill-brand font-bold"
                          : "fill-ink font-medium"
                      }`}
                    >
                      {city.name}
                    </text>
                  </Link>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Active City Dispatch Readout & Quick Links */}
        <div className="lg:col-span-4 p-6 flex flex-col justify-between bg-white">
          <div>
            <div className="text-xs uppercase tracking-wider text-brand font-bold">
              Selected Service Area
            </div>
            <h4 className="font-display-wide text-2xl text-ink mt-1">
              {activeCity.name}
            </h4>
            <p className="text-xs text-ink/65 mt-0.5">
              {activeCity.county} County · Active Service Route
            </p>
            <div className="mt-4 pt-4 border-t border-rule/80">
              <Link
                href={`${basePath}/${activeCity.slug}-ca/`}
                className="btn-report btn-paper w-full text-xs"
              >
                View {activeCity.name.replace(" (HQ)", "")} {lane === "residential" ? "Home" : "Commercial"} Cleaning →
              </Link>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-rule/80">
            <div className="text-xs font-semibold text-ink/70 mb-2.5">
              All 16 Communities Served:
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
              {MAP_CITIES.map((city) => (
                <Link
                  key={city.slug}
                  href={`${basePath}/${city.slug}-ca/`}
                  onMouseEnter={() => setHoveredSlug(city.slug)}
                  className="text-ink/80 hover:text-brand truncate py-0.5"
                >
                  {city.name.replace(" (HQ)", "")}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

