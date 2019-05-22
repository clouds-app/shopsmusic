import Vue from 'vue'
import Vuex from 'vuex'
import app from './module/app'
import user from './module/user'
import page from './module/pages'
import posts from './module/posts'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    app,
    user,
    page,
    posts,
  }
})
