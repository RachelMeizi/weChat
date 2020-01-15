import Vue from 'vue'
import App from './App'

import Utils from './utils/util.js'
import store from './store/index.js'
Vue.prototype.$util=Utils
Vue.prototype.$store = store 
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
