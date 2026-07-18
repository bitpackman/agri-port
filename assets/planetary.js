/* ============================================================
   Agri Port — Planetary Network map
   ドットマトリクス世界地図(等間隔グリッド、行×列レンジで陸地定義)
   grid: 66 cols (lon -180..180) × 28 rows (lat 90..-62)
   ============================================================ */

(function () {
  const NS = "http://www.w3.org/2000/svg";
  function el(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  const svg = document.getElementById("worldMap");
  if (!svg) return;

  const CELL = 14.545, OX = 0, OY = 34;
  const cx = (c) => OX + (c + 0.5) * CELL;
  const cy = (r) => OY + (r + 0.5) * CELL;
  const lonToC = (lon) => (lon + 180) / 5.4545 - 0.5;
  const latToR = (lat) => (90 - lat) / 5.4545 - 0.5;

  /* land as [row, colStart, colEnd] ranges */
  const LAND = [
    [2, 13, 17], [2, 24, 27], [2, 36, 36],
    [3, 10, 19], [3, 23, 28], [3, 38, 63],
    [4, 3, 7], [4, 8, 20], [4, 23, 27], [4, 30, 30], [4, 35, 39], [4, 40, 64],
    [5, 2, 7], [5, 8, 21], [5, 24, 26], [5, 35, 38], [5, 39, 63],
    [6, 3, 5], [6, 9, 21], [6, 31, 32], [6, 35, 38], [6, 39, 62],
    [7, 10, 21], [7, 31, 33], [7, 33, 40], [7, 41, 60], [7, 62, 62],
    [8, 10, 21], [8, 33, 38], [8, 39, 52], [8, 53, 57], [8, 59, 59],
    [9, 10, 20], [9, 31, 33], [9, 36, 36], [9, 37, 41], [9, 42, 50], [9, 51, 57], [9, 58, 59],
    [10, 10, 19], [10, 31, 32], [10, 39, 45], [10, 50, 57], [10, 57, 58],
    [11, 11, 17], [11, 30, 38], [11, 39, 43], [11, 44, 48], [11, 50, 56], [11, 57, 57],
    [12, 11, 15], [12, 29, 38], [12, 40, 44], [12, 45, 49], [12, 52, 56],
    [13, 12, 15], [13, 29, 39], [13, 41, 44], [13, 45, 48], [13, 51, 54], [13, 56, 57],
    [14, 14, 16], [14, 29, 40], [14, 41, 43], [14, 45, 47], [14, 51, 53], [14, 56, 56],
    [15, 15, 17], [15, 18, 21], [15, 30, 40], [15, 40, 43], [15, 51, 53], [15, 54, 56],
    [16, 17, 23], [16, 33, 42], [16, 50, 52], [16, 54, 55], [16, 59, 61],
    [17, 17, 25], [17, 34, 42], [17, 51, 58], [17, 59, 62],
    [18, 18, 26], [18, 34, 41], [18, 52, 55], [18, 60, 62],
    [19, 18, 26], [19, 34, 41], [19, 55, 59],
    [20, 18, 25], [20, 34, 40], [20, 41, 42], [20, 53, 60],
    [21, 19, 24], [21, 34, 39], [21, 42, 42], [21, 53, 61],
    [22, 19, 23], [22, 34, 38], [22, 53, 61],
    [23, 19, 22], [23, 35, 37], [23, 54, 58], [23, 64, 65],
    [24, 19, 21], [24, 58, 58], [24, 64, 65],
    [25, 19, 20], [25, 64, 64],
    [26, 19, 20],
  ];

  const dots = el("g", { fill: "rgba(140, 199, 170, 0.34)" }, svg);
  LAND.forEach(([r, c1, c2]) => {
    for (let c = c1; c <= c2; c++) el("circle", { cx: cx(c), cy: cy(r), r: 4.0 }, dots);
  });

  /* ports */
  const PORTS = [
    { name: "魚沼 #07", lat: 37.1, lon: 138.9, live: true },
    { name: "阿蘇 #02", lat: 32.9, lon: 131.1, live: true },
    { name: "十勝 #15", lat: 42.9, lon: 143.2, live: true },
    { name: "ナイロビ高原(構想)", lat: -1.3, lon: 36.8, live: false },
    { name: "アンダルシア(構想)", lat: 37.4, lon: -5.9, live: false },
  ];
  const P = PORTS.map((p) => ({ ...p, x: cx(lonToC(p.lon)), y: cy(latToR(p.lat)) }));

  /* arcs from 魚沼 to overseas ports */
  const hub = P[0];
  const arcs = el("g", { fill: "none", stroke: "#9ecfff", "stroke-width": 1.6, opacity: 0.65, "stroke-dasharray": "7 7" }, svg);
  P.filter((p) => !p.live).forEach((p) => {
    const mx = (hub.x + p.x) / 2, my = Math.min(hub.y, p.y) - 66;
    const path = el("path", { d: `M${hub.x} ${hub.y} Q ${mx} ${my} ${p.x} ${p.y}` }, arcs);
    el("animate", { attributeName: "stroke-dashoffset", values: "0;-84", dur: "4s", repeatCount: "indefinite" }, path);
  });

  P.forEach((p) => {
    const g = el("g", {}, svg);
    const color = p.live ? "#e8a13d" : "#9ecfff";
    if (p.live) {
      const ring = el("circle", { cx: p.x, cy: p.y, r: 7, fill: "none", stroke: color, "stroke-width": 1.6 }, g);
      el("animate", { attributeName: "r", values: "7;17", dur: "2s", repeatCount: "indefinite" }, ring);
      el("animate", { attributeName: "opacity", values: "0.9;0", dur: "2s", repeatCount: "indefinite" }, ring);
      el("circle", { cx: p.x, cy: p.y, r: 5.2, fill: color, stroke: "#0d1a14", "stroke-width": 2 }, g);
    } else {
      el("circle", { cx: p.x, cy: p.y, r: 5.2, fill: "none", stroke: color, "stroke-width": 2 }, g);
    }
    const anchorRight = p.x > 700;
    const t = el("text", {
      x: p.x + (anchorRight ? -10 : 10), y: p.y - 9,
      "font-size": 10.5, "font-weight": 700, fill: "rgba(255,255,255,0.88)",
      "text-anchor": anchorRight ? "end" : "start",
    }, g);
    t.textContent = p.name;
  });

  /* HUD */
  const hudTxt = el("text", { x: 16, y: 22, "font-size": 11, fill: "rgba(255,255,255,0.6)", style: "font-family:SF Mono, Menlo, monospace" }, svg);
  hudTxt.textContent = "AGRI PORT PLANETARY NETWORK — ● LIVE(日本) ◌ 2036– 構想区域";
})();
