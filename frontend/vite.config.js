import { resolve } from 'path'
import { defineConfig } from 'vite'

const root = resolve('./')
const outDir = resolve(__dirname, 'public')

// https://vitejs.dev/config/
export default defineConfig({
  root,
  server: {
    host: '127.0.0.1',
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