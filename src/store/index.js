import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    info: {
      webName: '图圈圈',
      copyRight: 'Copyright © 2019 tuquanquan'
    },
    user: {},
    redirectPath: '',
    goods: {},
    oilRatio: 1
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
    },
    setOilRatio (store, ratio) {
      store.oilRatio = ratio
    }
  }
})
