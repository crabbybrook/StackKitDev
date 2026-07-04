// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap'
import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';


import cloudflare from '@astrojs/cloudflare';


// https://astro.build/config
export default defineConfig({
  site: 'https://stackkitdev.com',
  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },

  devToolbar: {
    enabled: false
  },

  adapter: cloudflare()
});