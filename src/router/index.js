import Vue from 'vue'
import Router from 'vue-router'
import FormComponent from "../components/FormComponent.vue";
import ShowMap from "../components/ShowMap.vue";

Vue.use(Router);

export  default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'ShowMap',
      component: ShowMap,
    },
    {
      path: '/form',
      name: 'FormComponent',
      component: FormComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '*',
      component: ShowMap,
    }
  ]
});


