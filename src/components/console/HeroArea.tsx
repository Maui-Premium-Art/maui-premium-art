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
        background: "#08080c",
      }}
    >
      {/* === BACKGROUND: Craggy dark terrain matching Tesla CT display === */}

      {/* Sky — near-black, very subtle depth */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, #050508 0%, #08080c 30%, #0a0a0f 50%, #08080c 100%)",
        }}
      />

      {/* Terrain — rough, craggy, rocky undulations with ridge highlights */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          height: "70%",
        }}
        viewBox="0 0 2000 700"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
      >
        {/* Layer 1 — far distant peaks, very subtle against sky */}
        <path
          d="M0 700 L0 220 L30 200 L60 215 L90 190 L120 210 L150 185 L190 205 L220 175 L260 195 L300 165 L340 190 L380 170 L420 195 L460 160 L500 185 L540 170 L580 200 L620 175 L660 155 L700 180 L740 160 L780 185 L820 155 L860 175 L900 145 L940 170 L980 150 L1020 175 L1060 155 L1100 180 L1140 160 L1180 190 L1220 165 L1260 145 L1300 170 L1340 155 L1380 180 L1420 160 L1460 185 L1500 165 L1540 190 L1580 170 L1620 195 L1660 175 L1700 155 L1740 180 L1780 165 L1820 190 L1860 170 L1900 200 L1940 180 L2000 195 L2000 700 Z"
          fill="#161620"
        />
        {/* Ridge highlights layer 1 */}
        <path
          d="M0 220 L30 200 L60 215 L90 190 L120 210 L150 185 L190 205 L220 175 L260 195 L300 165 L340 190 L380 170 L420 195 L460 160 L500 185 L540 170 L580 200 L620 175 L660 155 L700 180 L740 160 L780 185 L820 155 L860 175 L900 145 L940 170 L980 150 L1020 175 L1060 155 L1100 180 L1140 160 L1180 190 L1220 165 L1260 145 L1300 170 L1340 155 L1380 180 L1420 160 L1460 185 L1500 165 L1540 190 L1580 170 L1620 195 L1660 175 L1700 155 L1740 180 L1780 165 L1820 190 L1860 170 L1900 200 L1940 180 L2000 195"
          stroke="#222230"
          strokeWidth="1.2"
          fill="none"
        />

        {/* Layer 2 — mid-distance terrain, more prominent */}
        <path
          d="M0 700 L0 300 L25 285 L55 295 L80 270 L110 290 L140 265 L175 285 L200 260 L235 278 L265 255 L300 275 L330 258 L365 280 L395 250 L430 272 L460 255 L495 278 L530 260 L560 240 L595 265 L625 248 L660 270 L695 245 L730 268 L760 242 L795 265 L825 248 L860 272 L895 252 L930 275 L960 255 L995 278 L1030 258 L1060 280 L1095 260 L1130 245 L1160 270 L1195 250 L1230 275 L1260 255 L1295 280 L1330 258 L1365 240 L1400 265 L1435 248 L1470 272 L1505 252 L1540 275 L1575 255 L1610 280 L1645 260 L1680 242 L1720 268 L1755 250 L1790 275 L1825 258 L1860 280 L1900 262 L1940 285 L2000 270 L2000 700 Z"
          fill="#12121a"
        />
        <path
          d="M0 300 L25 285 L55 295 L80 270 L110 290 L140 265 L175 285 L200 260 L235 278 L265 255 L300 275 L330 258 L365 280 L395 250 L430 272 L460 255 L495 278 L530 260 L560 240 L595 265 L625 248 L660 270 L695 245 L730 268 L760 242 L795 265 L825 248 L860 272 L895 252 L930 275 L960 255 L995 278 L1030 258 L1060 280 L1095 260 L1130 245 L1160 270 L1195 250 L1230 275 L1260 255 L1295 280 L1330 258 L1365 240 L1400 265 L1435 248 L1470 272 L1505 252 L1540 275 L1575 255 L1610 280 L1645 260 L1680 242 L1720 268 L1755 250 L1790 275 L1825 258 L1860 280 L1900 262 L1940 285 L2000 270"
          stroke="#1e1e28"
          strokeWidth="1"
          fill="none"
        />

        {/* Layer 3 — closer terrain, rough craggy ridgeline */}
        <path
          d="M0 700 L0 370 L20 358 L45 365 L70 348 L95 360 L120 342 L150 355 L175 338 L205 352 L230 335 L260 350 L285 332 L315 348 L340 330 L370 345 L395 328 L425 342 L450 325 L480 340 L510 322 L540 338 L565 320 L600 336 L630 318 L660 335 L690 315 L720 332 L750 314 L780 330 L810 312 L845 328 L875 310 L905 326 L935 308 L970 325 L1000 310 L1030 328 L1060 312 L1095 330 L1125 315 L1155 332 L1185 318 L1220 335 L1250 320 L1280 338 L1315 322 L1345 340 L1380 325 L1410 342 L1445 328 L1475 345 L1510 330 L1540 348 L1575 332 L1605 350 L1640 335 L1670 352 L1705 338 L1735 355 L1770 340 L1800 358 L1835 342 L1865 360 L1900 345 L1935 362 L1970 348 L2000 358 L2000 700 Z"
          fill="#0e0e16"
        />
        <path
          d="M0 370 L20 358 L45 365 L70 348 L95 360 L120 342 L150 355 L175 338 L205 352 L230 335 L260 350 L285 332 L315 348 L340 330 L370 345 L395 328 L425 342 L450 325 L480 340 L510 322 L540 338 L565 320 L600 336 L630 318 L660 335 L690 315 L720 332 L750 314 L780 330 L810 312 L845 328 L875 310 L905 326 L935 308 L970 325 L1000 310 L1030 328 L1060 312 L1095 330 L1125 315 L1155 332 L1185 318 L1220 335 L1250 320 L1280 338 L1315 322 L1345 340 L1380 325 L1410 342 L1445 328 L1475 345 L1510 330 L1540 348 L1575 332 L1605 350 L1640 335 L1670 352 L1705 338 L1735 355 L1770 340 L1800 358 L1835 342 L1865 360 L1900 345 L1935 362 L1970 348 L2000 358"
          stroke="#1a1a24"
          strokeWidth="0.9"
          fill="none"
        />

        {/* Layer 4 — nearest terrain, most visible rocky ridgeline */}
        <path
          d="M0 700 L0 420 L18 412 L38 418 L58 405 L78 415 L100 402 L122 412 L142 398 L165 410 L185 396 L210 408 L232 394 L255 406 L278 390 L300 404 L325 392 L348 406 L372 395 L395 408 L420 396 L445 410 L468 398 L492 412 L518 400 L542 414 L568 402 L592 416 L618 404 L645 418 L670 406 L698 420 L722 408 L748 395 L775 410 L800 398 L828 412 L855 400 L880 415 L908 402 L935 416 L962 404 L990 418 L1018 406 L1045 395 L1072 410 L1100 398 L1128 414 L1158 402 L1185 416 L1215 404 L1242 418 L1272 406 L1300 395 L1330 410 L1358 398 L1388 414 L1415 402 L1445 416 L1475 404 L1502 418 L1532 408 L1560 396 L1590 412 L1618 400 L1648 415 L1678 405 L1708 418 L1738 406 L1770 420 L1800 408 L1832 395 L1862 412 L1892 400 L1925 416 L1955 405 L2000 415 L2000 700 Z"
          fill="#0c0c14"
        />
        <path
          d="M0 420 L18 412 L38 418 L58 405 L78 415 L100 402 L122 412 L142 398 L165 410 L185 396 L210 408 L232 394 L255 406 L278 390 L300 404 L325 392 L348 406 L372 395 L395 408 L420 396 L445 410 L468 398 L492 412 L518 400 L542 414 L568 402 L592 416 L618 404 L645 418 L670 406 L698 420 L722 408 L748 395 L775 410 L800 398 L828 412 L855 400 L880 415 L908 402 L935 416 L962 404 L990 418 L1018 406 L1045 395 L1072 410 L1100 398 L1128 414 L1158 402 L1185 416 L1215 404 L1242 418 L1272 406 L1300 395 L1330 410 L1358 398 L1388 414 L1415 402 L1445 416 L1475 404 L1502 418 L1532 408 L1560 396 L1590 412 L1618 400 L1648 415 L1678 405 L1708 418 L1738 406 L1770 420 L1800 408 L1832 395 L1862 412 L1892 400 L1925 416 L1955 405 L2000 415"
          stroke="#181822"
          strokeWidth="0.8"
          fill="none"
        />
      </svg>

      {/* Horizon line — sharp boundary between terrain and grid floor */}
      <div
        style={{
          position: "absolute",
          top: "52%",
          left: 0,
          right: 0,
          height: 1,
          background: "#1a1a28",
          zIndex: 3,
        }}
      />

      {/* === GRID FLOOR: Clean perspective grid on dark ground plane === */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "48%",
          background: "#0a0a10",
          zIndex: 1,
        }}
      >
        {/* Grid with CSS perspective */}
        <div
          style={{
            width: "200%",
            height: "100%",
            marginLeft: "-50%",
            transformOrigin: "50% 0%",
            transform: "perspective(800px) rotateX(65deg)",
          }}
        >
          <svg
            style={{ width: "100%", height: "100%", display: "block" }}
            viewBox="0 0 2400 1000"
            preserveAspectRatio="none"
            fill="none"
          >
            {/* Horizontal grid lines — fade in from horizon */}
            {Array.from({ length: 26 }, (_, i) => (
              <line
                key={`h${i}`}
                x1="0"
                y1={i * 40}
                x2="2400"
                y2={i * 40}
                stroke="#2a2a40"
                strokeWidth={0.6 + (i / 25) * 0.6}
                opacity={0.3 + (i / 25) * 0.6}
              />
            ))}
            {/* Vertical grid lines — uniform */}
            {Array.from({ length: 61 }, (_, i) => (
              <line
                key={`v${i}`}
                x1={i * 40}
                y1="0"
                x2={i * 40}
                y2="1000"
                stroke="#2a2a40"
                strokeWidth="0.6"
                opacity="0.5"
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Grid top fade — blends grid into terrain at horizon */}
      <div
        style={{
          position: "absolute",
          top: "48%",
          left: 0,
          right: 0,
          height: "8%",
          background: "linear-gradient(180deg, #0a0a10 0%, transparent 100%)",
          zIndex: 2,
        }}
      />

      {/* === CT TRUCK (SVG) + MAHALO BIRD ART === */}
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
        <div
          style={{
            position: "relative",
            width: "min(520px, 85vw)",
            aspectRatio: "16/9",
          }}
        >
          {/* SVG Cybertruck rear tailgate view */}
          <svg
            viewBox="0 0 520 293"
            fill="none"
            style={{ width: "100%", height: "100%", display: "block" }}
          >
            <defs>
              {/* Light bar glow gradient */}
              <linearGradient id="lightBarGlow" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ff4040" stopOpacity="0.2" />
                <stop offset="30%" stopColor="#ff2020" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#ff1a1a" stopOpacity="1" />
                <stop offset="70%" stopColor="#ff2020" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#ff4040" stopOpacity="0.2" />
              </linearGradient>
              {/* Body panel subtle gradient — top lighter (edge highlight) */}
              <linearGradient id="bodyPanel" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop offset="0%" stopColor="#22222c" />
                <stop offset="100%" stopColor="#16161e" />
              </linearGradient>
              {/* Tailgate surface gradient */}
              <linearGradient id="tailgateFace" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop offset="0%" stopColor="#1e1e28" />
                <stop offset="100%" stopColor="#18181f" />
              </linearGradient>
              {/* Light bar bloom filter */}
              <filter id="lightBloom" x="-20%" y="-200%" width="140%" height="500%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
              </filter>
            </defs>

            {/* Ground shadow / ambient occlusion */}
            <ellipse cx="260" cy="278" rx="190" ry="12" fill="#050508" opacity="0.9" />

            {/* === LEFT TIRE === */}
            <rect x="78" y="198" width="42" height="74" rx="7" fill="#0e0e14" stroke="#1a1a2e" strokeWidth="1" />
            <rect x="82" y="202" width="34" height="66" rx="5" fill="#0a0a10" />
            {/* Tread pattern */}
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <line key={`tl${i}`} x1="84" y1={210 + i * 8} x2="114" y2={210 + i * 8} stroke="#141420" strokeWidth="0.7" />
            ))}
            {/* Rim */}
            <rect x="90" y="220" width="18" height="28" rx="3" fill="#111118" stroke="#2a2a3e" strokeWidth="0.7" />
            {/* Rim center */}
            <circle cx="99" cy="234" r="4" fill="#0d0d14" stroke="#2a2a3e" strokeWidth="0.5" />

            {/* === RIGHT TIRE === */}
            <rect x="400" y="198" width="42" height="74" rx="7" fill="#0e0e14" stroke="#1a1a2e" strokeWidth="1" />
            <rect x="404" y="202" width="34" height="66" rx="5" fill="#0a0a10" />
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <line key={`tr${i}`} x1="406" y1={210 + i * 8} x2="436" y2={210 + i * 8} stroke="#141420" strokeWidth="0.7" />
            ))}
            <rect x="412" y="220" width="18" height="28" rx="3" fill="#111118" stroke="#2a2a3e" strokeWidth="0.7" />
            <circle cx="421" cy="234" r="4" fill="#0d0d14" stroke="#2a2a3e" strokeWidth="0.5" />

            {/* === MAIN BODY — rear panel === */}
            <path
              d="M118 78 L402 78 L432 198 L432 272 L88 272 L88 198 Z"
              fill="url(#bodyPanel)"
              stroke="#2a2a3e"
              strokeWidth="1"
            />

            {/* Tailgate face — the main flat surface */}
            <path
              d="M128 88 L392 88 L420 196 L100 196 Z"
              fill="url(#tailgateFace)"
              stroke="#2a2a3e"
              strokeWidth="0.6"
            />

            {/* Tailgate art area — recessed panel */}
            <rect
              x="148" y="102" width="224" height="82" rx="2"
              fill="#121218"
              stroke="#2a2a3e"
              strokeWidth="0.5"
            />

            {/* === FULL-WIDTH LED LIGHT BAR === */}
            {/* Glow bloom (behind) */}
            <rect x="100" y="78" width="320" height="6" rx="3" fill="url(#lightBarGlow)" filter="url(#lightBloom)" opacity="0.6" />
            {/* Main bar */}
            <rect x="105" y="80" width="310" height="3" rx="1.5" fill="url(#lightBarGlow)" />
            {/* Hot center line */}
            <rect x="160" y="81" width="200" height="1" rx="0.5" fill="#ff6060" opacity="0.5" />

            {/* Center crease */}
            <line x1="260" y1="88" x2="260" y2="196" stroke="#2a2a3e" strokeWidth="0.4" opacity="0.4" />

            {/* Panel crease lines — CT signature angular body */}
            <line x1="128" y1="88" x2="100" y2="196" stroke="#2a2a3e" strokeWidth="0.8" />
            <line x1="392" y1="88" x2="420" y2="196" stroke="#2a2a3e" strokeWidth="0.8" />

            {/* Top edge highlight — catches light */}
            <line x1="118" y1="78" x2="402" y2="78" stroke="#3a3a48" strokeWidth="1.2" />

            {/* Side edge highlights */}
            <line x1="118" y1="78" x2="88" y2="198" stroke="#2a2a3e" strokeWidth="0.8" />
            <line x1="402" y1="78" x2="432" y2="198" stroke="#2a2a3e" strokeWidth="0.8" />

            {/* CYBERTRVCK embossed text */}
            <text
              x="260" y="212"
              textAnchor="middle"
              fill="#2a2a3e"
              fontSize="9"
              fontFamily="Inter, system-ui, sans-serif"
              fontWeight="600"
              letterSpacing="0.3em"
            >
              CYBERTRVCK
            </text>

            {/* === BUMPER / LOWER SECTION === */}
            <path d="M88 248 L432 248 L432 272 L88 272 Z" fill="#0e0e14" stroke="#1a1a2e" strokeWidth="0.6" />

            {/* Bumper detail lines */}
            <line x1="88" y1="248" x2="432" y2="248" stroke="#1a1a2e" strokeWidth="0.8" />

            {/* License plate recess */}
            <rect x="222" y="252" width="76" height="15" rx="2" fill="#0a0a10" stroke="#1a1a2e" strokeWidth="0.5" />

            {/* Rear diffuser slats */}
            <line x1="100" y1="258" x2="200" y2="258" stroke="#141420" strokeWidth="0.5" />
            <line x1="100" y1="262" x2="200" y2="262" stroke="#141420" strokeWidth="0.5" />
            <line x1="320" y1="258" x2="420" y2="258" stroke="#141420" strokeWidth="0.5" />
            <line x1="320" y1="262" x2="420" y2="262" stroke="#141420" strokeWidth="0.5" />

            {/* Wheel well arches — subtle */}
            <path d="M78 198 Q99 188 120 198" stroke="#2a2a3e" strokeWidth="0.6" fill="none" />
            <path d="M400 198 Q421 188 442 198" stroke="#2a2a3e" strokeWidth="0.6" fill="none" />
          </svg>

          {/* Mahalo Bird art overlay on tailgate */}
          <div
            style={{
              position: "absolute",
              top: "35%",
              left: "28.5%",
              width: "43%",
              height: "28%",
              overflow: "hidden",
              borderRadius: 2,
              opacity: 0.95,
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
              priority
            />
          </div>
        </div>

        {/* Art label */}
        <div
          style={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <span
            style={{
              fontSize: 12,
              color: "#888899",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Mahalo Bird · Edition I
          </span>
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "#3b82f6",
                opacity: 0.8,
              }}
            />
            <span
              style={{
                fontSize: 11,
                color: "#888899",
                letterSpacing: "0.1em",
                opacity: 0.7,
              }}
            >
              3 / 10 available
            </span>
          </div>
        </div>

        {/* Upward chevron */}
        <div
          style={{
            position: "absolute",
            top: 4,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
            <path d="M1 7L7 2L13 7" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
