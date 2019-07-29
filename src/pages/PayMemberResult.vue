<template>
  <div>
    <msg :title="title" :description="description" :buttons="buttons" :icon="icon"/>
  </div>
</template>

<script>
import { checkMemberPay } from '@/utils/api'
export default {
  mounted () {
    let id = this.$route.params.id
    checkMemberPay({id}).then(r => {
      this.title = '支付成功'
      this.icon = 'success'
      this.description = r.msg
    }).catch(e => {
      this.title = '支付失败'
      this.icon = 'warn'
      this.description = e.message
    })
  },
  name: 'PayResult',
  data: _ => ({
    title: '查询中',
    description: '请稍等',
    buttons: [
      {
        type: 'primary',
        text: '个人中心',
        link: '/user-center'
      }
    ],
    icon: 'waiting'
  })
}
</script>
