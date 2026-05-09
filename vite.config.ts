import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  build: {
    target: 'esnext',
    lib: {
      entry: {
        index: 'src/index.ts',
        'editor/index': 'src/editor/index.ts',
      },
      name: 'Hermes',
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        /^three(\/.*)?$/,
        'camera-controls',
        'detect-gpu',
        'framer-motion',
        '@tomorrowevening/theatre-core',
        '@tomorrowevening/theatre-studio',
        'postprocessing',
      ],
      output: [
        {
          format: 'es',
          dir: 'dist',
          entryFileNames: '[name].js',
          chunkFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: 'src',
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            three: 'THREE',
          },
        },
        {
          format: 'cjs',
          dir: 'dist',
          entryFileNames: '[name].cjs',
          chunkFileNames: '[name].cjs',
          preserveModules: true,
          preserveModulesRoot: 'src',
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            three: 'THREE',
          },
        },
      ],
    },
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
