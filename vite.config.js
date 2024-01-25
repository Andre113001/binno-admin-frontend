import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
<<<<<<< HEAD
  server: {
    proxy: {
      '/api': 'https://binno-admin-deploy-production.up.railway.app'
    }
  },  
  plugins: [
    react()
  ],
  resolve: {
    mainFields: [],
  },
=======
    server: {
        proxy: {
            '/api': 'https://binno-admin-deploy-production-f99a.up.railway.app/',
            // '/api': 'http://localhost:3200/',
        },
    },
    plugins: [react()],
    resolve: {
        mainFields: [],
    },
>>>>>>> ee16de47fb4d0c0fd0b6bc34f6500f523e0c2502
})
