import { getCollection, type CollectionEntry } from 'astro:content';
import type { CategoryKey } from '../consts';

/**
 * 取得已發佈的文章。
 *
 * @param category 指定分類時只回傳該分類，省略則回傳全部。
 * @returns 排除草稿（`draft: true`）後的文章，依 `date` 由新到舊排序；`date` 相同時依 `id` 排序以保持順序穩定。
 */
export async function getPublishedPosts(
  category?: CategoryKey,
): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getCollection('posts', (post) => {
    if (post.data.draft) {
      return false;
    }
    return category === undefined || post.data.category === category;
  });
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
