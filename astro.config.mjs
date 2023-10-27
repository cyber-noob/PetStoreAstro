import { defineConfig } from 'astro/config';
import node from "@astrojs/node";
import proxyMiddleware from './plugins/proxy-middleware.mjs';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "server",

  adapter: node({
    mode: "standalone",
  }),

  integrations: [
    proxyMiddleware("/payment_proxy", {
      target: "https://api.razorpay.com",
      changeOrigin: true,
      pathRewrite: {'/payment_proxy': ''}
    }),

	react(),
  ],
});