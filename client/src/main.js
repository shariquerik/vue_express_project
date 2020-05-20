import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import Notifications from 'vue-notification'

import './assets/styles/index.css'


Vue.config.productionTip = false
Vue.use(Notifications)

sync(store, router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
