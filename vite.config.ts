import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '~@': '/src',
    }
  },
  build: {
    target: 'esnext',
    lib: {
      entry: 'src/index.ts',
      name: 'Hermes',
      fileName: (format) => {
        switch (format) {
          case 'cjs':
            return 'hermes.cjs.js';
          case 'es':
            return 'hermes.esm.js';
          case 'umd':
            return 'hermes.umd.js';
        }
        return 'hermes.js';
      },
      formats: ['cjs', 'es']
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
        '@tweakpane/plugin-essentials',
        'postprocessing'
      ],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          'react': 'react',
          'three': 'three',
          'framer-motion': 'framer-motion',
          '@theatre/core': '@theatre/core',
          '@theatre/studio': '@theatre/studio',
          'tweakpane': 'tweakpane',
          '@tweakpane/plugin-essentials': 'tweakpane-plugin-essentials',
          'postprocessing': 'postprocessing'
        }
      }
    }
  }
});
