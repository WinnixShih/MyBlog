# 網頁後台發文（Keystatic）設計

## 目的

現在發小語、文章都要在電腦上寫 Markdown、commit、push。目標是在網頁（含手機）填表單、按儲存就能發布，不用碰 git。

## 目標

- 網站多一個後台 `/keystatic`，可以新增、修改、刪除小語、文章、專案
- 存檔就發布：後台 commit 到 GitHub `main`，Vercel 自動部署，約一分鐘上線
- 只有對 `WinnixShih/MyBlog` 有寫入權限的 GitHub 帳號能存檔
- 存出來的檔案格式與現在手寫的一致，既有內容不用改；用 VS Code 手寫照樣可以

## 不做（這一版）

- 自建資料庫或發文 API：內容繼續放 Git，資料庫留給留言、按讚等訪客產生的資料
- 存檔後即時上線（不經部署）：一分鐘的部署時間可以接受
- 先存草稿分支、審核後才合併的流程：用既有的 `draft: true` 欄位當草稿

## 做法選擇

| 做法 | 取捨 | 結果 |
|---|---|---|
| A. Git 後台（Keystatic） | 不需資料庫、網站維持靜態、內容有版本紀錄；上線要等一次部署 | **採用** |
| B. 外部內容平台（Notion、Sanity） | 寫作介面好；內容放在對方平台、要串 API、受免費額度限制 | 不採用 |
| C. 自建 API＋資料庫 | 即時上線、可練後端；要自己做登入驗證與防護，網站要改成動態頁 | 不採用，後端留給留言等功能 |

使用者選 A。

## 身分驗證

Keystatic 不自己管帳號，交給 GitHub：

1. 後台用 GitHub 登入（OAuth，透過一個 GitHub App）
2. 存檔時以登入者的身分呼叫 GitHub 建立 commit
3. GitHub 判斷登入者對 repo 有沒有寫入權限，沒有就拒絕

網站不存任何帳號密碼，也沒有長期有效的 repo 寫入金鑰；環境變數只放 GitHub App 的設定。

## 架構變動

- 新增套件：`@keystatic/core`、`@keystatic/astro`、`@astrojs/react`、`react`、`react-dom`、`@astrojs/vercel`（版本確認相容 Astro 7）
- `astro.config.mjs`：加上 React、Keystatic、Vercel adapter。部落格頁面維持預先產生的靜態頁，只有後台與它的 API 在 Vercel 函式上執行
- 新增 `keystatic.config.ts`：定義三種內容的表單
- 儲存模式：本機開發用 `local`（直接改本機檔案），正式環境用 `github`

## 表單欄位（對應現有 frontmatter）

| 內容 | 位置 | 欄位 | 檔名 |
|---|---|---|---|
| 小語 | `src/content/notes/` | `date`、`draft`、內文 | 日期，例 `2026-11-27`；同一天第二則 `2026-11-27-2` |
| 文章 | `src/content/posts/` | `title`、`date`、`description`、`draft`、內文 | 另填英文網址代稱，例 `rainy-day-soup` |
| 專案 | `src/content/projects/` | `title`、`description`、`year`、`tech`、`url`、`repo`、`draft` | 英文代稱 |

存成 `.md`（不是 Keystatic 預設的 `.mdoc`），日期存成 `YYYY-MM-DD`，跟 `src/content.config.ts` 的 schema 一致。

## 上線步驟

1. 本機：`local` 模式在開發伺服器上試新增、修改，確認產生的檔案與 build 正常
2. 正式：切成 `github` 模式，第一次開後台時照引導建立 GitHub App，取得 `KEYSTATIC_GITHUB_CLIENT_ID`、`KEYSTATIC_GITHUB_CLIENT_SECRET`、`KEYSTATIC_SECRET`、`PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`，填進 Vercel 環境變數（這步需要使用者操作）
3. 在正式網站後台發一則小語，確認一分鐘內上線

## 留給實作的細節

- 小語檔名欄位要不要預設今天日期，視 Keystatic 欄位能力決定
- 後台介面語言、列表顯示哪些欄位
