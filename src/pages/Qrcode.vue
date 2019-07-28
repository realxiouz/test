<template>
  <div class="q-wrap">
    <img :src="qrCodeSrc" v-if="qrCodeSrc" />
    <div>截屏 或者 <x-button mini type="primary" @click.native="saveQrCode">保存</x-button> 本机后分享</div>
  </div>
</template>

<script>
import { getQrcode } from '@/utils/api'
import { WEB_HOST } from '@/utils/const'

export default {
  data: _ => ({
    qrCodeSrc: ''
  }),
  mounted () {
    getQrcode().then(r => {
      this.qrCodeSrc = WEB_HOST + r.data
    })
  },
  methods: {
    saveQrCode () {
      let a = document.createElement('a')
      a.setAttribute('href', this.qrCodeSrc)
      a.setAttribute('download', 'qrcode.png')
      a.click()
    }
  }
}
</script>

<style lang="less" scoped>
.q-wrap{
  background: #000;
  height: 100vh;
  text-align: center;
  > img{
    width: 200px;
    height: 200px;
    margin-top: 150px;
  }
  >div {
    color: #fff;
    margin-top: 20px;
  }
}
</style>

