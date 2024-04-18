import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
  plugins: [react(), dts({ insertTypesEntry: true })],
  resolve: {
    // Alias pour le répertoire src
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: {
        // Configuration des entrées pour la construction de la bibliothèque
        providers: path.resolve(__dirname, "src/providers"),
        theme: path.resolve(__dirname, "src/theme"),
        button: path.resolve(__dirname, "src/button"),
        grid: path.resolve(__dirname, "src/grid"),
        card: path.resolve(__dirname, "src/card"),
        query: path.resolve(__dirname, "src/query"),
        form: path.resolve(__dirname, "src/form"),
        "": path.resolve(__dirname, "src/index.ts"),
      },
      name: "ui-xefi",
      // Formats de sortie (ESModule et CommonJS)
      formats: ["es", "cjs"],
      fileName: (format, entryName) =>
        // Nom des fichiers de sortie
        // Par exemple, si format est "es" et entryName est "example", le nom de fichier de sortie sera "providers/ui-xefi.es.js".
        // Si entryName est vide, alors le nom de fichier sera "ui-xefi.es.js".
        `${entryName ? entryName + "/" : ""}ui-xefi.${format}.js`,
    },
    rollupOptions: {
      // Déclaration des dépendances externes
      external: ["react", "react-dom"],
      // Configuration des variables globales pour React et ReactDOM
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
