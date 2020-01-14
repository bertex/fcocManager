import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@okta/okta-vue'
import FormComponent from "../components/FormComponent";

Vue.use(Auth, {
  issuer: 'https://dev-997079.okta.com/oauth2/default',
  client_id: '0oaumjhpfM9mJYWOc4x5',
  redirect_uri: 'http://localhost:8080/implicit/callback',
  scope: 'openid profile email'
})

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
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
})
router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router
