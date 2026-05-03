import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set BASE_URL env var if deploying to a GitHub project page (e.g. /lanas-port/).
// Leave unset (or set to '/') for a custom domain or username.github.io root.
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_URL || '/',
})
