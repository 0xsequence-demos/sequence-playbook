import { defineConfig } from "vite";
import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin,
} from "@remix-run/dev";
import tsconfigPaths from "vite-tsconfig-paths";
import { getLoadContext } from "./load-context";
import { flatRoutes } from "remix-flat-routes";

declare module "@remix-run/cloudflare" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  server: {
    port: 4444,
  },
  plugins: [
    cloudflareDevProxyVitePlugin({
      getLoadContext,
    }),
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
      routes: async (defineRoutes) => {
        return flatRoutes("routes", defineRoutes);
      },
    }),
    tsconfigPaths(),
  ],
  ssr: {
    noExternal: ["@0xsequence/kit"],
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
