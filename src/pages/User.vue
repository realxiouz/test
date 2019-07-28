<template>
  <scroller
    lock-x
    @on-scroll-bottom="handleMore"
    ref="pv"
  >
    <div>
      <div class="user-header">
        <div class="ava">
          <img src="http://file.idray.com/Image/Brand/ugirls.jpg!wh50" />
        </div>
        <div class="name">{{userInfo.name}}</div>
        <div class="dis">简介：{{userInfo.dis ? userInfo.dis : '暂无简介'}}</div>
        <div style="text-align:center">
          <x-button mini @click.native="handleFollow" :type="userInfo.isFollow ? 'primary': 'default'">{{userInfo.isFollow ? '已关注' : '关注'}}</x-button>
        </div>
      </div>
      <div style="padding: 0px 15px;margin-top:10px">
        <button-tab v-model="tabInx">
          <button-tab-item>套图{{ userInfo.photoCount }}</button-tab-item>
          <button-tab-item>视屏{{ userInfo.videoCount }}</button-tab-item>
        </button-tab>
      </div>
      <div>
        <item v-for="(i, inx) in list" :key="inx" :bean="i" :type="1" />
      </div>
    </div>
  </scroller>
</template>

<script>
import Item from '@/components/Item'

export default {
  mounted () {
    this.getData()
  },
  data: _ => ({
    userInfo: {
      photoCount: 100,
      videoCount: 30,
      name: '尤果圈',
      dis: '我是一个没有感情的杀手',
      isFollow: false
    },
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
      let page = resetPage ? 1 : this.page
      setTimeout(_ => {
        let data = [
          {
            id: 1,
            title: '花漾写真 [HuaYang] 2019.06.10 VOL.146 王雨纯',
            src: 'http://file.idray.com/Upload/9900/5299/132051666191572568.jpg!wh400',
            count: 0,
            avatar: 'http://file.idray.com//Image/Brand/huayang.jpg!wh50',
            name: '花漾show',
            time: '2019-06-10',
            userId: 12
          },
          {
            id: 2,
            title: '花漾写真 [HuaYang] 2019.06.10 VOL.146 王雨纯',
            src: 'http://file.idray.com/Upload/9900/5299/132051666191572568.jpg!wh400',
            count: 59,
            avatar: 'http://file.idray.com//Image/Brand/huayang.jpg!wh50',
            name: '花漾show',
            time: '2019-06-10',
            userId: 4
          },
          {
            id: 3,
            title: '花漾写真 [HuaYang] 2019.06.10 VOL.146 王雨纯',
            src: 'http://file.idray.com/Upload/9900/5299/132051666191572568.jpg!wh400',
            count: 0,
            avatar: 'http://file.idray.com//Image/Brand/huayang.jpg!wh50',
            name: '花漾show',
            time: '2019-06-10',
            userId: 1
          },
          {
            id: 4,
            title: '花漾写真 [HuaYang] 2019.06.10 VOL.146 王雨纯',
            src: 'http://file.idray.com/Upload/9900/5299/132051666191572568.jpg!wh400',
            count: 0,
            avatar: 'http://file.idray.com//Image/Brand/huayang.jpg!wh50',
            name: '花漾show',
            time: '2019-06-10',
            userId: 2
          }
        ]
        if (page === 1) {
          this.list = []
        }
        this.list.push(...data)
        setTimeout(_ => {
          this.$refs.pv.reset()
        }, 500)
        this.$vux.loading.hide()
        this.isLoading = false
      }, 3000)
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
      if (!this.isLoading) {
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
