import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import { cloudflareDevProxy } from "@react-router/dev/vite/cloudflare";
import tsconfigPaths from "vite-tsconfig-paths";
import { getLoadContext } from "./load-context";

export default defineConfig({
  server: {
    port: 4444,
  },
  plugins: [
    cloudflareDevProxy({
      getLoadContext,
    }),

    reactRouter(),
    tsconfigPaths(),
  ],
  ssr: {
    noExternal: ["@0xsequence/kit", "@0xsequence/kit-wallet"],
    resolve: {
      conditions: ["workerd", "worker", "browser"],
    },
  },
  resolve: {
    mainFields: ["browser", "module", "main"],
  },
  build: {
    minify: true,
  },
});
