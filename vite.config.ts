import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      '^.*$': '<rootDir>/src/$1'
    }
  },
  server: {
    open: false,
    host: true,
    proxy: {
      '^/api': {
        target: 'http://3.141.23.218:5000',
        rewrite: (path) => path.replace(/\/api/, '')
      }
    }
  }
})
