import { config, collection, fields } from '@keystatic/core';

// 表格會存成 Astro 無法渲染的 Markdoc 標籤、圖片儲存尚未設計，所以關閉；標題 h1 已由頁面本身使用
const markdownEditorOptions = {
  heading: [2, 3, 4],
  table: false,
  image: false,
} as const;

export default config({
  storage: import.meta.env.PROD
    ? { kind: 'github', repo: 'WinnixShih/MyBlog' }
    : { kind: 'local' },
  ui: { brand: { name: '川流不息' } },
  collections: {
    notes: collection({
      label: '小語',
      path: 'src/content/notes/*',
      slugField: 'filename',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['date'],
      schema: {
        // 只當檔名用，不寫進 frontmatter
        filename: fields.text({
          label: '檔名（日期，例 2026-11-27；同一天第二則加 -2）',
          validation: { isRequired: true },
        }),
        date: fields.date({
          label: '日期',
          validation: { isRequired: true },
          defaultValue: { kind: 'today' },
        }),
        draft: fields.checkbox({
          label: '草稿（勾選後不會出現在網站）',
          defaultValue: false,
        }),
        content: fields.markdoc({ label: '內容', extension: 'md', options: markdownEditorOptions }),
      },
    }),
    posts: collection({
      label: '文章',
      path: 'src/content/posts/*',
      slugField: 'title',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['date'],
      schema: {
        title: fields.slug({
          name: { label: '標題' },
          slug: { label: '網址代稱（英文小寫加連字號，例 rainy-day-soup）' },
        }),
        date: fields.date({
          label: '日期',
          validation: { isRequired: true },
          defaultValue: { kind: 'today' },
        }),
        description: fields.text({ label: '一句話摘要（選填）' }),
        draft: fields.checkbox({
          label: '草稿（勾選後不會出現在網站）',
          defaultValue: false,
        }),
        content: fields.markdoc({ label: '內容', extension: 'md', options: markdownEditorOptions }),
      },
    }),
    projects: collection({
      label: '專案',
      path: 'src/content/projects/*',
      slugField: 'title',
      format: { contentField: 'content' },
      columns: ['year'],
      schema: {
        title: fields.slug({
          name: { label: '名稱' },
          slug: { label: '網址代稱（英文小寫加連字號，例 my-project）' },
        }),
        description: fields.text({
          label: '一句話介紹',
          validation: { isRequired: true },
        }),
        year: fields.integer({
          label: '年份',
          validation: { isRequired: true },
        }),
        tech: fields.array(fields.text({ label: '技術' }), {
          label: '技術',
          itemLabel: (props) => props.value,
        }),
        url: fields.url({ label: '網站網址（選填）' }),
        repo: fields.url({ label: '原始碼網址（選填）' }),
        draft: fields.checkbox({
          label: '草稿（勾選後不會出現在網站）',
          defaultValue: false,
        }),
        content: fields.markdoc({ label: '內文（目前不顯示）', extension: 'md', options: markdownEditorOptions }),
      },
    }),
  },
});
