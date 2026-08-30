import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Arcane-Apparatus-Club/', // เพิ่มบรรทัดนี้เข้าไป
})