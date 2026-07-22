/* ============================================================
   Agri Port — live camera scenes
   1) 定点カメラ: texture + crop clumps を既存シーンに追加
   2) ロボット視点: AI雑草検出HUD付き一人称カメラ
   3) ドローンNDVI: 生育マップ俯瞰スキャン
   ============================================================ */

(function () {
  const NS = "http://www.w3.org/2000/svg";
  const XLINK = "http://www.w3.org/1999/xlink";

  function el(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function txt(parent, x, y, str, attrs) {
    const t = el("text", Object.assign({ x, y }, attrs), parent);
    t.textContent = str;
    return t;
  }
  const MONO = "SF Mono, Menlo, Consolas, monospace";
  // deterministic pseudo-random (seeded) so the scene is stable frame to frame
  let seed = 7;
  function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }

  /* ---------- shared: plant symbol ---------- */
  function definePlant(svg, id, colors, blades, height) {
    const defs = svg.querySelector("defs") || el("defs", {}, svg);
    const g = el("g", { id }, defs);
    el("ellipse", { cx: 0, cy: 0, rx: 7, ry: 2.2, fill: "rgba(30,22,12,0.35)" }, g);
    for (let i = 0; i < blades; i++) {
      const a = -50 + (100 / (blades - 1)) * i + (rnd() * 10 - 5);
      const h = height * (0.75 + rnd() * 0.5);
      const bend = 6 + rnd() * 5;
      el("path", {
        d: `M0 0 Q ${-bend} ${-h * 0.55} ${-bend * 0.4} ${-h} Q ${bend * 0.2} ${-h * 0.5} 0 0`,
        fill: colors[i % colors.length],
        transform: `rotate(${a})`,
      }, g);
    }
    return id;
  }

  function addVignette(svg, opacity) {
    const defs = svg.querySelector("defs") || el("defs", {}, svg);
    const id = "vig" + Math.floor(rnd() * 1e6);
    const rg = el("radialGradient", { id, cx: "50%", cy: "46%", r: "72%" }, defs);
    el("stop", { offset: "0.62", "stop-color": "rgba(0,0,0,0)" }, rg);
    el("stop", { offset: "1", "stop-color": `rgba(5,10,7,${opacity})` }, rg);
    el("rect", { width: 960, height: 430, fill: `url(#${id})`, "pointer-events": "none" }, svg);
  }

  function addSoilFilter(svg, id) {
    const defs = svg.querySelector("defs") || el("defs", {}, svg);
    const f = el("filter", { id, x: "0%", y: "0%", width: "100%", height: "100%" }, defs);
    el("feTurbulence", { type: "fractalNoise", baseFrequency: "0.9 0.4", numOctaves: 2, result: "n" }, f);
    el("feColorMatrix", { in: "n", type: "matrix", values: "0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.6 0.3 0 0 0" }, f);
    el("feComposite", { operator: "in", in2: "SourceGraphic" }, f);
  }

  /* ============================================================
     1) 定点カメラ enhancement
     ============================================================ */
  const fixed = document.getElementById("camFixed");
  if (fixed) {
    addSoilFilter(fixed, "soilTexF");
    const rows = fixed.querySelector("#rows");
    // soil grain over the field
    const soilTex = el("rect", { y: 238, width: 960, height: 192, fill: "#2d2013", filter: "url(#soilTexF)", opacity: 0.5 });
    rows.parentNode.insertBefore(soilTex, rows);
    // horizon haze
    const defs = fixed.querySelector("defs");
    const hz = el("linearGradient", { id: "hazeF", x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
    el("stop", { offset: 0, "stop-color": "rgba(255,255,255,0)" }, hz);
    el("stop", { offset: 0.55, "stop-color": "rgba(240,246,232,0.55)" }, hz);
    el("stop", { offset: 1, "stop-color": "rgba(240,246,232,0)" }, hz);
    rows.parentNode.insertBefore(el("rect", { y: 210, width: 960, height: 56, fill: "url(#hazeF)" }), rows);

    definePlant(fixed, "plantF", ["#2f7a33", "#4da24a", "#3c9040", "#57ad50"], 7, 30);
    // clumps along each row, scaled by depth
    const rowSpec = [
      { y: 258, s: 0.42, gap: 40 },
      { y: 285, s: 0.55, gap: 44 },
      { y: 316, s: 0.72, gap: 50 },
      { y: 353, s: 0.92, gap: 58 },
      { y: 396, s: 1.18, gap: 68 },
    ];
    rowSpec.forEach((r) => {
      for (let x = -20; x < 990; x += r.gap) {
        const u = el("use", {
          transform: `translate(${x + rnd() * 14 - 7} ${r.y + rnd() * 3}) scale(${r.s * (0.85 + rnd() * 0.3)})`,
        }, rows);
        u.setAttributeNS(XLINK, "href", "#plantF");
        if (rnd() > 0.5) {
          u.classList.add("sway");
          u.style.animationDelay = (rnd() * 3).toFixed(2) + "s";
        }
      }
    });
    // birds
    const birds = el("g", { id: "birds", fill: "none", stroke: "#3a4a3f", "stroke-width": 2, "stroke-linecap": "round" }, fixed);
    el("path", { d: "M0 0 Q 5 -5 10 0 Q 15 -5 20 0" }, birds);
    el("path", { d: "M30 8 Q 34 4 38 8 Q 42 4 46 8", "stroke-width": 1.6 }, birds);
    addVignette(fixed, 0.42);
  }

  /* ============================================================
     2) ロボット視点 (POV) — AI weeding HUD
     ============================================================ */
  const pov = document.getElementById("camPov");
  const VP = { x: 480, y: 152 };
  const povPt = (xb, t) => ({ x: VP.x + (xb - VP.x) * t, y: VP.y + 278 * t, s: 0.14 + 1.5 * Math.pow(t, 1.6) });
  const weedSpots = [];

  if (pov) {
    const defs = el("defs", {}, pov);
    // sky
    const sky = el("linearGradient", { id: "povSky", x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
    el("stop", { offset: 0, "stop-color": "#9fd8f0" }, sky);
    el("stop", { offset: 0.8, "stop-color": "#dcecd2" }, sky);
    el("stop", { offset: 1, "stop-color": "#ece9c8" }, sky);
    el("rect", { width: 960, height: VP.y + 4, fill: "url(#povSky)" }, pov);
    el("circle", { cx: 700, cy: 60, r: 26, fill: "#ffd97a", opacity: 0.9 }, pov);
    // distant treeline
    for (let x = -10; x < 980; x += 34) {
      el("ellipse", { cx: x, cy: VP.y - 4, rx: 26, ry: 7 + rnd() * 5, fill: "#7fa387", opacity: 0.55 }, pov);
    }

    const world = el("g", { class: "bob" }, pov);
    // ground
    el("rect", { y: VP.y, width: 960, height: 430 - VP.y, fill: "#7a5b3f" }, world);
    addSoilFilter(pov, "soilTexP");
    el("rect", { y: VP.y, width: 960, height: 430 - VP.y, fill: "#241708", filter: "url(#soilTexP)", opacity: 0.55 }, world);
    // wheel tracks converging to the vanishing point
    el("path", { d: `M330 430 L392 430 L${VP.x - 6} ${VP.y + 8} L${VP.x - 10} ${VP.y + 8} Z`, fill: "rgba(40,26,14,0.4)" }, world);
    el("path", { d: `M568 430 L630 430 L${VP.x + 10} ${VP.y + 8} L${VP.x + 6} ${VP.y + 8} Z`, fill: "rgba(40,26,14,0.4)" }, world);
    // row shadow lines
    [60, 480, 900].forEach((xb) => {
      el("path", { d: `M${xb} 430 L${VP.x} ${VP.y}`, stroke: "rgba(30,20,10,0.35)", "stroke-width": 10, "stroke-linecap": "round" }, world);
    });

    definePlant(pov, "plantP", ["#2f7a33", "#4da24a", "#3c9040", "#57ad50", "#2c6e2f"], 8, 34);
    definePlant(pov, "weedP", ["#8aa839", "#a3b84e", "#7a9a33"], 5, 22);

    const ts = [0.2, 0.27, 0.35, 0.44, 0.55, 0.68, 0.83, 1.0];
    // crop rows
    [60, 480, 900].forEach((xb) => {
      ts.forEach((t) => {
        const p = povPt(xb, t);
        const u = el("use", { transform: `translate(${p.x + rnd() * 8 - 4} ${p.y}) scale(${p.s})` }, world);
        u.setAttributeNS(XLINK, "href", "#plantP");
        if (t > 0.4 && rnd() > 0.4) {
          u.classList.add("sway");
          u.style.animationDelay = (rnd() * 3).toFixed(2) + "s";
        }
      });
    });
    // weeds (between rows) — detection targets
    [[270, 0.34], [270, 0.62], [270, 0.92], [690, 0.45], [690, 0.72], [690, 1.0]].forEach(([xb, t]) => {
      const p = povPt(xb, t);
      const u = el("use", { transform: `translate(${p.x} ${p.y}) scale(${p.s * 0.9})` }, world);
      u.setAttributeNS(XLINK, "href", "#weedP");
      weedSpots.push(p);
    });

    // scan sweep
    const sw = el("linearGradient", { id: "sweepP", x1: 0, y1: 0, x2: 1, y2: 0 }, defs);
    el("stop", { offset: 0, "stop-color": "rgba(255,255,255,0)" }, sw);
    el("stop", { offset: 0.5, "stop-color": "rgba(190,255,205,0.10)" }, sw);
    el("stop", { offset: 1, "stop-color": "rgba(255,255,255,0)" }, sw);
    const sweep = el("rect", { x: -140, y: VP.y, width: 140, height: 278, fill: "url(#sweepP)" }, pov);
    el("animateTransform", { attributeName: "transform", type: "translate", values: "0 0; 1100 0", dur: "6.5s", repeatCount: "indefinite" }, sweep);

    addVignette(pov, 0.5);

    /* ----- HUD (static layer, above vignette) ----- */
    const hud = el("g", { id: "povHud" }, pov);
    // compact center telemetry bar (top corners belong to the HTML chips)
    el("rect", { x: 288, y: 10, width: 384, height: 26, rx: 13, fill: "rgba(8,18,14,0.62)" }, hud);
    const rec = el("circle", { cx: 306, cy: 23, r: 4.5, fill: "#ff5548" }, hud);
    el("animate", { attributeName: "opacity", values: "1;0.2;1", dur: "1.4s", repeatCount: "indefinite" }, rec);
    txt(hud, 318, 27, "REC · WEEDING · 0.8 m/s · BAT 82% · 畝 14/32", { "font-size": 11, fill: "#d8f5e0", style: `font-family:${MONO}` });

    // horizon line
    el("line", { x1: 0, x2: 960, y1: VP.y, y2: VP.y, stroke: "rgba(255,255,255,0.25)", "stroke-width": 1 }, hud);
    // reticle
    const ret = el("g", { stroke: "rgba(255,255,255,0.55)", "stroke-width": 1.4, fill: "none" }, hud);
    el("circle", { cx: 480, cy: 268, r: 26 }, ret);
    el("line", { x1: 480, x2: 480, y1: 234, y2: 250 }, ret);
    el("line", { x1: 480, x2: 480, y1: 286, y2: 302 }, ret);
    el("line", { x1: 446, x2: 462, y1: 268, y2: 268 }, ret);
    el("line", { x1: 498, x2: 514, y1: 268, y2: 268 }, ret);
    // frame corner brackets
    const br = el("g", { stroke: "rgba(255,255,255,0.4)", "stroke-width": 2, fill: "none" }, hud);
    [[340, 175, 1, 1], [620, 175, -1, 1], [340, 372, 1, -1], [620, 372, -1, -1]].forEach(([x, y, dx, dy]) => {
      el("path", { d: `M${x} ${y + 16 * dy} L${x} ${y} L${x + 16 * dx} ${y}` }, br);
    });

    // detection layer
    pov._detLayer = el("g", {}, pov);
  }

  /* detection loop: box appears on a weed → 除去 ✓ → fades */
  function spawnDetection() {
    if (!pov || pov.classList.contains("hidden") || !weedSpots.length) return;
    const p = weedSpots[Math.floor(rnd() * weedSpots.length)];
    const hw = 40 * p.s + 10, hh = 34 * p.s + 8;
    const g = el("g", { opacity: 0 }, pov._detLayer);
    g.style.transition = "opacity 0.25s ease";
    const box = el("rect", { x: p.x - hw, y: p.y - hh - 14 * p.s, width: hw * 2, height: hh + 20 * p.s, rx: 5, fill: "none", stroke: "#ffb84d", "stroke-width": 2 }, g);
    const conf = (0.86 + rnd() * 0.11).toFixed(2);
    const lw = 86;
    const lbl = el("rect", { x: p.x - lw / 2, y: p.y - hh - 14 * p.s - 22, width: lw, height: 17, rx: 3, fill: "#ffb84d" }, g);
    const lt = txt(g, p.x, p.y - hh - 14 * p.s - 9, `雑草 ${conf}`, { "font-size": 11, "font-weight": 700, fill: "#231506", "text-anchor": "middle", style: `font-family:${MONO}` });
    requestAnimationFrame(() => (g.style.opacity = 1));
    setTimeout(() => {
      box.setAttribute("stroke", "#6fe08f");
      lbl.setAttribute("fill", "#6fe08f");
      lt.textContent = "除去 ✓";
    }, 1500);
    setTimeout(() => { g.style.opacity = 0; setTimeout(() => g.remove(), 300); }, 3000);
  }
  setInterval(spawnDetection, 2100);

  /* ============================================================
     3) ドローンNDVI 俯瞰
     ============================================================ */
  const ndvi = document.getElementById("camNdvi");
  if (ndvi) {
    const defs = el("defs", {}, ndvi);
    el("rect", { width: 960, height: 430, fill: "#221a10" }, ndvi);
    addSoilFilter(ndvi, "soilTexN");
    el("rect", { width: 960, height: 430, fill: "#0e0a05", filter: "url(#soilTexN)", opacity: 0.5 }, ndvi);

    const FX = 90, FY = 66, FW = 780, FH = 314, CW = 30, CH = 26;
    const cols = FW / CW, rowsN = Math.floor(FH / CH); // 26 x 12
    el("rect", { x: FX - 6, y: FY - 6, width: FW + 12, height: FH + 12, fill: "#4a3a26", rx: 6 }, ndvi);

    function lerpColor(c1, c2, t) {
      const p = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
      const a = p(c1), b = p(c2);
      return `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(",")})`;
    }
    const blobs = [[7, 8, 3.1, 0.34], [19, 3.5, 2.7, 0.27]];
    const cellsG = el("g", {}, ndvi);
    let anomaly = null;
    for (let cy = 0; cy < rowsN; cy++) {
      for (let cx = 0; cx < cols; cx++) {
        let v = 0.7 + 0.11 * Math.sin(cx * 0.5 + 0.8) * Math.cos(cy * 0.65 + 0.3) + 0.05 * Math.sin(cx * 1.7) * Math.sin(cy * 1.3);
        blobs.forEach(([bx, by, r, d]) => {
          const dist = Math.hypot(cx - bx, cy - by) / r;
          v -= d * Math.exp(-dist * dist);
        });
        v = Math.max(0.34, Math.min(0.9, v));
        const low = v < 0.48;
        const fill = low ? "#d99a17" : lerpColor("#c9dfc0", "#12471c", (v - 0.34) / 0.56);
        el("rect", { x: FX + cx * CW, y: FY + cy * CH, width: CW - 1.5, height: CH - 1.5, fill, opacity: 0.92 }, cellsG);
        if (low && cx === 7 && cy === 8) anomaly = { x: FX + cx * CW, y: FY + cy * CH };
      }
    }
    // grid coordinates
    const coord = { "font-size": 9.5, fill: "rgba(255,255,255,0.55)", style: `font-family:${MONO}` };
    for (let cx = 0; cx < cols; cx += 4) txt(ndvi, FX + cx * CW + 4, FY - 12, String.fromCharCode(65 + cx / 4), coord);
    for (let cy = 0; cy < rowsN; cy += 3) txt(ndvi, FX - 20, FY + cy * CH + 14, String(cy + 1), coord);

    // flight path (serpentine) + drone
    let d = "";
    const ys = [100, 165, 230, 295, 352];
    ys.forEach((y, i) => {
      const x1 = i % 2 === 0 ? 120 : 840, x2 = i % 2 === 0 ? 840 : 120;
      d += (i === 0 ? `M${x1} ${y} ` : "") + `L${x2} ${y} `;
      if (i < ys.length - 1) d += `L${x2} ${ys[i + 1]} `;
    });
    const path = el("path", { d, fill: "none", stroke: "#9ecfff", "stroke-width": 1.6, "stroke-dasharray": "9 7", opacity: 0.75 }, ndvi);
    el("animate", { attributeName: "stroke-dashoffset", values: "0;-160", dur: "3.5s", repeatCount: "indefinite" }, path);
    const drone = el("g", {}, ndvi);
    el("circle", { r: 6, fill: "#fff" }, drone);
    const ring = el("circle", { r: 8, fill: "none", stroke: "#fff", "stroke-width": 1.5 }, drone);
    el("animate", { attributeName: "r", values: "8;18", dur: "1.6s", repeatCount: "indefinite" }, ring);
    el("animate", { attributeName: "opacity", values: "0.8;0", dur: "1.6s", repeatCount: "indefinite" }, ring);
    const mo = el("animateMotion", { dur: "46s", repeatCount: "indefinite" }, drone);
    const mp = document.createElementNS(NS, "mpath");
    mp.setAttributeNS(XLINK, "href", "#ndviPath");
    path.setAttribute("id", "ndviPath");
    mo.appendChild(mp);

    // anomaly callout
    if (anomaly) {
      el("rect", { x: anomaly.x - CW - 4, y: anomaly.y - CH - 4, width: CW * 3 + 6, height: CH * 3 + 6, rx: 5, fill: "none", stroke: "#ffb84d", "stroke-width": 2 }, ndvi);
      el("line", { x1: anomaly.x + CW * 2 + 2, y1: anomaly.y + CH, x2: 428, y2: 347, stroke: "#ffb84d", "stroke-width": 1.2 }, ndvi);
      el("rect", { x: 430, y: 336, width: 302, height: 22, rx: 5, fill: "rgba(8,18,14,0.78)" }, ndvi);
      txt(ndvi, 440, 351, "B-9 生育ムラ NDVI 0.41 → 追肥を自動予約 ✓", { "font-size": 11, fill: "#ffd694", style: `font-family:${MONO}` });
    }

    // compact center HUD bar + legend
    el("rect", { x: 302, y: 10, width: 356, height: 26, rx: 13, fill: "rgba(8,18,14,0.62)" }, ndvi);
    const rec2 = el("circle", { cx: 320, cy: 23, r: 4.5, fill: "#ff5548" }, ndvi);
    el("animate", { attributeName: "opacity", values: "1;0.2;1", dur: "1.4s", repeatCount: "indefinite" }, rec2);
    txt(ndvi, 332, 27, "REC · D-07 · ALT 30m · SCAN 12.4ha", { "font-size": 11, fill: "#d8f5e0", style: `font-family:${MONO}` });
    const lg = el("linearGradient", { id: "ndviGrad", x1: 0, y1: 0, x2: 1, y2: 0 }, defs);
    el("stop", { offset: 0, "stop-color": "#c9dfc0" }, lg);
    el("stop", { offset: 1, "stop-color": "#12471c" }, lg);
    el("rect", { x: 700, y: 48, width: 110, height: 8, rx: 3, fill: "url(#ndviGrad)" }, ndvi);
    txt(ndvi, 694, 56, "0.34", { "font-size": 9, fill: "rgba(255,255,255,0.75)", "text-anchor": "end", style: `font-family:${MONO}` });
    txt(ndvi, 816, 56, "0.90", { "font-size": 9, fill: "rgba(255,255,255,0.75)", style: `font-family:${MONO}` });
    el("rect", { x: 856, y: 48, width: 8, height: 8, rx: 2, fill: "#d99a17" }, ndvi);
    txt(ndvi, 870, 56, "生育ムラ", { "font-size": 9, fill: "rgba(255,255,255,0.75)", style: `font-family:${MONO}` });
  }

  /* ============================================================
     camera tabs
     ============================================================ */
  const CAMS = {
    fixed: { label: "LIVE — 固定カメラ 02(圃場)", bot: "🤖 AGRI-BOT 03 稼働中 · 🔋 82%" },
    house: { label: "LIVE — ハウスカメラ 04(施設棟)", bot: "🍅 HARVEST-X 11 収穫中 · 本日 28.4kg" },
    pack:  { label: "LIVE — 選果場カメラ 01", bot: "🦿 HMD-01 選果・箱詰め中 · 84/120箱" },
    pov:   { label: "LIVE — AGRI-BOT 03 機体カメラ", bot: "🎯 AI検出モード · 農薬不使用" },
    ndvi:  { label: "LIVE — DRONE D-07 · NDVIスキャン", bot: "🌱 平均NDVI 0.74 · 生育ムラ 1件" },
  };
  const views = { fixed: document.getElementById("camFixed"), pov, ndvi };
  const vids = {
    fixed: document.getElementById("vidFixed"),
    house: document.getElementById("vidHouse"),
    pack: document.getElementById("vidPack"),
    pov: document.getElementById("vidPov"),
    ndvi: document.getElementById("vidNdvi"),
  };
  const detLayer = document.getElementById("detLayer");
  document.querySelectorAll(".cam-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      const cam = btn.dataset.cam;
      document.querySelectorAll(".cam-tab").forEach((b) => {
        b.classList.toggle("on", b === btn);
        b.setAttribute("aria-selected", b === btn);
      });
      Object.entries(views).forEach(([k, v]) => v && v.classList.toggle("hidden", k !== cam));
      Object.entries(vids).forEach(([k, v]) => v && v.classList.toggle("hidden", k !== cam));
      if (detLayer) detLayer.classList.toggle("hidden", cam !== "pov" || !vids.pov);
      document.getElementById("sceneCamLabel").textContent = CAMS[cam].label;
      document.getElementById("sceneBot").textContent = CAMS[cam].bot;
    });
  });

  /* HTML detection HUD — 実写POV動画の上にAI検出ボックスを重ねる */
  function spawnHtmlDetection() {
    if (!detLayer || detLayer.classList.contains("hidden")) return;
    const box = document.createElement("div");
    box.className = "det-box";
    const w = 8 + rnd() * 7, h = 9 + rnd() * 7;             // % units
    box.style.width = w + "%";
    box.style.height = h + "%";
    box.style.left = 12 + rnd() * (74 - w) + "%";
    box.style.top = 46 + rnd() * (42 - h) + "%";
    const tag = document.createElement("span");
    tag.className = "det-tag";
    tag.textContent = "雑草 " + (0.86 + rnd() * 0.11).toFixed(2);
    box.appendChild(tag);
    detLayer.appendChild(box);
    requestAnimationFrame(() => box.classList.add("on"));
    setTimeout(() => { box.classList.add("done"); tag.textContent = "除去 ✓"; }, 1400);
    setTimeout(() => { box.classList.remove("on"); setTimeout(() => box.remove(), 300); }, 2800);
  }
  setInterval(spawnHtmlDetection, 2400);
})();
