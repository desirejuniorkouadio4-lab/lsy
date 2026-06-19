import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0c1420",
          width: 64,
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 14,
          position: "relative",
        }}
      >
        {/* Accent doré en haut */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 8,
            right: 8,
            height: 3,
            background: "#C9A84C",
            borderRadius: "0 0 3px 3px",
          }}
        />

        {/* Texte LSY */}
        <span
          style={{
            color: "#C9A84C",
            fontSize: 22,
            fontWeight: 900,
            fontFamily: "Georgia, serif",
            letterSpacing: -0.5,
          }}
        >
          LSY
        </span>
      </div>
    ),
    { ...size },
  );
}
