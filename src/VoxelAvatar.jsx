import { useMemo } from 'react'

const VOX_TILE = 14

const VOX_PALETTE = {
  hair:       '#b9a3d6',
  hairShadow: '#9a83bd',
  skin:       '#f5dcc3',
  cheek:      '#ecbfae',
  shirt:      '#e8dbf2',
  shirtTrim:  '#a78fcd',
  pants:      '#5b4a7a',
  shoe:       '#3a2e54',
  eye:        '#2a1e3e',
  mouth:      '#b56a7a',
}

function shade(hex, face) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const k = face === 'top' ? 1.14 : face === 'right' ? 1.0 : 0.78
  const clamp = (v) => Math.max(0, Math.min(255, Math.round(v * k)))
  return `rgb(${clamp(r)}, ${clamp(g)}, ${clamp(b)})`
}

function projectVoxel(x, y, z, color) {
  const t = VOX_TILE
  const cx = (x - z) * (t / 2)
  const cy = (x + z) * (t / 4) - y * (t / 2)
  const top = [[cx, cy - t / 2],[cx + t / 2, cy - t / 4],[cx, cy],[cx - t / 2, cy - t / 4]]
  const right = [[cx, cy],[cx + t / 2, cy - t / 4],[cx + t / 2, cy + t / 4],[cx, cy + t / 2]]
  const left = [[cx, cy],[cx - t / 2, cy - t / 4],[cx - t / 2, cy + t / 4],[cx, cy + t / 2]]
  return [
    { points: top,   fill: shade(color, 'top') },
    { points: right, fill: shade(color, 'right') },
    { points: left,  fill: shade(color, 'left') },
  ]
}

function buildGirl() {
  const set = new Map()
  const key = (x, y, z) => `${x},${y},${z}`
  const put = (x, y, z, c) => { set.set(key(x, y, z), { x, y, z, c }) }
  const add = (x, y, z, c, mirror = true) => {
    put(x, y, z, c)
    if (mirror && x !== 0) put(-x, y, z, c)
  }

  // Shoulders
  for (let z = 0; z < 3; z++) {
    for (let x = 0; x <= 2; x++) {
      add(x, 0, z, VOX_PALETTE.shirtTrim)
      add(x, 1, z, VOX_PALETTE.shirt)
    }
  }
  set.delete(key(2, 0, 0))
  set.delete(key(-2, 0, 0))

  // Neck
  add(0, 2, 1, VOX_PALETTE.skin)

  // Head
  for (let y = 3; y <= 6; y++) {
    for (let z = 0; z < 3; z++) {
      for (let x = 0; x <= 2; x++) {
        add(x, y, z, VOX_PALETTE.skin)
      }
    }
  }

  // Hair cap
  for (let z = 0; z < 3; z++) {
    for (let x = 0; x <= 2; x++) {
      add(x, 7, z, VOX_PALETTE.hair)
    }
  }
  add(2, 6, 0, VOX_PALETTE.hair)
  for (let z = 1; z < 3; z++) {
    for (let x = 0; x <= 2; x++) {
      add(x, 6, z, VOX_PALETTE.hair)
    }
  }
  for (let y = 3; y <= 6; y++) {
    for (let x = 0; x <= 2; x++) {
      add(x, y, 2, VOX_PALETTE.hair)
    }
  }
  for (let y = 3; y <= 6; y++) {
    for (let z = 0; z < 3; z++) {
      add(2, y, z, VOX_PALETTE.hair)
    }
  }
  for (let y = 1; y <= 2; y++) {
    for (let z = 0; z < 3; z++) {
      add(2, y, z, VOX_PALETTE.hair)
    }
  }
  add(2, 1, 2, VOX_PALETTE.hairShadow)
  add(2, 1, 1, VOX_PALETTE.hairShadow)

  return {
    cells: Array.from(set.values()),
    features: {
      eyes: [{ x: -1, y: 5, z: 0 }, { x: 1, y: 5, z: 0 }],
      cheeks: [{ x: -1, y: 4, z: 0 }, { x: 1, y: 4, z: 0 }],
      mouth: { x: 0, y: 4, z: 0 },
    },
  }
}

function sortCells(cells) {
  return cells.slice().sort((a, b) => {
    if (a.z !== b.z) return b.z - a.z
    if (a.y !== b.y) return a.y - b.y
    return Math.abs(b.x) - Math.abs(a.x)
  })
}

export default function VoxelAvatar({ size = 76 }) {
  const built = useMemo(() => buildGirl(), [])
  const sorted = useMemo(() => sortCells(built.cells), [built])

  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
  const faces = []
  for (const c of sorted) {
    const fs = projectVoxel(c.x, c.y, c.z, c.c)
    for (const f of fs) {
      faces.push(f)
      for (const [px, py] of f.points) {
        if (px < minX) minX = px
        if (px > maxX) maxX = px
        if (py < minY) minY = py
        if (py > maxY) maxY = py
      }
    }
  }
  const padding = 6
  const vbX = minX - padding
  const vbY = minY - padding
  const vbW = maxX - minX + padding * 2
  const vbH = maxY - minY + padding * 2

  const t = VOX_TILE
  const projectFront = (x, y, z) => {
    const cx = (x - z) * (t / 2)
    const cy = (x + z) * (t / 4) - y * (t / 2)
    return { fx: cx - t / 4, fy: cy + t / 16 }
  }

  const eyeMarks = built.features.eyes.map((e, i) => {
    const { fx, fy } = projectFront(e.x, e.y, e.z)
    return <rect key={`eye-${i}`} x={fx - 1.0} y={fy - 1.6} width="1.8" height="2.4" rx="0.6" fill={VOX_PALETTE.eye} />
  })

  const cheekMarks = built.features.cheeks.map((c, i) => {
    const { fx, fy } = projectFront(c.x, c.y, c.z)
    return <ellipse key={`cheek-${i}`} cx={fx} cy={fy + 0.5} rx="1.6" ry="0.9" fill={VOX_PALETTE.cheek} opacity="0.7" />
  })

  const mouthEl = (() => {
    const m = built.features.mouth
    const cx = (m.x - m.z) * (t / 2) - t / 4
    const cy = (m.x + m.z) * (t / 4) - m.y * (t / 2) + t / 16
    return <rect x={cx - 1.4} y={cy + 1.4} width="2.8" height="1.2" rx="0.6" fill={VOX_PALETTE.mouth} />
  })()

  return (
    <svg
      width={size}
      height={size}
      viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`}
      style={{ display: 'block', filter: 'drop-shadow(0 8px 14px rgba(120,80,140,0.22))' }}
      shapeRendering="crispEdges"
      aria-label="Voxel avatar — girl with lavender hair"
    >
      {faces.map((f, i) => (
        <polygon key={i} points={f.points.map((p) => p.join(',')).join(' ')} fill={f.fill} />
      ))}
      {cheekMarks}
      {eyeMarks}
      {mouthEl}
    </svg>
  )
}
