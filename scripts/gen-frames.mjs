// Renders the "It's not the view, it's how you frame it" sequence to public/frames/0001.webp …
// Run: node scripts/gen-frames.mjs   (edit SHAPES below to change the openings)
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const OUT = new URL("../public/frames/", import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });
const W = 1600, H = 900, S = W / 1920; // drawn in 1920×1080 space, scaled
const N = 64; // points per resampled shape
const FRAMES_PER_SHAPE = 14;

const ell = (cx, cy, rx, ry, n = 48) => Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2 - Math.PI * 0.75; return [cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]; });
const SHAPES = [
  [[380,430],[520,440],[520,650],[380,665]],
  [[640,95],[1120,45],[1280,150],[800,215]],
  [[560,410],[820,430],[1300,368],[1300,700],[820,702],[560,690]],
  [[990,255],[1012,252],[1012,842],[990,846]],
  ell(1090,500,120,145),
  [[560,700],[820,692],[1420,706],[1420,772],[820,760],[560,772]],
  [[600,430],[820,360],[1060,430],[1060,650],[600,660]],
  [[620,250],[820,255],[1060,215],[1060,860],[960,850],[960,300],[820,312],[620,300]],
  [[1000,380],[1100,368],[1100,866],[1000,852]],
  [[120,190],[820,300],[1800,170],[1800,980],[820,820],[120,940]],
  [[-40,-40],[1960,-40],[1960,1120],[-40,1120]], // final: the view takes over the whole frame
];

function resample(pts) {
  // start from the top-left-most point so morphs don't twist
  let s = 0; pts.forEach((p, i) => { if (p[0] + p[1] < pts[s][0] + pts[s][1]) s = i; });
  const P = [...pts.slice(s), ...pts.slice(0, s)]; P.push(P[0]);
  const seg = []; let tot = 0;
  for (let i = 1; i < P.length; i++) { const d = Math.hypot(P[i][0]-P[i-1][0], P[i][1]-P[i-1][1]); seg.push(d); tot += d; }
  const out = [];
  for (let k = 0; k < N; k++) {
    let t = (k / N) * tot, i = 0;
    while (t > seg[i]) { t -= seg[i]; i++; }
    const f = seg[i] ? t / seg[i] : 0;
    out.push([P[i][0] + (P[i+1][0]-P[i][0]) * f, P[i][1] + (P[i+1][1]-P[i][1]) * f]);
  }
  return out;
}
const R = SHAPES.map(resample);
const ease = t => t < .5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2;
const d = pts => "M" + pts.map(p => `${(p[0]*S).toFixed(1)} ${(p[1]*S).toFixed(1)}`).join("L") + "Z";

const room = `
  <rect width="1920" height="1080" fill="#d4d0ca"/>
  <polygon points="0,0 820,0 820,300 0,200" fill="#e9e6e2"/>
  <polygon points="820,0 1920,0 1920,150 820,300" fill="#efece8"/>
  <polygon points="0,200 820,300 820,820 0,960" fill="url(#wl)"/>
  <polygon points="820,300 1920,150 1920,1010 820,820" fill="url(#wr)"/>
  <polygon points="0,960 820,820 1920,1010 1920,1080 0,1080" fill="url(#fl)"/>`;
const view = `
  <rect width="1920" height="1080" fill="url(#sky)"/>
  <path d="M0 560 C300 470 520 430 760 520 S1300 420 1920 480 V1080 H0Z" fill="#c98a4c"/>
  <path d="M0 640 C380 560 700 500 980 470 C1080 520 1150 600 1400 640 C1600 670 1800 640 1920 620 V1080 H0Z" fill="url(#d2)"/>
  <path d="M980 470 C1050 560 1100 700 980 1080 H1920 V620 C1700 660 1500 650 1400 640 C1200 600 1080 530 980 470Z" fill="#8f5b30" opacity=".55"/>
  <path d="M0 820 C400 740 800 720 1100 800 C1300 850 1600 820 1920 760 V1080 H0Z" fill="url(#d1)"/>
  <path d="M0 900 C300 860 500 880 700 930 M120 980 C420 930 640 950 860 1010 M1200 900 C1450 860 1650 870 1900 840" stroke="#a4683a" stroke-width="3" fill="none" opacity=".35"/>`;
const defs = `
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fa8d8"/><stop offset=".55" stop-color="#c9d6e0"/><stop offset="1" stop-color="#f1d3a6"/></linearGradient>
  <linearGradient id="d1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e4a560"/><stop offset="1" stop-color="#b9783f"/></linearGradient>
  <linearGradient id="d2" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f0b56e"/><stop offset="1" stop-color="#d18e4c"/></linearGradient>
  <linearGradient id="wl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#cfcbc5"/><stop offset="1" stop-color="#dcd9d4"/></linearGradient>
  <linearGradient id="wr" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e3e0db"/><stop offset="1" stop-color="#d6d2cc"/></linearGradient>
  <linearGradient id="fl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c9c5bf"/><stop offset="1" stop-color="#a9a49d"/></linearGradient>`;

let n = 0;
const total = (SHAPES.length - 1) * FRAMES_PER_SHAPE + 1;
for (let s = 0; s < SHAPES.length - 1; s++) {
  for (let k = 0; k < FRAMES_PER_SHAPE; k++) {
    // hold on each shape for ~40% of its slot, then morph to the next
    const raw = k / FRAMES_PER_SHAPE, t = ease(Math.max(0, (raw - 0.4) / 0.6));
    const pts = R[s].map((p, i) => [p[0] + (R[s+1][i][0]-p[0]) * t, p[1] + (R[s+1][i][1]-p[1]) * t]);
    await render(pts, s === SHAPES.length - 2 ? 1 - t : 1);
  }
}
await render(R[R.length - 1], 0);

async function render(pts, ink) {
  const path = d(pts);
  const depth = d(pts.map(([x, y]) => [x - 12, y + 12]));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>${defs}<clipPath id="c"><path d="${path}"/></clipPath></defs>
  <g transform="scale(${S})">${room}</g>
  <g clip-path="url(#c)"><g transform="scale(${S})">${view}</g></g>
  <g fill="none" stroke="#141414" stroke-width="2.4" stroke-linejoin="round" opacity="${ink}">
    <path d="${depth}"/><path d="${path}"/></g></svg>`;
  n++;
  await sharp(Buffer.from(svg)).webp({ quality: 78 }).toFile(`${OUT}${String(n).padStart(4, "0")}.webp`);
}
console.log(`rendered ${n}/${total} frames to public/frames`);
