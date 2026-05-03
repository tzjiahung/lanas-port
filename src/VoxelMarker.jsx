import { useMemo } from 'react'

const VM_TILE = 8

const VM_PALETTE = {
  lav:    '#b9a3d6',
  lavDk:  '#9a83bd',
  lavLt:  '#d8c0dc',
  cream:  '#f5ecdc',
  warm:   '#f0c8d4',
  rose:   '#b56a7a',
  gold:   '#d8b774',
  goldDk: '#b89556',
  ink:    '#3a2e54',
}

function vmShade(hex, face) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const k = face === 'top' ? 1.13 : face === 'right' ? 1.0 : 0.78
  const clamp = (v) => Math.max(0, Math.min(255, Math.round(v * k)))
  return `rgb(${clamp(r)}, ${clamp(g)}, ${clamp(b)})`
}

function vmProject(x, y, z, color) {
  const t = VM_TILE
  const cx = (x - z) * (t / 2)
  const cy = (x + z) * (t / 4) - y * (t / 2)
  const top =   [[cx, cy - t/2],[cx + t/2, cy - t/4],[cx, cy],[cx - t/2, cy - t/4]]
  const right =  [[cx, cy],[cx + t/2, cy - t/4],[cx + t/2, cy + t/4],[cx, cy + t/2]]
  const left =   [[cx, cy],[cx - t/2, cy - t/4],[cx - t/2, cy + t/4],[cx, cy + t/2]]
  return [
    { points: top,   fill: vmShade(color, 'top') },
    { points: right, fill: vmShade(color, 'right') },
    { points: left,  fill: vmShade(color, 'left') },
  ]
}

function vmSort(cells) {
  return cells.slice().sort((a, b) => {
    if (a.z !== b.z) return b.z - a.z
    if (a.y !== b.y) return a.y - b.y
    return Math.abs(b.x) - Math.abs(a.x)
  })
}

const MARKERS = {
  intro: () => [
    { x: 0, y: 0, z: 0, c: VM_PALETTE.lavDk },
    { x: 0, y: 1, z: 0, c: VM_PALETTE.lav },
  ],
  work: () => [
    { x: -1, y: 0, z: 0, c: VM_PALETTE.lavDk },
    { x:  0, y: 0, z: 0, c: VM_PALETTE.lav },
    { x:  0, y: 1, z: 0, c: VM_PALETTE.lav },
    { x:  1, y: 0, z: 0, c: VM_PALETTE.lavDk },
    { x:  1, y: 1, z: 0, c: VM_PALETTE.lav },
    { x:  1, y: 2, z: 0, c: VM_PALETTE.lavLt },
  ],
  heart: () => [
    { x: -1, y:  1, z: 0, c: VM_PALETTE.warm },
    { x:  1, y:  1, z: 0, c: VM_PALETTE.warm },
    { x: -1, y:  0, z: 0, c: VM_PALETTE.rose },
    { x:  0, y:  0, z: 0, c: VM_PALETTE.warm },
    { x:  1, y:  0, z: 0, c: VM_PALETTE.rose },
    { x:  0, y: -1, z: 0, c: VM_PALETTE.rose },
  ],
  target: () => [
    { x: -1, y: 0, z: -1, c: VM_PALETTE.lavLt },
    { x:  0, y: 0, z: -1, c: VM_PALETTE.lavLt },
    { x:  1, y: 0, z: -1, c: VM_PALETTE.lavLt },
    { x: -1, y: 0, z:  0, c: VM_PALETTE.lavLt },
    { x:  1, y: 0, z:  0, c: VM_PALETTE.lavLt },
    { x: -1, y: 0, z:  1, c: VM_PALETTE.lavLt },
    { x:  0, y: 0, z:  1, c: VM_PALETTE.lavLt },
    { x:  1, y: 0, z:  1, c: VM_PALETTE.lavLt },
    { x:  0, y: 1, z:  0, c: VM_PALETTE.rose },
  ],
  toolbox: () => [
    { x: -1, y: 0, z: 0, c: VM_PALETTE.lavDk },
    { x:  0, y: 0, z: 0, c: VM_PALETTE.lav },
    { x:  1, y: 0, z: 0, c: VM_PALETTE.lavDk },
    { x: -1, y: 1, z: 0, c: VM_PALETTE.lav },
    { x:  0, y: 1, z: 0, c: VM_PALETTE.lavLt },
    { x:  1, y: 1, z: 0, c: VM_PALETTE.lav },
    { x:  0, y: 2, z: 0, c: VM_PALETTE.lavDk },
  ],
  trophy: () => [
    { x: -1, y: 0, z: 0, c: VM_PALETTE.goldDk },
    { x:  0, y: 0, z: 0, c: VM_PALETTE.goldDk },
    { x:  1, y: 0, z: 0, c: VM_PALETTE.goldDk },
    { x:  0, y: 1, z: 0, c: VM_PALETTE.gold },
    { x: -1, y: 2, z: 0, c: VM_PALETTE.gold },
    { x:  0, y: 2, z: 0, c: VM_PALETTE.gold },
    { x:  1, y: 2, z: 0, c: VM_PALETTE.gold },
    { x:  0, y: 3, z: 0, c: VM_PALETTE.gold },
  ],
  lego: () => [
    { x: -1, y: 0, z: 0, c: VM_PALETTE.lavDk },
    { x:  0, y: 0, z: 0, c: VM_PALETTE.lav },
    { x:  1, y: 0, z: 0, c: VM_PALETTE.lavDk },
    { x: -1, y: 1, z: 0, c: VM_PALETTE.lav },
    { x:  0, y: 1, z: 0, c: VM_PALETTE.lavLt },
    { x:  1, y: 1, z: 0, c: VM_PALETTE.lav },
    { x: -1, y: 2, z: 0, c: VM_PALETTE.lavDk },
    { x:  1, y: 2, z: 0, c: VM_PALETTE.lavDk },
  ],
}

export default function VoxelMarker({ kind = 'intro', size = 26 }) {
  const cells = useMemo(() => {
    const fn = MARKERS[kind] || MARKERS.intro
    return vmSort(fn())
  }, [kind])

  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
  const faces = []
  for (const c of cells) {
    const fs = vmProject(c.x, c.y, c.z, c.c)
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
  const padding = 2
  const vbX = minX - padding
  const vbY = minY - padding
  const vbW = maxX - minX + padding * 2
  const vbH = maxY - minY + padding * 2

  return (
    <svg
      width={size}
      height={size}
      viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`}
      style={{ display: 'block', flexShrink: 0 }}
      shapeRendering="crispEdges"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      {faces.map((f, i) => (
        <polygon key={i} points={f.points.map((p) => p.join(',')).join(' ')} fill={f.fill} />
      ))}
    </svg>
  )
}
