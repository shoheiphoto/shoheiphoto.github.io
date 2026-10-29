# sh-photo ポートフォリオ

Astro で作った静的サイトです。

## 動かし方

Astro は Node.js 22 以上が必要です。このプロジェクトでは Node.js 22 を開発用パッケージとして同梱しているので、
**パソコン本体の Node.js（仕事用の環境など）を入れ替える必要はありません。**
`npm run ...` で実行したときだけ、プロジェクト内の Node.js 22 が使われます。

パッケージのインストールは、`npm install` ではなく `npm run setup` を使ってください。
Node.js 20 のまま `npm install` すると、Node.js 22 向けの部品（rolldown のネイティブバイナリ）が入らず起動できません。

```bash
npm run setup    # 初回・パッケージ更新時（npm install の代わりにこちらを使う）
npm run dev      # http://localhost:4321 で確認
npm run build    # dist/ に公開用ファイルを書き出し
```

## 作品の追加方法

1. `src/content/works/` に作品用のフォルダを作る（フォルダ名がURLになる。半角英数字とハイフン推奨）
2. その中に写真（jpg / png / webp）を入れる。**ファイル名順**に表示される（`01.jpg`, `02.jpg` …）
3. 同じフォルダに `index.md` を作る（`templates/index.md` をコピーして書き換えると簡単。各項目の説明もそこに書いてあります）

```markdown
---
title: "Meiousei Artist photo"   # 作品名（必須）
date: 2025-03-01                 # 並び順と表示年に使う（必須）
tags: [music, artist]            # 分類（任意）
summary: "京都のバンド Meiousei のアーティスト写真。"  # 冒頭の説明（任意）
links:                           # 関連リンク（任意）
  - label: "アーティスト情報"
    url: "https://example.com"
cover: 03.jpg                    # 一覧のサムネイル（省略時は1枚目）
layout: stack                    # stack=縦に1枚ずつ / grid=2列
draft: false                     # true にすると公開されない
---

ここに本文を書くと、作品ページの説明の下に表示されます（任意）。
```

写真は書き出し前に長辺 2400px 程度にしておけば十分です。表示サイズごとの縮小・WebP変換はビルド時に自動で行われます。

## 主なファイル

| ファイル | 役割 |
|---|---|
| `src/site.config.ts` | サイト名・SNS・お問い合わせフォームの送信先 |
| `src/styles/global.css` | デザイン全体（色・文字・余白は冒頭の変数で調整） |
| `src/content.config.ts` | 作品データの項目定義 |
| `src/pages/` | 各ページ（トップ / 作品 / About / Contact） |
| `src/assets/profile.jpg` | About のプロフィール写真 |
