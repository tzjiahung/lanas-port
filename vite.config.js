import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set BASE_URL env var if deploying to a GitHub project page (e.g. /lanas-port/).
// Leave unset (or set to '/') for a custom domain or username.github.io root.
const buildTime = new Date().toLocaleString('zh-TW', {
  timeZone: 'Asia/Taipei',
  year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', hour12: false,
}).replace(/\//g, '-') + ' UTC+8 (Taipei)'

export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_URL || '/',
  define: {
    __BUILD_TIME__: JSON.stringify(buildTime),
  },
})
