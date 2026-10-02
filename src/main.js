import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import store from './store'
import vuetify from './plugins/vuetify'

createApp(App)
  .use(router)
  .use(store)
  .mount('#app')
  .use(vuetify)