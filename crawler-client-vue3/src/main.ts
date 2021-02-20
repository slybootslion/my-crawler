import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import initPlugin from '@/plugins'

const app = createApp(App)
initPlugin(app)

app.use(store).use(router).mount('#app')
