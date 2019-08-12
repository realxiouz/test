<template>
  <div>
    <div class="wtf flex justify-between">
      兑换商品
      <span style="font-weight:normal;color: green;" @click="$router.push('/my-goods')">兑换记录</span>
    </div>
    <scroller
      lock-x
      @on-scroll-bottom="handleMore"
      ref="pv"
    >
      <div style="padding:58px 10px 10px" class="flex flex-wrap">
        <div
          v-for="(i, inx) in list"
          :key="inx"
          class="good"
          @click="toOrder(i)"
        >
          <div class="img-wrap">
            <img :src="webHost+i.images" alt="">
          </div>
          <div style="padding:8px;">
            <div class="title">
            {{i.goods_name}}
            </div>
            <div class="flex justify-between align-center">
              <div class="price">{{i.integral}}金币</div>
              <div class="price dh">立即兑换</div>
            </div>
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
import { mapMutations } from 'vuex'

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
    ...mapMutations(['setGoods']),
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
        this.list.push(...data)
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
    },
    toOrder (i) {
      this.setGoods(i)
      this.$router.push('/goods-order')
    }
  }
}
</script>

<style lang="less" scoped>
.wtf{
  padding: 10px 15px;
  font-weight: bold;
  font-size: 18px;
  background: #fff;
  position: fixed;
  top:0;
  left:0;
  right: 0;
  z-index: 1;
  &::after{
    content: '';
    position: absolute;
    left: 0;
    top: 14px;
    width: 6px;
    background: #0081ff;
    height: 20px;
  }
}
.good{
  width: 48%;
  background: #fff;
  margin-bottom: 20px;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
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
  font-size: 12px;
  color: white;
  line-height: 1;
  background: red;
  padding: 2px 4px;
  &.dh{
    background: #39b54a;
  }
}
.title{
  font-size: 16px;
  color: #303133;
  line-height: 20px;
  text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    overflow: hidden;
    margin-bottom:8px;
}
</style>

