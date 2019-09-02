<template>
    <div>
        <div class="wtf flex justify-between">
          话费充值
          <span style="font-weight:normal;color: green;" @click="$router.push('/phone-list')">充值记录</span>
        </div>
        <group style="padding:58px 0px 0">
            <div slot='title' v-html="phoneStr" style="padding:10px;color:#999"></div>
            <x-input title="用户名" v-model="formBean.name" placeholder="输入姓名"/>
            <x-input title="手机号"
              v-model="formBean.phone"
              placeholder="输入电话"
              :max="11"
              is-type="china-mobile"
              required
              ref="mobile"
            />
            <popup-picker title="选择类型" :data="channels" v-model="val" placeholder="选择方式" show-name @on-change="handleChange"></popup-picker>
            <x-number title="充值金额" v-model="formBean.price" :min="10" :step="10" fillable :max="1000"/>
            <popup-picker title="支付方式" :data="types" v-model="type" placeholder="选择方式" show-name @on-change="handleTypeChange"></popup-picker>
            <x-input title="备注" v-model="formBean.content" placeholder="输入备注"/>
            <cell :is-link="false" inline-desc='话费充值有什么优惠规则?' @click.native="$router.push('/money-tip/9')">
            </cell>
        </group>
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
import { mapState } from 'vuex'
import { phoneCharge } from '@/utils/api'

export default {
  data () {
    return {
      formBean: {
        price: 100,
        name: '',
        phone: ''
      },
      channels:
      [
        [
          {name: '移动', value: '1'},
          {name: '电信', value: '2'},
          {name: '联通', value: '3'}
        ]
      ],
      val: [],

      types: [
        [
          {name: '微信', value: '1'},
          {name: '支付宝', value: '2'}
        ]
      ],
      type: [],

      payForm: {
        goodsname: '',
        type: '',
        key: '',
        orderid: '',
        orderuid: '',
        price: '',
        return_url: '',
        identification: ''
      },

      radio: ''
    }
  },
  computed: {
    ...mapState(['phoneStr'])
  },
  methods: {
    handleOk () {
      if (!this.formBean.name) {
        this.$vux.toast.text('填写名称')
        return
      }
      if (!this.$refs.mobile.valid) {
        this.$vux.toast.text('输入正确的手机号')
        return
      }
      if (!this.val.length) {
        this.$vux.toast.text('选择号码类型')
        return
      }
      if (!this.type.length) {
        this.$vux.toast.text('选择支付方式')
        return
      }
      phoneCharge(this.formBean).then(r => {
        this.payForm = r.data.payInfo
        this.payForm.return_url = `${window.location.protocol}//${window.location.host}/#/pay-phone-result/${this.payForm.orderid}`
        this.$nextTick(_ => {
          this.$refs.payForm.submit()
        })
      })
    },
    handleChange (val) {
      this.formBean.type = val[0]
    },
    handleTypeChange (val) {
      this.formBean.payType = val[0]
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
</style>
