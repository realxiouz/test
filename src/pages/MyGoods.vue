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
          >
            <div slot="title">
              <div>{{i.goods_name}}*{{i.total_num}}</div>
            </div>
            <div slot="inline-desc">
              <div>订单状态: {{orderObj[i.order_status]}}</div>
              <div>发货状态: {{freightObj[i.freight_status]}}</div>
              <template v-if="i.freight_status==='20'">
                <div>快递公司: {{i.express_company}}</div>
                <div>快递单号: {{i.express_no}}</div>
              </template>
              <div>{{moment(i.createtime*1000).format('YYYY-MM-DD HH:mm')}}</div>
            </div>
          </cell>
        </group>
      </div>
    </scroller>
  </div>
</template>

<script>
import { myGoods } from '@/utils/api'
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

    orderObj: {
      '10': '进行中',
      '20': '取消',
      '30': '已完成'
    },
    freightObj: {
      '10': '未发货',
      '20': '已发货'
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
      myGoods(p).then(r => {
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
    }
  }
}
</script>

<style>
.weight{
font-weight: bold
}
</style>
