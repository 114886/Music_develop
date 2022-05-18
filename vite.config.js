import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ],
  base: './',
  build: {
    target: "es2015", // 默认 "modules"
  },
  server: {
    host: '0.0.0.0',
    port: '3000',
    open: true,
    proxy: {
      // 选项写法
      '/api': {
        target: 'http://49.233.5.229:4000/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },
  optimizeDeps: {
    include: ["axios"]
  }
})
