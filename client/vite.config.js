import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    define: {
      'process.env': process.env,
    },
    resolve: {
      alias: {
        'crypto': 'crypto-browserify',
        'stream': 'stream-browserify',
        'util': 'util',
        'buffer': 'buffer',
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        plugins: [NodeModulesPolyfillPlugin()],
      },
    },
    build: {
      rollupOptions: {
        // For example, ensure that you exclude some modules from the build here
      },
    },
    ...(mode === 'development' && {
      server: {
        port: 3000,
        open: true,
        proxy: {
          '/graphql': {
            target: 'http://localhost:3001',
            changeOrigin: true,
            secure: false,
          },
        },
      },
    }),
  };
});
