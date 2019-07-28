<template>
  <div>
    <scroller
      lock-x
      @on-scroll-bottom="handleMore"
      ref="pv"
    >
      <div style="padding: 0px 0 53px 0">
        <swiper auto height="200px">
          <swiper-item class="black" v-for="(i, inx) in banners" :key="inx" @click.native="newPage(i)">
            <img :src="webHost+i.image" alt="">
          </swiper-item>
        </swiper>
        <grid :show-lr-borders="false" :show-vertical-dividers="false">
          <grid-item :label="i.label" v-for="(i, inx) in grids" :key="inx">
            <img class="wh" slot="icon" :src="i.src">
          </grid-item>
        </grid>
        <item
          v-for="(i, inx) in list"
          :key="inx"
          :bean="i"
          :type="1"
        />
      </div>
    </scroller>
    <nav-bottom />
  </div>
</template>

<script>
import Item from '@/components/Item'
import NavBottom from '@/components/NavBar1'

import {
  Box,
  XButton,
  Group,
  XInput,
  Alert,
  AlertModule,
  XSwitch,
  Tabbar,
  TabbarItem
} from 'vux'
import { WEB_HOST } from '@/utils/const'
import { getIndexPhoto, getBanner } from '@/utils/api'

export default {
  components: {
    Box,
    XButton,
    Group,
    XInput,
    Alert,
    AlertModule,
    XSwitch,
    Tabbar,
    TabbarItem,
    Item,
    NavBottom
  },
  data: _ => ({
    list: [],
    page: 1,
    isLoading: false,
    isEnd: false,

    tabs: [],
    tabInx: 0,
    
    banners: [],
    webHost: WEB_HOST,

    grids: [
      {label: 'heeh', path: '', src: require('../assets/me-active.png')},
      {label: 'heeh', path: '', src: require('../assets/me-active.png')},
      {label: 'heeh', path: '', src: require('../assets/me-active.png')},
      {label: 'heeh', path: '', src: require('../assets/me-active.png')}
    ]
  }),
  methods: {
    getData (resetPage = false) {
      if (this.isLoading) {
        return
      }
      this.isLoading = true
      if (resetPage) {
        this.page = 1
        this.isEnd = false
      }
      this.$vux.loading.show({text: `加载中...`})
      let p = {
        page: this.page
      }
      getIndexPhoto(p).then(r => {
        let data = r.data
        if (this.page === 1) {
          this.list = []
          this.$refs.pv.reset({top: 0})
        }
        this.list.push(...data)
        if (!data.length) {
          this.isEnd = true
        }
        this.$nextTick(_ => {
          this.$refs.pv.reset()
        })
      }).finally(_ => {
        this.$vux.loading.hide()
        this.isLoading = false
      })
    },
    handleMore () {
      if (!this.isLoading && !this.isEnd) {
        this.page++
        this.getData()
      }
    },
    newPage(i) {
      window.open(i.target , '_blank')
    }
  },
  mounted () {
    getBanner().then(r => {
      this.banners = r.data
    })
    this.getData()
  }
}
</script>

<style lang="less" scoped>
.wh{
  width: 100%;
  height: 100%;
}
.vux-swiper-item{
  >img{
    width: 100%;
  height: 100%;
  }
}
</style>
