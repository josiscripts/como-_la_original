// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import fs from "fs";
import path from "path";
import type { Plugin } from "vite";

const assetProxyPlugin = (): Plugin => {
  return {
    name: "asset-proxy",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const match = req.url?.match(/^\/__l5e\/assets-v1\/[^/]+\/(.+)$/);
        if (match) {
          const filename = match[1];
          const filepath = path.join(process.cwd(), "src", "assets", filename);
          try {
            const content = fs.readFileSync(filepath);
            const ext = path.extname(filename).toLowerCase();
            const mimeTypes: Record<string, string> = {
              ".png": "image/png",
              ".jpg": "image/jpeg",
              ".jpeg": "image/jpeg",
              ".webp": "image/webp",
              ".svg": "image/svg+xml",
            };
            res.setHeader("Content-Type", mimeTypes[ext] || "application/octet-stream");
            res.setHeader("Cache-Control", "public, max-age=31536000");
            res.end(content);
            return;
          } catch (e) {
            console.error(`Asset not found: ${filepath}`);
          }
        }
        next();
      });
    },
  };
};

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    plugins: [assetProxyPlugin()],
  },
});
