<template>
  <div>
    <box gap="40px">
      <span style="font-size: 20px;font-weight: 400;">成为合伙人</span>
    </box>
    
    <group>
        <x-input title="充值" disabled :value="1680" text-align="right"/>
    </group>

    <checker
      style="display:flex;justify-content:space-around;margin-top:10px;"
      v-model="selType"
      radio-required
      default-item-class="pay"
      selected-item-class="pay-sel"
    >
      <checker-item value="1">
        <img src="../assets/t-pay.png">
      </checker-item>
      <checker-item value="2">
        <img src="../assets/a-pay.png">
      </checker-item>
    </checker>

    <box gap="100px 10px 0">
      <x-button type="primary" @click.native="handleOk">确定</x-button>
    </box>

    <form style='display:none;' ref="payForm" method='post' action='https://pay.020zf.com/'>
      <input name='goodsname' v-model="payForm.goodsname" />
      <input name='type' v-model="payForm.type"/>
      <input name='key' v-model="payForm.key"/>
      <input name='notify_url' v-model="payForm.notify_url"/>
      <input name='orderid' v-model="payForm.orderid"/>
      <input name='orderuid' v-model="payForm.orderuid"/>
      <input name='price' v-model="payForm.price"/>
      <input name='return_url' v-model="payForm.return_url"/>
      <input name='identification' v-model="payForm.identification"/>
      <input type='submit'>
    </form>
  </div>
</template>

<script>
import { Box, XButton } from 'vux'
import { payMemberData, getInfoByToken } from '@/utils/api'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Rechange',
  components: {
    // Checklist,
    Box,
    XButton
  },
  data: _ => ({
    options: [],
    selVal: [],
    selType: '1',

    payForm: {
      goodsname: '',
      type: '',
      key: '',
      orderid: '',
      orderuid: '',
      price: '',
      return_url: '',
      identification: ''
    }
  }),
  mounted () {
    getInfoByToken().then(r => {
      this.setUser(r.data)
    })
  },
  watch: {
    selVal (val) {
      if (!val.length && this.options.length) {
        this.selVal = [this.options[0].key]
      }
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    handleOk () {
      if (this.user.level === '1') {
        this.$vux.toast.text('已经是会员无需充值了')
        return
      }
      payMemberData({
        type: this.selType
      }).then(r => {
        this.payForm = r.data.payInfo
        this.payForm.return_url = `${window.location.protocol}//${window.location.host}/#/pay-member-result/${this.payForm.orderid}`
        this.$nextTick(_ => {
          this.$refs.payForm.submit()
        })
      })
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scoped>
.pay {
  > img {
    border: 2px dashed #fff;
  }
}

.pay-sel {
  > img {
    border: 2px dashed #09bb07;
  }
}
</style>
