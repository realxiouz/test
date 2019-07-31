<template>
  <div class="q-bar">
    <div class="bar-item" v-for="(i, inx) in barData" :key="inx" :class="i.path===$route.path?'active':''" @click="$router.push(i.path)">
      <div class="img-warp">
        <img :src="i.path===$route.path?i.active:i.src" />
      </div>
      <p class="title">{{i.text}}</p>
    </div>
  </div>
</template>

<script>

export default {
  data: _ => ({
    barData: [
      {text: '首页', src: require('@/assets/home1.jpg'), active: require('@/assets/test.png'), path: '/home'},
      {text: '套图', src: require('@/assets/photo1.jpg'), active: require('@/assets/test.png'), path: '/photos'},
      {text: '看图/文赚钱', src: require('@/assets/money1.jpg'), active: require('@/assets/test.png'), path: '/articles'},
      {text: '视屏', src: require('@/assets/video1.jpg'), active: require('@/assets/test.png'), path: '/videos'},
      {text: '我的', src: require('@/assets/me1.jpg'), active: require('@/assets/test.png'), path: '/user-center'}
    ]
  })
}
</script>

<style lang="less" scoped>
.q-bar{
  display: flex;
  position: fixed;
  z-index: 500;
  bottom: 0;
  width: 100%;
  // background-color: #252C36;
  background-color: #000000;
  height: 53px;
  &::before{
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #C0BFC4;
    color: #C0BFC4;
  }
  .bar-item{
    display: block;
    flex: 1;
    padding: 5px 0 0;
    font-size: 0;
    color: #999999;
    text-align: center;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    position: relative;
    &.active{
      .img-warp{
        // background: #252C36;
        background-color: #000;
        padding: 5px 5px;
        border-top-left-radius: 50%;
        border-top-right-radius: 50%;
        border-top: 1px solid #C0BFC4;
        position: relative;
        top: -25px;
        width: 40px;
        height: 40px;
      }
      .title {
        color: #17BA9D;
      }
    }
    .img-warp{
      display: inline-block;
      width: 27px;
      height: 27px;
      > img {
        width:100%;
        height: 100%;
      }
    }
    .title{
      text-align: center;
      color: #77787B;
      font-size: 10px;
      line-height: 1.8;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 0);
      width:100%;
    }
  }
}
</style>

