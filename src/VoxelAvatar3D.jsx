import React from 'react'
import { AVATAR_MODELS_3D } from './avatarModels3D.js'

// True-3D voxel renderer on <canvas>, no dependencies.
// Orthographic camera orbiting the Y axis; voxels are painted back-to-front by
// centre depth (exact for equal grid-aligned cubes), only exposed + camera-facing
// faces are drawn, and decals are painted right after the last voxel they sit on.

const DIRS = [
  { key: '+x', n: [1, 0, 0], u: [0, 0, 1], v: [0, 1, 0] },
  { key: '-x', n: [-1, 0, 0], u: [0, 0, -1], v: [0, 1, 0] },
  { key: '+y', n: [0, 1, 0], u: [1, 0, 0], v: [0, 0, 1] },
  { key: '-y', n: [0, -1, 0], u: [1, 0, 0], v: [0, 0, -1] },
  { key: '+z', n: [0, 0, 1], u: [-1, 0, 0], v: [0, 1, 0] },
  { key: '-z', n: [0, 0, -1], u: [1, 0, 0], v: [0, 1, 0] },
]
const DIR_INDEX = Object.fromEntries(DIRS.map((d, i) => [d.key, i]))
DIR_INDEX.front = DIR_INDEX['-z']
DIR_INDEX.back = DIR_INDEX['+z']
DIR_INDEX.top = DIR_INDEX['+y']

// Light fixed to the camera (upper-left, slightly in front), in view space:
// x → right, y → up, z → into the screen.
const LIGHT = (() => {
  const l = [-0.3, 0.55, -0.78]
  const m = Math.hypot(...l)
  return l.map((c) => c / m)
})()
const AMBIENT = 0.78
const DIFFUSE = 0.36
const SEAM = 0.93 // voxel edge tone (1 = invisible seams)

const hexToRgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))
const key3 = (x, y, z) => `${x},${y},${z}`
const add3 = (a, b, k = 1) => [a[0] + b[0] * k, a[1] + b[1] * k, a[2] + b[2] * k]

function prepare(model) {
  const { cells, decals = [] } = model
  const index = new Map()
  cells.forEach((c, i) => index.set(key3(c.x, c.y, c.z), i))

  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity, minZ = Infinity, maxZ = -Infinity
  for (const c of cells) {
    minX = Math.min(minX, c.x); maxX = Math.max(maxX, c.x)
    minY = Math.min(minY, c.y); maxY = Math.max(maxY, c.y)
    minZ = Math.min(minZ, c.z); maxZ = Math.max(maxZ, c.z)
  }
  const pivot = [(minX + maxX) / 2, (minY + maxY) / 2, (minZ + maxZ) / 2]

  let rXZ = 0
  const voxels = cells.map((c) => {
    const p = [c.x - pivot[0], c.y - pivot[1], c.z - pivot[2]]
    rXZ = Math.max(rXZ, Math.hypot(Math.abs(p[0]) + 0.5, Math.abs(p[2]) + 0.5))
    const faces = []
    DIRS.forEach((d, di) => {
      if (index.has(key3(c.x + d.n[0], c.y + d.n[1], c.z + d.n[2]))) return
      const fc = add3(p, d.n, 0.5)
      faces.push({
        dir: di,
        corners: [
          add3(add3(fc, d.u, -0.5), d.v, -0.5),
          add3(add3(fc, d.u, 0.5), d.v, -0.5),
          add3(add3(fc, d.u, 0.5), d.v, 0.5),
          add3(add3(fc, d.u, -0.5), d.v, 0.5),
        ],
      })
    })
    return { p, rgb: hexToRgb(c.c), faces }
  })

  const preparedDecals = decals.map((dec) => {
    const dir = DIR_INDEX[dec.face || '-z']
    const d = DIRS[dir]
    const [x, y, z] = dec.at
    const host = [x - pivot[0], y - pivot[1], z - pivot[2]]
    const cover = (dec.cover || [[0, 0]])
      .map(([du, dv]) => index.get(key3(
        x + d.u[0] * du + d.v[0] * dv,
        y + d.u[1] * du + d.v[1] * dv,
        z + d.u[2] * du + d.v[2] * dv,
      )))
      .filter((i) => i !== undefined)
    const shapes = dec.shapes.map((s) => ({ ...s, path: new Path2D(s.d) }))
    return { dir, origin: add3(host, d.n, 0.5), u: d.u, v: d.v, cover, shapes }
  })

  // Vertical half-extent that stays inside the canvas at any pitch.
  const halfH = (maxY - minY + 1) / 2
  const radius = Math.hypot(halfH, rXZ)
  return { voxels, decals: preparedDecals, radius }
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

function VoxelAvatar3D({
  model = 'v1',
  size = 132,
  spinSeconds = 9,        // seconds per full 360° turn (auto-rotate)
  pitchDeg = -16,         // camera tilt; negative looks down on the head
  startYawDeg = -32,      // initial three-quarter view, like the 2D avatar
  zoom = 1,
  interactive = true,     // drag to spin
  ariaLabel,
}) {
  const canvasRef = React.useRef(null)
  const def = typeof model === 'string' ? AVATAR_MODELS_3D[model] || AVATAR_MODELS_3D.v1 : null
  const prepared = React.useMemo(
    () => prepare(def ? def.build() : model),
    [def, model],
  )

  const basePitch = (pitchDeg * Math.PI) / 180
  const motion = React.useRef(null)
  if (!motion.current) {
    motion.current = { yaw: (startYawDeg * Math.PI) / 180, pitch: basePitch, vel: 0, dragging: false, drag: null }
  }

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 3)
    canvas.width = Math.round(size * dpr)
    canvas.height = Math.round(size * dpr)

    const reduced = prefersReducedMotion()
    const autoVel = reduced || !spinSeconds ? 0 : (2 * Math.PI) / spinSeconds
    const m = motion.current
    if (!m.dragging && m.vel === 0) m.vel = autoVel

    const { voxels, decals, radius } = prepared
    const pad = 3
    const scale = ((size / 2 - pad) / radius) * zoom
    const ox = size / 2, oy = size / 2
    const order = new Array(voxels.length)
    const rank = new Int32Array(voxels.length)
    const depth = new Float64Array(voxels.length)
    const vis = new Array(6)
    const shade = new Array(6)
    const decalAfter = new Array(voxels.length)

    const draw = () => {
      const cyw = Math.cos(m.yaw), syw = Math.sin(m.yaw)
      const cp = Math.cos(m.pitch), sp = Math.sin(m.pitch)
      // world → view rows (yaw about Y, then pitch about X)
      const RX = [cyw, 0, -syw]
      const RY = [-syw * sp, cp, -cyw * sp]
      const RZ = [syw * cp, sp, cyw * cp]
      const dot = (r, p) => r[0] * p[0] + r[1] * p[1] + r[2] * p[2]
      const sx = (p) => ox + scale * dot(RX, p)
      const sy = (p) => oy - scale * dot(RY, p)

      for (let d = 0; d < 6; d++) {
        const nrm = DIRS[d].n
        const vx = dot(RX, nrm), vy = dot(RY, nrm), vz = dot(RZ, nrm)
        vis[d] = vz < -1e-3
        shade[d] = AMBIENT + DIFFUSE * Math.max(0, vx * LIGHT[0] + vy * LIGHT[1] + vz * LIGHT[2])
      }

      for (let i = 0; i < voxels.length; i++) { order[i] = i; depth[i] = dot(RZ, voxels[i].p) }
      order.sort((a, b) => depth[b] - depth[a])
      for (let r = 0; r < order.length; r++) { rank[order[r]] = r; decalAfter[r] = null }

      for (const dec of decals) {
        if (!vis[dec.dir] || !dec.cover.length) continue
        let last = -1
        for (const vi of dec.cover) last = Math.max(last, rank[vi])
        ;(decalAfter[last] ||= []).push(dec)
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, size, size)
      ctx.lineJoin = 'round'
      ctx.lineWidth = 0.6 // hairline stroke: hides AA gaps between faces and marks voxel edges

      for (let r = 0; r < order.length; r++) {
        const vox = voxels[order[r]]
        for (const f of vox.faces) {
          if (!vis[f.dir]) continue
          const k = shade[f.dir]
          const ks = k * SEAM
          const col = `rgb(${Math.min(255, vox.rgb[0] * k) | 0},${Math.min(255, vox.rgb[1] * k) | 0},${Math.min(255, vox.rgb[2] * k) | 0})`
          const seam = `rgb(${Math.min(255, vox.rgb[0] * ks) | 0},${Math.min(255, vox.rgb[1] * ks) | 0},${Math.min(255, vox.rgb[2] * ks) | 0})`
          const c = f.corners
          ctx.beginPath()
          ctx.moveTo(sx(c[0]), sy(c[0]))
          ctx.lineTo(sx(c[1]), sy(c[1]))
          ctx.lineTo(sx(c[2]), sy(c[2]))
          ctx.lineTo(sx(c[3]), sy(c[3]))
          ctx.closePath()
          ctx.fillStyle = col
          ctx.strokeStyle = seam
          ctx.fill()
          ctx.stroke()
        }
        const ds = decalAfter[r]
        if (ds) for (const dec of ds) drawDecal(dec, sx, sy, dot, RZ)
      }
    }

    const drawDecal = (dec, sx, sy, dot, RZ) => {
      const facing = -dot(RZ, DIRS[dec.dir].n)
      if (facing < 0.06) return // edge-on: skip rather than smear
      const o = dec.origin
      const x0 = sx(o), y0 = sy(o)
      const pu = add3(o, dec.u), pv = add3(o, dec.v)
      ctx.save()
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
      ctx.transform(sx(pu) - x0, sy(pu) - y0, sx(pv) - x0, sy(pv) - y0, x0, y0)
      for (const s of dec.shapes) {
        ctx.globalAlpha = s.opacity ?? 1
        if (s.fill) { ctx.fillStyle = s.fill; ctx.fill(s.path) }
        if (s.stroke) {
          ctx.strokeStyle = s.stroke
          ctx.lineWidth = s.width ?? 0.06
          ctx.lineCap = s.cap || 'butt'
          ctx.stroke(s.path)
        }
      }
      ctx.restore()
    }

    let raf = 0
    let last = 0
    let visible = true
    let lastDrawn = null

    const tick = (now) => {
      raf = 0
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0
      last = now
      if (!m.dragging) {
        // ease back to the auto-spin speed and resting tilt after a fling
        m.vel += (autoVel - m.vel) * (1 - Math.exp(-dt * 1.6))
        m.pitch += (basePitch - m.pitch) * (1 - Math.exp(-dt * 2.5))
        m.yaw = (m.yaw + m.vel * dt) % (Math.PI * 2)
      }
      const sig = `${m.yaw.toFixed(5)}|${m.pitch.toFixed(5)}`
      if (sig !== lastDrawn) { draw(); lastDrawn = sig }
      if (visible) raf = requestAnimationFrame(tick)
    }
    const start = () => { if (!raf) { last = 0; raf = requestAnimationFrame(tick) } }
    const stop = () => { if (raf) cancelAnimationFrame(raf); raf = 0 }

    draw()
    lastDrawn = null
    start()

    let io
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting
        if (visible) start(); else stop()
      })
      io.observe(canvas)
    }
    return () => { stop(); io?.disconnect() }
  }, [prepared, size, spinSeconds, basePitch, zoom])

  const onPointerDown = (e) => {
    if (!interactive) return
    const m = motion.current
    m.dragging = true
    m.vel = 0
    m.drag = { id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now(), v: 0 }
    e.currentTarget.setPointerCapture?.(e.pointerId)
    e.currentTarget.style.cursor = 'grabbing'
  }
  const onPointerMove = (e) => {
    const m = motion.current
    if (!m.dragging || m.drag?.id !== e.pointerId) return
    const now = performance.now()
    const dx = e.clientX - m.drag.x
    const dy = e.clientY - m.drag.y
    const dYaw = dx * 0.014
    m.yaw += dYaw
    m.pitch = Math.max(-1.0, Math.min(0.3, m.pitch - dy * 0.008))
    const dt = Math.max(1, now - m.drag.t) / 1000
    m.drag.v = m.drag.v * 0.6 + (dYaw / dt) * 0.4
    m.drag.x = e.clientX; m.drag.y = e.clientY; m.drag.t = now
  }
  const onPointerUp = (e) => {
    const m = motion.current
    if (!m.dragging || m.drag?.id !== e.pointerId) return
    const idle = performance.now() - m.drag.t > 80
    m.vel = idle ? 0 : Math.max(-14, Math.min(14, m.drag.v))
    m.dragging = false
    m.drag = null
    e.currentTarget.style.cursor = 'grab'
  }

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={ariaLabel || `3D voxel avatar${def ? ` ${def.label}` : ''}, slowly spinning${interactive ? ' — drag to turn it' : ''}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={{
        display: 'block',
        width: size,
        height: size,
        filter: 'drop-shadow(0 8px 14px rgba(120,80,140,0.22))',
        cursor: interactive ? 'grab' : undefined,
        touchAction: interactive ? 'pan-y' : undefined,
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent',
      }}
    />
  )
}

export default VoxelAvatar3D
