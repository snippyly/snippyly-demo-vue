// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Home from './components/Home.vue'
import StreamView from './components/StreamView.vue'

Vue.config.productionTip = false
Vue.config.ignoredElements = [
  /velt-*/
]

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/stream-view', component: StreamView },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
