import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    info: {
      webName: '图圈圈',
      copyRight: 'Copyright © 2019 fenun.cn'
    },
    user: {},
    redirectPath: '',
    goods: {}
  },
  mutations: {
    setRedirectPath (store, path) {
      store.redirectPath = path
    },
    setUser (store, user) {
      store.user = user
    },
    setGoods (store, goods) {
      store.goods = goods
    }
  }
})
