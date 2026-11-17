import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: trocar pelo domínio definitivo antes de publicar
export default defineConfig({
  site: 'https://nalupizzas.com.br',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'always' },
});
