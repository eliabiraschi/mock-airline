import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App'
import Home from './views/Home'
import Search from './views/Search'
import _store from './store'
import './styles/index.scss'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueRouter)
const store = new Vuex.Store(_store)
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/search', component: Search }
  ]
})
new Vue({
  router,
  store,
  render: createEle => createEle(App)
}).$mount('#app')
