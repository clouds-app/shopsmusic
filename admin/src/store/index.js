import Vue from 'vue'
import Vuex from 'vuex'
import app from './module/app'
import user from './module/user'
import page from './module/pages'
import posts from './module/posts'
import categories from './module/categories'
//-----------NEW------------------
import comments from './module/comments'
import media from './module/media'
import postRevisions from './module/post-revisions'
import postStatuses from './module/post-statuses'
import postTypes from './module/post-types'
import settings from './module/settings'
import tags from './module/tags'
import taxonomies from './module/taxonomies'

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
    categories,
    comments,
    media,
    postRevisions,
    postStatuses,
    postTypes,
    settings,
    tags,
    taxonomies,
  }
})
