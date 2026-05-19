import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isDevelopment = env.VITE_ENV === 'development';

  return {
    plugins: [
      react(),
      isDevelopment &&
        visualizer({
          filename: 'stats.html',
          open: true,
          emitFile: true,
          gzipSize: true,
          brotliSize: true,
          template: 'treemap',
        }),
    ],
    resolve: {
      alias: {
        '@core': path.resolve(__dirname, '.', 'src/core'),
        '@components': path.resolve(__dirname, '.', 'src/components'),
        '@features': path.resolve(__dirname, '.', 'src/features'),
        '@lib': path.resolve(__dirname, '.', 'src/lib'),
        '@shared': path.resolve(__dirname, '.', 'src/shared'),
        '@assets': path.resolve(__dirname, '.', 'src/assets'),
        '@': path.resolve(__dirname, '.', 'src'),
      },
    },
    server: {
      port: Number.parseInt(env.PORT),
    },
  };
});
