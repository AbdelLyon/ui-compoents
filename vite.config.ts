import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import path from "path";

// Configuration de Vite : https://vitejs.dev/config/
export default defineConfig({
  // Utilisation des plugins React et dts pour générer les fichiers de déclaration de type fichiers .d.ts
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
