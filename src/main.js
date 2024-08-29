import {createApp} from 'vue'
import {createPinia} from 'pinia'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router.js'
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)
app.use(ElementPlus, {locale: zhCn,})
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')
