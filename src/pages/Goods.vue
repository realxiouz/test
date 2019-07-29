<template>
  <div>
    <scroller
      lock-x
      @on-scroll-bottom="handleMore"
      ref="pv"
    >
      <div style="padding:10px" class="flex flex-wrap justify-between">
        <div
          v-for="(i, inx) in list"
          :key="inx"
          class="good"
        >
          <img :src="webHost+i.images" alt="">
          <div>
            <span class="cu-tag round bg-blue">{{i.goods_name}}</span>
            {{i.content}}
          </div>
          <div class="flex">
            <div>金币: {{i.integral}}</div>
            <div>库存: {{i.num}}</div>
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
import { goodList } from '@/utils/api'
import moment from 'moment'
import { WEB_HOST } from '@/utils/const'

export default {
  mounted () {
    this.getData()
  },
  data: _ => ({
    moment,
    list: [],
    page: 1,
    isLoading: false,
    isEnd: false,
    webHost: WEB_HOST
  }),
  methods: {
    getData (resetPage = false) {
      if (this.isLoading) {
        return
      }
      this.isLoading = true
      if (resetPage) {
        this.page = 1
        this.isEnd = false
      }
      this.$vux.loading.show({text: `加载中...`})
      let p = {
        page: this.page
      }
      goodList(p).then(r => {
        let data = r.data
        if (this.page === 1) {
          this.list = []
          this.$refs.pv.reset({top: 0})
        }
        this.list.push(...data, ...data, ...data, ...data, ...data)
        if (!data.length) {
          this.isEnd = true
        }
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
  }
}
</script>

<style lang="less" scoped>
.good{
  width: 45%;
  >img{
    width: 100%
  }
}
</style>

