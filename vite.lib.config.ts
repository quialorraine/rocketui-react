import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";

/**
 * Library build config — emits the publishable package to `dist/`:
 *   - dist/index.js      ESM bundle (React & deps kept external)
 *   - dist/index.d.ts    bundled type declarations
 *   - dist/styles.css    compiled tokens + utilities
 *
 * The default `vite.config.ts` still builds the docs site.
 */
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      include: [
        "src/vite-env.d.ts",
        "src/index.ts",
        "src/components/**",
        "src/lib/**",
      ],
      tsconfigPath: "./tsconfig.app.json",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
      formats: ["es"],
      fileName: () => "index.js",
      cssFileName: "styles",
    },
    cssCodeSplit: false,
    sourcemap: true,
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "class-variance-authority",
        "clsx",
        "tailwind-merge",
        /^@phosphor-icons\/react/,
      ],
    },
  },
});
