import React from "react";

interface GuaranteeSealProps {
  size?: "md" | "lg";
}

export function GuaranteeSeal({ size = "lg" }: GuaranteeSealProps) {
  const dimensions = size === "lg" ? "w-44 h-44" : "w-32 h-32";

  return (
    <div
      className={`relative inline-flex items-center justify-center ${dimensions} rounded-full border-2 border-pass bg-white text-ink shadow-md select-none shrink-0`}
      role="img"
      aria-label="Guarantee Seal: 30-Day Walkaway and 24-Hour Re-Clean Guarantee"
    >
      <div className="absolute inset-2 rounded-full border border-dashed border-pass/45" />
      <div className="text-center px-3">
        <div className="text-[10px] font-bold uppercase tracking-wider text-pass">
          Written Guarantee
        </div>
        <div className="font-display-expanded text-base sm:text-lg leading-tight text-ink mt-1">
          30-Day Walkaway
        </div>
        <div className="my-1.5 border-t border-rule w-16 mx-auto" />
        <div className="text-xs font-bold text-brand">
          24-Hr Re-Clean
        </div>
        <div className="text-[10px] font-medium text-ink/65 mt-0.5">
          3-Strike Visit Credit
        </div>
      </div>
    </div>
  );
}

