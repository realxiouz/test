<template>
  <div>
    <box gap="40px">
      <span style="font-size: 20px;font-weight: 400;">红包任务</span>
      <div style="margin-top:5px;font-size:14px;color:#555">红包奖励仅能用于消费,不可提现！</div>
    </box>

    <group>
      <cell inline-desc="关注公众号可领取">
        <div slot="title">新人红包&nbsp;<badge text="100金币"/></div>
        <x-button mini type="primary" @click.native="handleFollow">领红包</x-button>
      </cell>
      <cell inline-desc="首次充值成功可领取">
        <div slot="title">首充红包 &nbsp;<badge text="500金币"/></div>
        <x-button mini type="primary" @click.native="handleRecharge">领红包</x-button>
      </cell>
      <!-- <cell inline-desc="他人通过你分享二维码进行消费">
        <div slot="title">分享赚钱 &nbsp;<badge text="他人消费金币20%"/></div>
        <x-button mini type="primary" @click.native="handleQrcode">生成二维码</x-button>
      </cell> -->
    </group>

    <!-- <div v-transfer-dom> -->
      <confirm
        v-model="qrCodeDialog"
        @on-confirm="saveQrCode"
        confirm-text="保存二维码"
        :show-cancel-button="false"
      >
        <!-- <qrcode :value="recommendUrl" type="canvas" ref="qrcode"/> -->
        <img style="width:160px;height:160px" :src="qrCodeSrc" />
      </confirm>
    <!-- </div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getQrcode } from '@/utils/api'
import { WEB_HOST } from '@/utils/const'

export default {
  methods: {
    handleFollow () {
      this.$vux.alert.show({
        title: '提示',
        content: '您还没有完成任务，稍后再来领取！'
      })
    },
    handleRecharge () {
      this.$vux.alert.show({
        title: '提示',
        content: '您还没有完成任务，稍后再来领取！'
      })
    },
    handleQrcode () {
      this.qrCodeDialog = true
    },
    saveQrCode () {
      // android chrome bug
      // let href = this.$refs.qrcode.$refs.canvas.toDataURL('image/png')
      // let aLink = document.createElement('a')
      // aLink.setAttribute('href', href)
      // aLink.setAttribute('download', '二维码.png')
      // aLink.click()

      let a = document.createElement('a')
      a.setAttribute('href', this.qrCodeSrc)
      a.setAttribute('download', 'qrcode.png')
      a.click()
    },
    qrcode () {
      getQrcode().then(r => {
        this.qrCodeSrc = WEB_HOST + r.data
      })
    }
  },
  data: _ => ({
    qrCodeDialog: false,
    qrCodeSrc: '',
    webHost: WEB_HOST
  }),
  computed: {
    ...mapState(['user']),
    recommendUrl () {
      return `${window.location.protocol}//${window.location.host}/#/login?uid=${this.user.id}`
    }
  },
  mounted () {
    this.qrcode()
  }
}
</script>
