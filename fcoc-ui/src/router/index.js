import Vue from 'vue'
import Router from 'vue-router'
import FormComponent from "../components/AddMap.vue";
import ShowMap from "../components/ShowMap.vue";
import Login from "../components/Login.vue";
import Register from "../components/register.vue";
import ListMaps from "../components/ListMaps";
import EditMap from "../components/EditMap";
import store from "../store/store.js";

Vue.use(Router);

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'ShowMap',
      component: ShowMap,
      props: true
    },
    {
      path: '/addMap',
      name: 'FormComponent',
      component: FormComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/myMaps',
      name: 'ListMaps',
      component: ListMaps,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/editMap/:id',
      name: 'EditMap',
      component: EditMap,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '*',
      component: ListMaps,
    }
  ]
});
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return
    }
    next('/login')
  } else {
    next()
  }
});
export default router


