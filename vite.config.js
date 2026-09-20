import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set BASE_URL env var if deploying to a GitHub project page (e.g. /lanas-port/).
// Leave unset (or set to '/') for a custom domain or username.github.io root.
const BUILD_TIME_ZONE = 'America/Los_Angeles'
const buildDate = new Date()
const buildDateStr = buildDate.toLocaleString('zh-TW', {
  timeZone: BUILD_TIME_ZONE,
  year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', hour12: false,
}).replace(/\//g, '-')
const buildUtcOffset = new Intl.DateTimeFormat('en-US', {
  timeZone: BUILD_TIME_ZONE, timeZoneName: 'shortOffset',
}).formatToParts(buildDate).find((p) => p.type === 'timeZoneName').value.replace('GMT', 'UTC')
const buildTime = `${buildDateStr} ${buildUtcOffset} (Seattle)`

export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_URL || '/',
  define: {
    __BUILD_TIME__: JSON.stringify(buildTime),
  },
})
