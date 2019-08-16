<template>
  <div>
    <button-tab v-model="tabInx">
      <button-tab-item>图集订单</button-tab-item>
      <button-tab-item>视屏订单</button-tab-item>
    </button-tab>
    <scroller lock-x @on-scroll-bottom="handleMore" ref="pv" height="-30">
        <group gutter="0px">
        <cell
          v-for="(i, inx) in list"
          :key="inx"
          :title="i.goodsname"
          :inline-desc="moment(i.createtime*1000).format('YYYY-MM-DD HH:mm')"
          :link="tabInx===0?`/photo-detail/${i.gallery_id}`:`/video-detail/${i.video_id}`"
        >
          <span slot="inline-desc">
            {{moment(i.createtime*1000).format('YYYY-MM-DD HH:mm')}}&nbsp;&nbsp;<badge :text="`${i.score}积分`" />
          </span>
        </cell>
      </group>
    </scroller>
  </div>
</template>

<script>
import { orderPhoto, orderVideo } from '@/utils/api'
import moment from 'moment'

export default {
  data: _ => ({
    tabInx: 0,

    list: [],
    page: 1,
    isLoading: false,
    isEnd: false,
    moment
  }),
  mounted () {
    this.getData()
  },
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
      this.$vux.loading.show({ text: `加载中...` })
      let p = {
        page: this.page
      }
      let getMethod = this.tabInx === 0 ? orderPhoto : orderVideo
      getMethod(p)
        .then(r => {
          let data = r.data
          if (this.page === 1) {
            this.list = []
            this.$refs.pv.reset({ top: 0 })
          }
          this.list.push(...data)
          if (!data.length) {
            this.isEnd = true
          }
          this.$nextTick(_ => {
            this.$refs.pv.reset()
          })
        })
        .finally(_ => {
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
  watch: {
    tabInx (val) {
      this.getData(true)
    }
  }
}
</script>
