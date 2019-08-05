<template>
  <div>
    <box gap="40px">
      <span style="font-size: 20px;font-weight: 400;">我要约拍</span>
    </box>
    <group>
      <x-input
        title="称呼  "
        placeholder="您的称呼"
        v-model="formBean.name"
        :show-clear="false"
        placeholder-align="left"
        :max="10"
      ></x-input>
      <x-input
        title="联系方式"
        placeholder="请输入手机号"
        v-model="formBean.phone"
        :show-clear="false"
        placeholder-align="left"
        :max="11"
        is-type="china-mobile"
        ref="mobile"
        required
      ></x-input>
      <x-input
        title="联系QQ "
        placeholder="您的QQ"
        v-model="formBean.qq"
        :show-clear="false"
        placeholder-align="left"
        :max="11"
      ></x-input>
      <x-textarea :max="200" placeholder="约拍内容,限200字" v-model="formBean.content"/>
      <popup-picker title="约拍类型" :data="list" v-model="selType" placeholder="摄影师Or模特" show-name></popup-picker>
      <datetime
        v-model="formBean.abouttime"
        @on-change="change"
        title="约拍时间"
        format="YYYY-MM-DD HH:mm"
      />
    </group>

    <box gap="100px 10px 50px">
      <x-button type="primary" @click.native="handleOk">确定</x-button>
    </box>
  </div>
</template>

<script>
import { Box, XButton, Group, XInput, Alert, AlertModule } from 'vux'
import { mapState } from 'vuex'
import { newYuepai } from '@/utils/api'

export default {
  components: {
    Box, XButton, Group, XInput, Alert, AlertModule
  },
  data: _ => ({
    formBean: {
      phone: '',
      name: '',
      content: '',
      qq: '',
      abouttime: ''
    },

    list: [
      [
        {name: '模特', value: '1'},
        {name: '摄影师', value: '2'}
      ]
    ],
    selType: []
  }),
  methods: {
    handleOk () {
      if (!this.formBean.name) {
        this.$vux.toast.text('填写称呼')
        return
      }
      if (!this.$refs.mobile.valid) {
        this.$vux.toast.text('正确的手机号码')
        return
      }
      if (!this.formBean.qq) {
        this.$vux.toast.text('填写QQ')
        return
      }
      if (!this.formBean.content) {
        this.$vux.toast.text('填写约拍内容')
        return
      }
      if (!this.selType.length) {
        this.$vux.toast.text('填写约拍类型')
        return
      }
      if (!this.formBean.abouttime) {
        this.$vux.toast.text('选择约拍时间')
        return
      }
      this.formBean.type = this.selType[0]
      newYuepai(this.formBean).then(r => {
        this.$vux.toast.text('申请已提交,稍后专人与您联系')
      })
    },
    change (e) {
      console.log(e)
    }
  },
  computed: {
    ...mapState(['info'])
  }
}
</script>
