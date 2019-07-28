<template>
  <div class="item-wrap">
    <div class="title" @click="toDetail">{{bean.name}}</div>
    <div class="img-wrap" @click="toDetail">
      <img v-if="type === 1" :src="webHost+bean.thumb_image" :style="`height: ${type === 1 ? '375px' : '200px'}`">
      <video v-if="type === 2" :src="webHost+bean.file" style="height: 200px"></video>
      <div class="count">{{bean.price ? `${bean.price}金币` : '免费'}}</div>
    </div>
    <div class="auth-info" @click="toAuth">
      <div class="ava-wrap">
        <img :src="webHost+bean.avatar">
      </div>
      <div class="name-time">
        <div class="name">{{bean.nickname}}</div>
        <div class="time">{{moment(bean.createtime*1000).format('YYYY-MM-DD')}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { WEB_HOST } from '@/utils/const'
import moment from 'moment'
export default {
  props: {
    type: {
      type: Number,
      default: 1
    },
    bean: {
      type: Object
    }
  },
  data: _ => ({
    webHost: WEB_HOST,
    moment
  }),
  methods: {
    toDetail () {
      let path = ''
      if (this.type === 1) {
        path = `/photo-detail/${this.bean.id}`
      } else if (this.type === 2) {
        path = `/video-detail/${this.bean.id}`
      }
      if (path) {
        this.$router.push({path})
      }
    },
    toAuth () {
      this.$router.push({path: `/user/${this.bean.user_id}`})
    }
  }
}
</script>

<style lang="less" scoped>
.item-wrap {
  padding: 15px;
  margin-top: 10px;
  background: #fff;
  &:first-child{
    margin-top: 0px;
  }
  .title {
    font-weight: 400;
    font-size: 17px;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: break-word;
    word-break: break-all;
    margin-bottom: 8px;
  }
  .img-wrap {
    position: relative;
    > img {
      width: 100%;
      margin-right: auto;
      margin-left: auto;
      vertical-align: middle;
    }
    > video {
      width: 100%;
      margin-right: auto;
      margin-left: auto;
      vertical-align: middle;
      background: #000;
    }
    .count {
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: #000;
      opacity: 0.8;
      color: #f5b527;
      font-size: 1rem;
      padding: 6px;
      min-width: 50px;
      text-align: center;
      font-family: arial;
    }
  }
  .auth-info {
    padding: 5px;
    display: flex;
    .ava-wrap {
      width: 40px;
      height: 40px;
      margin-right: 10px;
      > img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .name-time {
      .name {
        height: 25px;
        color: black;
      }
      .time {
        color: #cecece;
        font-size: 14px;
        height: 15px;
        line-height: 1;
      }
    }
  }
}
</style>
