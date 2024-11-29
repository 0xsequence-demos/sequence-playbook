// CSP Nonce
function createNonce() {
  const randomBytes = new Uint8Array(16);
  crypto.getRandomValues(randomBytes);

  // Convert to a hex string
  return Array.from(randomBytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Content Security Policy (CSP) header directives.
export function cspHeaderDirectives() {
  const nonce = createNonce();

  const directives = {
    "connect-src": [
      "nodes.sequence.app",
      "unpkg.com",
      "cdn.jsdelivr.net",
      "pulse.walletconnect.org",
      "identitytoolkit.googleapis.com",
      "explorer-api.walletconnect.com",
      "'self'",
    ],
    "font-src": ["'self'", "fonts.gstatic.com"],
    "frame-src": ["'self'", "accounts.google.com"],
    "img-src": ["'self'", "data:", "explorer-api.walletconnect.com"],
    "script-src": [
      "'strict-dynamic'",
      "'self'",
      "'wasm-unsafe-eval'", // for Rive - https://github.com/rive-app/rive-wasm/issues/131
      `'nonce-${nonce}'`, // Sign with nonce
    ],
    "script-src-attr": [`'nonce-${nonce}'`], // Sign with nonce
    // "upgrade-insecure-requests": null,
  };

  // Build the headers from the directive.
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
