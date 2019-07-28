<template>
  <div>
    <box gap="40px">
      <span style="font-size: 20px;font-weight: 400;">注册</span>
    </box>
    <group>
      <x-input
        title="手机号"
        placeholder="请输入手机号"
        v-model="formBean.phone"
        :show-clear="false"
        placeholder-align="left"
        :max="11"
        is-type="china-mobile"
      ></x-input>
      <x-input
        title="验证码"
        placeholder="请输入验证码"
        v-model="formBean.code"
        :show-clear="false"
        placeholder-align="left"
        :max="6"
        :is-type="v => ({valid:v.length == 4, msg: '输入正确的验证码'})">
        <x-button slot="right" type="primary" mini @click.native="handleSendSms" :disabled="lockedForCode">{{lockedForCode ? `重新发送(${leftSecond})` : '获取验证码'}}</x-button>
      </x-input>
      <x-input title="密码 " placeholder="请输入密码" v-model="formBean.password" novalidate :show-clear="false" placeholder-align="left" type="password" :max="12"></x-input>
    </group>

    <box gap="100px 10px 50px">
      <x-button type="primary" @click.native="handleOk">确定</x-button>
    </box>
    <div>
      <div style="color: #999999;text-align: center;font-size: 14px">{{info.webName}}</div>
      <div style="color: #999999;text-align: center;font-size: 12px">{{info.copyRight}}</div>
    </div>
  </div>
</template>

<script>
import { Box, XButton, Group, XInput, Alert, AlertModule } from 'vux'
import { mapState } from 'vuex'
import { sendSms } from '@/utils/api'

export default {
  components: {
    Box, XButton, Group, XInput, Alert, AlertModule
  },
  data: _ => ({
    formBean: {
      phone: '',
      code: '',
      password: ''
    },
    lockedForCode: false,
    leftSecond: 60,

    tId: ''
  }),
  methods: {
    handleOk () {
      console.log(this.formBean)
    },
    handleSendSms () {
      let p = {
        mobile: '15912510617',
        event: 'register'
      }
      sendSms(p).then(r => {
        this.lockedForCode = true
        this.tId = setInterval(_ => {
          this.leftSecond--
          if (this.leftSecond <= 0) {
            clearInterval(this.tId)
            this.lockedForCode = false
          }
        }, 1000)
      })
    }
  },
  computed: {
    ...mapState(['info'])
  }
}
</script>
