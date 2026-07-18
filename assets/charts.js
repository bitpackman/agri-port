/* ============================================================
   Agri Port — minimal chart library (dataviz-spec compliant)
   line chart w/ crosshair+tooltip, column chart w/ per-bar hover,
   table-view twin for accessibility.
   ============================================================ */

(function () {
  const NS = "http://www.w3.org/2000/svg";
  const INK = "#0b0b0b", INK2 = "#52514e", MUTED = "#898781",
        GRID = "#e1e0d9", BASE = "#c3c2b7", SURFACE = "#fcfcfb";

  function svgEl(tag, attrs) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  function makeTooltip(plot) {
    const tt = document.createElement("div");
    tt.className = "viz-tooltip";
    plot.appendChild(tt);
    return tt;
  }

  function makeTable(container, caption, headers, rows) {
    const det = document.createElement("details");
    det.className = "viz-table";
    det.innerHTML =
      `<summary>データを表で見る</summary>` +
      `<table><caption class="sr-only">${caption}</caption><thead><tr>` +
      headers.map((h) => `<th scope="col">${h}</th>`).join("") +
      `</tr></thead><tbody>` +
      rows.map((r) => `<tr>${r.map((c, i) => (i === 0 ? `<th scope="row">${c}</th>` : `<td>${c}</td>`)).join("")}</tr>`).join("") +
      `</tbody></table>`;
    container.appendChild(det);
  }

  /* ---------------- line chart ---------------- */
  // cfg: { xs:[...], series:[{name,color,values:[..null..],dash}], yMax, yTicks:[],
  //        yFmt(v), xTickEvery, unit, endLabel, note, tableCaption }
  window.lineChart = function (container, cfg) {
    const W = 560, H = 280, M = { t: 18, r: 74, b: 34, l: 46 };
    const plotW = W - M.l - M.r, plotH = H - M.t - M.b;
    const plot = container.querySelector(".viz-plot");
    const yMax = cfg.yMax;
    const xN = cfg.xs.length;

    const x = (i) => M.l + (i / (xN - 1)) * plotW;
    const y = (v) => M.t + plotH - (v / yMax) * plotH;

    const svg = svgEl("svg", { viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": cfg.tableCaption });

    // gridlines + y ticks
    cfg.yTicks.forEach((v) => {
      svg.appendChild(svgEl("line", { x1: M.l, x2: M.l + plotW, y1: y(v), y2: y(v), stroke: v === 0 ? BASE : GRID, "stroke-width": 1 }));
      const t = svgEl("text", { x: M.l - 8, y: y(v) + 4, "text-anchor": "end", "font-size": 10.5, fill: MUTED, style: "font-variant-numeric:tabular-nums" });
      t.textContent = cfg.yFmt(v);
      svg.appendChild(t);
    });
    // x ticks
    cfg.xs.forEach((xv, i) => {
      if (i % (cfg.xTickEvery || 1) !== 0 && i !== xN - 1) return;
      const t = svgEl("text", { x: x(i), y: M.t + plotH + 20, "text-anchor": "middle", "font-size": 10.5, fill: MUTED, style: "font-variant-numeric:tabular-nums" });
      t.textContent = xv;
      svg.appendChild(t);
    });

    // crosshair (hidden until hover)
    const cross = svgEl("line", { y1: M.t, y2: M.t + plotH, stroke: BASE, "stroke-width": 1, opacity: 0 });
    svg.appendChild(cross);

    const hoverDots = [];

    cfg.series.forEach((s) => {
      const pts = [];
      s.values.forEach((v, i) => { if (v != null) pts.push([x(i), y(v), i]); });
      const path = pts.map((p, k) => (k ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
      const line = svgEl("path", { d: path, fill: "none", stroke: s.color, "stroke-width": 2, "stroke-linecap": "round", "stroke-linejoin": "round" });
      if (s.dash) line.setAttribute("stroke-dasharray", "6 5");
      svg.appendChild(line);

      // end marker + surface ring
      const last = pts[pts.length - 1];
      svg.appendChild(svgEl("circle", { cx: last[0], cy: last[1], r: 4.5, fill: s.color, stroke: SURFACE, "stroke-width": 2 }));

      // selective direct label at the endpoint (text tokens, never series color)
      if (s.endLabel) {
        const lab = svgEl("text", { x: last[0] + 10, y: last[1] + 4, "font-size": 11.5, "font-weight": 700, fill: INK });
        lab.textContent = s.endLabel;
        svg.appendChild(lab);
      }

      // hover dot (one per series, repositioned on move)
      const hd = svgEl("circle", { r: 4.5, fill: s.color, stroke: SURFACE, "stroke-width": 2, opacity: 0 });
      svg.appendChild(hd);
      hoverDots.push({ dot: hd, s });
    });

    plot.appendChild(svg);
    const tt = makeTooltip(plot);

    // hover layer
    const hit = svgEl("rect", { x: M.l, y: M.t, width: plotW, height: plotH, fill: "transparent" });
    svg.appendChild(hit);

    function onMove(ev) {
      const r = svg.getBoundingClientRect();
      const sx = W / r.width;
      const mx = (ev.clientX - r.left) * sx;
      let i = Math.round(((mx - M.l) / plotW) * (xN - 1));
      i = Math.max(0, Math.min(xN - 1, i));
      cross.setAttribute("x1", x(i)); cross.setAttribute("x2", x(i));
      cross.setAttribute("opacity", 1);

      let rows = "";
      hoverDots.forEach(({ dot, s }) => {
        const v = s.values[i];
        if (v == null) { dot.setAttribute("opacity", 0); return; }
        dot.setAttribute("cx", x(i)); dot.setAttribute("cy", y(v)); dot.setAttribute("opacity", 1);
        rows += `<div class="tt-value">${cfg.yFmt(v)}${cfg.unit || ""}${s.name ? `<span style="color:${MUTED};font-weight:400"> — ${s.name}</span>` : ""}</div>`;
      });
      tt.innerHTML = `<div class="tt-label">${cfg.xs[i]}年</div>` + rows;
      tt.classList.add("on");
      const px = (x(i) / W) * r.width;
      const flip = px > r.width * 0.62;
      tt.style.left = flip ? "auto" : px + 14 + "px";
      tt.style.right = flip ? r.width - px + 14 + "px" : "auto";
      tt.style.top = "18px";
    }
    function onLeave() {
      cross.setAttribute("opacity", 0);
      hoverDots.forEach(({ dot }) => dot.setAttribute("opacity", 0));
      tt.classList.remove("on");
    }
    hit.addEventListener("mousemove", onMove);
    hit.addEventListener("mouseleave", onLeave);

    makeTable(container, cfg.tableCaption, ["年", ...cfg.series.map((s) => s.name || cfg.tableCaption)],
      cfg.xs.map((xv, i) => [xv, ...cfg.series.map((s) => (s.values[i] == null ? "—" : cfg.yFmt(s.values[i]) + (cfg.unit || "")))]));
  };

  /* ---------------- column chart ---------------- */
  // cfg: { xs:[], values:[], color, yMax, yTicks, yFmt, unit, tableCaption, labelLast }
  window.columnChart = function (container, cfg) {
    const W = 560, H = 280, M = { t: 26, r: 16, b: 34, l: 46 };
    const plotW = W - M.l - M.r, plotH = H - M.t - M.b;
    const plot = container.querySelector(".viz-plot");
    const n = cfg.values.length;
    const slot = plotW / n;
    const bw = Math.min(24, slot * 0.55);
    const y = (v) => M.t + plotH - (v / cfg.yMax) * plotH;

    const svg = svgEl("svg", { viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": cfg.tableCaption });

    cfg.yTicks.forEach((v) => {
      svg.appendChild(svgEl("line", { x1: M.l, x2: M.l + plotW, y1: y(v), y2: y(v), stroke: v === 0 ? BASE : GRID, "stroke-width": 1 }));
      const t = svgEl("text", { x: M.l - 8, y: y(v) + 4, "text-anchor": "end", "font-size": 10.5, fill: MUTED, style: "font-variant-numeric:tabular-nums" });
      t.textContent = cfg.yFmt(v);
      svg.appendChild(t);
    });

    const tt = makeTooltip(plot);

    cfg.values.forEach((v, i) => {
      const cx = M.l + slot * i + slot / 2;
      const bx = cx - bw / 2, by = y(v), bh = M.t + plotH - by;
      const rr = Math.min(4, bh);
      // rounded data-end, square baseline
      const d = `M${bx} ${by + bh} L${bx} ${by + rr} Q${bx} ${by} ${bx + rr} ${by} L${bx + bw - rr} ${by} Q${bx + bw} ${by} ${bx + bw} ${by + rr} L${bx + bw} ${by + bh} Z`;
      const bar = svgEl("path", { d, fill: cfg.color });
      svg.appendChild(bar);

      const xt = svgEl("text", { x: cx, y: M.t + plotH + 20, "text-anchor": "middle", "font-size": 10.5, fill: MUTED, style: "font-variant-numeric:tabular-nums" });
      xt.textContent = cfg.xs[i];
      svg.appendChild(xt);

      if (cfg.labelLast && i === n - 1) {
        const lab = svgEl("text", { x: cx, y: by - 8, "text-anchor": "middle", "font-size": 11.5, "font-weight": 700, fill: INK });
        lab.textContent = cfg.yFmt(v) + (cfg.unit || "");
        svg.appendChild(lab);
      }

      // generous hit target: full slot width
      const hit = svgEl("rect", { x: M.l + slot * i, y: M.t, width: slot, height: plotH, fill: "transparent" });
      hit.addEventListener("mousemove", (ev) => {
        bar.setAttribute("opacity", 0.82);
        const r = svg.getBoundingClientRect();
        const px = (cx / W) * r.width;
        tt.innerHTML = `<div class="tt-label">${cfg.xs[i]}年</div><div class="tt-value">${cfg.yFmt(v)}${cfg.unit || ""}</div>`;
        tt.classList.add("on");
        const flip = px > r.width * 0.62;
        tt.style.left = flip ? "auto" : px + 12 + "px";
        tt.style.right = flip ? r.width - px + 12 + "px" : "auto";
        tt.style.top = "12px";
      });
      hit.addEventListener("mouseleave", () => {
        bar.setAttribute("opacity", 1);
        tt.classList.remove("on");
      });
      svg.appendChild(hit);
    });

    plot.appendChild(svg);
    makeTable(container, cfg.tableCaption, ["年", cfg.tableCaption],
      cfg.xs.map((xv, i) => [xv, cfg.yFmt(cfg.values[i]) + (cfg.unit || "")]));
  };
})();
