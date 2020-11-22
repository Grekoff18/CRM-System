import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min.js'

Vue.config.productionTip = false

// Register new plagins
Vue.use(Vuelidate)
// Register new filter in Vue
Vue.filter("date", dateFilter)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
