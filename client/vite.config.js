import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000", // Chuyển các yêu cầu API đến backend
        changeOrigin: true, // Thay đổi origin của request
        rewrite: (path) => path.replace(/^\/api/, ''), // Xóa /api khỏi path trước khi gửi đến backend
      },
    },
  }
})
