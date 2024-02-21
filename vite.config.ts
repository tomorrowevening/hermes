import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '~@': '/src',
    }
  },
  build: {
    assetsDir: 'public/',
    emptyOutDir: false,
    lib: {
      entry: 'src/index.ts',
      name: 'Hermes',
      fileName: 'hermes'
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        'react',
        'three',
        'framer-motion',
        '@theatre/core',
        '@theatre/studio',
        'tweakpane',
        '@tweakpane/plugin-essentials'
      ],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'react',
          three: 'three',
          'framer-motion': 'framer-motion',
          '@theatre/core': '@theatre/core',
          '@theatre/studio': '@theatre/studio',
          'tweakpane': 'tweakpane',
          '@tweakpane/plugin-essentials': 'tweakpane-plugin-essentials',
        }
      }
    }
  }
});
