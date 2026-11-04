// 3D avatar model registry.
//
// A model is { label, build() → { cells, decals } }.
//   cells  — voxels: { x, y, z, c } (c = '#rrggbb'), unit cubes on an integer grid.
//            y is up; the character faces -z (eyes sit on the z = 0 layer).
//   decals — flat drawings (eyes, mouth, accessories…) stuck onto a voxel face:
//            { at: [x, y, z], face: '-z', cover?: [[du, dv], …], shapes: [shape, …] }
//            Shapes are SVG path strings in face-local units: 1 = one voxel,
//            origin = face centre, u → right as you look at the face, v → up.
//            `cover` lists the neighbouring faces (in face-grid offsets) a decal
//            spills onto, so it is drawn above all of them. Defaults to [[0, 0]].
//
// To add a new version: write a build() that returns cells + decals, register it
// below, and it shows up in the Avatar switch in the Tweaks panel.

import { buildGirl, VOX_PALETTE } from './VoxelAvatar.jsx'
import { buildGirlV2, VOX2_PALETTE } from './VoxelAvatarV2.jsx'

const n = (v) => +v.toFixed(4)

export function ellipse(cx, cy, rx, ry) {
  return `M ${n(cx - rx)} ${n(cy)} A ${n(rx)} ${n(ry)} 0 1 0 ${n(cx + rx)} ${n(cy)} A ${n(rx)} ${n(ry)} 0 1 0 ${n(cx - rx)} ${n(cy)} Z`
}

export function roundRect(cx, cy, w, h, r) {
  const x0 = n(cx - w / 2), x1 = n(cx + w / 2), y0 = n(cy - h / 2), y1 = n(cy + h / 2)
  r = n(Math.min(r, w / 2, h / 2))
  return [
    `M ${n(x0 + r)} ${y0}`, `L ${n(x1 - r)} ${y0}`, `A ${r} ${r} 0 0 1 ${x1} ${n(y0 + r)}`,
    `L ${x1} ${n(y1 - r)}`, `A ${r} ${r} 0 0 1 ${n(x1 - r)} ${y1}`,
    `L ${n(x0 + r)} ${y1}`, `A ${r} ${r} 0 0 1 ${x0} ${n(y1 - r)}`,
    `L ${x0} ${n(y0 + r)}`, `A ${r} ${r} 0 0 1 ${n(x0 + r)} ${y0}`, 'Z',
  ].join(' ')
}

const at = (p) => [p.x, p.y, p.z]

function buildV1() {
  const { cells, features } = buildGirl()
  const P = VOX_PALETTE
  const decals = []
  for (const e of features.eyes) {
    decals.push({ at: at(e), face: '-z', shapes: [{ d: roundRect(0, 0.04, 0.26, 0.36, 0.1), fill: P.eye }] })
  }
  for (const c of features.cheeks) {
    decals.push({ at: at(c), face: '-z', shapes: [{ d: ellipse(0, 0.12, 0.24, 0.13), fill: P.cheek, opacity: 0.75 }] })
  }
  decals.push({ at: at(features.mouth), face: '-z', shapes: [{ d: roundRect(0, -0.12, 0.42, 0.17, 0.085), fill: P.mouth }] })
  return { cells, decals }
}

function buildV2() {
  const { cells, features } = buildGirlV2()
  const P = VOX2_PALETTE
  const decals = []
  for (const e of features.eyes) {
    decals.push({
      at: at(e), face: '-z',
      shapes: [{ d: 'M -0.23 -0.02 Q 0 0.3 0.23 -0.02', stroke: P.eye, width: 0.12, cap: 'round' }],
    })
  }
  for (const c of features.cheeks) {
    decals.push({ at: at(c), face: '-z', shapes: [{ d: ellipse(0, 0.06, 0.25, 0.14), fill: P.cheek, opacity: 0.8 }] })
  }
  decals.push({
    at: at(features.mouth), face: '-z',
    shapes: [
      { d: 'M -0.34 -0.02 Q 0 -0.44 0.34 -0.02 Q 0 -0.14 -0.34 -0.02 Z', fill: P.mouth },
      { d: 'M -0.24 -0.07 Q 0 -0.19 0.24 -0.07', stroke: P.teeth, width: 0.075, cap: 'round' },
    ],
  })
  // Sunglasses hooked on the collar — wider than one voxel, so they cover the neighbours too.
  const lensR = 0.22, lensX = 0.31, lensY = 0.02
  decals.push({
    at: at(features.shades), face: '-z', cover: [[-1, 0], [0, 0], [1, 0]],
    shapes: [
      { d: 'M -0.74 0.06 Q 0 0.2 0.74 0.06', stroke: P.shadeFrame, width: 0.06, cap: 'round' },
      { d: ellipse(-lensX, lensY, lensR, lensR * 0.95), fill: P.shadeLens, stroke: P.shadeFrame, width: 0.06 },
      { d: ellipse(lensX, lensY, lensR, lensR * 0.95), fill: P.shadeLens, stroke: P.shadeFrame, width: 0.06 },
      { d: `M ${-lensX + lensR} ${lensY} L ${lensX - lensR} ${lensY}`, stroke: P.shadeFrame, width: 0.06 },
      // tiny glint so the lenses read as glass while spinning
      { d: ellipse(-lensX - 0.07, lensY + 0.08, 0.05, 0.035), fill: '#ffffff', opacity: 0.35 },
      { d: ellipse(lensX - 0.07, lensY + 0.08, 0.05, 0.035), fill: '#ffffff', opacity: 0.35 },
    ],
  })
  return { cells, decals }
}

export const AVATAR_MODELS_3D = {
  v1: { label: 'V1', build: buildV1 },
  v2: { label: 'V2', build: buildV2 },
}
