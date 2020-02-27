// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import App from './App.vue'
import router from './router'
import {BootstrapVue,IconsPlugin } from 'bootstrap-vue'
import L from 'leaflet'
import './assets/styles/app.scss'
import '../node_modules/leaflet/dist/leaflet.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css'
import 'babel-polyfill'
import store from './store/store.js'
import Axios from 'axios'

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;

Vue.use(L);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

const token = localStorage.getItem('user-token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

/* eslint-disable no-new */
  const root =new Vue({
    router,
    store,
    L,
    components: { App },
    template: "<App/>",
    render: h => h(App)
  }).$mount('#fcocMaps');


