import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  // const env = loadEnv(mode, process.cwd(), '');
  const apiUrl = 'https://int20h-bm85.onrender.com/';
  const isProd = mode === 'production';

  return {
    plugins: [
      react(),
      tsconfigPaths(),

      isProd &&
        visualizer({
          open: false,
          gzipSize: true,
          filename: 'dist/stats.html',
        }),
    ],

    server: {
      open: true,
      proxy: {
        '^/(api)': {
          target: apiUrl,
          changeOrigin: true,
          secure: false,
        },
      },
    },

    build: {
      outDir: 'dist',
      sourcemap: !isProd,
      chunkSizeWarningLimit: 1000,
      esbuild: {
        drop: isProd ? ['console', 'debugger'] : [],
      },
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        },
      },
    },
  };
});
