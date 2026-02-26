import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  build: {
    target: 'esnext',
    lib: {
      entry: 'src/index.ts',
      name: 'Hermes',
      formats: ['cjs', 'es'],
      fileName: (format) => `hermes.${format}.js`,
    },
    manifest: true,
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        /^three(\/.*)?$/,
        'framer-motion',
        '@tomorrowevening/theatre-core',
        '@tomorrowevening/theatre-studio',
        'postprocessing',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          three: 'THREE',
        }
      }
    }
  },
  plugins: [
    glsl({
      include: ['**/*.glsl', '**/*.vert', '**/*.frag'],
      warnDuplicatedImports: true,
      defaultExtension: 'glsl',
      watch: true,
    }),
    react()
  ],
  resolve: {
    alias: {
      '@': '/src',
      '~@': '/src',
    }
  },
});
