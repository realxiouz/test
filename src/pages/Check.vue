<template>
    <div>
        <div class="wtf flex justify-between">
          分享图文审核
          <span style="font-weight:normal;color: green;" @click="$router.push('/check-list')">审核列表</span>
        </div>
        <div style="padding:58px 10px 0">
          <uploader :images="imgs" :max="1" title='上传分享截图,获取奖励'/>
        </div>
        <box gap="100px 10px 0">
            <x-button type="primary" @click.native="handleOk">提交审核</x-button>
        </box>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { doApply } from '@/utils/api'
import Uploader from '@/components/Uploader'

export default {
  data () {
    return {
      imgs: []
    }
  },
  computed: {
    ...mapState(['oilRatio'])
  },
  methods: {
    handleOk () {
      if (!this.imgs.length) {
        this.$vux.toast.text('还未上传截图')
        return
      }
      doApply({
        qrcodeimage: this.imgs[0]
      }).then(r => {
        this.$vux.toast.text('申请已提交,等待审核')
        setTimeout(_ => {
          this.$router.push('/check-list')
        }, 1500)
      })
    }
  },
  components: {
    Uploader
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
