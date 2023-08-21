import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// @ts-ignore __dirname is part of environment
const dirname = __dirname

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(dirname, 'src/library.ts'),
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
