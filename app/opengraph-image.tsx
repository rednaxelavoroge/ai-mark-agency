import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — AI-native marketing agency`;
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
          background: "#0b0c0a",
          color: "#f3f0e6",
          padding: 72,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              background: "#d6ff3f",
              color: "#14180a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
            }}
          >
            AM
          </div>
          {site.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 64, lineHeight: 1.05, maxWidth: 980 }}>
            AI-native marketing. Human approval on every publish.
          </div>
          <div style={{ fontSize: 28, color: "#9a9788" }}>{site.domain}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
