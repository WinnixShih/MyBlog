# 網頁後台發文（Keystatic）Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 網站加上 `/keystatic` 後台，本機可直接新增、修改小語、文章、專案；正式環境的 GitHub 模式設定就緒，等使用者建好 GitHub App、填好 Vercel 環境變數即可使用。

**Architecture:** 用 `@keystatic/astro` 整合注入 `/keystatic` 與 `/api/keystatic` 兩個非預先產生的路由，靠 `@astrojs/vercel` adapter 在 Vercel 函式執行；其餘頁面維持預先產生的靜態頁。表單定義在 `keystatic.config.ts`，存出的 `.md` 與 `src/content.config.ts` 的 schema 一致。開發時用 `local` 儲存，正式 build 用 `github` 儲存。

**Tech Stack:** Astro 7、@keystatic/core 0.6、@keystatic/astro 6、@astrojs/react 7、React 19、@astrojs/vercel 11

**Spec:** `docs/superpowers/specs/2026-11-27-keystatic-admin-design.md`

## Global Constraints

- 個人 repo，commit 不帶 Jira 單號；在 feature branch `feat/keystatic-admin` 上做，不 push
- 存檔格式為 `.md`（`fields.markdoc({ extension: 'md' })`），不是 `.mdoc`
- 日期存成 `YYYY-MM-DD`
- 既有內容檔（`src/content/**`）不得為了配合後台而修改格式
- `src/content.config.ts` 的 schema 不改，後台去配合它
- 正式 repo：`WinnixShih/MyBlog`
- 部落格頁面（`/`、`/notes/`、`/projects/`、`/about/`、`/posts/*`、404）必須維持預先產生的靜態頁
- 後台入口不放進導覽列
- 不設定、不 commit 任何 GitHub App 金鑰；`.env` 不進 git

## Review Focus

1. 選填欄位留空（文章 `description`、專案 `url`／`repo`／`tech`）存檔後，build 不能因 schema 驗證失敗 → Task 4 驗收
2. 加了 adapter 後，部落格頁面仍是靜態檔，不會變成每次請求才產生 → Task 1 Step 4
3. 小語的檔名欄位（slugField）不能多寫進 frontmatter，或寫進去也不影響 schema → Task 4 驗收檢查產生的檔案
4. 正式環境還沒設環境變數時，部落格頁面照常運作，只有 `/keystatic` 無法使用 → Task 3 Step 3
5. 後台讀得到所有既有內容（含 `draft: true` 的範例），不會有讀取錯誤 → Task 2 Step 3

## Commit 規劃

| Commit | 內容 | 涵蓋任務 |
|---|---|---|
| 1. `docs: 新增網頁後台發文的設計與實作規劃` | spec、plan、README 後台說明 | Task 3 的 README 部分＋本文件 |
| 2. `feat: 新增 Keystatic 網頁後台` | 套件、astro 設定、`keystatic.config.ts`、`.gitignore` | Task 1–3 |

---

### Task 1: 安裝套件並接上後台（只有小語）

**Files:**
- Modify: `package.json`、`package-lock.json`（npm install 產生）
- Modify: `astro.config.mjs`
- Create: `keystatic.config.ts`
- Modify: `.gitignore`（加 `.vercel/`）

**Interfaces:**
- Produces: `keystatic.config.ts` 預設匯出 `config({ storage, collections: { notes } })`，Task 2 在同一個 `collections` 加 `posts`、`projects`

- [ ] **Step 1: 安裝套件**

Run: `npm install @keystatic/core @keystatic/astro @astrojs/react @astrojs/vercel react react-dom`
Expected: 安裝成功，沒有 peer dependency 錯誤（`@keystatic/astro` 的 peer 是 `astro: 5 || 6 || 7`）

- [ ] **Step 2: `astro.config.mjs` 加上 `integrations: [react(), keystatic()]` 與 `adapter: vercel()`**

不設定 `output`（維持預設 static，後台路由由整合自己標成非預先產生）。

- [ ] **Step 3: 建 `keystatic.config.ts`，先只定義 `notes`**

- `storage: { kind: 'local' }`
- `ui.brand.name: '川流不息'`
- `notes`：`label: '小語'`、`path: 'src/content/notes/*'`、`format: { contentField: 'content' }`、`entryLayout: 'content'`、`columns: ['date']`
  - `slugField: 'filename'`，`filename` 用 `fields.text`，標籤「檔名（日期，例 2026-11-27；同一天第二則加 -2）」。用 text 而不是 `fields.slug`：`fields.slug` 會把「名稱」寫進 frontmatter，text 當 slugField 時值只當檔名（Task 4 Step 2 驗證）
  - `date`：`fields.date`，必填，`defaultValue: { kind: 'today' }`
  - `draft`：`fields.checkbox`，標籤「草稿（勾選後不會出現在網站）」，預設 `false`
  - `content`：`fields.markdoc({ label: '內容', extension: 'md' })`

- [ ] **Step 4: 驗證 build 與靜態頁**

Run: `npm run build`
Expected: build 成功；`.vercel/output/static/` 底下有 `index.html`、`notes/index.html`、`projects/index.html`、`about/index.html`、`posts/hello-world/index.html`、`404.html`（部落格頁仍為靜態檔）

- [ ] **Step 5: 驗證開發伺服器上的後台**

Run: 開發伺服器重啟後（`npx astro dev stop`、`npx astro dev --background`），請求 `http://127.0.0.1:4321/keystatic` 與 `http://127.0.0.1:4321/notes/`
Expected: 兩者都回 200（整合會把 dev host 設成 `127.0.0.1`）

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json astro.config.mjs keystatic.config.ts .gitignore
git commit -m "feat: 接上 Keystatic 後台並定義小語表單"
```

### Task 2: 文章與專案表單

**Files:**
- Modify: `keystatic.config.ts`

**Interfaces:**
- Consumes: Task 1 的 `keystatic.config.ts`

- [ ] **Step 1: 加 `posts`**

`label: '文章'`、`path: 'src/content/posts/*'`、`format: { contentField: 'content' }`、`entryLayout: 'content'`、`columns: ['date']`、`slugField: 'title'`
- `title`：`fields.slug({ name: { label: '標題' }, slug: { label: '網址代稱（英文小寫加連字號，例 rainy-day-soup）' } })`
- `date`：`fields.date`，必填，預設今天
- `description`：`fields.text`，標籤「一句話摘要（選填）」
- `draft`：同小語
- `content`：同小語

- [ ] **Step 2: 加 `projects`**

`label: '專案'`、`path: 'src/content/projects/*'`、`format: { contentField: 'content' }`、`slugField: 'title'`、`columns: ['year']`
- `title`：`fields.slug`（名稱＋英文代稱）
- `description`：`fields.text`，必填
- `year`：`fields.integer`，必填
- `tech`：`fields.array(fields.text({ label: '技術' }), { label: '技術', itemLabel: (props) => props.value })`
- `url`、`repo`：`fields.url`，選填
- `draft`：同小語
- `content`：`fields.markdoc({ label: '內文（目前不顯示）', extension: 'md' })`

- [ ] **Step 3: 用 Keystatic reader 讀一次所有既有內容**

在 `.superpowers/keystatic-check.mts`（已被 git 忽略）寫一個腳本：`createReader(process.cwd(), config)`，對三個 collection 各呼叫 `all()`，印出每個 collection 的筆數與 slug。
Run: `node .superpowers/keystatic-check.mts`
Expected: `notes` 1 筆（`2026-11-26`）、`posts` 2 筆（`draft-example`、`hello-world`）、`projects` 1 筆（`example`），沒有錯誤

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: 成功

- [ ] **Step 5: Commit**

```bash
git add keystatic.config.ts
git commit -m "feat: 後台加上文章與專案表單"
```

### Task 3: 正式環境改用 GitHub 儲存＋README

**Files:**
- Modify: `keystatic.config.ts`
- Modify: `README.md`

- [ ] **Step 1: storage 依環境切換**

`storage: import.meta.env.PROD ? { kind: 'github', repo: 'WinnixShih/MyBlog' } : { kind: 'local' }`

- [ ] **Step 2: README 新增「網頁後台」一節**

內容：入口網址（本機 `http://127.0.0.1:4321/keystatic`、正式 `https://my-blog-seven-sand.vercel.app/keystatic`）；本機存檔直接改檔案、正式存檔會 commit 到 `main` 並自動部署；正式環境需要的四個環境變數名稱 `KEYSTATIC_GITHUB_CLIENT_ID`、`KEYSTATIC_GITHUB_CLIENT_SECRET`、`KEYSTATIC_SECRET`、`PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`，以及「第一次設定照 Keystatic 引導建立 GitHub App，再把值填到 Vercel」。專案結構表加 `keystatic.config.ts`。

- [ ] **Step 3: Build 並確認沒有金鑰也能 build**

Run: `npm run build`（不設任何 `KEYSTATIC_*` 環境變數）
Expected: 成功，靜態頁同 Task 1 Step 4

- [ ] **Step 4: Commit**

```bash
git add keystatic.config.ts README.md
git commit -m "feat: 正式環境後台改存到 GitHub"
```

### Task 4: 本機驗收（主 session 用瀏覽器做）

- [ ] **Step 1:** 開發伺服器上打開 `/keystatic`，三個 collection 都列得出既有內容
- [ ] **Step 2:** 新增一則小語（檔名 `2099-01-01`），檢查 `src/content/notes/2099-01-01.md`：副檔名 `.md`、frontmatter 只有 `date`（與 `draft`），日期為 `YYYY-MM-DD`
- [ ] **Step 3:** 新增一篇文章，`description` 留空；新增一個專案，`url`、`repo`、`tech` 留空；`npm run build` 成功，並確認 `/notes/` 出現測試小語
- [ ] **Step 4:** 刪掉三筆測試內容，確認 `git status` 中 `src/content/` 沒有殘留

### Task 5: 自我 review＋依使用者決定修正

- [ ] 對整個分支做自我 review，列出問題跟使用者討論後修正

### Task 6: 整理 commit

- [ ] 確認未 push，`git reset --soft main`，依「Commit 規劃」做成兩顆 commit，再跑一次 `npm run build`
