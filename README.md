# 川流不息

Chuan 的個人部落格，放短短的小語、長篇的文章，還有自己做的專案。

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

## 網站分區

| 分區 | 網址 | 內容 | 檔案位置 |
| :-- | :-- | :-- | :-- |
| 小語 | `/notes/` | 短篇：每日小語、今天學到的小知識，全文直接列出 | `src/content/notes/` |
| 文章 | `/`（首頁） | 長篇：閱讀心得、近期想法、學新東西的紀錄 | `src/content/posts/` |
| 專案 | `/projects/` | 自己做的專案，連到專案網頁與原始碼 | `src/content/projects/` |

## 寫小語

在 `src/content/notes/` 新增一個 `.md` 檔，檔名用日期，例如 `2026-11-26.md`；同一天第二則用 `2026-11-26-2.md`。

```md
---
date: 2026-11-26
---

今天想說的幾句話。
```

- `date`：日期，必填，格式為 `YYYY-MM-DD`；小語依此欄位由新到舊排序，同一天依檔名倒序。
- `draft`：設成 `true` 就是草稿，選填。

每則小語在頁面上有自己的錨點，例如 `/notes/#2026-11-26`，可以單獨分享。

## 寫新文章

在 `src/content/posts/` 新增一個 `.md` 檔。檔名用英文小寫加連字號，例如 `rainy-day-soup.md`，會變成網址 `/posts/rainy-day-soup/`。

檔案開頭加上 frontmatter：

```md
---
title: 下雨天的湯
date: 2026-11-23
description: 一句話摘要（選填）。
draft: false
---

文章內容從這裡開始。
```

欄位說明：

- `title`：文章標題，必填。
- `date`：發佈日期，必填，格式為 `YYYY-MM-DD`；文章依此欄位由新到舊排序。
- `description`：一句話摘要，選填。
- `draft`：設成 `true` 就是草稿，不會出現在網站上，選填，預設為 `false`。

## 加專案

複製 `src/content/projects/example.md`，改成自己的專案內容，並刪掉 `draft: true`。

- `title`、`description`、`year`：名稱、一句話介紹、年份，必填。
- `tech`：用到的技術，選填，例如 `[Astro, TypeScript]`。
- `url`、`repo`：專案網頁與 GitHub 網址，選填，沒有就整行刪掉。

專案本身建議各自一個 repo、各自部署，這裡只放連結。

## 專案結構

| 路徑 | 用途 |
| :-- | :-- |
| `src/content/` | 小語、文章、專案的 Markdown 檔 |
| `src/pages/` | 各頁面與路由（首頁、小語、文章、專案、關於、404） |
| `src/components/` | 共用元件（側欄、文章列表） |
| `src/layouts/` | 頁面版型 |
| `src/lib/` | 讀取與排序小語、文章、專案的工具函式 |
| `src/styles/` | 全站 CSS |
| `src/consts.ts` | 網站標題、作者、導覽列等常數 |
| `public/` | 靜態檔案（favicon 等） |
| `docs/superpowers/` | 設計文件與實作規劃 |

## 之後的計畫

- 文章標籤（閱讀、烹飪等主題）
- 照片排版
- 字體
- 後端功能（例如留言）
- 自訂網域
