import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * 取得已發佈的小語。
 *
 * @returns 排除草稿（`draft: true`）後的小語，依 `date` 由新到舊排序；同一天依檔名倒序，
 * 讓同日的 `2026-11-25-2.md` 排在 `2026-11-25.md` 前面。
 */
export async function getPublishedNotes(): Promise<CollectionEntry<'notes'>[]> {
  const notes = await getCollection('notes', (note) => !note.data.draft);
  return notes.sort((first, second) => {
    const dateDifference = second.data.date.valueOf() - first.data.date.valueOf();
    if (dateDifference !== 0) {
      return dateDifference;
    }
    return second.id.localeCompare(first.id);
  });
}
