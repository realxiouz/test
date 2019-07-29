<template>
  <div>
    <scroller
      lock-x
      @on-scroll-bottom="handleMore"
      ref="pv"
    >
      <div style="padding:10px" class="flex flex-wrap">
        <div
          v-for="(i, inx) in list"
          :key="inx"
          class="good"
        >
          <div class="img-wrap">
            <img :src="webHost+i.images" alt="">
          </div>
          <div class="title">
            <!-- <span class="cu-tag round bg-blue">{{i.goods_name}}</span> -->
            {{i.content}}
          </div>
          <div class="flex justify-between">
            <div class="price">￥{{i.integral}}</div>
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
  width: 48%;
  padding-bottom: 20px;
  &:nth-child(2n+1){
    margin-right: 4%;
  }
  .img-wrap{
    width: 100%;
    height: 165px;
    border-radius: 3px;
    overflow: hidden;
    >img{
      width: 100%;
      height: 100%;
    }
  }
  
}
.price{
  font-size: 16px;
  color: #fa436a;
  line-height: 1;
}
.title{
  font-size: 16px;
  color: #303133;
  line-height: 40px;
      text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    overflow: hidden;
}
</style>

