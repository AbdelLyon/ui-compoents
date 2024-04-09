import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ insertTypesEntry: true })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: {
        providers: path.resolve(__dirname, "src/providers"),
        theme: path.resolve(__dirname, "src/theme"),
        button: path.resolve(__dirname, "src/button"),
        card: path.resolve(__dirname, "src/card"),
        query: path.resolve(__dirname, "src/query"),
        form: path.resolve(__dirname, "src/form"),
        "": path.resolve(__dirname, "src/index.ts"),
      },
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
