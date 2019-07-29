<template>
  <div>
    <div class="ad-wrap" v-if="show">
      <div class="ad-content">
        <swiper auto class="ads" :show-dots="false" :loop="true" height="120px">
          <swiper-item class="black" v-for="(i, inx) in list" :key="inx" @click.native="newPage(i)">
            <img :src="webHost+i.image" alt />
          </swiper-item>
        </swiper>
        <div class="t">广告</div>
        <div class="t close" @click="handleClose">关闭</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ad } from '@/utils/api'
import { WEB_HOST } from '@/utils/const'
// import { setTimeout } from 'timers'

export default {
  mounted () {
    ad().then(r => {
      this.list = r.data
    })
  },
  data: _ => ({
    list: [],
    webHost: WEB_HOST,
    show: true
  }),
  methods: {
    newPage (i) {
      window.open(i.target, '_blank')
    },
    handleClose () {
      this.show = false
      setTimeout(_ => {
        this.show = true
      }, 60000)
    }
  }
}
</script>

<style lang="less" scoped>
.ad-wrap {
  position: fixed;
  bottom: 53px;
  left: 0;
  right: 0;
  height: 120px;
  .ad-content {
    position: relative;
    width: 100%;
    height: 100%;
    .t {
      position: absolute;
      padding: 5px 10px;
      bottom: 0px;
      right: 0px;
      // border: 1px solid gray;
      // border-radius: 8px;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      font-size: 6px;
      &.close {
        top: 0;
        bottom: auto;
      }
    }
    .ads {
      position: absolute;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>

