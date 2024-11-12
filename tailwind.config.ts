import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      fontSize: {
        "10": "calc(0.625rem * var(--font-size-multiplier, 1))",
        "11": "calc(0.6875rem * var(--font-size-multiplier, 1))",
        "12": "calc(0.75rem * var(--font-size-multiplier, 1))",
        "13": "calc(0.8125rem * var(--font-size-multiplier, 1))",
        "14": "calc(0.875rem * var(--font-size-multiplier, 1))",
        "15": "calc(0.9375rem * var(--font-size-multiplier, 1))",
        "16": "calc(1rem * var(--font-size-multiplier, 1))",
        "17": "calc(1.0625rem * var(--font-size-multiplier, 1))",
        "18": "calc(1.125rem * var(--font-size-multiplier, 1))",
        "19": "calc(1.1875rem * var(--font-size-multiplier, 1))",
        "20": "calc(1.25rem * var(--font-size-multiplier, 1))",
        "22": "calc(1.375rem * var(--font-size-multiplier, 1))",
        "24": "calc(1.5rem * var(--font-size-multiplier, 1))",
        "26": "calc(1.625rem * var(--font-size-multiplier, 1))",
        "28": "calc(1.75rem * var(--font-size-multiplier, 1))",
        "30": "calc(1.875rem * var(--font-size-multiplier, 1))",
        "32": "calc(2rem * var(--font-size-multiplier, 1))",
        "34": "calc(2.125rem * var(--font-size-multiplier, 1))",
        "36": "calc(2.25rem * var(--font-size-multiplier, 1))",
        "38": "calc(2.375rem * var(--font-size-multiplier, 1))",
        "40": "calc(2.5rem * var(--font-size-multiplier, 1))",
        "42": "calc(2.625rem * var(--font-size-multiplier, 1))",
        "44": "calc(2.75rem * var(--font-size-multiplier, 1))",
        "46": "calc(2.875rem * var(--font-size-multiplier, 1))",
        "48": "calc(3rem * var(--font-size-multiplier, 1))",
      },
    },
  },
  plugins: [],
} satisfies Config;
