import Vue from 'vue'
import Vuex from 'vuex'
import maps from './modules/maps'
import user from './modules/user'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'development'


const store = new Vuex.Store({
  modules: {
    maps,
    user,
  },
  strict: debug,
})

export default store
