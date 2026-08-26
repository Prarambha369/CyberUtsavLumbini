import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#101014",
          padding: "80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "8px",
            background: "#ec3f2b",
          }}
        />

        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage:
              "linear-gradient(rgba(243,234,216,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(243,234,216,0.04) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontFamily: "sans-serif",
            fontWeight: 900,
            color: "#f3ead8",
            textTransform: "uppercase",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            zIndex: 1,
          }}
        >
          CYBER
        </div>
        <div
          style={{
            fontSize: 96,
            fontFamily: "sans-serif",
            fontWeight: 900,
            color: "#ec3f2b",
            textTransform: "uppercase",
            letterSpacing: "-0.06em",
            lineHeight: 0.85,
            zIndex: 1,
          }}
        >
          UTSAV
        </div>
        <div
          style={{
            fontSize: 48,
            fontFamily: "sans-serif",
            fontWeight: 900,
            color: "#f3ead8",
            textTransform: "uppercase",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            marginTop: "8px",
            zIndex: 1,
          }}
        >
          LUMBINI
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 22,
            fontFamily: "sans-serif",
            fontWeight: 700,
            color: "rgba(243,234,216,0.7)",
            marginTop: "32px",
            zIndex: 1,
          }}
        >
          Provincial Hackathon Chapter · Butwal · Lumbini Province
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "80px",
            right: "80px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontFamily: "sans-serif",
              fontWeight: 900,
              color: "#ec3f2b",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Co-organized by ButwalHacks
          </div>
          <div
            style={{
              fontSize: 16,
              fontFamily: "sans-serif",
              fontWeight: 900,
              color: "#2047ff",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            lumbini.cyberutsav.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
