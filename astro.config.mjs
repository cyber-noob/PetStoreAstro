import { defineConfig } from 'astro/config';
import node from "@astrojs/node";
import proxyMiddleware from './plugins/proxy-middleware.mjs';
import react from "@astrojs/react";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  integrations: [
    // proxyMiddleware("/payment_proxy", {
    //   target: "https://api.razorpay.com",
    //   changeOrigin: true,
    //   pathRewrite: {
    //     "/payment_proxy": "",
    //   },
    // }),

    proxyMiddleware("/petstore_proxy", {
      target: "http://localhost:8082",
      changeOrigin: true,
      pathRewrite: {
        "/petstore_proxy": "",
      },

      targetProxyMap: {
        "https://api.razorpay.com": {
          "/payment_proxy": "",
        },
        "http://localhost:8082": {
          "/petstore_proxy": "",
        },
      },
    }),

    react(),
    vue(),
  ],
});