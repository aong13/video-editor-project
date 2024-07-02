import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  headers: [
    {
      source: "/(.*)",
      headers: [
        {
          key: "cross-origin-opener-policy",
          value: "same-origin",
        },
        {
          key: "cross-origin-embedder-policy",
          value: "require-corp",
        },
      ],
    },
  ],
  server: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
  },
  root: "src",
  build: {
    outDir: "../dist",
  },
});
