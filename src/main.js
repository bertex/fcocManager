// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import App from "./App"
import Vuelidate from "vuelidate"
import VueRouter from "vue-router"
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

Vue.config.productionTip = false;

Vue.use(L);
Vue.use(VueRouter);
Vue.use(Vuelidate);
Vue.use(BootstrapVue);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  L,
  components: { App },
  template: "<App/>"
});


