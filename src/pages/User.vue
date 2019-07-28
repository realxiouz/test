<template>
  <scroller
    lock-x
    @on-scroll-bottom="handleMore"
    ref="pv"
  >
    <div>
      <div class="user-header">
        <div class="ava">
          <img :src="webHost+userInfo.avatar" />
        </div>
        <div class="name">{{userInfo.nickname}}</div>
        <div class="dis">简介：{{userInfo.bio ? userInfo.bio : '暂无简介'}}</div>
        <!-- <div style="text-align:center">
          <x-button mini @click.native="handleFollow" :type="userInfo.isFollow ? 'primary': 'default'">{{userInfo.isFollow ? '已关注' : '关注'}}</x-button>
        </div> -->
      </div>
      <div style="padding: 0px 15px;margin-top:10px">
        <button-tab v-model="tabInx">
          <button-tab-item>套图</button-tab-item>
          <button-tab-item>视屏</button-tab-item>
        </button-tab>
      </div>
      <div>
        <item v-for="(i, inx) in list" :key="inx" :bean="i" :type="tabInx+1" />
      </div>
    </div>
  </scroller>
</template>

<script>
import Item from '@/components/Item'
import { otherUser } from '@/utils/api'
import { WEB_HOST } from '@/utils/const'

export default {
  mounted () {
    this.getData()
  },
  data: _ => ({
    userInfo: {},
    webHost: WEB_HOST,
    tabInx: 0,
    list: [],

    page: 1,
    isLoading: false,
    isEnd: false

  }),
  methods: {
    getData (resetPage = false) {
      this.$vux.loading.show({
        text: '加载中'
      })
      this.isLoading = true
      if (resetPage) {
        this.page = 1
      }
      let p = {
        page: this.page,
        id: this.$route.params.id
      }
      otherUser(p).then(r => {
        let data = r.data
        if (this.page === 1) {
          this.list = []
          this.$refs.pv.reset({top: 0})
        }
        this.userInfo = r.data.user
        if (this.tabInx === 0) {
          this.list.push(...data.gallery)
          if (!data.gallery.length) {
            this.isEnd = true
          }
        } else if (this.tabInx === 1) {
          this.list.push(...data.video)
          if (!data.video.length) {
            this.isEnd = true
          }
        }
        this.$nextTick(_ => {
          this.$refs.pv.reset()
        })
      }).finally(_ => {
        this.$vux.loading.hide()
        this.isLoading = false
      })
    },

    handleFollow () {
      setTimeout(_ => {
        this.userInfo.isFollow = !this.userInfo.isFollow
        this.$vux.toast.show({
          text: '操作成功'
        })
      }, 1500)
    },

    handleMore () {
      if (!this.isLoading && !this.isEnd) {
        this.page++
        this.getData()
      }
    }
  },
  components: {
    Item
  },
  watch: {
    tabInx: {
      handler (val) {
        this.isEnd = false
        this.getData(true)
      }
    }
  }
}
</script>

<style lang="less">
.user-header{
  height: 200px;
  background-image: url(../assets/user-bg.jpg);
  background-size: 130%;
  .ava{
    padding-top: 16px;
    padding-bottom: 5px;
    text-align: center;
    >img{
      width: 64px;
      height: 64px;
      border-radius: 50%
    }
  }
  .name{
    font-size: 16px;
    text-align: center;
    color: #fff;
  }
  .dis{
    font-size: 12px;
    text-align: center;
    color: #fff;
    margin-bottom: 5px;
  }
}
</style>
