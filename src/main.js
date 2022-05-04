
import { createApp } from 'vue'
import App from './App.vue'

import './style/index.scss'
//UI
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//路由
import router from './router'
//状态
import store from './store'

const app = createApp(App)

app.use(router).use(store).use(ElementPlus).mount('#app')

