// import './assets/main.css'
import './style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import AdminPageHeader from './components/AdminPageHeader.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('AdminPageHeader', AdminPageHeader)

app.mount('#app')
