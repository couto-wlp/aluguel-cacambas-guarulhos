import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.centraldacacamba.com.br',
  output: 'static',
  redirects: {
    '/blog/aluguel-cacamba-entulho-guarulhos-solucao-definitiva': '/blog/guia-pratico-descarte-correto-entulho-obras',
  },
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
