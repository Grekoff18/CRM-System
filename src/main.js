import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import firebase from 'firebase/app'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import tooltipDirectives from '@/directives/tooltip.directive'
import messagePlugin from '@/common/message.plugin'
import Loader from '@/components/app/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min.js'
import 'firebase/auth'
import 'firebase/database'

let app
const firebaseConfig = {
	apiKey: "AIzaSyA9wxKt0XnQOShVQ3t0LvCNTkIC1DtfPWg",
	authDomain: "crm--vue--js.firebaseapp.com",
	databaseURL: "https://crm--vue--js.firebaseio.com",
	projectId: "crm--vue--js",
	storageBucket: "crm--vue--js.appspot.com",
	messagingSenderId: "731806687262",
	appId: "1:731806687262:web:7da463318413b278b78e0f",
	measurementId: "G-RPNJTSVWLS"
}

// Initialize firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged(() => {
	if (!app) {
		app = new Vue({
			router,
			store,
			render: h => h(App)
		}).$mount('#app')
	}
});

Vue.config.productionTip = false

// Register new plugins
Vue.use(Vuelidate)
Vue.use(messagePlugin)

// Register new filter in Vue
Vue.filter("date", dateFilter)
Vue.filter("currency", currencyFilter)

// Register vue component
Vue.component("Loader", Loader)
Vue.component("Paginate", Paginate)

// Register directives
Vue.directive("tooltip", tooltipDirectives)


