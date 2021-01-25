import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {}
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, {token, user}){
      state.status = 'success';
      state.token = token;
      state.user = user
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = '';
      state.token = ''
    },
  },
  actions: {
    login({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios.post('http://localhost:3000/api/signin', user)
          .then(resp => {
            const token = resp.data.token;
            const user = resp.data.user;
            localStorage.setItem('token', token);
            localStorage.setItem('user', user);
            axios.defaults.headers.common['Authorization'] = token;
            commit('auth_success', {token, user});
            resolve(resp);
          })
          .catch(err => {
            commit('auth_error');
            localStorage.removeItem('token');
            reject(err)
          })
      })
    },
    register({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios.post('http://localhost:3000/api/signup', user)
          .then(resp => {
            const token = resp.data.token;
            const user = resp.data.user;
            localStorage.setItem('token', token);
            localStorage.setItem('user', user);
            axios.defaults.headers.common['Authorization'] = token;
            commit('auth_success', {token, user});
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            reject(err)
          })
      })
    },
    logout({commit}){
      return new Promise((resolve) => {
        commit('logout');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
        resolve()
      })
    }
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  }
})
