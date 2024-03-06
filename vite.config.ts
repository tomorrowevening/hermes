import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  build: {
    target: 'esnext',
    lib: {
      entry: 'src/index.ts',
      name: 'Hermes',
      fileName: (format) => `hermes.${format}.js`,
      formats: ['cjs', 'es']
    },
    manifest: true,
    rollupOptions: {
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
        globals: {
          react: 'React',
          three: 'THREE',
        }
      }
    }
  },
  plugins: [glsl(), react()],
  resolve: {
    alias: {
      '@': '/src',
      '~@': '/src',
    }
  },
});
