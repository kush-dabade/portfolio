import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config/site-config";

export const alt = `${siteConfig.name} — portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated at build time: the same drawing grid, two-tone headline and accent as the site's hero.
export default function OpengraphImage() {
  const grid = "rgba(255,255,255,0.055)";
  const { headline } = siteConfig.hero;
  const cut = headline.indexOf(", ");
  const [lead, tail] = cut === -1 ? [headline, ""] : [headline.slice(0, cut + 1), headline.slice(cut + 2)];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#09090b",
          backgroundImage: `linear-gradient(to right, ${grid} 1px, transparent 1px), linear-gradient(to bottom, ${grid} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          color: "#f4f4f5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26 }}>
          <div style={{ display: "flex", fontWeight: 600 }}>{siteConfig.name}</div>
          <div style={{ display: "flex", width: 32, height: 2, background: "rgba(255,255,255,0.2)" }} />
          <div style={{ display: "flex", color: "#a3a5ad" }}>{siteConfig.role}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 84, fontWeight: 600, letterSpacing: "-0.045em", lineHeight: 1 }}>
          <div style={{ display: "flex" }}>{lead}</div>
          <div style={{ display: "flex", color: "#80828c" }}>{tail}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 22, color: "#a3a5ad" }}>
          <div style={{ display: "flex" }}>TeamOS · University Management System · CoinWave</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#7c94ff" }}>
            <div style={{ width: 10, height: 10, borderRadius: 999, background: "#7c94ff" }} />
            github.com/kush-dabade
          </div>
        </div>
      </div>
    ),
    size
  );
}
