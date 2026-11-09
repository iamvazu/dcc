"use client";

import React from "react";

export interface MarginSectionItem {
  num: string;
  id: string;
  label: string;
}

interface MarginRailProps {
  sections: MarginSectionItem[];
}

/**
 * PRD 2.4 & 7:
 * "a thin left 'margin rail' on long pages showing section numbers (like a report)"
 */
export function MarginRail({ sections }: MarginRailProps) {
  return (
    <aside
      aria-label="Report Section Index Rail"
      className="hidden 2xl:flex fixed left-3 top-1/2 -translate-y-1/2 z-30 flex-col border-2 border-ink bg-paper/95 backdrop-blur-xs rounded-[2px] shadow-[2px_2px_0px_#17201E] divide-y divide-rule no-print"
    >
      <div className="px-2 py-1.5 bg-ink text-paper font-mono text-[9px] font-bold uppercase tracking-widest text-center">
        SEC
      </div>
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          title={`${s.num} — ${s.label}`}
          className="group relative px-2 py-1.5 font-mono text-[11px] font-bold text-ink/75 hover:bg-brand hover:text-white transition-colors text-center no-underline"
        >
          <span>{s.num}</span>
          <span className="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1 bg-ink text-paper font-mono text-[10px] whitespace-nowrap border border-ink rounded-[2px] shadow-[2px_2px_0px_#B5175E]">
            {s.num} · {s.label}
          </span>
        </a>
      ))}
    </aside>
  );
}

