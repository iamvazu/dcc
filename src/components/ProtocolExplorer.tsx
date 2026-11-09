"use client";

import React, { useState } from "react";
import { protocol, ProtocolZone } from "@/lib/data";

interface ProtocolExplorerProps {
  initialZoneId?: string;
  highlightIndustry?: string;
  compact?: boolean;
}

export function ProtocolExplorer({
  initialZoneId = "restrooms",
  highlightIndustry,
  compact = false,
}: ProtocolExplorerProps) {
  const [activeZoneId, setActiveZoneId] = useState<string>(initialZoneId);
  const activeZone: ProtocolZone =
    protocol.zones.find((z) => z.id === activeZoneId) || protocol.zones[0];

  return (
    <div className="border border-rule bg-white rounded-xl shadow-xs overflow-hidden">
      {/* Top Header */}
      <div className="bg-ink text-paper px-5 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="text-xs bg-brand text-white px-2.5 py-0.5 rounded-full font-semibold">
            42-Point Standard
          </span>
          <span className="text-sm font-semibold">
            {protocol.protocolName}
          </span>
        </div>
        <span className="text-xs text-paper/75">
          6 Facility Zones · Inspected Every Visit
        </span>
      </div>

      {/* Zone Tabs */}
      <div
        role="tablist"
        aria-label="Facility Inspection Zones"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-b border-rule bg-paper divide-x divide-y lg:divide-y-0 divide-rule/70"
      >
        {protocol.zones.map((zone) => {
          const isSelected = zone.id === activeZone.id;
          return (
            <button
              key={zone.id}
              role="tab"
              type="button"
              aria-selected={isSelected}
              aria-controls={`zone-panel-${zone.id}`}
              id={`zone-tab-${zone.id}`}
              onClick={() => setActiveZoneId(zone.id)}
              className={`px-4 py-3.5 text-left transition-colors cursor-pointer min-h-[60px] flex flex-col justify-between ${
                isSelected
                  ? "bg-white text-ink border-b-2 border-b-brand font-bold"
                  : "bg-paper text-ink/70 hover:bg-white/70"
              }`}
            >
              <span className="text-[11px] font-semibold uppercase tracking-wide text-brand">
                {zone.pointRange}
              </span>
              <span className="font-display-wide text-sm mt-0.5 leading-tight">
                {zone.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Zone Subheader */}
      <div className="px-5 sm:px-6 py-3.5 bg-paper/60 border-b border-rule/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p className="text-sm text-ink/80">{activeZone.summary}</p>
        <div className="text-xs text-pass shrink-0 font-semibold">
          Photo-verified items marked below
        </div>
      </div>

      {/* Points Table */}
      <div
        role="tabpanel"
        id={`zone-panel-${activeZone.id}`}
        aria-labelledby={`zone-tab-${activeZone.id}`}
        className="divide-y divide-rule/70"
      >
        {activeZone.points.map((pt) => {
          const isIndustryPriority =
            highlightIndustry && pt.criticalFor.includes(highlightIndustry);
          return (
            <div
              key={pt.id}
              className={`p-4 sm:px-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-6 ${
                isIndustryPriority ? "bg-flag/8" : "bg-white"
              }`}
            >
              <div className="flex items-baseline gap-3 sm:w-5/12">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-paper text-ink/75 border border-rule shrink-0 tabular-nums">
                  {pt.number}
                </span>
                <h4 className="font-display-wide text-base text-ink">
                  {pt.title}
                </h4>
              </div>

              <div className="sm:w-5/12 text-sm text-ink/75 pl-14 sm:pl-0 leading-relaxed">
                {pt.standard}
              </div>

              <div className="sm:w-2/12 flex items-center sm:justify-end gap-2 pl-14 sm:pl-0">
                {pt.photoVerified && (
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-pass/10 text-pass font-semibold">
                    Photo Verified
                  </span>
                )}
                {isIndustryPriority && (
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-brand/10 text-brand font-semibold">
                    Key Focus
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {!compact && (
        <div className="px-5 sm:px-6 py-3.5 bg-paper border-t border-rule/80 flex flex-wrap items-center justify-between gap-3 text-xs text-ink/70">
          <span>{protocol.verificationMethod}</span>
          <span className="font-medium">Audited monthly by your dedicated route supervisor</span>
        </div>
      )}
    </div>
  );
}

