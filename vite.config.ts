import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import { cloudflareDevProxy } from "@react-router/dev/vite/cloudflare";
import tsconfigPaths from "vite-tsconfig-paths";
import { getLoadContext } from "./load-context";
import { envOnlyMacros } from "vite-env-only";
export default defineConfig({
  server: {
    port: 4444,
  },
  plugins: [
    cloudflareDevProxy({
      getLoadContext,
    }),
    envOnlyMacros(),
    reactRouter(),
    tsconfigPaths(),
  ],
  ssr: {
    noExternal: [
      "@0xsequence/kit",
      "@0xsequence/kit-wallet",
      "@0xsequence/kit-checkout",
    ],
    resolve: {
      conditions: ["workerd", "worker", "browser"],
    },
  },
  optimizeDeps: {
    exclude: ["@0xsequence/kit-checkout"],
  },
  resolve: {
    mainFields: ["browser", "module", "main"],
  },
  build: {
    minify: true,
  },
});
