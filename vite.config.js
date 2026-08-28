import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Reenvía las llamadas del formulario de contacto al servidor de correo
      // (server/index.js) durante el desarrollo.
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
})
