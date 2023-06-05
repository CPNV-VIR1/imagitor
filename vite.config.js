import { resolve } from 'path'
import { defineConfig } from 'vite'

const root = resolve(__dirname, 'src')
const outDir = resolve(__dirname, 'public')

// https://vitejs.dev/config/
export default defineConfig({
  root,
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
      },
    },
  },
})