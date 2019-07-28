<template>
  <div id="app">
    <keep-alive :exclude="exclude">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { getInfoByToken } from '@/utils/api'
import { mapState, mapMutations } from 'vuex'
import { validateToken } from '@/utils/const'

export default {
  name: 'app',
  data: _ => ({
    exclude: ['PayResult', 'PhotoDetail', 'Rechange', 'OrderList', 'VideoDetail', 'ArticleDetail', 'MoneyTip']
  }),
  mounted () {
    if (validateToken(new Date().getTime())) {
      getInfoByToken().then(r => {
        this.setUser(r.data)
      })
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapMutations(['setUser'])
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
body {
  background-color: #fbf9fe;
}
</style>
