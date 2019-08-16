<template>
  <div>
    <!-- <x-header title="我的订单"/> -->
    <scroller
      lock-x
      @on-scroll-bottom="handleMore"
      ref="pv"
    >
      <div style="padding: 0px 0 0">
        <group gutter="0px">
          <cell
            v-for="(i, inx) in list"
            :key="inx"
            :title="calcTitle(i)"
            :inline-desc="moment(i.createtime*1000).format('YYYY-MM-DD HH:mm')"
          >
            <span class="weight" :style="`color: ${i.status == 0 ?'red':'greed'}`">{{i.status == 0 ? '失败':'成功'}}</span>
          </cell>
        </group>
      </div>
    </scroller>
  </div>
</template>

<script>
import { phoneList } from '@/utils/api'
import moment from 'moment'

export default {
  name: 'ScoreDetail',
  mounted () {
    this.getData()
  },
  data: _ => ({
    moment,
    list: [],
    page: 1,
    isLoading: false,
    isEnd: false,

    typeObj: {
      '1': '移动',
      '2': '电信',
      '3': '联通'
    },
    payTypeObj: {
      '1': '微信',
      '2': '支付宝'
    }
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
      phoneList(p).then(r => {
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
    calcTitle (i) {
      return `${this.payTypeObj[i.pay_type]}充值${i.price},${this.typeObj[i.type]}号码${i.phone},优惠${i.discount_price}`
    }
  }
}
</script>

<style>
.weight{
font-weight: bold
}
</style>
