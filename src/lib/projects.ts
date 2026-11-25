import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * 取得已發布的專案。
 *
 * @returns 排除草稿（`draft: true`）後的專案，依 `year` 由新到舊；同一年依 `id` 排序，讓順序穩定。
 */
export async function getPublishedProjects(): Promise<CollectionEntry<'projects'>[]> {
  const projects = await getCollection('projects', (project) => !project.data.draft);
  return projects.sort((first, second) => {
    const yearDifference = second.data.year - first.data.year;
    if (yearDifference !== 0) {
      return yearDifference;
    }
    return first.id.localeCompare(second.id);
  });
}
