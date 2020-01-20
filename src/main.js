// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import App from './App.vue'
import Vuelidate from "vuelidate"
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import L from 'leaflet'
import './assets/styles/app.scss'
import '../node_modules/leaflet/dist/leaflet.css'

Vue.config.productionTip = false;

Vue.use(L);
Vue.use(Vuelidate);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin)

/* eslint-disable no-new */
const root =new Vue({
  router: router,
  L,
  components: { App },
  template: "<App/>",
  render: h => h(App)
}).$mount('fcocMaps');
document.body.appendChild(root.$el);


