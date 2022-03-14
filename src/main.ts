import { createApp } from 'vue'
import { createStore } from 'vuex'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import axios from 'axios'

const app = createApp(App)

const store = createStore({
    state () {
      return {
        count: 0
      }
    }
})

app.config.globalProperties.$axios = axios

app.use(store)
app.use(ElementPlus)
app.use(router)
app.mount('#app')