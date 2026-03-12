import Image from "next/image";

export default function HeroArea() {
  return (
    <div
      style={{
        position: "relative",
        flex: 1,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Dark terrain background - CSS mountains silhouette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 200% 80% at 50% 110%, #0a0a12 30%, transparent 70%),
            linear-gradient(180deg,
              #080810 0%,
              #0c0c18 30%,
              #0e0e1a 50%,
              #0a0a12 100%
            )
          `,
        }}
      />

      {/* Mountain silhouette SVG */}
      <svg
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
          height: "65%",
          opacity: 0.7,
        }}
        viewBox="0 0 1200 400"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Far mountains */}
        <path
          d="M0 400 L0 280 L80 200 L160 250 L240 160 L320 220 L400 140 L480 200 L560 120 L640 180 L720 100 L800 170 L880 130 L960 200 L1040 150 L1120 220 L1200 180 L1200 400 Z"
          fill="#0d0d1a"
          opacity="0.8"
        />
        {/* Near mountains */}
        <path
          d="M0 400 L0 320 L100 260 L200 300 L300 220 L400 280 L500 200 L600 260 L700 180 L800 240 L900 200 L1000 270 L1100 220 L1200 260 L1200 400 Z"
          fill="#0a0a16"
          opacity="0.9"
        />
        {/* Ground level */}
        <path
          d="M0 400 L0 370 L1200 370 L1200 400 Z"
          fill="#080810"
        />
      </svg>

      {/* Grid floor - perspective checkerboard */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "-20%",
          right: "-20%",
          height: "45%",
          background: `
            linear-gradient(180deg, transparent 0%, rgba(20,20,35,0.9) 100%),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 39px,
              rgba(255,255,255,0.04) 39px,
              rgba(255,255,255,0.04) 40px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 39px,
              rgba(255,255,255,0.04) 39px,
              rgba(255,255,255,0.04) 40px
            )
          `,
          transform: "perspective(400px) rotateX(55deg)",
          transformOrigin: "bottom center",
        }}
      />

      {/* CT Truck + Mahalo Bird Art — hero element */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        {/* Truck rear view image */}
        <div
          style={{
            position: "relative",
            width: "min(520px, 85vw)",
            aspectRatio: "16/9",
          }}
        >
          {/* CT rear tailgate image */}
          <Image
            src="/images/ct-reference/ct-rear.png"
            alt="Cybertruck rear tailgate view"
            fill
            style={{
              objectFit: "contain",
              objectPosition: "center bottom",
              filter: "brightness(0.85) contrast(1.05)",
            }}
            priority
          />

          {/* Mahalo Bird art overlay on tailgate area */}
          <div
            style={{
              position: "absolute",
              bottom: "22%",
              left: "15%",
              right: "15%",
              height: "34%",
              overflow: "hidden",
              borderRadius: 2,
              mixBlendMode: "screen",
              opacity: 0.9,
            }}
          >
            <Image
              src="/images/mahalo-bird/wrap-2.jpg"
              alt="Mahalo Bird — fine art Cybertruck wrap by Hulali Lā"
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>
        </div>

        {/* Art label - subtle */}
        <div
          style={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <span
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Mahalo Bird · Edition I
          </span>
          <div
            style={{
              display: "flex",
              gap: 4,
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "#4a9eff",
                opacity: 0.7,
              }}
            />
            <span
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.25)",
                letterSpacing: "0.1em",
              }}
            >
              3 / 10 available
            </span>
          </div>
        </div>

        {/* Upward chevron on truck (like CT UI) */}
        <div
          style={{
            position: "absolute",
            top: 4,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M1 7L6 2L11 7" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
