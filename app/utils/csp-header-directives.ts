export function cspHeaderDirectives() {
  const randomBytes = new Uint8Array(16);
  crypto.getRandomValues(randomBytes);

  // Convert to a hex string
  const nonce = Array.from(randomBytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const directives = {
    "connect-src": [
      process.env.SENTRY_DSN ? "*.ingest.sentry.io" : null,
      "identitytoolkit.googleapis.com",
      "'self'",
    ].filter(Boolean),
    "font-src": ["'self'", "fonts.gstatic.com"],
    "frame-src": ["'self'"],
    "img-src": ["'self'", "cdn.shopify.com", "cdn.sanity.io", "data:"],
    "script-src": ["'strict-dynamic'", "'self'", `'nonce-${nonce}'`],
    "script-src-attr": [`'nonce-${nonce}'`],
    "upgrade-insecure-requests": null,
  };

  const cspHeader = Object.entries(directives)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key} ${value.join(" ")};`;
      }

      return `${key} ${value};`;
    })
    .join(" ");

  return { cspHeader, nonce };
}
