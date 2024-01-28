import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
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
})
