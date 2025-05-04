import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isDevelopment = env.VITE_ENV === "development";

  return {
    plugins: [
      react(),
      isDevelopment &&
        visualizer({
          filename: "stats.html",
          open: true,
          emitFile: true,
          gzipSize: true,
          brotliSize: true,
          template: "treemap",
        }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, ".", "src"),
        "@components": "/src/components",
      },
    },
    server: {
      port: parseInt(env.PORT),
    },
  };
});
