import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORIES, type CategoryKey } from './consts';

const categoryKeys = Object.keys(CATEGORIES) as [CategoryKey, ...CategoryKey[]];

const posts = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/posts',
    // id 一律取自檔案路徑：frontmatter 的 `slug` 不可改變網址（網址 = 檔名）。
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(categoryKeys),
    description: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
