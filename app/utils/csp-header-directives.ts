export function cspHeaderDirectives() {
  const randomBytes = new Uint8Array(16);
  crypto.getRandomValues(randomBytes);

  // Convert to a hex string
  const nonce = Array.from(randomBytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const directives = {
    "connect-src": [
      "nodes.sequence.app",
      "unpkg.com",
      "cdn.jsdelivr.net",
      "pulse.walletconnect.org",
      "identitytoolkit.googleapis.com",
      "explorer-api.walletconnect.com",
      "'self'",
    ].filter(Boolean),
    "font-src": ["'self'", "fonts.gstatic.com"],
    "frame-src": ["'self'", "accounts.google.com"],
    "img-src": ["'self'", "data:", "explorer-api.walletconnect.com"],
    "script-src": [
      "'strict-dynamic'",
      "'self'",
      "'wasm-unsafe-eval'", // for Rive - https://github.com/rive-app/rive-wasm/issues/131
      `'nonce-${nonce}'`,
    ],
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

  console.log(cspHeader);

  return { cspHeader, nonce };
}
