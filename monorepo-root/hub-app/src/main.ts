import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import 'shared/styles/index.css'
import { t } from 'shared/i18n'

const app = createApp(App)
app.use(router)
app.use(createPinia())

// 예시: 글로벌 $t 함수 등록
app.config.globalProperties.$t = t

app.mount('#app')
