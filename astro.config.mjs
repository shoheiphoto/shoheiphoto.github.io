// @ts-check
import { defineConfig } from 'astro/config';

// 公開URL。独自ドメインを取ったらここを書き換えるだけでOK
export default defineConfig({
  site: 'https://shoheiphoto.github.io',
  trailingSlash: 'always',
  image: { responsiveStyles: false },
});
