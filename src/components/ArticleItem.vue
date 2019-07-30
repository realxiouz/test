<template>
  <div class="item-detail" @click="$router.push(`/article-detail/${bean.id}`)">
    <div v-if="type===0" class="item type0">
      <div class="title">{{bean.title}}</div>
      <div class="info">
        <div class="item-tag" v-if="bean.is_top">置顶</div>
        <div class="item-tag" v-if="bean.is_hot">热</div>
        <div class="auth">{{bean.username}}</div>
        <div class="v-count">浏览量&nbsp;{{bean.pv}}</div>
        <div class="c-time">{{moment().from(bean.createtime*1000)}}</div>
      </div>
    </div>
    <div v-if="type===1||type===2" class="item type0">
      <div class="title">{{bean.title}}</div>
      <div class="info justify-between">
        <div class="flex">
          <div class="auth">{{bean.username}}</div>
          <div class="v-count">浏览量&nbsp;{{bean.pv}}</div>
          <div class="c-time">{{moment().from(bean.createtime*1000)}}</div>
        </div>
        <div style="color:red">立即分享赚: {{bean.shareprice}}元</div>
      </div>
      <div style="height:160px;margin-top:10px;">
        <img :src="webHost+bean.imgs[0]" style="width:100%;height:100%"/>
      </div>
      <!-- <div class="left">
        <div class="title">{{bean.title}}</div>
        <div class="info">
          <div class="item-tag" v-if="bean.is_top">置顶</div>
          <div class="item-tag" v-if="bean.is_hot">热</div>
          <div class="auth">{{bean.auth}}</div>
          <div class="v-count">浏览量&nbsp;{{bean.pv}}</div>
          <div class="c-time">{{moment().from(bean.createtime*1000)}}</div>
        </div>
      </div>
      <div class="right">
        <img :src="webHost+bean.thumbimage" alt />
      </div> -->
    </div>
    <div v-if="type===3" class="item type3">
      <div class="title">{{bean.title}}</div>
      <div class="info justify-between" style="margin-bottom:10px">
        <div class="flex">
          <div class="auth">{{bean.username}}</div>
          <div class="v-count">浏览量&nbsp;{{bean.pv}}</div>
          <div class="c-time">{{moment().from(bean.createtime*1000)}}</div>
        </div>
        <div style="color:red">立即分享赚: {{bean.shareprice}}元</div>
      </div>
        <ul class="imgs">
          <li style="padding-right: 2px;">
            <img :src="webHost+bean.imgs[0]">
          </li>
          <li>
            <img :src="webHost+bean.imgs[1]">
          </li>
          <li style="padding-left: 2px;">
            <img :src="webHost+bean.imgs[2]">
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { WEB_HOST } from '@/utils/const'

export default {
  props: {
    type: {
      type: Number,
      default: 0
    },
    bean: Object
  },
  data: _ => ({
    moment,
    webHost: WEB_HOST
  })
}
</script>

<style lang="less" scoped>
.item-detail {
  margin: 0px 15px;
  border-bottom: 1px solid rgba(221, 221, 221, 0.6);
  .item {
    padding: 16px 0;
  }
  .type0 {
    .title {
      line-height: 21px;
      font-size: 17px;
      max-height: 42px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    // .info{
    //   margin-top: 6px;
    //   display: flex;
    //   line-height: 12px;
    //   font-size: 10px;
    //   color: #999;
    //   .item-tag{
    //     color: #f85959;
    //     border: 1px solid rgba(248, 89, 89, 0.5);
    //         border-radius: 2px;
    //         line-height: 12px;
    //         font-size: 9px
    //   }
    //   >div{
    //     margin-right: 5px;
    //   }
    // }
  }
  // .type1 {
  //   display: flex;
  //   .left {
  //     width: 67%;
  //     padding-right: 12px;
  //     .title{
  //       line-height: 21px;
  //       font-size: 17px;
  //       max-height: 63px;
  //       display: -webkit-box;
  //       -webkit-box-orient: vertical;
  //       -webkit-line-clamp: 3;
  //       overflow: hidden;
  //     }
  //   }
  //   .right {
  //     width: 33%;
  //     height: 83px;
  //     > img {
  //       width: 100%;
  //       height: 100%;
  //     }
  //   }
  // }
}

.info {
  margin-top: 6px;
  display: flex;
  line-height: 12px;
  font-size: 10px;
  color: #999;
  .item-tag {
    color: #f85959;
    border: 1px solid rgba(248, 89, 89, 0.5);
    border-radius: 2px;
    line-height: 12px;
    font-size: 9px;
  }
  > div {
    >div{
      margin-right: 5px;
    }
  }
}

.imgs{
  margin-top:10px;
  display: block;
  margin: 0;
  padding: 0;
  list-style-type: none;
  font-size: 0;
  text-align: center;
  li{
    display: inline-block;
    overflow: hidden;
    width: 33.3%;
    box-sizing: border-box;
    height: 80px;
    >img{
      width:100%;
      height:100%;
    }
  }
}
</style>

