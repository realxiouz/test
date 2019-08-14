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
            <div slot="title" class="flex justify-between" style="width:100%">
              <div>
                <div>
                  <img :src="webHost+i.qrcodeimage" alt="" style="width:100px;height:100px">
                </div>
                <div>
                  <div>提交时间:{{moment(i.createtime*1000).format('YYYY-MM-DD')}}</div>
                  <div>审核说明: {{i.desciption}}</div>
                </div>
              </div>
              <!-- <span class="weight" :style="`color: ${colorObj[i.status]}`">{{statusObj[i.status]}}</span> -->
            </div>
            <span class="weight" :style="`color: ${colorObj[i.status]}`">{{statusObj[i.status]}}</span>
          </cell>
        </group>
      </div>
    </scroller>
  </div>
</template>

<script>
import { checkList } from '@/utils/api'
import moment from 'moment'
import { WEB_HOST } from '@/utils/const'

export default {
  name: 'CheckList',
  mounted () {
    this.getData()
  },
  data: _ => ({
    moment,
    list: [],
    page: 1,
    isLoading: false,
    isEnd: false,

    statusObj: {
      '0': '待审核',
      '1': '审核成功',
      '2': '审核失败'
    },
    colorObj: {
      '0': 'origin',
      '1': 'green',
      '2': 'red'
    },
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
      checkList(p).then(r => {
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
      return `${this.payTypeObj[i.pay_type]}充值${this.typeObj[i.type]}${i.price},优惠${i.discount_price}`
    }
  }
}
</script>

<style>
.weight{
font-weight: bold
}
</style>
