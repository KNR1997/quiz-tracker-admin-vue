import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { setupRouter } from '@/router'
import 'virtual:uno.css'
import naive from 'naive-ui'
import { setupStore } from '@/store'

async function setupApp() {
  const app = createApp(App)

  setupStore(app)

  await setupRouter(app)

  app.use(createPinia())
  app.use(naive)

  app.mount('#app')
}

setupApp()
