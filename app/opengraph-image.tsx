import { ImageResponse } from "next/og";

export const alt = "Lycée Scientifique de Yamoussoukro — L'excellence scientifique";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0c1420",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Liseré tricolore CI en haut */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, display: "flex", height: 10 }}>
          <div style={{ flex: 1, background: "#F77F00" }} />
          <div style={{ flex: 1, background: "#FFFFFF" }} />
          <div style={{ flex: 1, background: "#009A44" }} />
        </div>

        {/* Cercle décoratif */}
        <div style={{
          position: "absolute", right: -80, top: -80,
          width: 480, height: 480, borderRadius: "50%",
          background: "rgba(201,168,76,0.06)",
          border: "1.5px solid rgba(201,168,76,0.15)",
        }} />
        <div style={{
          position: "absolute", left: -60, bottom: -60,
          width: 320, height: 320, borderRadius: "50%",
          background: "rgba(201,168,76,0.04)",
          border: "1px solid rgba(201,168,76,0.10)",
        }} />

        {/* Logo initiales */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 80, height: 80,
          borderRadius: 20,
          background: "#C9A84C",
          marginBottom: 28,
        }}>
          <span style={{ color: "#0c1420", fontSize: 28, fontWeight: 900, letterSpacing: -1 }}>
            LSY
          </span>
        </div>

        {/* Eyebrow */}
        <p style={{
          color: "#C9A84C",
          fontSize: 18,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          margin: "0 0 20px 0",
          fontFamily: "Helvetica, sans-serif",
          fontWeight: 600,
        }}>
          Côte d'Ivoire — Établissement public d'excellence
        </p>

        {/* Titre principal */}
        <h1 style={{
          color: "#FFFFFF",
          fontSize: 72,
          fontWeight: 700,
          textAlign: "center",
          margin: 0,
          lineHeight: 1.05,
          letterSpacing: -1,
        }}>
          Lycée Scientifique
        </h1>
        <h1 style={{
          color: "#FFFFFF",
          fontSize: 72,
          fontWeight: 700,
          textAlign: "center",
          margin: "4px 0 0 0",
          lineHeight: 1.05,
          letterSpacing: -1,
        }}>
          de Yamoussoukro
        </h1>

        {/* Séparateur doré */}
        <div style={{
          width: 80, height: 3,
          background: "#C9A84C",
          borderRadius: 2,
          margin: "28px 0",
        }} />

        {/* Tagline */}
        <p style={{
          color: "rgba(255,255,255,0.55)",
          fontSize: 24,
          margin: 0,
          textAlign: "center",
          fontFamily: "Helvetica, sans-serif",
          fontStyle: "italic",
        }}>
          L'excellence scientifique au service de la nation
        </p>

        {/* URL */}
        <p style={{
          position: "absolute",
          bottom: 28,
          color: "rgba(255,255,255,0.25)",
          fontSize: 16,
          fontFamily: "Helvetica, sans-serif",
          margin: 0,
          letterSpacing: "0.08em",
        }}>
          lsy-site.vercel.app
        </p>

        {/* Liseré doré en bas */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 6, background: "#C9A84C" }} />
      </div>
    ),
    { ...size },
  );
}
