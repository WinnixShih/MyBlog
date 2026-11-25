import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * 取得已發佈的文章。
 *
 * @returns 排除草稿（`draft: true`）後的文章，依 `date` 由新到舊排序；`date` 相同時依 `id` 排序以保持順序穩定。
 */
export async function getPublishedPosts(): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getCollection('posts', (post) => !post.data.draft);
  return posts.sort((first, second) => {
    const dateDifference = second.data.date.valueOf() - first.data.date.valueOf();
    if (dateDifference !== 0) {
      return dateDifference;
    }
    return first.id.localeCompare(second.id);
  });
}

/**
 * 將日期格式化為 `YYYY.MM.DD`。
 *
 * @param date 要格式化的日期。
 * @returns 格式化字串；以 UTC 取值，避免 frontmatter 的純日期因時區而差一天。
 */
export function formatDate(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}
