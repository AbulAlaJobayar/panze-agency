// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import node from "@astrojs/node";
import vercel from "@astrojs/vercel";
import mdx from "@astrojs/mdx";
// https://astro.build/config
export default defineConfig({
  output: "server",

  adapter: vercel(),
  // adapter: vercel({
  //   webAnalytics: {
  //   
  //   },
  // }),
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react(), mdx()],
});