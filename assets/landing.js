/* ============================================================
   Agri Port — landing page charts
   Data: 農林水産省 農林業センサス / 農業構造動態調査 ほか(一次統計)
   ============================================================ */

/* 基幹的農業従事者数(万人)— 実測 2000–2025 + 農水省試算(2040年代前半 約30万人) */
lineChart(document.getElementById("chartWorkers").closest(".viz-card"), {
  xs: [2000, 2005, 2010, 2015, 2020, 2025, 2030, 2035, 2040, 2045],
  series: [
    {
      name: "実測(センサス)",
      color: "#008300",
      values: [240.0, 224.1, 205.1, 175.7, 136.3, 102.1, null, null, null, null],
    },
    {
      name: "農水省試算",
      color: "#008300",
      dash: true,
      values: [null, null, null, null, null, 102.1, null, null, null, 30],
      endLabel: "約30万人",
    },
  ],
  yMax: 260,
  yTicks: [0, 50, 100, 150, 200, 250],
  yFmt: (v) => String(v),
  unit: "万人",
  xTickEvery: 2,
  tableCaption: "基幹的農業従事者数の推移(万人)",
});

/* 耕作放棄地面積(万ha)1985–2015 */
columnChart(document.getElementById("chartLand").closest(".viz-card"), {
  xs: [1985, 1990, 1995, 2000, 2005, 2010, 2015],
  values: [13.1, 21.7, 24.4, 34.3, 38.6, 39.6, 42.3],
  color: "#2a78d6",
  yMax: 45,
  yTicks: [0, 10, 20, 30, 40],
  yFmt: (v) => v.toFixed(1),
  unit: "万ha",
  labelLast: true,
  tableCaption: "耕作放棄地面積の推移(万ha)",
});
