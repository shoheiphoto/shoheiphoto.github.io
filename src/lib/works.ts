import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';

// 作品フォルダ内の画像をまとめて読み込む（ファイル名順に並ぶ）
const files = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/works/*/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG}',
  { eager: true },
);

export type Photo = { file: string; image: ImageMetadata };

export function photosOf(id: string): Photo[] {
  return Object.entries(files)
    .filter(([path]) => path.split('/').at(-2) === id)
    .map(([path, mod]) => ({ file: path.split('/').at(-1)!, image: mod.default }))
    .sort((a, b) => a.file.localeCompare(b.file, 'ja', { numeric: true }));
}

export function coverOf(work: CollectionEntry<'works'>): Photo | undefined {
  const photos = photosOf(work.id);
  return photos.find((p) => p.file === work.data.cover) ?? photos[0];
}

// 公開する作品を新しい順に
export async function getWorks() {
  const all = await getCollection('works', ({ data }) => !data.draft);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
