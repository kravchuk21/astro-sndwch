import { defineConfig } from 'astro/config';
import solidJs from '@astrojs/solid-js';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify/functions';

// https://astro.build/config
export default defineConfig({
	site: 'https://astro-frontend-masters.netlify-kravchuk.app',
	output: 'hybrid',
	experimental: {
		hybridOutput: true,
	},
	integrations: [
		react({include: ['**/react/*']}), 
		solidJs({include: ['**/solid/*'],})
	],
	adapter: netlify(),
});
