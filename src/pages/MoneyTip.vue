<template>
  <div>
    <div v-html="tip" ref="tip" style="padding:10px"></div>
    <box gap="10px 100px 100px 100px">
      <x-button plain type="primary" style="border-radius:99px;" @click.native="handleMoney">{{textObj[$route.params.type]}}</x-button>
    </box>
  </div>
</template>

<script>
import { moneyTip, withdrawTip, articleTip, contributeTip, partnerTip, joinTip, yuepaiTip, cooperationTip } from '@/utils/api'
import { mapState } from 'vuex'

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
    tip: '',
    textObj: {
      '0': '去赚钱',
      '1': '去提现',
      '2': '去赚钱',
      '3': '去投稿',
      '4': '去赚钱',
      '5': '去加盟',
      '6': '去约拍',
      '7': '去合作'
    }
  }),
  methods: {
    handleMoney () {
      switch (this.$route.params.type) {
        case '0':
          if (this.user.level === '0') {
            this.$router.push('/member')
          } else {
            this.$router.push('/photo-post')
          }
          break
        case '1':
          this.$router.push('/with-draw')
          break
        case '2':
          this.$router.push('/articles')
          break
        case '3':
          if (this.user.level === '0') {
            this.$router.push('/member')
          } else {
            this.$router.push('/photo-post')
          }
          break
        case '5':
          this.$router.push('/corporate?type=2')
          break
        case '6':
          this.$router.push('/yuepai')
          break
        case '7':
          this.$router.push('/corporate?type=1')
          break
        default:
          break
      }
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>
