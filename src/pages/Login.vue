<template>
  <div>
    <box gap="40px">
      <span style="font-size: 20px;font-weight: 400;">登陆</span>
    </box>
    <group>
      <x-input
        title="手机号"
        placeholder="请输入手机号"
        v-model="formBean.mobile"
        :show-clear="false"
        placeholder-align="left"
        :max="11"
        is-type="china-mobile"
        required
        ref="mobile"
      ></x-input>
      <!-- <x-input
        title="密码 "
        placeholder="请输入密码"
        v-model="formBean.password"
        :show-clear="false"
        placeholder-align="left"
        type="password"
        :max="12"
        required
        :is-type="v => ({valid: v.length >= 4, msg: '4-12密码'})"
        ref="password"
      ></x-input> -->
      <x-input
        ref="code"
        title="验证码"
        placeholder="请输入验证码"
        v-model="formBean.captcha"
        :show-clear="false"
        placeholder-align="left"
        :max="4"
        required
        :is-type="v => ({valid:v.length == 4, msg: '输入正确的验证码'})">
        <x-button slot="right" type="primary" mini @click.native="handleSendSms" :disabled="lockedForCode">{{lockedForCode ? `重新发送(${leftSecond})` : '获取验证码'}}</x-button>
      </x-input>
      <!-- <x-switch title="记住密码" v-model="rememberMe"></x-switch> -->
    </group>

    <box gap="100px 10px 50px">
      <x-button type="primary" @click.native="handleOk">确定</x-button>
    </box>
    <div style="margin-bottom:50px;text-align:center">
      <!-- <router-link to="/register">注册账号</router-link>
      <router-link to="/reset-password">找回密码</router-link> -->
    </div>
    <div>
      <div style="color: #999999;text-align: center;font-size: 14px">{{info.webName}}</div>
      <div style="color: #999999;text-align: center;font-size: 12px">{{info.copyRight}}</div>
    </div>
  </div>
</template>

<script>
import { Box, XButton, Group, XInput, Alert, AlertModule, XSwitch } from 'vux'
import { mapState, mapMutations } from 'vuex'
import { sendSms, login } from '@/utils/api'

export default {
  components: {
    Box, XButton, Group, XInput, Alert, AlertModule, XSwitch
  },
  data: _ => ({
    formBean: {
      mobile: '',
      captcha: ''
    },
    rememberMe: true,

    lockedForCode: false,
    leftSecond: 60,
    tId: ''
  }),
  methods: {
    ...mapMutations(['setUser']),
    handleOk () {
      if (!this.$refs.mobile.valid) {
        this.$vux.toast.text('请输入正确的手机号码')
        return
      }
      if (!this.$refs.code.valid) {
        this.$vux.toast.text('请输入4位验证码')
        return
      }
      if (this.$route.query.uid) {
        this.formBean.uid = this.$route.query.uid
      }
      login(this.formBean).then(r => {
        let user = r.data.userinfo
        localStorage.setItem('token', user.token)
        localStorage.setItem('expires', new Date().getTime() + user.expires_in * 1000)
        this.setUser(user)
        this.$vux.toast.text(r.msg)
        this.$router.push({
          path: this.redirectPath ? this.redirectPath : '/user-center'
        })
      })
    },
    handleSendSms () {
      if (!this.$refs.mobile.valid) {
        this.$vux.toast.text('请输入正确的手机号码')
        return
      }
      let p = {
        mobile: this.formBean.mobile,
        event: 'mobilelogin'
      }
      sendSms(p).then(r => {
        console.log('sms send success')
        this.lockedForCode = true
        this.tId = setInterval(_ => {
          this.leftSecond--
          if (this.leftSecond <= 0) {
            clearInterval(this.tId)
            this.lockedForCode = false
            this.leftSecond = 60
          }
        }, 1000)
      })
    }
  },
  computed: {
    ...mapState(['info', 'redirectPath'])
  }
}
</script>
