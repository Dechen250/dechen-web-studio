import { ImageResponse } from "next/og";
import { cardProfile } from "@/lib/site";

export const alt = `${cardProfile.name} · ${cardProfile.company}`;
export const size = { width: 1200, height: 630 };
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
          padding: 72,
          background: "linear-gradient(180deg, #101010 0%, #050505 100%)",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 72,
            height: 72,
            borderRadius: 18,
            border: "1px solid rgba(0,112,243,0.35)",
            background: "#101010",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: "#ffffff",
          }}
        >
          DWS
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#0070F3",
            }}
          >
            {cardProfile.company}
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 600,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            {cardProfile.name}
          </div>
          <div style={{ fontSize: 28, color: "#A1A1AA", maxWidth: 760 }}>
            {cardProfile.tagline}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
