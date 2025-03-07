import { serverOnly$ } from "vite-env-only/macros";

/* endhide */
export const loader = serverOnly$(async (req) => {
  return "hello";
});
