import React from 'react'

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function lerpHex(a, b, k) {
  const pa = [parseInt(a.slice(1, 3), 16), parseInt(a.slice(3, 5), 16), parseInt(a.slice(5, 7), 16)];
  const pb = [parseInt(b.slice(1, 3), 16), parseInt(b.slice(3, 5), 16), parseInt(b.slice(5, 7), 16)];
  const m = pa.map((v, i) => Math.round(v + (pb[i] - v) * k));
  return '#' + m.map((v) => v.toString(16).padStart(2, '0')).join('');
}

function FourPointStar({
  x, y, size, color, glow,
  opacity = 1, glowOn = true, twinkleOn = false, twinkleDelay = 0,
}) {
  const r = size / 2;
  const pinch = size * 0.14;
  const d = [
    `M ${x} ${y - r}`,
    `C ${x + pinch} ${y - pinch} ${x + pinch} ${y - pinch} ${x + r} ${y}`,
    `C ${x + pinch} ${y + pinch} ${x + pinch} ${y + pinch} ${x} ${y + r}`,
    `C ${x - pinch} ${y + pinch} ${x - pinch} ${y + pinch} ${x - r} ${y}`,
    `C ${x - pinch} ${y - pinch} ${x - pinch} ${y - pinch} ${x} ${y - r}`,
    'Z',
  ].join(' ');
  const groupStyle = twinkleOn
    ? {
        animation: `twk-twinkle ${2.4 + (twinkleDelay % 18) * 0.18}s ease-in-out ${twinkleDelay * 0.13}s infinite`,
        transformOrigin: `${x}px ${y}px`,
      }
    : null;
  return (
    <g opacity={opacity} style={groupStyle}>
      {glowOn && <circle cx={x} cy={y} r={r * 3} fill={glow} />}
      <path d={d} fill={color} />
    </g>
  );
}

function generateStars({ count, w, h, seed, palette, sizeMix }) {
  const rand = mulberry32(seed);
  const aspect = w / h;
  const rows = Math.max(4, Math.round(Math.sqrt(count / aspect)));
  const cols = Math.max(4, Math.round(count / rows));
  const cellW = w / cols;
  const cellH = h / rows;
  const stars = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (stars.length >= count) break;
      const jx = 0.15 + rand() * 0.7;
      const jy = 0.15 + rand() * 0.7;
      const x = c * cellW + jx * cellW;
      const y = r * cellH + jy * cellH;
      const roll = rand();
      let size;
      if (sizeMix === 'uniform') {
        size = 3 + rand() * 1.6;
      } else if (sizeMix === 'wild') {
        if (roll > 0.92) size = 18 + rand() * 14;
        else if (roll > 0.6) size = 7 + rand() * 5;
        else size = 1.4 + rand() * 2.2;
      } else {
        if (roll > 0.94) size = 14 + rand() * 10;
        else if (roll > 0.7) size = 6 + rand() * 4;
        else size = 1.6 + rand() * 2.6;
      }
      const band = Math.min(palette.length - 1, Math.floor((y / h) * palette.length));
      const tone = palette[band];
      const opacity = 0.55 + rand() * 0.45;
      stars.push({ x, y, size, color: tone.color, glow: tone.glow, opacity });
    }
  }
  return stars;
}

function buildVariant(warmth, lightness) {
  const k = warmth / 100;
  const lk = lightness / 100;
  const tint = (hex) => lerpHex(hex, '#ffffff', lk);

  const stopAnchors = [
    { o: '0%',   cool: '#d8c0dc', warm: '#e8d6e8' },
    { o: '22%',  cool: '#e6b8d0', warm: '#f0c8d4' },
    { o: '48%',  cool: '#eebac5', warm: '#f6c9b4' },
    { o: '72%',  cool: '#f0c5cc', warm: '#f8d8b8' },
    { o: '100%', cool: '#f3d2d8', warm: '#fbe8cf' },
  ];
  const stops = stopAnchors.map((s) => ({ o: s.o, c: tint(lerpHex(s.cool, s.warm, k)) }));

  const starTint = (hex) => lerpHex(hex, '#ffffff', lk * 0.35);
  const palette = [
    { color: starTint('#8a6da8'), glow: `rgba(138,109,168,${0.22 * (1 - lk * 0.5)})` },
    { color: starTint('#b07ab0'), glow: `rgba(176,122,176,${0.20 * (1 - lk * 0.5)})` },
    {
      color: starTint(lerpHex('#c97aa0', '#d99989', k)),
      glow: `rgba(207,130,150,${0.18 * (1 - lk * 0.5)})`,
    },
    {
      color: starTint(lerpHex('#c8869b', '#d4a892', k)),
      glow: `rgba(200,140,155,${0.16 * (1 - lk * 0.5)})`,
    },
    {
      color: starTint(lerpHex('#bd8a9a', '#c9a896', k)),
      glow: `rgba(189,138,154,${0.14 * (1 - lk * 0.5)})`,
    },
  ];

  return { stops, palette };
}

function PeachDawn({ w, h, t }) {
  const { stops, palette } = React.useMemo(
    () => buildVariant(t.warmth, t.lightness),
    [t.warmth, t.lightness]
  );
  const stars = React.useMemo(
    () => generateStars({
      count: t.starDensity,
      w, h,
      seed: 7,
      palette,
      sizeMix: t.starSizeMix,
    }),
    [w, h, t.starDensity, t.starSizeMix, palette]
  );

  const depthK = t.depth / 100;
  const vignetteAlpha = 0.10 + depthK * 0.32;
  const fadeK = (t.bottomFade ?? 0) / 100;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="100%" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="grad-A" x1="0" y1="0" x2="0" y2="1">
          {stops.map((s, i) => (
            <stop key={i} offset={s.o} stopColor={s.c} />
          ))}
        </linearGradient>
        <radialGradient id="grad-A-vig" cx="0.5" cy="0.5" r="0.78">
          <stop offset="55%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor={`rgba(80,40,70,${vignetteAlpha})`} />
        </radialGradient>
        <radialGradient id="grad-A-horizon" cx="0.5" cy="1.05" r="0.6">
          <stop offset="0%" stopColor={`rgba(255,235,225,${0.15 + depthK * 0.25})`} />
          <stop offset="100%" stopColor="rgba(255,235,225,0)" />
        </radialGradient>
        <linearGradient id="grad-A-bottom-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset={`${Math.max(0, 100 - 20 - fadeK * 60)}%`} stopColor="rgba(255,255,255,0)" />
          <stop offset="100%" stopColor={`rgba(255,255,255,${fadeK})`} />
        </linearGradient>
        <filter id="grad-A-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0" />
        </filter>
      </defs>

      <rect width={w} height={h} fill="url(#grad-A)" />
      <rect width={w} height={h} fill="url(#grad-A-horizon)" />

      {t.heroStar && (
        <FourPointStar
          x={w * 0.78}
          y={h * 0.22}
          size={64}
          color={palette[0].color}
          glow={palette[0].glow.replace(/0\.\d+\)/, '0.45)')}
          opacity={1}
          glowOn={t.glow}
        />
      )}

      {stars.map((s, i) => (
        <FourPointStar
          key={i}
          {...s}
          glowOn={t.glow}
          twinkleOn={t.twinkle}
          twinkleDelay={i}
        />
      ))}

      {t.grain && (
        <rect
          width={w}
          height={h}
          filter="url(#grad-A-grain)"
          opacity="0.5"
          style={{ mixBlendMode: 'overlay' }}
        />
      )}

      {t.vignette && <rect width={w} height={h} fill="url(#grad-A-vig)" />}
      {fadeK > 0 && <rect width={w} height={h} fill="url(#grad-A-bottom-fade)" />}
    </svg>
  );
}

export default PeachDawn
