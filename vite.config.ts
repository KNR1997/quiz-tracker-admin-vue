import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import UnoCSS from '@unocss/vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'
import { getRootPath } from './build/utils'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    UnoCSS({
      presets: [
        presetUno(), // required
        presetAttributify(), // optional
        presetIcons(), // optional
      ],
      // Optional: Add custom rules
      rules: [
        // Your custom rules here
      ],
      // Optional: Add shortcuts
      shortcuts: {
        btn: 'py-2 px-4 font-semibold rounded-lg shadow-md',
        'btn-blue': 'text-white bg-blue-500 hover:bg-blue-700',
      },
    }),
  ],
  resolve: {
    alias: {
      '~': getRootPath(),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
