import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    watch: true,
    globals: true,
    environment: "jsdom",
    setupFiles: ["@testing-library/jest-dom"],
    exclude: ["./node_modules/","./tests/"],
  },
})
