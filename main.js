import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	app.config.globalProperties.$filters = {
		formatDate: function(data) {
			const date = new Date(data)
			const day = date.getMonth().toString().padStart(2, '0') + '-' + date.getDay().toString().padStart(2,
				'0')
			return date.getFullYear() + '-' + day
		}
	}
	return {
		app
	}
}
// #endif
