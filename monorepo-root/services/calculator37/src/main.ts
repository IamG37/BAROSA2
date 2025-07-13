import { createApp } from 'vue'
import App from './App.vue'
import 'shared/styles/index.css'
import { t } from 'shared/i18n'

const app = createApp(App)
app.config.globalProperties.$t = t
app.mount('#app')
