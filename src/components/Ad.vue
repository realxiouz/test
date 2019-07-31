<template>
  <div>
    <div class="ad-wrap" v-if="show" :style="bottom">
      <div class="ad-content">
        <swiper :auto="false" class="ads" :show-dots="false" :loop="true" height="120px">
          <swiper-item class="black" v-for="(i, inx) in list" :key="inx" @click.native="newPage(i)">
            <div class="ad-detail">
              <img :src="webHost+i.image">
              <div>
                <div class="title">{{i.name}}</div>
                <div class="des">{{i.description||'暂无描述'}}</div>
              </div>
              <div class="see">查看详情</div>
            </div>
          </swiper-item>
        </swiper>
        <!-- <div class="t">广告</div> -->
        <div class="t close" @click="handleClose">关闭</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ad } from '@/utils/api'
import { WEB_HOST } from '@/utils/const'

export default {
  mounted () {
    ad().then(r => {
      this.list = r.data
    })

    setTimeout(_ => {
      this.show = true
    }, 8000)
  },
  data: _ => ({
    list: [],
    webHost: WEB_HOST,
    show: false
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
  },
  computed: {
    bottom () {
      let arr = ['/home', '/photos', '/articles', '/videos', '/user-center']
      if (arr.includes(this.$route.path)) {
        return 'bottom: 53px'
      } else {
        return 'bottom: 0'
      }
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
      // background: rgba(0, 0, 0, 0.5);
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
      
    }
  }
}

.ad-detail{
 width: 100%;
 height: 100%;
 display: flex;
 box-sizing: border-box;
 padding: 10px;
 background: rgba(0,0,0,.5);
  img {
    width: 100px;
    height: 100px;
    margin-right: 16px;
  }
  >div{
    flex: 1;
    color: #fff;
    .title{
      font-weight: bold;
      font-size: 22px;
    }
    .des{

    }
  }
  .see{
    position: absolute;
    bottom: 10px;
    right: 10px;
    padding: 2px 6px;
    background: #0081ff;
    color: #fff;
    border-radius: 4px;
  }
}
</style>

