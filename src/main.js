// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import L from 'leaflet'
import './assets/styles/app.scss'
import '../node_modules/leaflet/dist/leaflet.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css'
import 'babel-polyfill'

Vue.config.productionTip = false;

Vue.use(L);
Vue.use(BootstrapVue);

/* eslint-disable no-new */
  const root =new Vue({
    router: router,
    L,
    components: { App },
    template: "<App/>",
    render: h => h(App)
  }).$mount('#fcocMaps');


