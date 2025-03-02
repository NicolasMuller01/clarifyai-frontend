import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: [
      "clarifyai-frontend-production.up.railway.app",
      "localhost",
      "clarifyai.space",
    ],
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(
    Boolean
  ),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      react: path.resolve(__dirname, "./node_modules/react"),
    },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify(mode),
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
    force: true,
  },
}));
