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

## IMAGE_REQUESTS.md対応の追加画像

`IMAGE_REQUESTS.md` のPLANETARY構想・フィジカルAI体系向け追加依頼に対応した画像です。

### 優先度A: PLANETARYセクション

| ファイル | サイズ | 推奨用途 | メモ |
|---|---:|---|---|
| `planetary-earth-network.png` | 1672x941 | LP PLANETARYセクションのシネマストリップ / 将来ヒーロー差し替え候補 | 左側に暗い宇宙余白あり。日本列島周辺が明るく、緑のポート網が見える。 |
| `port-nairobi-coffee.png` | 1448x1086 | アプリ「プラネタリー・ネットワーク」送金ポートカード / LP送金ポート言及部 | ケニア高原のコーヒー農園。家族は後ろ姿で、ロボットとドローンが入っている。 |
| `port-andalusia-olive.png` | 1448x1086 | アプリ「プラネタリー・ネットワーク」気候分散ポートカード | アンダルシアのオリーブ並木、赤土、電動自律機、遠景の白い村。 |
| `mrv-observation-stack.png` | 1672x941 | LP「観察が、検証になる」ピラー / MRV説明ページ | 衛星、ドローン、地上ロボ、土壌センサーの多層観測を図解調で表現。左側に暗部あり。 |

### 優先度B: フィジカルAI体系セクション

| ファイル | サイズ | 推奨用途 | メモ |
|---|---:|---|---|
| `physical-ai-fleet-lineup.png` | 1915x821 | LP「6レイヤー」セクションのシネマストリップ | ほぼ21:9。自律トラクタ、除草ロボ、ドローン、収穫アーム、ヒューマノイド、充電ドックの横並び。 |
| `laser-weeding-night.png` | 1672x941 | LP LAYER 2(手)カード / SNS用 | 夜間露地畑でレーザー除草中。左側が暗く、カード見出しを重ねやすい。 |
| `mountain-port-guardian.png` | 1448x1086 | LP LAYER 6(守り)カード / 中山間ポート紹介 | 夕暮れの棚田、獣害対策ロボ、草刈りロボ。雰囲気が強いので必要なら暗めカードで使用。 |

### 優先度C: ロードマップ/将来ビジョン

| ファイル | サイズ | 推奨用途 | メモ |
|---|---:|---|---|
| `desert-port-greenhouse.png` | 1672x941 | Phase 4(極限環境)の説明 / PLANETARYの砂漠言及部 | 砂丘、スマート温室、ソーラーアレイ。温室内の緑が透けて見える。 |
| `lunar-farm-2040.png` | 1672x941 | mars-band(「火星でも耕せない」)の背景 / CTA差し替え候補 | 月面温室内の作物、ヒューマノイド、窓外の地球。静かな将来ビジョン向け。 |

### 優先度D: ストーリー版ピッチ

| ファイル | サイズ | 推奨用途 | メモ |
|---|---:|---|---|
| `persona-farmer-dawn.png` | 1672x941 | pitch-story S2「田中さん、72歳。この谷で、最後のひとり。」背景 | 高齢農家の後ろ姿、手入れされた段と藪に戻りかけた隣の段の対比。左側に暗いコピー領域あり。 |
| `persona-farmer-future.png` | 1672x941 | pitch-story S9「田中さんの田んぼは、統計にならなかった。」背景 | 数年後の同じ谷の希望側。タブレットを持つ後ろ姿、小型ロボ、遠景の家族連れ、回復した棚田。 |
| `port-aerial-selection.png` | 1448x1086 | pitch S6 / LP STEP1「選ぶ」ステップカード | タイル状の区画、充電ドック、稼働中ロボが見える斜め俯瞰。`object-fit: cover` の4:3カード向け。 |

### 優先度E: ストーリー版 S11 HOPE

| ファイル | サイズ | 推奨用途 | メモ |
|---|---:|---|---|
| `hope-children-market.png` | 1672x941 | pitch-story S11「HOPE — 食で溢れる世界」背景の本命 | 食が当たり前に溢れる青空市場。子どもたちは後ろ姿で市場を駆ける日常の存在。左側に暗いコピー領域あり。 |
| `hope-children-field.png` | 1672x941 | pitch-story S11背景の代替 / LP PLANETARY再利用 | 収穫期の畑と村の日常。野菜を持つ子どもたちは後ろ姿、小型農業ロボは脇役。左側に暗い木陰あり。 |

### 優先度F: BEYONDスライド

| ファイル | サイズ | 推奨用途 | メモ |
|---|---:|---|---|
| `beyond-teleop-handoff.png` | 1448x1086 | BEYOND「農業版Airbnb=身体のシェア」カード / LP BEYOND 2040 | スマホ画面と現実の畑がつながる構図。画面内は映像のみで、文字・UI・アイコンなし。 |
| `beyond-ant-swarm.png` | 1448x1086 | BEYOND「アリ農業=手のひらの群れ」カード / LP BEYOND 2040 | レタス畝に小型ロボ群、手のひらに1台。虫ではなく機械として見える。 |
| `beyond-container-fleet.png` | 1448x1086 | BEYOND「回遊農業=栽培ユニットは船」カード / LP BEYOND 2040 | 内部の緑が透ける自律コンテナ栽培ユニットの車列。文字なしのポートゲートに入港中。 |
| `beyond-mars-farm.png` | 1448x1086 | BEYOND「火星の農場を地球から」カード / LP BEYOND 2040 | 火星の温室ドーム群と農業ローバー。月面画像の姉妹編として使える静かな構図。 |

## PORT_HERO_REQUESTS.md対応の代表ポート画像

農業版「港」としてのAgri Portを象徴する画像です。中央のソーラー充電ドック、ロボット艦隊、観測塔、タイル状圃場などを共通要素として扱っています。

| ファイル | サイズ | 推奨用途 | メモ |
|---|---:|---|---|
| `port-icon-dawn.png` | 1672x941 | LPトップヒーロー背景 / ピッチ表紙 / 代表キービジュアル | 本命候補。夜明けの谷、ソーラー屋根のドック、整列した艦隊、観測塔、ドローンが一枚で伝わる。 |
| `port-icon-aerial.png` | 1254x1254 | ポート紹介カード / アイコン的な正方形サムネイル / SNS OG補助 | 俯瞰のエンブレム型。丸いハブから区画へ道が伸びるため、「港から圃場へ出ていく」概念説明に向く。 |
| `port-icon-night.png` | 1672x941 | 24時間運用セクション / スライド間のブリッジ背景 / 夜間稼働の説明 | 夜の谷に充電ドックと観測塔の光。暗い背景なので白文字・グリーン系UIを重ねやすい。 |
| `port-icon-harbor.png` | 1672x941 | 「港」メタファー説明 / 地域ポート紹介 / 海沿い地域のビジュアル | 農業ドックと漁港を対応させる構図。Agri Portの名前の由来や港の比喩を見せたい場面に向く。 |
| `port-icon-modular.png` | 1448x1086 | 4:3のプロダクトカード / 機能一覧 / 導入パッケージ説明 | モジュール構成が最も読みやすい。ソーラー充電小屋、管制塔、水タンク、センサー、区画、ロボットをセットで見せられる。 |
| `port-icon-humanoid-gate.png` | 1672x941 | 艦隊出発のヒーロー背景 / Physical AI説明 / 「働き手が出港する」スライド | 低い視点でヒューマノイドと自律機が出発する構図。人は入れず、ロボット主体の2035年感を出せる。 |

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
