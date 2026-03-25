import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "node:url";
import path from "node:path";

// Safely import lovable-tagger only when available (Lovable platform only)
let componentTagger: (() => unknown) | null = null;
try {
  const mod = await import("lovable-tagger");
  componentTagger = mod.componentTagger;
} catch {
  // Not running inside Lovable — skip the tagger plugin
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const envBasePath = process.env.VITE_BASE_PATH;
  const basePath = envBasePath ?? "/";

  return {
    base: basePath,
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [react(), mode === "development" && componentTagger?.()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "./src"),
      },
      dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
    },
  };
});
