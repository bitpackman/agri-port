# Agri Port 動画リクエスト(Gemini / Veo 向けプロンプト)

LIVE DEMOスライドとサイトの臨場感を上げるための短尺動画です。ご指定どおり
**①ロボット視点 ②ドローン視点 ③ヒューマノイド稼働(農作業〜配送)** の3本柱+予備2本。

## 共通仕様(全クリップ)

- **16:9 / 5〜8秒 / 横位置**。ループ再生前提なので、**カメラの動きが一定方向に流れ続ける画**(滑走・上昇など)を選ぶとループの継ぎ目が目立ちません
- **画面内に文字・ロゴ・字幕・UIを絶対に入れない**(動画AIの文字は崩れるため。HUD風の枠はサイト側でCSSを重ねます)
- 人の顔は写さない(後ろ姿・遠景はOK)
- 色調は既存画像と同じ「ディープグリーン×アンバー、朝夕の斜光」
- 音声は不要(muted autoplayで使用)
- 納品: MP4(H.264)を `assets/videos/` へ。1本8MB以下目安(1080p or 720p)

プロンプトは英語が本文(Veoは英語が安定)、日本語は意図の説明です。うまく出ない時は末尾の「調整のコツ」を参照。

---

## 🥇 本命3本

### 1. `video-pov-weeding.mp4` — ロボット視点(除草)
**用途**: ピッチ両版 LIVE DEMO 左パネル / アプリ「ロボット視点」タブの差し替え候補

```
Low POV camera mounted on a small autonomous farming robot, gliding slowly and
steadily forward between rows of young green rice plants in a Japanese terraced
paddy field at golden sunrise. Camera height about 40cm above the soil. Dew on
the leaves, soft mist over background mountains. A small robotic arm briefly
enters the frame from below and precisely plucks out a single weed, soil crumbs
falling. Photorealistic, cinematic, shallow depth of field, smooth stabilized
forward motion like a nature documentary. No people, no on-screen text, no logos.
```

意図: 「AIが畑をどう見ているか」の一人称。前進し続ける画なのでループに強い。雑草を掴む腕は1回だけ・さりげなく。

### 2. `video-drone-scan.mp4` — ドローン視点(生育スキャン)
**用途**: ピッチ両版 LIVE DEMO 右パネル / アプリ「ドローンNDVI」タブの差し替え候補

```
Aerial drone shot slowly rising and tilting down over lush green terraced rice
paddies in rural Japan at early morning. A translucent holographic grid of soft
green light sweeps across the fields below like a scanning beam, briefly
highlighting one small patch with a warm amber glow. Photorealistic landscape
with subtle sci-fi light effects, cinematic color grade in deep green and warm
amber, smooth continuous camera motion. No text, no people, no logos.
```

意図: 「艦隊が毎日、畑を検証している」の画。光のグリッド=スキャンの表現はVeoが得意。琥珀色に光る一角が「生育ムラ検出」の暗喩。

### 3. `video-humanoid-packhouse.mp4` — ヒューマノイド稼働(選果〜配送)
**用途**: ピッチのビジネス/サプライチェーン文脈 / LPサプライチェーン節 / アプリのトラッキングUI付近

```
Inside a bright modern farm packhouse, a sleek white humanoid robot carefully
picks ripe cherry tomatoes from a green harvest crate and places them into small
cardboard delivery boxes moving on a conveyor. In the background through a large
open door, another humanoid robot loads stacked boxes onto a small autonomous
delivery vehicle, green fields and a greenhouse visible outside. Gentle precise
hand movements, morning light, photorealistic, shallow depth of field.
No text, no human faces, no logos.
```

意図: ご指定の「農業・配送などに加わっている」を1カットで — 手前=選果・箱詰め、奥=配送車への積み込み。48時間サプライチェーンの画。

---

## 🥈 予備2本(余力があれば)

### 4. `video-port-hero.mp4` — ポート全景(タイトル/ヒーロー背景ループ)

```
Slow cinematic dolly shot across a misty Japanese mountain valley at dawn.
Terraced rice paddies and vegetable fields are worked by a small fleet of green
autonomous farming robots and a driverless tractor, two drones crossing the
golden sky, a solar charging station on a ridge. Warm sunrise light, epic yet
peaceful photorealistic nature cinematography, continuous slow lateral motion.
No text, no people, no logos.
```

### 5. `video-tanaka-valley.mp4` — ストーリー版S2用(田中さんの谷)

```
An elderly Japanese farmer seen only from behind, standing at the edge of a
terraced rice paddy at dawn, looking across a valley where some terraces are
neatly tended and others are overgrown with wild brush. Gentle morning mist,
a light breeze moves the rice stalks, quiet contemplative documentary tone,
photorealistic, warm muted colors, very slow push-in camera. Face never visible.
No text, no logos.
```

---

## 調整のコツ(Veo/Geminiでうまく出ない時)

- 文字やUIが出てしまう → プロンプト末尾の "No on-screen text" を "absolutely no text, no numbers, no interface elements" に強める
- 動きが速すぎる → "slow" "gentle" を動詞の前に重ねる("slowly gliding", "very slow push-in")
- ロボットのデザインが毎回変わる → 気にしなくてOK(カットが違えば違和感なし)。白/緑基調だけ守れば統一感が出ます
- 1クリップ1カメラワークが鉄則。ズーム+パン+チルトを混ぜると破綻しやすい

## 納品後の組み込み(こちらで実施)

`assets/videos/` に置いてもらえれば、`<video autoplay muted loop playsinline>` で
ピッチのLIVE DEMOパネル(現在はSVGアニメ)とアプリのカメラタブに組み込みます。
SVG版はフォールバックとして残します(動画が重い回線でも壊れないように)。
