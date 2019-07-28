<template>
  <div style="background: #000;width:100vw;height:100vh" v-if="refresh">
    <previewer :list="list" ref="previewer" @on-index-change="handleChange" :options="options"></previewer>

    <div class="tip" v-if="!isBuy && list.length">
      <div style="color: #fff;font-size:14px">
        打赏
        <span style="color: #f5b527">{{coin}}</span>
        金币观看完整版 {{totalCount}} 张
      </div>
      <div>
        <x-button mini type="primary" @click.native="preCharge">打赏</x-button>
      </div>
    </div>

    <alert v-model="showBuyDialog" button-text="打赏观看" @on-hide="preCharge">
      <div>您已观看了 {{list.length}} 张</div>
      <div>
        只需要打赏
        <span style="color:#f5b527">{{coin}}</span>金币
      </div>
      <div>就能观看完整版</div>
    </alert>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getPhotoDetail, buyPhoto, checkBuyPhoto } from '@/utils/api'
import { WEB_HOST, validateToken } from '@/utils/const'

export default {
  name: 'PhotoDetail',
  mounted () {
    this.getData()
    if (validateToken(new Date().getTime())) {
      checkBuyPhoto({id: this.$route.params.id}).then(r => {
        this.isBuy = true
      })
    }
  },
  data: _ => ({
    list: [],
    showBuyDialog: false,
    options: {
      closeEl: false,
      tapToClose: false,
      closeOnScroll: false,
      pinchToClose: false,
      closeOnVerticalDrag: false
    },

    totalCount: 50,
    isBuy: false,
    coin: 100,
    refresh: true,

    selInx: 0
  }),
  methods: {
    ...mapMutations(['setRedirectPath']),
    handleChange (val) {
      this.selInx = val
      if (val.currentIndex === this.list.length - 1 && !this.isBuy) {
        this.showBuyDialog = true
      }
    },
    handleClose () {
      this.$router.go(-1)
    },
    preCharge () {
      if (!validateToken(new Date().getTime())) {
        this.setRedirectPath(this.$route.path)
        this.$router.push({ path: '/login' })
        return
      }
      buyPhoto({id: this.$route.params.id}).then(r => {
        this.$vux.toast.text(r.msg)
        this.list = r.data.gallery_images.map(i => ({src: WEB_HOST + i, w: 0, h: 0}))
        this.isBuy = true
        setTimeout(_ => {
          this.$refs.previewer.show(this.selInx)
        }, 300)
      }).catch(e => {
        this.$vux.confirm.show({
          title: '余额不足',
          content: '前往充值',
          onConfirm: _ => {
            this.setRedirectPath(this.$route.path)
            this.$router.push({
              name: 'Recharge'
            })
          }
        })
      })
    },
    getData () {
      this.$vux.loading.show({
        text: '加载中'
      })
      getPhotoDetail({id: this.$route.params.id}).then(r => {
        this.list = r.data.gallery_images.map(i => ({src: WEB_HOST + i, w: 0, h: 0}))
        this.coin = r.data.price
        this.totalCount = r.data.total
        this.$nextTick(_ => {
          this.$refs.previewer.show(0)
        })
      }).finally(_ => {
        this.$vux.loading.hide()
      })
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scoped>
.tip {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1501;
  background: #000;
  height: 60px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
</style>
