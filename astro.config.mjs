// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://byxyz.net',

  // Static output — deploys cleanly to GitHub Pages.
  output: 'static',

  integrations: [react()],
});