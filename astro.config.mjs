import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://delord.dev',
  redirects: {
    '/research': '/notes',
    '/essays': '/notes',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/grimoire'),
    }),
  ],
});
