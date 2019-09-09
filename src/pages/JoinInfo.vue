<template>
  <scroller
    lock-x
    @on-scroll-bottom="handleMore"
    ref="pv"
  >
    <div>
      <div style="padding: 0px 15px;margin-top:10px">
        <button-tab v-model="tabInx">
          <button-tab-item>未激活</button-tab-item>
          <button-tab-item>已激活</button-tab-item>
        </button-tab>
      </div>
      <div style="padding: 4px 10px;margin-top:10px;background:white" v-for="(i, inx) in list" :key="inx">
        <div>
          <span>二维码系列号:</span><span>{{i.sn}}</span>
        </div>
        <div>
          <span>{{i.status == 0 ? '尚未激活' : `已激活(用户名：${i.user_name})`}}</span>
        </div>
      </div>
    </div>
  </scroller>
</template>

<script>
import Item from '@/components/Item'
import { joinInfo } from '@/utils/api'
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
        status: this.tabInx
      }
      joinInfo(p).then(r => {
        let data = r.data
        if (this.page === 1) {
          this.list = []
          this.$refs.pv.reset({top: 0})
        }
        this.list.push(...data.info)
        if (!data.info.length) {
          this.isEnd = true
        }
        this.$nextTick(_ => {
          this.$refs.pv.reset()
        })
      }).finally(_ => {
        this.$vux.loading.hide()
        this.isLoading = false
      })
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
