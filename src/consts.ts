/** 網站標題，顯示於頁首與 `<title>`。 */
export const SITE_TITLE = '川流不息';

/** 作者名稱。 */
export const AUTHOR = 'Chuan';

/** 網站描述，頁面未自訂 description 時作為預設的 `<meta name="description">`。 */
export const SITE_DESCRIPTION = '記錄生活裡流過的日子。';

/** 簡短的自我介紹，顯示於側欄（所有有側欄的頁面）。 */
export const ABOUT_SHORT = '喜歡記錄生活的人，偶爾寫寫興趣和正在做的東西。';

/** 作者的 GitHub 個人頁網址，顯示於關於頁的聯絡方式。 */
export const GITHUB_URL = 'https://github.com/WinnixShih';

/** 頁首導覽列的連結，依陣列順序顯示。 */
export const NAV_LINKS = [
  { label: '小語', href: '/notes/' },
  { label: '文章', href: '/' },
  { label: '專案', href: '/projects/' },
  { label: '關於', href: '/about/' },
] as const;
