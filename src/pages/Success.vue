<template>
  <div>
    <msg :title="title" :description="description" :buttons="buttons" :icon="icon"/>
  </div>
</template>

<script>
export default {
  data: _ => ({
    title: '申请已提交',
    description: '等待后台审核',
    buttons: [
      {
        type: 'primary',
        text: '个人中心',
        link: '/user-center'
      }
    ],
    icon: 'success'
  })
}
</script>

