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
            :title="`${i.price}元购买${i.score}积分`"
            :inline-desc="moment(i.createtime*1000).format('YYYY-MM-DD HH:mm')"
          >
            <!-- <span slot="after-title">
              <badge :text="i.type_text"/>
              <badge :text="i.price"/>
            </span> -->
            <!-- <icon :type="i.status === '1' ? 'success' : 'warn'"/> -->
            <span :style="`color: ${i.status === '1'?'green':'red'}`">{{i.status === '1' ? '支付成功' : '支付失败'}}</span>
          </cell>
        </group>
      </div>
    </scroller>
  </div>
</template>

<script>
import { orderList } from '@/utils/api'
import moment from 'moment'

export default {
  mounted () {
    this.getData()
  },
  data: _ => ({
    moment,
    list: [],
    page: 1,
    isLoading: false,
    isEnd: false
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
      orderList(p).then(r => {
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
