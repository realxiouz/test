<template>
  <div>
    <div class="title">
      {{article.title}}
    </div>
    <div class="auth">
      <div class="auth-left">
        <div class="auth-img">
          <img :src="webHost+article.avatar" alt="">
        </div>
        <span class="dot"></span>
        <div>{{article.nickname}}</div>
      </div>
      <div class="auth-right">
        <span>{{moment().from(article.createtime*1000)}}</span>
        <span class="dot"></span>
        <span>{{article.pv}}浏览</span>
      </div>
    </div>
    <div class="content" v-html="article.content" ref="content"></div>
    <div class="share">
      <div>
        <div @click="showApply">
          <img src="../assets/pv.png" alt="">
          <span>审核任务</span>
        </div>
      </div>
      <div @click="shareWechat">
        <div>
          <img src="../assets/wechat.png" alt="">
          <span>微信</span>
        </div>
      </div>
      <div>
        <div>
          <img src="../assets/cicle.png" alt="">
          <span>朋友圈</span>
        </div>
      </div>
    </div>
    <div style="height:10px"></div>

    <x-dialog v-model="showToast" class="dialog-demo">
      <div style="padding:15px; height:200px">
        <img style="width:100%;height:100%" :src="webHost+article.qrcodeimage">
      </div>
      <div @click="showToast=false">
        <span class="vux-close"></span>
      </div>
    </x-dialog>

    <x-dialog v-model="showToast1" class="dialog-demo">
      <div style="padding:10px;">
        <uploader :images="imgs" :max="1" title='上传分享截图,获取奖励'/>
      </div>
      
      <div style="padding:10px;">
        <x-button type="primary" @click.native="apply">提交审核</x-button>
      </div>
    </x-dialog>

    <x-dialog v-model="showToast2" class="dialog-demo" hide-on-blur>
      <!-- <div style="padding:10px;">
        <uploader :images="imgs" :max="1" title='上传分享截图,获取奖励'/>
      </div> -->
      <img style="width:100%;height:auto" :src="webHost+article.qrcodeimage">
    </x-dialog>
  </div>
</template>

<script>
import { getArticleDetail, doApply } from '@/utils/api'
import {WEB_HOST} from '@/utils/const'
import moment from 'moment'
import Uploader from '@/components/Uploader'

export default {
  name: 'ArticleDetail',
  mounted () {
    this.getData()
  },
  data: _ => ({
    article: {},
    moment,
    webHost: WEB_HOST,
    showToast: false,
    imgs: [],
    showToast1: false,
    showToast2: false
  }),
  methods: {
    getData () {
      getArticleDetail({id: this.$route.params.id}).then(r => {
        this.article = r.data
        this.$nextTick(_ => {
          this.$refs.content.querySelector('img').style.width = '100%'
          this.$refs.content.querySelector('img').style.height = 'auto'
        })
        this.showToast2 = true
      })
    },
    shareWechat () {
      this.showToast = true
    },
    showApply () {
      this.showToast1 = true
    },
    apply () {
      if (!this.imgs.length) {
        this.$vux.toast.text('还没有上传分享截图呢')
        return
      }
      let p = {
        articleId: this.$route.params.id,
        qrcodeimage: this.imgs[0]
      }
      doApply(p).then(r => {
        this.$vux.toast.text(r.msg)
        this.showToast1 = false
        this.imgs = []
      })
    }
  },
  components: {
    Uploader
  }
}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/close';

.dialog-demo {
  .weui-dialog{
    border-radius: 8px;
    padding-bottom: 8px;
  }
  .dialog-title {
    line-height: 30px;
    color: #666;
  }
  .img-box {
    height: 350px;
    overflow: hidden;
  }
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
}
  .title{
    padding: 0 14px;
    font-size: 24px;
    line-height: 34px;
  }
  .auth{
    position: relative;
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    padding: 0 14px;
    align-items: center;
    .auth-left{
      display: flex;
      align-items: center;
      color: #999999;
      font-size: 12px;
      .auth-img{
        width: 36px;
        height: 36px;
        border-radius: 50%;
        overflow: hidden;
        >img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .auth-right{
      color: #999999;
      font-size: 12px;
    }
    .dot{
      display: inline-block;
      width: 2px;
      height: 2px;
      border-radius: 1px;
      background-color: #999;
      margin: 0 4px;
      vertical-align: middle;
    }
  }
  .content{
      padding: 0 14px;
  }
  .share{
    display: flex;
    justify-content: space-around;
    height: 36px;
    margin-top:10px;
    >div{
      width: 30%;
      border: 1px solid #eee;
      border-radius: 8px;
      display: flex;
      justify-content: space-around;
      >div{
        display: flex;
        align-items: center;
        font-size: 12px;
        // color： #999;
        >img{
                width: 30px;
                height: 30px;
                margin-right: 10px;
              }
      }

    }
  }
</style>
