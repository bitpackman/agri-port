/* ============================================================
   Agri Port — app demo logic (all data is fictional demo data)
   ============================================================ */

/* ---------- My ports ---------- */
const PORTS = [
  {
    id: "uonuma",
    icon: "🌾",
    name: "魚沼・棚田ポート #07",
    loc: "新潟県 魚沼市 — 棚田再生プロジェクト",
    crop: "コシヒカリ",
    units: 12,
    invested: "¥120,000",
    stage: 0.62,
    stageLabel: "出穂期",
    bot: "AGRI-BOT 03",
    next: "水位調整(自動・常時)",
    harvest: "9/28 収穫予定",
    ret: "veg",
    scene: "魚沼・棚田ポート #07 — コシヒカリ(出穂期)",
    img: "assets/images/optimized/port-uonuma-terrace-rice.webp",
  },
  {
    id: "aso",
    icon: "🍅",
    name: "阿蘇・再生ポート #02",
    loc: "熊本県 阿蘇市 — 元・耕作放棄地",
    crop: "ミニトマト(AIハウス)",
    units: 8,
    invested: "¥80,000",
    stage: 0.78,
    stageLabel: "連続収穫期",
    bot: "HARVEST-X 11 + HMD-01",
    next: "収穫 5:00 / 選果・箱詰め 8:00",
    harvest: "毎週金曜 発送",
    ret: "veg",
    scene: "阿蘇・再生ポート #02 — ミニトマト(連続収穫期)",
    img: "assets/images/optimized/port-aso-ai-tomato-greenhouse.webp",
  },
  {
    id: "tokachi",
    icon: "🥔",
    name: "十勝・広域ポート #15",
    loc: "北海道 帯広市 — 大規模輪作圃場",
    crop: "じゃがいも(キタアカリ)",
    units: 4,
    invested: "¥40,000",
    stage: 0.41,
    stageLabel: "肥大期",
    bot: "AGRI-BOT 22",
    next: "ドローン防除 7/20 早朝",
    harvest: "10月中旬 収穫予定",
    ret: "cash",
    scene: "十勝・広域ポート #15 — じゃがいも(肥大期)",
    img: "assets/images/optimized/port-tokachi-autonomous-potato-field.webp",
  },
];

const portGrid = document.getElementById("portGrid");
let livePortId = "uonuma";

function renderPorts() {
  portGrid.innerHTML = PORTS.map((p) => `
    <article class="card port-card ${p.id === livePortId ? "is-live" : ""}" data-id="${p.id}">
      <img class="port-photo" src="${p.img}" alt="${p.name}の現地映像" loading="lazy">
      <div class="port-top">
        <div class="port-icon">${p.icon}</div>
        <div>
          <div class="port-name">${p.name}</div>
          <div class="port-loc">${p.loc}</div>
        </div>
        <span class="port-return-badge ${p.ret}">${p.ret === "veg" ? "🥬 野菜受取" : "💴 現金分配"}</span>
      </div>
      <div>
        <div class="port-stage"><span>生育ステージ: <strong>${p.stageLabel}</strong></span><span>${Math.round(p.stage * 100)}%</span></div>
        <div class="stagebar"><div style="width:${p.stage * 100}%"></div></div>
      </div>
      <dl class="port-meta">
        <div><dt>出資</dt><dd>${p.invested}(${p.units}口)</dd></div>
        <div><dt>担当フィジカルAI</dt><dd>🤖 ${p.bot}</dd></div>
        <div><dt>次の作業</dt><dd>${p.next}</dd></div>
        <div><dt>収穫</dt><dd>${p.harvest}</dd></div>
      </dl>
      <div class="port-actions">
        <button class="btn btn-green watch-btn" data-id="${p.id}">📡 ライブを見る</button>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".watch-btn").forEach((b) =>
    b.addEventListener("click", () => {
      livePortId = b.dataset.id;
      const port = PORTS.find((p) => p.id === livePortId);
      document.getElementById("scenePort").textContent = port.scene;
      document.getElementById("liveSubtitle").textContent = port.name;
      renderPorts();
      document.getElementById("live").scrollIntoView({ behavior: "smooth" });
      toast(`${port.name} のライブカメラに切り替えました`);
    })
  );
}
renderPorts();

/* ---------- Clocks ---------- */
function two(n) { return String(n).padStart(2, "0"); }
function tick() {
  const d = new Date();
  const hm = `${two(d.getHours())}:${two(d.getMinutes())}`;
  const full = `${d.getFullYear()}-${two(d.getMonth() + 1)}-${two(d.getDate())} ${hm}:${two(d.getSeconds())} JST`;
  document.getElementById("clock").textContent = hm;
  document.getElementById("sceneClock").textContent = full;
}
tick();
setInterval(tick, 1000);

/* ---------- Live log feed ---------- */
const LOG_POOL = [
  ["🤖", "AGRI-BOT 03: 畝14の除草を完了(雑草214株を画像識別・機械除去、農薬不使用)"],
  ["🛰", "衛星リンク更新: 区画全体のNDVIマップを再計算 — 生育ムラは検出されず"],
  ["🚁", "ドローン D-07: 巡回飛行完了。害虫の兆候なし、葉色スコア 94/100"],
  ["💧", "土壌センサー: 水分62%を維持。次回自動潅水は17:00に予約済み"],
  ["🤖", "AGRI-BOT 03: バッテリー82% — 作業継続に十分。ソーラードックは待機中"],
  ["🌡", "気象AI: 台風6号の進路を監視中。上陸72時間前に深水管理へ自動移行します"],
  ["🍅", "HARVEST-X 11(阿蘇): 本日の収穫 28.4kg 完了。あなたの区画分 2.1kg を計上"],
  ["📦", "物流連携: 7/24発送分の集荷をヤマト運輸に自動手配しました"],
  ["🤖", "AGRI-BOT 22(十勝): 培土作業 3.2ha 完了。燃料消費は計画比 -6%"],
  ["🧠", "AIアグロノミスト: 出穂期の追肥は不要と判断(葉色・草丈が基準値内)"],
  ["🦾", "ヒューマノイド HMD-01(阿蘇・選果場): 本日の選果・箱詰め 84/120箱。規格外品はカット用に自動仕分け"],
  ["🦾", "ヒューマノイド HMD-01: 7/24発送分のパレタイズ完了。集荷伝票を自動発行しました"],
  ["🧊", "コールドチェーン: 予冷庫 8.2°C を維持。糖度保持モードで保管中"],
  ["🛰", "dMRV: 本日の観察データ(NDVI・作業ログ・土壌水分)を炭素検証台帳に記録しました"],
  ["🌱", "土壌炭素モニタ: 阿蘇 #02 の有機物含量が再生開始時比 +0.31pt — 貯留は計画どおり"],
  ["🕹", "テレオペ: 参加者が阿蘇 #02 の摘果を遠隔操作(4分32秒)— 操作ログを模倣学習データセットに追加"],
  ["🐜", "スワーム実証: 手のひらユニット12機が畝3を株単位で巡回観察 — 全機正常・欠測ゼロ"],
];
let logIdx = 0;
const feed = document.getElementById("logFeed");

function pushLog() {
  const d = new Date();
  const t = `${two(d.getHours())}:${two(d.getMinutes())}`;
  const [badge, msg] = LOG_POOL[logIdx % LOG_POOL.length];
  logIdx++;
  const li = document.createElement("li");
  li.innerHTML = `<span class="lt">${t}</span><span class="lb">${badge}</span><span>${msg}</span>`;
  feed.prepend(li);
  while (feed.children.length > 6) feed.removeChild(feed.lastChild);
}
pushLog(); pushLog(); pushLog();
setInterval(pushLog, 5000);

/* ---------- Return toggle (veg / cash / earth) ---------- */
const RETURNS = {
  veg: [document.getElementById("rtVeg"), document.getElementById("panelVeg")],
  cash: [document.getElementById("rtCash"), document.getElementById("panelCash")],
  earth: [document.getElementById("rtEarth"), document.getElementById("panelEarth")],
};
function setReturn(mode) {
  Object.entries(RETURNS).forEach(([k, [btn, panel]]) => {
    btn.classList.toggle("on", k === mode);
    btn.setAttribute("aria-selected", k === mode);
    panel.classList.toggle("hidden", k !== mode);
  });
}
Object.entries(RETURNS).forEach(([k, [btn]]) => btn.addEventListener("click", () => setReturn(k)));

/* ---------- Market ---------- */
const MARKET = [
  {
    tag: "耕作放棄地 再生", renew: true,
    name: "岡山・シャインマスカットポート #01",
    desc: "12年放置されたぶどう棚をフィジカルAIで再生。剪定・摘粒はアーム型ロボ、防除はドローンが担当します。",
    unit: "¥10,000", total: "¥8,000,000", yield: "果実Box or 想定4.8%",
    pct: 68, left: "残り 9日",
  },
  {
    tag: "中山間地 再生", renew: true,
    name: "島根・奥出雲ポート #03",
    desc: "急傾斜の棚田を小型クローラーAIで維持。米+大豆の輪作で土をつくりながら、獣害対策AIカメラも稼働。",
    unit: "¥10,000", total: "¥5,000,000", yield: "新米10kg/口 or 想定3.2%",
    pct: 32, left: "残り 21日",
  },
  {
    tag: "施設園芸", renew: false,
    name: "千葉・AIいちごポート #08",
    desc: "環境制御ハウス×収穫ロボットの高収益モデル。冬季は毎週、完熟いちごを朝採り直送します。",
    unit: "¥10,000", total: "¥12,000,000", yield: "いちごBox or 想定5.5%",
    pct: 91, left: "残り 3日",
  },
];

document.getElementById("marketGrid").innerHTML = MARKET.map((m, i) => `
  <article class="card market-card">
    <span class="market-tag ${m.renew ? "renew" : ""}">${m.tag}</span>
    <div class="market-name">${m.name}</div>
    <p class="market-desc">${m.desc}</p>
    <div class="market-meta">
      <span>1口 <strong>${m.unit}</strong></span>
      <span>募集 <strong>${m.total}</strong></span>
      <span>リターン <strong>${m.yield}</strong></span>
    </div>
    <div class="fundbar"><div style="width:${m.pct}%"></div></div>
    <div class="fund-note"><span>達成率 ${m.pct}%</span><span>${m.left}</span></div>
    <button class="btn btn-green invest-btn" data-i="${i}">このポートに出資する</button>
  </article>
`).join("");

document.querySelectorAll(".invest-btn").forEach((b) =>
  b.addEventListener("click", () => {
    b.disabled = true;
    b.textContent = "✓ 申込を受け付けました(デモ)";
    toast("出資申込を受け付けました — 収穫まで、あとは観るだけ 🌱");
  })
);

/* ---------- Teleop (構想デモ) ---------- */
const teleopBtn = document.getElementById("teleopBtn");
if (teleopBtn) {
  teleopBtn.addEventListener("click", () => {
    teleopBtn.disabled = true;
    teleopBtn.textContent = "✓ 7/20 06:00 の操縦枠を予約(構想デモ)";
    toast("テレオペ枠を予約しました — あなたの5分が、AIの教師データになります 🕹");
  });
}

/* ---------- Toast ---------- */
let toastTimer;
function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("on");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("on"), 3200);
}
