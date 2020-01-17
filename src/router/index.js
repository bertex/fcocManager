import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@okta/okta-vue'
import FormComponent from "@/components/FormComponent";
import ShowMap from "@/components/ShowMap";

Vue.use(Auth, {
  issuer: 'https://dev-997079.okta.com/oauth2/default',
  client_id: '0oaumjhpfM9mJYWOc4x5',
  redirect_uri: 'http://localhost:8080/implicit/callback',
  scope: 'openid profile form'
});

Vue.use(Router);

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'ShowMap',
      component: ShowMap,
    },
    {
      path: '/form',
      name: 'FromComponent',
      component: FormComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/implicit/callback',
      component: Auth.handleCallback()
    },
  ]
});
router.beforeEach(Vue.prototype.$auth.authRedirectGuard());

export default router
