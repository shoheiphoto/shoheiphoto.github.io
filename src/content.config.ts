import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * 作品(works)コレクション
 * src/content/works/<作品のフォルダ名>/index.md を1作品として読み込む。
 * フォルダ名がそのままURLになる（例: /works/meiousei/）
 */
const works = defineCollection({
  loader: glob({
    pattern: '*/index.md',
    base: './src/content/works',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),               // 並び順と年の表示に使う
    tags: z.array(z.string()).default([]),
    summary: z.string().optional(),      // 作品ページ冒頭の短い説明
    links: z.array(z.object({ label: z.string(), url: z.string().url() })).default([]),
    cover: z.string().optional(),        // 一覧のサムネイルにする写真のファイル名（省略時は1枚目）
    layout: z.enum(['stack', 'grid', 'rows']).default('stack'), // 写真の並べ方
    perRow: z.number().int().min(1).max(6).default(3),   // rows のとき1段に並べる枚数
    rows: z.array(z.number().int().min(1).max(6)).optional(), // rows の段ごとの枚数を個別指定（例: [3, 3, 2]）
    draft: z.boolean().default(false),   // true にすると公開しない
  }),
});

export const collections = { works };
