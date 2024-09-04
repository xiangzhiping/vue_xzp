import {createApp} from 'vue'
import {createPinia} from 'pinia'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router.js'
import 'element-plus/dist/index.css';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
import 'element-plus/theme-chalk/dark/css-vars.css'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(Antd)
app.mount('#app')
