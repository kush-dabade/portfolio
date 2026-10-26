import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config/site-config";

export const alt = `${siteConfig.name} — portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated at build time: the cover sheet in miniature — paper, zone border,
// the name in heavy capitals and one vermilion mark.
export default function OpengraphImage() {
  const ink = "#141412";
  const line = "#d8d4c8";
  const accent = "#bb3508";
  const zones = "ABCDEFGHJKLM".split("");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#f1efe8",
          color: ink,
          fontFamily: "sans-serif",
          padding: 28,
        }}
      >
        <div style={{ display: "flex", flex: 1, flexDirection: "column", border: `2px solid ${ink}` }}>
          <div style={{ display: "flex", height: 34, borderBottom: `1px solid ${line}`, fontSize: 14, color: "#63625a" }}>
            <div style={{ display: "flex", alignItems: "center", padding: "0 16px", borderRight: `1px solid ${line}`, letterSpacing: 2 }}>
              SHEET 00 — COVER
            </div>
            {zones.map((z) => (
              <div key={z} style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", borderRight: `1px solid ${line}` }}>
                {z}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flex: 1, flexDirection: "column", justifyContent: "space-between", padding: "40px 48px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, letterSpacing: 2, color: "#47463f" }}>
              <div style={{ width: 14, height: 14, background: accent }} />
              {siteConfig.role.toUpperCase()} / {siteConfig.location.toUpperCase()}
            </div>
            <div style={{ display: "flex", flexDirection: "column", fontSize: 150, fontWeight: 800, letterSpacing: -6, lineHeight: 0.86 }}>
              <div style={{ display: "flex" }}>KUSH</div>
              <div style={{ display: "flex" }}>DABADE</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 24, color: "#47463f" }}>
              <div style={{ display: "flex", maxWidth: 640 }}>{siteConfig.hero.lead}</div>
              <div style={{ display: "flex", color: accent }}>github.com/kush-dabade</div>
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
