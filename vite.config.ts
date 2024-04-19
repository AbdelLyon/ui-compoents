import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import path from "path";

// Liste des modules à inclure dans la construction de la bibliothèque
const modules = [
  "providers",
  "theme",
  "button",
  "grid",
  "card",
  "hooks",
  "form",
  "icons",
  "index",
];

export default defineConfig({
  plugins: [react(), dts({ insertTypesEntry: true })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: Object.fromEntries(
        modules.map((module) => [
          module,
          path.resolve(__dirname, `src/${module}`),
        ])
      ),
      name: "ui-xefi",
      formats: ["es", "cjs"],
      fileName: (format, entryName) =>
        `${entryName ? entryName + "/" : ""}ui-xefi.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
