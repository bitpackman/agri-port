# Agri Port Image Usage Notes

このフォルダには、サイト実装で使えるAI生成画像を保存しています。既存画像は残したまま、2035年の農業改革ソリューションとして見せるための新規画像を追加しました。

## 推奨方針

- トップページは `hero-2035-autonomous-agri-port.png` を第一候補にしてください。左側が暗く、コピーを重ねやすい構図です。
- 既存の `agri-port-hero-ai-farm.png` は、より現在に近いパイロット感を出したい場合のバックアップとして扱ってください。
- 画像内には意図的に読める文字やロゴを入れていません。テキストはHTML/CSS側で重ねる前提です。
- 16:9系画像は背景・セクションビジュアル向けです。`background-size: cover` と暗めの `linear-gradient` オーバーレイを併用すると安定します。
- 4:3系画像はポートカード、募集カード、アプリ内カードのサムネイル向けです。
- 実装時は必要に応じてWebP/AVIFへ変換し、PNGは原本として残してください。

## 2035年版の新規画像

| ファイル | サイズ | 推奨用途 | メモ |
|---|---:|---|---|
| `hero-2035-autonomous-agri-port.png` | 1672x941 | トップヒーロー背景 | 最有力。左側に見出し、右側にAI艦隊。2035年感が最も強い。 |
| `section-2035-physical-ai-fleet-hub.png` | 1672x941 | Solution / Why Now / フィジカルAIスタック | ロボット艦隊オペレーターの説明に合う。左側に余白あり。 |
| `part-2035-farm-os-app-observe.png` | 1536x1024 | アプリ体験 / 「観る」ステップ / app.html導線 | 農場OS・ライブ観察・参加体験の説明に合う。カード画像にも使える。 |
| `section-2035-drone-ndvi-field-intelligence.png` | 1672x941 | 生育データ / AIアグロノミスト / NDVI / Why Now | データドリブン農業感を出せる。オーバーレイは控えめ推奨。 |
| `section-2035-regenerated-farmland-port.png` | 1672x941 | Roadmap / CTA / 荒廃農地再生 | 「国土の再設計」「2035年の原風景」に最適。 |
| `section-2035-humanoid-packhouse-logistics.png` | 1672x941 | Supply Chain / Return Center / 物流2024年問題の解法 | 収穫後工程・選果・箱詰め・直送を一枚で伝えられる。 |

## 既存画像

| ファイル | サイズ | 推奨用途 | メモ |
|---|---:|---|---|
| `agri-port-hero-ai-farm.png` | 1672x941 | 旧ヒーロー / パイロットポート背景 | 2035年版より穏やかで、現実の延長感が強い。 |
| `port-uonuma-terrace-rice.png` | 1448x1086 | 魚沼・棚田ポート #07 | ポートカードやライブ観察のサムネイル。 |
| `port-aso-ai-tomato-greenhouse.png` | 1448x1086 | 阿蘇・再生ポート #02 | ミニトマト、野菜リターン、AIハウスの説明に合う。 |
| `port-tokachi-autonomous-potato-field.png` | 1448x1086 | 十勝・広域ポート #15 | 広域輪作、大規模化、現金分配型の説明に合う。 |
| `supply-chain-humanoid-tomato-packing.png` | 1672x941 | 旧Supply Chain / Return Center | 新規の物流画像よりシンプルにトマト選果を見せたい場合に使う。 |

## CSS実装メモ

トップヒーローで使う場合の例:

```css
.hero {
  background:
    linear-gradient(90deg, rgba(13, 42, 31, 0.92) 0%, rgba(13, 42, 31, 0.70) 34%, rgba(13, 42, 31, 0.12) 76%),
    url("images/hero-2035-autonomous-agri-port.png") center / cover no-repeat;
}
```

セクション背景で使う場合の例:

```css
.section-visual {
  background:
    linear-gradient(180deg, rgba(13, 42, 31, 0.70), rgba(13, 42, 31, 0.35)),
    url("images/section-2035-regenerated-farmland-port.png") center / cover no-repeat;
}
```

カードサムネイルで使う場合は、画像の縦横比を固定してください:

```css
.port-image {
  aspect-ratio: 4 / 3;
  width: 100%;
  object-fit: cover;
}
```

## 実装上の注意

- 背景画像に直接文字を焼き込まないでください。レスポンシブ時に破綻しやすく、アクセシビリティにも不利です。
- モバイルでは `hero-2035-autonomous-agri-port.png` の右側ロボット群が切れやすいため、`background-position: 58% center` から試すとよいです。
- 暗い左側に白文字を置く場合でも、コントラスト確保のためCSSグラデーションは残してください。
- 画像を本番で使う場合は、PNG原本を残したまま `assets/images/optimized/` などにWebP/AVIFを書き出すのが安全です。
