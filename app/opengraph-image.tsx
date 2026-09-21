import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.taglineEn}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7f5f0",
          color: "#171614",
          padding: 72,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 26,
            letterSpacing: 0.5,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 10,
              background: "#3a4318",
              color: "#f7f5f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            AM
          </div>
          {site.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 18,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#3a4318",
              fontWeight: 600,
            }}
          >
            AI-Native Venture & Marketing Company
          </div>
          <div style={{ fontSize: 56, lineHeight: 1.08, maxWidth: 1000, fontWeight: 500 }}>
            {site.taglineEn}
          </div>
          <div style={{ fontSize: 24, color: "#5f5c55" }}>{site.domain}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
