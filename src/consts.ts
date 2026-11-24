/** 網站標題，顯示於頁首與 `<title>`。 */
export const SITE_TITLE = '川流不息';

/** 作者名稱。 */
export const AUTHOR = 'Chuan';

/** 網站描述，頁面未自訂 description 時作為預設的 `<meta name="description">`。 */
export const SITE_DESCRIPTION = '記錄生活裡流過的日子。';

/** 簡短的自我介紹，顯示於側欄（所有有側欄的頁面）與關於頁。 */
export const ABOUT_SHORT = '喜歡記錄生活的人，偶爾寫寫興趣和正在做的東西。';

/**
 * 文章分類定義。key 為文章 frontmatter 的 `category` 值，
 * `label` 為顯示名稱，`color` 為該分類的代表色。
 */
export const CATEGORIES = {
  life: { label: '生活', color: '#b5482f' },
  hobby: { label: '興趣', color: '#2f6a8a' },
} as const;

/** 分類 key 的聯集型別（`'life' | 'hobby'`）。 */
export type CategoryKey = keyof typeof CATEGORIES;
