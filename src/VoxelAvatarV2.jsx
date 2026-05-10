import React from 'react'

const VOX2_TILE = 14;

const VOX2_PALETTE = {
  hair: '#b9a3d6',
  hairShadow: '#9a83bd',
  hairHighlight: '#cdb8e3',
  skin: '#f5dcc3',
  cheek: '#ecbfae',
  shirt: '#e8dbf2',
  shirtTrim: '#a78fcd',
  eye: '#2a1e3e',
  mouth: '#b56a7a',
  teeth: '#fbf3ec',
  shadeFrame: '#3a2e54',
  shadeLens: '#1a1426',
};

function vox2Shade(hex, face) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const k = face === 'top' ? 1.14 : face === 'right' ? 1.0 : 0.78;
  const clamp = (v) => Math.max(0, Math.min(255, Math.round(v * k)));
  return `rgb(${clamp(r)}, ${clamp(g)}, ${clamp(b)})`;
}

function vox2Project(x, y, z, color) {
  const t = VOX2_TILE;
  const cx = (x - z) * (t / 2);
  const cy = (x + z) * (t / 4) - y * (t / 2);
  const top = [
    [cx, cy - t / 2],
    [cx + t / 2, cy - t / 4],
    [cx, cy],
    [cx - t / 2, cy - t / 4],
  ];
  const right = [
    [cx, cy],
    [cx + t / 2, cy - t / 4],
    [cx + t / 2, cy + t / 4],
    [cx, cy + t / 2],
  ];
  const left = [
    [cx, cy],
    [cx - t / 2, cy - t / 4],
    [cx - t / 2, cy + t / 4],
    [cx, cy + t / 2],
  ];
  return [
    { points: top, fill: vox2Shade(color, 'top'), face: 'top' },
    { points: right, fill: vox2Shade(color, 'right'), face: 'right' },
    { points: left, fill: vox2Shade(color, 'left'), face: 'left' },
  ];
}

function buildGirlV2() {
  const set = new Map();
  const key = (x, y, z) => `${x},${y},${z}`;
  const put = (x, y, z, c) => { set.set(key(x, y, z), { x, y, z, c }); };
  const add = (x, y, z, c, mirror = true) => {
    put(x, y, z, c);
    if (mirror && x !== 0) put(-x, y, z, c);
  };

  for (let z = 0; z < 3; z++) {
    for (let x = 0; x <= 2; x++) {
      add(x, 0, z, VOX2_PALETTE.shirtTrim);
      add(x, 1, z, VOX2_PALETTE.shirt);
    }
  }
  set.delete(key(2, 0, 0));
  set.delete(key(-2, 0, 0));

  put(0, 1, 0, { ...VOX2_PALETTE, _c: VOX2_PALETTE.shirt }._c);
  put(0, 1, 0, VOX2_PALETTE.shirt);

  add(0, 2, 1, VOX2_PALETTE.skin);

  for (let y = 3; y <= 6; y++) {
    for (let z = 0; z < 3; z++) {
      for (let x = 0; x <= 2; x++) {
        add(x, y, z, VOX2_PALETTE.skin);
      }
    }
  }

  for (let z = 0; z < 3; z++) {
    for (let x = 0; x <= 2; x++) {
      add(x, 7, z, VOX2_PALETTE.hair);
    }
  }
  put(2, 6, 0, VOX2_PALETTE.hair);
  put(-2, 6, 0, VOX2_PALETTE.hair);
  put(1, 6, 0, VOX2_PALETTE.hair);

  for (let z = 1; z < 3; z++) {
    for (let x = 0; x <= 2; x++) {
      add(x, 6, z, VOX2_PALETTE.hair);
    }
  }
  for (let y = 3; y <= 6; y++) {
    for (let x = 0; x <= 2; x++) {
      add(x, y, 2, VOX2_PALETTE.hair);
    }
  }
  for (let y = 3; y <= 6; y++) {
    for (let z = 0; z < 3; z++) {
      add(2, y, z, VOX2_PALETTE.hair);
    }
  }

  for (let y = -3; y <= 2; y++) {
    for (let z = 0; z < 3; z++) {
      add(2, y, z, VOX2_PALETTE.hair);
    }
  }
  for (let y = -2; y <= 1; y++) {
    for (let z = 0; z < 3; z++) {
      add(3, y, z, VOX2_PALETTE.hair);
    }
  }
  for (let z = 0; z < 3; z++) {
    add(2, -4, z, VOX2_PALETTE.hairShadow);
  }

  for (let y = -1; y <= 4; y++) {
    add(2, y, 0, VOX2_PALETTE.hairHighlight);
  }

  return {
    cells: Array.from(set.values()),
    features: {
      eyes: [
        { x: -1, y: 5, z: 0 },
        { x: 1, y: 5, z: 0 },
      ],
      cheeks: [
        { x: -1, y: 4, z: 0 },
        { x: 1, y: 4, z: 0 },
      ],
      mouth: { x: 0, y: 4, z: 0 },
      shades: { x: 0, y: 1, z: 0 },
    },
  };
}

function vox2Sort(cells) {
  return cells.slice().sort((a, b) => {
    if (a.z !== b.z) return b.z - a.z;
    if (a.y !== b.y) return a.y - b.y;
    return Math.abs(b.x) - Math.abs(a.x);
  });
}

function VoxelAvatarV2({ size = 132 }) {
  const built = React.useMemo(() => buildGirlV2(), []);
  const sorted = React.useMemo(() => vox2Sort(built.cells), [built]);

  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  const faces = [];
  for (const c of sorted) {
    const fs = vox2Project(c.x, c.y, c.z, c.c);
    for (const f of fs) {
      faces.push(f);
      for (const [px, py] of f.points) {
        if (px < minX) minX = px;
        if (px > maxX) maxX = px;
        if (py < minY) minY = py;
        if (py > maxY) maxY = py;
      }
    }
  }
  const padding = 6;
  const vbX = minX - padding;
  const vbY = minY - padding;
  const vbW = maxX - minX + padding * 2;
  const vbH = maxY - minY + padding * 2;

  const t = VOX2_TILE;
  const projectFront = (x, y, z) => {
    const cx = (x - z) * (t / 2);
    const cy = (x + z) * (t / 4) - y * (t / 2);
    return { fx: cx - t / 4, fy: cy + t / 16 };
  };

  const eyeMarks = built.features.eyes.map((e, i) => {
    const { fx, fy } = projectFront(e.x, e.y, e.z);
    const d = `M ${fx - 1.5} ${fy + 0.2} Q ${fx} ${fy - 1.4} ${fx + 1.5} ${fy + 0.2}`;
    return (
      <path
        key={`eye-${i}`}
        d={d}
        stroke={VOX2_PALETTE.eye}
        strokeWidth="0.9"
        strokeLinecap="round"
        fill="none"
      />
    );
  });

  const cheekMarks = built.features.cheeks.map((c, i) => {
    const { fx, fy } = projectFront(c.x, c.y, c.z);
    return (
      <ellipse
        key={`cheek-${i}`}
        cx={fx}
        cy={fy + 0.8}
        rx="1.7"
        ry="1.0"
        fill={VOX2_PALETTE.cheek}
        opacity="0.75"
      />
    );
  });

  const mouthEl = (() => {
    const m = built.features.mouth;
    const cx = (m.x - m.z) * (t / 2) - t / 4;
    const cy = (m.x + m.z) * (t / 4) - m.y * (t / 2) + t / 16;
    return (
      <g>
        <path
          d={`M ${cx - 2.4} ${cy + 1.4} Q ${cx} ${cy + 3.4} ${cx + 2.4} ${cy + 1.4} Q ${cx} ${cy + 2.0} ${cx - 2.4} ${cy + 1.4} Z`}
          fill={VOX2_PALETTE.mouth}
        />
        <path
          d={`M ${cx - 1.7} ${cy + 1.7} Q ${cx} ${cy + 2.4} ${cx + 1.7} ${cy + 1.7}`}
          stroke={VOX2_PALETTE.teeth}
          strokeWidth="0.55"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    );
  })();

  const shadesEl = (() => {
    const s = built.features.shades;
    const cx = (s.x - s.z) * (t / 2) - t / 4;
    const cy = (s.x + s.z) * (t / 4) - s.y * (t / 2) + t / 16;
    const lensR = 1.6;
    const gap = 0.6;
    return (
      <g>
        <path
          d={`M ${cx - lensR - gap - lensR * 1.8} ${cy + 0.4} Q ${cx} ${cy - 0.6} ${cx + lensR + gap + lensR * 1.8} ${cy + 0.4}`}
          stroke={VOX2_PALETTE.shadeFrame}
          strokeWidth="0.4"
          fill="none"
        />
        <ellipse cx={cx - lensR - gap} cy={cy + 0.6} rx={lensR} ry={lensR * 0.95} fill={VOX2_PALETTE.shadeLens} stroke={VOX2_PALETTE.shadeFrame} strokeWidth="0.4" />
        <ellipse cx={cx + lensR + gap} cy={cy + 0.6} rx={lensR} ry={lensR * 0.95} fill={VOX2_PALETTE.shadeLens} stroke={VOX2_PALETTE.shadeFrame} strokeWidth="0.4" />
        <line x1={cx - gap + 0.2} y1={cy + 0.6} x2={cx + gap - 0.2} y2={cy + 0.6} stroke={VOX2_PALETTE.shadeFrame} strokeWidth="0.4" />
      </g>
    );
  })();

  return (
    <svg
      width={size}
      height={size}
      viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`}
      style={{ display: 'block', filter: 'drop-shadow(0 8px 14px rgba(120,80,140,0.22))' }}
      shapeRendering="crispEdges"
      aria-label="Voxel avatar v2 — long lavender hair, big smile, sunglasses on collar"
    >
      {faces.map((f, i) => (
        <polygon
          key={i}
          points={f.points.map((p) => p.join(',')).join(' ')}
          fill={f.fill}
        />
      ))}
      {cheekMarks}
      {eyeMarks}
      {mouthEl}
      {shadesEl}
    </svg>
  );
}

export default VoxelAvatarV2
