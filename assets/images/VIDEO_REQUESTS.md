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

## 🥇 本命3本 ✅ 納品・組込み済み(2026-07-22): ピッチ両版LIVE DEMOパネル+LPサプライチェーン節で自動再生中

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

## 🎥 追加依頼: アプリ「ライブ観察・定点カメラ」用(2026-07-23更新)

> **更新**: 各ポート別の3本(魚沼/阿蘇/十勝)は**一旦不要**になりました。代わりに下の**10番を最優先**でお願いします。
> なお、ロボット視点タブとドローンタブには納品済みのpov-weeding/drone-scanを組込み済みです。

Webアプリのライブ観察=「自分のファームのロボットたちを見守る」画面用。ピッチ動画と違い、
**カメラは絶対に動かさない(監視カメラ/ライブ配信の画)** が最重要ルールです。

### 10. `video-cam-port-live.mp4` — 定点カメラ(最優先): 農業ロボ×ヒューマノイド×ドローンが働く風景

```
Static locked-off wide shot from a fixed surveillance camera mounted on a pole,
slightly elevated, overlooking a green vegetable farm in rural Japan on a clear
morning. The camera never moves. In the mid-ground rows, a compact autonomous
farming robot slowly drives between the crops. Closer to the camera, a sleek
white humanoid robot works steadily among the rows, bending to inspect plants
and placing harvested vegetables into a crate beside it. A drone crosses the
sky slowly in the background. Crops sway gently in the breeze, soft natural
morning light. Photorealistic, natural colors, the steady feel of a live webcam
feed. No people, no on-screen text, no logos, no camera movement.
```

意図: 「自分のファームでロボットたちが働いている」を1画面で。手前=ヒューマノイド(主役)、中景=農業ロボ、空=ドローンの3層構成。アプリのUIチップ(LIVE表示・時刻)は上から重ねるので映像は素のままで。

**この4本だけの追加仕様**:
- カメラ固定(プロンプトの "The camera never moves" が肝。動くと"映画"になってしまう)
- 画は少し高め(ポール設置のカメラ想定)・広め
- ロボットが画面をゆっくり横切る構図はループ時に「次の巡回が始まった」ように見えて好都合
- アプリ側で上下が少し切れて横長(約21:9)表示になるため、**重要な被写体は画面の上下中央**に
- タイムスタンプやRECマークは入れない(アプリのUIチップを上に重ねます)

### (取り下げ) 6〜8: 各ポート別の定点3本 — 2026-07-23の方針変更により不要

### 9. `video-cam-dusk-return.mp4` — 夕暮れの帰還(情緒枠・任意)

```
Static locked-off shot from a fixed camera at the edge of a farm field at dusk.
The camera never moves. Two small autonomous farming robots slowly drive back to
a solar charging station and dock themselves as the sky turns warm orange, their
status lights switching to a gentle slow breathing glow. Calm evening, long soft
shadows, distant mountains. Photorealistic, warm natural colors, live webcam feel.
No people, no on-screen text, no logos, no camera movement.
```

用途: 「今日もロボットたちが働いてくれた」を見せる一枚。アプリの夜間表示や、ピッチのクロージング前の"間"にも使える。

## 調整のコツ(Veo/Geminiでうまく出ない時)

- 文字やUIが出てしまう → プロンプト末尾の "No on-screen text" を "absolutely no text, no numbers, no interface elements" に強める
- 動きが速すぎる → "slow" "gentle" を動詞の前に重ねる("slowly gliding", "very slow push-in")
- ロボットのデザインが毎回変わる → 気にしなくてOK(カットが違えば違和感なし)。白/緑基調だけ守れば統一感が出ます
- 1クリップ1カメラワークが鉄則。ズーム+パン+チルトを混ぜると破綻しやすい

## 納品後の組み込み(こちらで実施)

`assets/videos/` に置いてもらえれば、`<video autoplay muted loop playsinline>` で
ピッチのLIVE DEMOパネル(現在はSVGアニメ)とアプリのカメラタブに組み込みます。
SVG版はフォールバックとして残します(動画が重い回線でも壊れないように)。
