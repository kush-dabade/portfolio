import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config/site-config";

export const alt = `${siteConfig.name} — portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated at build time: the same grid, type and accent as the site's hero.
export default function OpengraphImage() {
  const grid = "rgba(255,255,255,0.06)";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#08090a",
          backgroundImage: `linear-gradient(to right, ${grid} 1px, transparent 1px), linear-gradient(to bottom, ${grid} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          color: "#f3f4f6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "#131418",
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            {siteConfig.initials}
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#a3a6ae" }}>
            {siteConfig.education.degree} · MIT-WPU, Pune
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1 }}>
            {siteConfig.name}
          </div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 32, color: "#a3a6ae" }}>
            Full-stack web applications &amp; AWS infrastructure
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 22, color: "#6ea8fe" }}>
          <div style={{ width: 10, height: 10, borderRadius: 999, background: "#6ea8fe" }} />
          github.com/kush-dabade
        </div>
      </div>
    ),
    size
  );
}
