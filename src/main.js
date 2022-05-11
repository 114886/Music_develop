
import { createApp } from 'vue'
import App from './App.vue'

import './router/permission'
import './style/index.scss'
import animated from 'animate.css'
//UI
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//路由
import router from './router'
//状态
import store from './store'

const app = createApp(App)

app.use(router).use(animated).use(store).use(ElementPlus).mount('#app')


