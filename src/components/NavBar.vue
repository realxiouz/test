<template>
  <tabbar>
    <tabbar-item v-for="(i, inx) in tabs" :key="inx" :link="i.link" :selected="$route.path === i.link">
      <img slot="icon" :src="i.src">
      <img slot="icon-active" :src="i.active">
      <span slot="label">{{i.label}}</span>
    </tabbar-item>
  </tabbar>
</template>

<script>

export default {
  data: _ => ({
    tabs: [
      {src: require('../assets/home.png'), active: require('../assets/home-active.png'), label: '首页', link: '/home'},
      {src: require('../assets/photo.png'), active: require('../assets/photo-active.png'), label: '套图', link: '/photos'},
      {src: require('../assets/video.png'), active: require('../assets/video-active.png'), label: '视屏', link: '/videos'},
      {src: require('../assets/me.png'), active: require('../assets/me-active.png'), label: '我', link: '/user-center'}
    ]
  })
}
</script>
