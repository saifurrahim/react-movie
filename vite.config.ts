import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, './');

  return {
    base: '/react-movie/',
    plugins: [react()],
    envDir: './',
    server: {
      proxy: {
        '/tmdb-api': {
          target: env.VITE_TMDB_API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/tmdb-api/, ''),
          headers: {
            'Authorization': `Bearer ${env.VITE_TMDB_API_ACCESS_TOKEN}`,
            'Accept' : 'application/json'
          },
        },
      },
    },
  }
})
