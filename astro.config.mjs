import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.centraldacacamba.com.br',
  output: 'static',
  // Keep generated URLs aligned with Vercel's cleanUrls/trailingSlash settings.
  trailingSlash: 'never',
  redirects: {
    '/blog/aluguel-cacamba-entulho-guarulhos-solucao-definitiva': '/guia-pratico-para-descarte-correto-de-entulho-em-obras',
    '/blog/guia-pratico-descarte-correto-entulho-obras': '/guia-pratico-para-descarte-correto-de-entulho-em-obras',
    '/blog/guia-pratico-para-descarte-correto-de-entulho-em-obras': '/guia-pratico-para-descarte-correto-de-entulho-em-obras',
    '/guia-pratico-descarte-correto-entulho-obras': '/guia-pratico-para-descarte-correto-de-entulho-em-obras',
  },
  integrations: [
    tailwind(),
    sitemap({
      // Redirect-only routes must not be advertised as indexable URLs.
      filter: (page) => {
        const pathname = new URL(page).pathname.replace(/\/$/, '') || '/';
        return !new Set([
          '/politica-de-privacidade',
          '/termos-de-uso',
        ]).has(pathname);
      },
    })
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
