<template>
  <div>
    <box gap="40px">
      <span style="font-size: 20px;font-weight: 400;">{{type==='1'? '商务合作':'加盟/代理'}}</span>
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
      <x-textarea :max="200" placeholder="合作内容,限200字" v-model="formBean.content"/>
    </group>

    <box gap="100px 10px 50px">
      <x-button type="primary" @click.native="handleOk">确定</x-button>
    </box>
  </div>
</template>

<script>
import { Box, XButton, Group, XInput, Alert, AlertModule } from 'vux'
import { mapState } from 'vuex'
import { corporateApply, addApply } from '@/utils/api'

export default {
  mounted () {
    this.type = this.$route.query.type
    if (this.type === '2') {
      document.title = '加盟/代理'
    }
  },
  components: {
    Box, XButton, Group, XInput, Alert, AlertModule
  },
  data: _ => ({
    formBean: {
      phone: '',
      name: '',
      content: ''
    },
    type: '1'
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
      if (!this.formBean.content) {
        this.$vux.toast.text('填写合作内容')
        return
      }
      let method = this.type === '1' ? corporateApply : addApply
      method(this.formBean).then(r => {
        this.$vux.toast.text('申请已提交,稍后专人与您联系')
      })
    }
  },
  computed: {
    ...mapState(['info'])
  }
}
</script>
