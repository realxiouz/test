<template>
  <div>
    <div style="height:60vw">
      <video :src="src" ref="v" class="video" controls autoplay @ended="handleEnd" @timeupdate="handleTime"></video>
    </div>
    <div class="buy-tip" v-if="!isBuy">
      <span style="color:#999;font-size:16px">免费观看 10 秒,打赏后观看完整版</span>
      <div>
        <x-button mini type="primary" @click.native="preCharge">打赏</x-button>
      </div>
    </div>

    <group>
      <x-textarea :max="200" placeholder="购买后可评价资源" v-model="post" required ref="ta"></x-textarea>
      <cell>
        <x-button mini type="primary" @click.native="doPost">发送</x-button>
      </cell>
    </group>

    <group>
      <card :header="{title: '最新评论'}" :footer="{title: '查看更多'}">
        <div slot="content">
          <div style="display: flex;padding:15px;border-bottom: 1px solid #ddd;" v-for="(i, inx) in comments" :key="inx">
            <img :src="webHost+i.user.avatar" alt="" style="width:60px;height:60px;margin-right:10px">
            <div>
              <div style="font-size:17px;font-weight:400">{{i.user.nickname}}</div>
              <div style="font-size:13px;color: #999">{{i.content}}</div>
            </div>
          </div>
        </div>
      </card>
    </group>
    <alert v-model="showBuyDialog" button-text="打赏观看" @on-hide="preCharge">
      <div>您已观看了10秒</div>
      <div>
        只需要打赏
        <span style="color:#f5b527">{{coin}} </span>金币
      </div>
      <div>就能观看完整版</div>
    </alert>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getVideoDetail, buyVideo, checkBuyVideo, commentList, postComment } from '@/utils/api'
import { WEB_HOST, validateToken } from '@/utils/const'

export default {
  name: 'VideoDetail',
  data: _ => ({
    isBuy: false,
    coin: 100,
    showBuyDialog: false,
    post: '',
    comments: [],
    src: '',
    webHost: WEB_HOST
  }),
  methods: {
    ...mapMutations(['setRedirectPath']),
    preCharge () {
      if (!validateToken(new Date().getTime())) {
        this.setRedirectPath(this.$route.path)
        this.$router.push({ path: '/login' })
        return
      }
      buyVideo({id: this.$route.params.id}).then(r => {
        this.isBuy = true
      }).catch(e => {
        this.$vux.confirm.show({
          title: '余额不足',
          content: '前往充值',
          onConfirm: _ => {
            this.setRedirectPath(this.$route.path)
            this.$router.push({
              name: 'Recharge'
            })
          }
        })
      })
    },
    handleEnd () {
      if (!this.isBuy) {
        this.showBuyDialog = true
      }
    },
    handleTime () {
      let t = Math.floor(this.$refs.v.currentTime)
      if (t >= 10) {
        if (!this.isBuy) {
          this.$refs.v.pause()
          this.showBuyDialog = true
        }
      }
    },
    doPost () {
      if (!this.$refs.ta.valid) {
        this.$vux.toast.text('还没有写内容呢')
        return
      }
      postComment({
        video_id: this.$route.params.id,
        content: this.post
      }).then(r => {

      })
    }
  },
  computed: {
    ...mapState(['user'])
  },
  mounted () {
    if (validateToken(new Date().getTime())) {
      checkBuyVideo({id: this.$route.params.id}).then(r => {
        this.isBuy = true
      })
    }

    getVideoDetail({id: this.$route.params.id}).then(r => {
      this.src = WEB_HOST + r.data.file
      this.coin = r.data.price
    })

    commentList({
      video_id: this.$route.params.id,
      page: 1
    }).then(r => {
      this.comments = r.data
    })
  }
}
</script>


<style lang="less" scoped>
.video{
  width: 100%;
  height: auto;
  background: #000;
}
.buy-tip{
  padding: 15px 10px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
</style>

