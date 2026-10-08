import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.centraldacacamba.com.br',
  output: 'static',
  integrations: [
    tailwind(),
    sitemap()
  ],
  compressHTML: true,
  image: {
    domains: ['www.centraldacacamba.com.br'],
  },
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssCodeSplit: true,
      minify: 'esbuild',
      chunkSizeWarningLimit: 1000,
    }
  }
});
