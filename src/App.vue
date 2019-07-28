<template>
  <div id="app">
    <!-- <keep-alive :exclude="exclude"> -->
      <router-view></router-view>
    <!-- </keep-alive> -->
    <ad />
  </div>
</template>

<script>
import { getInfoByToken, qiniuConfig } from '@/utils/api'
import { mapState, mapMutations } from 'vuex'
import { validateToken } from '@/utils/const'
import Ad from '@/components/Ad'

export default {
  name: 'app',
  data: _ => ({
    exclude: ['PayResult', 'PhotoDetail', 'Rechange', 'OrderList', 'VideoDetail', 'ArticleDetail', 'MoneyTip', 'MyWallet', 'MoneyDetail', 'ScoreDetail']
  }),
  mounted () {
    if (validateToken(new Date().getTime())) {
      getInfoByToken().then(r => {
        this.setUser(r.data)
      })
    }
    qiniuConfig().then(r => {
      
    })
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapMutations(['setUser'])
  },
  components: {
    Ad
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
