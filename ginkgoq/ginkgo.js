/* ginkgo.js — GinkgoQ leaf computation
   Clean open-fan rendering: no fill, no closed margins.
   Faithfully matches the original GinkgoSignalGraphic.astro design.
*/
(function () {
  'use strict';

  const NS       = 'http://www.w3.org/2000/svg';
  const stemBase = { x: 132, y: 320 };
  const stemTop  = { x: 205, y: 248 };

  /* ── Helpers ──────────────────────────────────────────────────────────── */
  const fmt = v => +v.toFixed(2);

  function cubicPt(p0, p1, p2, p3, t) {
    const u = 1 - t;
    return {
      x: u*u*u*p0.x + 3*u*u*t*p1.x + 3*u*t*t*p2.x + t*t*t*p3.x,
      y: u*u*u*p0.y + 3*u*u*t*p1.y + 3*u*t*t*p2.y + t*t*t*p3.y,
    };
  }

  function sample(p0, p1, p2, p3, steps, skip) {
    const start = skip ? 1 : 0, out = [];
    for (let i = 0; i <= steps - start; i++)
      out.push(cubicPt(p0, p1, p2, p3, (i + start) / steps));
    return out;
  }

  /* ── Edge points (original spec, faithfully reproduced) ─────────────── */
  const raw = [
    ...sample({x:86,y:168}, {x:80,y:130},  {x:120,y:92},  {x:166,y:84},  16, false),
    ...sample({x:166,y:84}, {x:188,y:55},  {x:216,y:76},  {x:230,y:164}, 18, true),
    ...sample({x:230,y:164},{x:238,y:128}, {x:253,y:98},  {x:278,y:100}, 12, true),
    ...sample({x:278,y:100},{x:315,y:82},  {x:354,y:126}, {x:360,y:169}, 18, true),
    ...sample({x:360,y:169},{x:365,y:195}, {x:348,y:218}, {x:328,y:224}, 12, true),
  ];

  const edge = raw.map((p, i) => {
    const t     = i / (raw.length - 1);
    const outer = t > 0.04 && t < 0.9;
    const amp   = outer ? 3.6 : 1.2;
    return { x: p.x, y: p.y + Math.sin(t * Math.PI * 23 + 0.42) * amp };
  });

  /* ── Catmull-Rom ──────────────────────────────────────────────────────── */
  function catmullPath(pts) {
    let d = `M ${fmt(pts[0].x)} ${fmt(pts[0].y)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0  = pts[Math.max(0, i - 1)], p1 = pts[i];
      const p2  = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
      const cp1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
      const cp2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
      d += ` C ${fmt(cp1.x)} ${fmt(cp1.y)} ${fmt(cp2.x)} ${fmt(cp2.y)} ${fmt(p2.x)} ${fmt(p2.y)}`;
    }
    return d;
  }

  /* ── SVG element factory ──────────────────────────────────────────────── */
  function el(tag, attrs, cls) {
    const e = document.createElementNS(NS, tag);
    if (cls) e.setAttribute('class', cls);
    for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
    return e;
  }

  /* ── Mount ────────────────────────────────────────────────────────────── */
  function mount() {
    const leafGroup = document.getElementById('ginkgo-leaf');
    const gridGroup = document.getElementById('ginkgo-grid-lines');
    const nodesEl   = document.getElementById('ginkgo-nodes');
    if (!leafGroup) return;

    const E0  = edge[0];                       // left base of leaf  (~86, ~168)
    const EL  = edge[edge.length - 1];         // right base of leaf (~328, ~224)
    const E1  = edge[1];                       // second point (for left tangent)
    const EL1 = edge[edge.length - 2];         // penultimate point  (for right tangent)

    /* ── Outline — open top arc ──────────────────────────────────────── */
    leafGroup.appendChild(el('path', { d: catmullPath(edge) }, 'ginkgo-outline'));

    /* ── G1-continuous margins ───────────────────────────────────────────
       At E0: catmull-rom leaves in direction (E1-E0). The margin cp2 must
              point OPPOSITE that direction so the two paths share a tangent.
       At EL: catmull-rom arrives in direction (EL-EL1). The margin cp1 must
              continue in THAT same direction.
    ── */
    function unit(dx, dy) {
      const m = Math.hypot(dx, dy) || 1;
      return { x: dx / m, y: dy / m };
    }

    // Left margin  stemTop → E0
    const lDir  = unit(E1.x - E0.x, E1.y - E0.y);           // catmull-rom initial tangent
    const lArc  = Math.hypot(stemTop.x - E0.x, stemTop.y - E0.y);
    const lCp2  = { x: fmt(E0.x - lDir.x * lArc * 0.22),   // G1: arrive opposite tangent
                    y: fmt(E0.y - lDir.y * lArc * 0.22) };
    const lCp1  = { x: fmt(stemTop.x + (E0.x - stemTop.x) * 0.28),
                    y: fmt(stemTop.y + (E0.y - stemTop.y) * 0.22) };

    // Right margin  EL → stemTop
    const rDir  = unit(EL.x - EL1.x, EL.y - EL1.y);         // catmull-rom final tangent
    const rArc  = Math.hypot(stemTop.x - EL.x, stemTop.y - EL.y);
    const rCp1  = { x: fmt(EL.x + rDir.x * rArc * 0.22),    // G1: leave in same tangent
                    y: fmt(EL.y + rDir.y * rArc * 0.22) };
    const rCp2  = { x: fmt(stemTop.x + (EL.x - stemTop.x) * 0.28),
                    y: fmt(stemTop.y + (EL.y - stemTop.y) * 0.22) };

    leafGroup.appendChild(el('path', {
      d: `M ${fmt(stemTop.x)} ${fmt(stemTop.y)} C ${lCp1.x} ${lCp1.y} ${lCp2.x} ${lCp2.y} ${fmt(E0.x)} ${fmt(E0.y)}`
    }, 'ginkgo-margin ginkgo-margin-l'));

    leafGroup.appendChild(el('path', {
      d: `M ${fmt(EL.x)} ${fmt(EL.y)} C ${rCp1.x} ${rCp1.y} ${rCp2.x} ${rCp2.y} ${fmt(stemTop.x)} ${fmt(stemTop.y)}`
    }, 'ginkgo-margin ginkgo-margin-r'));

    /* ── 66 veins radiating from stem top ─────────────────────────────── */
    const veinCount = 66;
    for (let idx = 0; idx < veinCount; idx++) {
      const t        = idx / (veinCount - 1);
      const ei       = Math.round(t * (edge.length - 1));
      const end      = edge[ei];
      const side     = end.x < 230 ? -1 : 1;
      const edgeDist = Math.abs(t - 0.5) * 2;
      const bend     = 6 + edgeDist * 10;
      const cp1      = {
        x: stemTop.x + (end.x - stemTop.x) * 0.24 + side * bend * 0.18,
        y: stemTop.y + (end.y - stemTop.y) * 0.27 - 5,
      };
      const cp2 = {
        x: stemTop.x + (end.x - stemTop.x) * 0.69 + side * bend,
        y: stemTop.y + (end.y - stemTop.y) * 0.72 - 2,
      };
      const vd   = `M ${fmt(stemTop.x)} ${fmt(stemTop.y)} C ${fmt(cp1.x)} ${fmt(cp1.y)} ${fmt(cp2.x)} ${fmt(cp2.y)} ${fmt(end.x)} ${fmt(end.y)}`;
      const vein = el('path', { d: vd }, 'ginkgo-vein');
      vein.style.animationDelay = `${0.28 + idx * 0.011}s`;
      leafGroup.appendChild(vein);
    }

    /* ── Stem ─────────────────────────────────────────────────────────── */
    leafGroup.appendChild(el('path', {
      d: `M ${stemBase.x} ${stemBase.y} C 146 296 178 264 ${stemTop.x} ${stemTop.y}`
    }, 'ginkgo-stem'));

    /* ── Central fold ─────────────────────────────────────────────────── */
    leafGroup.appendChild(el('path', {
      d: `M ${stemTop.x} ${stemTop.y} C 211 219 219 188 230 164`
    }, 'ginkgo-fold'));

    /* ── Lower vein ───────────────────────────────────────────────────── */
    leafGroup.appendChild(el('path', {
      d: `M ${stemTop.x} ${stemTop.y} C 244 222 286 214 328 224`
    }, 'ginkgo-lower-vein'));

    /* ── Grid — extended to fill the 500×380 viewBox ──────────────────── */
    [20,60,100,140,180,220,260,300,340,380,420,460].forEach(x =>
      gridGroup.appendChild(el('line', { x1: x, y1: 0, x2: x, y2: 380 })));
    [0,40,80,120,160,200,240,280,320,360].forEach(y =>
      gridGroup.appendChild(el('line', { x1: 0, y1: y, x2: 500, y2: y })));

    /* ── Nodes — smaller radii for pixel-precise delicacy ─────────────── */
    const nodeDefs = [
      {x:92, y:84,  t:'s'}, {x:172,y:42,  t:'s'}, {x:222,y:42,  t:'hc'},
      {x:282,y:42,  t:'s'}, {x:350,y:82,  t:'hs'}, {x:386,y:122, t:'s'},
      {x:382,y:202, t:'hc'},{x:344,y:242, t:'s'},  {x:302,y:282, t:'hs'},
      {x:242,y:286, t:'s'}, {x:202,y:284, t:'hc'}, {x:164,y:242, t:'s'},
      {x:122,y:244, t:'s'}, {x:82, y:202, t:'hc'}, {x:82, y:162, t:'s'},
      {x:122,y:122, t:'s'}, {x:162,y:122, t:'s'},  {x:202,y:162, t:'hs'},
      {x:242,y:162, t:'s'}, {x:302,y:202, t:'hc'}, {x:322,y:122, t:'s'},
    ];

    nodeDefs.forEach(n => {
      if (n.t === 's') {
        nodesEl.appendChild(el('circle', { cx: n.x, cy: n.y, r: '1.8' }, 'ginkgo-node-solid'));
      } else if (n.t === 'hc') {
        nodesEl.appendChild(el('circle', { cx: n.x, cy: n.y, r: '2.2' }, 'ginkgo-node-hollow'));
      } else {
        nodesEl.appendChild(el('rect', {
          x: n.x - 2.2, y: n.y - 2.2, width: '4.4', height: '4.4', rx: '0.6'
        }, 'ginkgo-node-hollow'));
      }
    });
  }

  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', mount);
  else
    mount();
})();
