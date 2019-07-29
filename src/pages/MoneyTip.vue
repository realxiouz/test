<template>
  <div>
    <div v-html="tip" ref="tip" style="padding:10px"></div>
    <box gap="10px 10px">
      <x-button type="primary" link="">去赚钱</x-button>
    </box>
  </div>
</template>

<script>
import { moneyTip, withdrawTip, articleTip, contributeTip, partnerTip, joinTip, yuepaiTip, cooperationTip } from '@/utils/api'

export default {
  name: 'MoneyTip',
  mounted () {
    let allMethod = {
      '0': moneyTip,
      '1': withdrawTip,
      '2': articleTip,
      '3': contributeTip,
      '4': partnerTip,
      '5': joinTip,
      '6': yuepaiTip,
      '7': cooperationTip
    }
    let getData = allMethod[this.$route.params.type]
    getData().then(r => {
      this.tip = r.data.content
      this.$nextTick(_ => {
        this.$refs.tip.querySelector('img').style.width = '100%'
        this.$refs.tip.querySelector('img').style.height = 'auto'
      })
    })
  },
  data: _ => ({
    tip: ''
  })
}
</script>
