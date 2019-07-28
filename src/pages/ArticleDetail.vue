<template>
  <div>
    <div class="title">
      {{article.title}}
    </div>
    <div class="auth">
      <div class="auth-left">
        <div class="auth-img">
          <img src="" alt="">
        </div>
      </div>
      <div class="auth-right">
        <span>{{moment().from(article.createtime*1000)}}</span>
        <span class="dot"></span>
        <span>{{article.pv}}浏览</span>
      </div>
    </div>
    <div class="content" v-html="article.content"></div>
  </div>
</template>

<script>
import { getArticleDetail } from '@/utils/api'
import moment from 'moment'

export default {
  name: 'ArticleDetail',
  mounted () {
    this.getData()
  },
  data: _ => ({
    article: {},
    moment
  }),
  methods: {
    getData () {
      getArticleDetail({id: this.$route.params.id}).then(r => {
        this.article = r.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
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
    .autrh-left{

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
</style>
