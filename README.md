# 川流不息

Chuan 的個人部落格，記錄生活、興趣與自己的專案。

## 網站

https://my-blog-seven-sand.vercel.app

部署在 Vercel，連結 GitHub 後，push 到 `main` 會自動部署。之後會搬到自己的網域。

## 技術

- Astro 7
- 純 CSS
- Markdown 文章

## 本機開發

需要 Node.js `>=22.23.4`。

```sh
npm install
npm run dev
npm run build
npm run preview
```

- `npm run dev`：啟動開發伺服器，網址為 http://localhost:4321
- `npm run build`：建置正式版，輸出到 `dist/`
- `npm run preview`：在本機預覽建置後的結果

## 寫新文章

在 `src/content/posts/` 新增一個 `.md` 檔。檔名用英文小寫加連字號，例如 `rainy-day-soup.md`，會變成網址 `/posts/rainy-day-soup/`。

檔案開頭加上 frontmatter：

```md
---
title: 下雨天的湯
date: 2026-11-23
category: life
description: 一句話摘要（選填）。
draft: false
---

文章內容從這裡開始。
```

欄位說明：

- `title`：文章標題，必填。
- `date`：發佈日期，必填，格式為 `YYYY-MM-DD`；文章依此欄位由新到舊排序。
- `category`：分類代碼，必填。
- `description`：一句話摘要，選填。
- `draft`：設成 `true` 就是草稿，不會出現在網站上，選填，預設為 `false`。

分類代碼對照（定義在 `src/consts.ts`）：

| 代碼 | 名稱 |
| :-- | :-- |
| `life` | 生活 |
| `hobby` | 興趣 |

## 專案結構

| 路徑 | 用途 |
| :-- | :-- |
| `src/content/posts/` | 文章，每篇一個 Markdown 檔 |
| `src/pages/` | 各頁面與路由（首頁、關於、文章、分類、404） |
| `src/components/` | 共用元件（側欄、文章列表） |
| `src/layouts/` | 頁面版型 |
| `src/lib/` | 文章讀取與整理的工具函式 |
| `src/styles/` | 全站 CSS |
| `src/consts.ts` | 網站標題、作者、分類等常數 |
| `public/` | 靜態檔案（favicon 等） |
| `docs/superpowers/` | 設計文件與實作規劃 |

## 之後的計畫

- 專案頁
- 照片排版
- 字體
- 後端功能（例如留言）
- 自訂網域
