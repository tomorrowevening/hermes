import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // @ts-ignore __dirname is part of environment
      "@": path.resolve(__dirname, "/src"),
      // @ts-ignore __dirname is part of environment
      "~@": path.resolve(__dirname, "/src"),
    }
  },
  build: {
    lib: {
      // @ts-ignore __dirname is part of environment
      entry: path.resolve(__dirname, 'src/library.ts'),
      name: 'Hermes',
      // the proper extensions will be added
      fileName: 'hermes'
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        'react',
        'three',
        '@theatre/core',
        '@theatre/studio',
        'tweakpane',
        'tweakpane-image-plugin',
        '@tweakpane/plugin-essentials'
      ],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
          three: 'Three',
          '@theatre/core': 'Theatre Core',
          '@theatre/studio': 'Theatre Studio',
          'tweakpane': 'tweakpane',
          'tweakpane-image-plugin': 'tweakpane-image-plugin',
          '@tweakpane/plugin-essentials': 'tweakpane-plugin-essentials',
        }
      }
    }
  },
})
