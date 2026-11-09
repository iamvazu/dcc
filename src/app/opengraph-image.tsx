import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#F5F3EE",
          color: "#17201E",
          padding: "56px",
          border: "12px solid #17201E",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top Masthead */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "3px solid #17201E",
            paddingBottom: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                backgroundColor: "#B5175E",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: "16px",
                border: "3px solid #17201E",
              }}
            >
              42
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "28px", fontWeight: 900, letterSpacing: "-0.02em" }}>
                DEBRA&apos;S CLASSIC CLEANING LLC
              </span>
              <span style={{ fontSize: "14px", color: "#17201E", letterSpacing: "0.12em" }}>
                FORM DCC-42 · PLACER &amp; SACRAMENTO COUNTIES
              </span>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#2F7D4F",
              color: "#FFFFFF",
              padding: "10px 20px",
              fontSize: "18px",
              fontWeight: 800,
              border: "3px solid #17201E",
            }}
          >
            SCORE: 96 / 100 PASSED
          </div>
        </div>

        {/* Main Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              fontSize: "18px",
              fontWeight: 800,
              color: "#B5175E",
              letterSpacing: "0.08em",
            }}
          >
            COMMERCIAL &amp; RESIDENTIAL CLEANING · ROCKLIN · ROSEVILLE · SACRAMENTO
          </div>
          <div
            style={{
              fontSize: "78px",
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              color: "#17201E",
            }}
          >
            Clean you can inspect.
          </div>
          <div
            style={{
              fontSize: "26px",
              color: "#17201E",
              maxWidth: "920px",
              lineHeight: 1.35,
            }}
          >
            42-Point Protocol · Photo-Verified Every Visit · 30-Day Walkaway Guarantee · Instant Online Price Calculator
          </div>
        </div>

        {/* Bottom Credentials Strip */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#17201E",
            color: "#F5F3EE",
            padding: "18px 28px",
            fontSize: "16px",
            fontWeight: 700,
          }}
        >
          <span>WOSB / EDWOSB CERTIFIED</span>
          <span>CA SMALL BUSINESS (MICRO)</span>
          <span>CAGE: 9Z5E9 · NAICS: 561720</span>
          <span style={{ color: "#E8A317" }}>916-668-8080</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
