<template>
  <div>
    <search
      style="position: fixed;top: 0px; z-index:500"
      @on-submit="doSearch"
      @on-cancel="clearSearch"
      v-model="keyword"
    />
    <tab style="position: fixed;top: 44px; z-index:500;left:0;right:0" v-model="tabInx">
      <!-- <tab-item
        v-for="(i, inx) in tabs"
        :key="inx"
        @on-item-click="handleItemSelect(i)"
      >{{i.name}}</tab-item> -->
    </tab>
    <scroller
      lock-x
      @on-scroll-bottom="handleMore"
      ref="pv"
    >
      <div style="padding: 88px 0 53px 0">
        xiongdei,来到了home
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
import { PHOTOS } from '@/utils/const'
import { allPhotoTypes, getPhotosByType } from '@/utils/api'

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
    selTabId: '',

    keyword: ''
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
        categoryId: this.selTabId,
        page: this.page,
        keyword: this.keyword
      }
      getPhotosByType(p).then(r => {
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
    doSearch () {
      this.getData(true)
    },
    clearSearch () {
      this.keyword = ''
      this.getData(true)
    },
    mockData () {
      let arr = []
      for (let i = 0; i < 4; i++) {
        arr.push({
          id: i + 1,
          title: '花漾写真 [HuaYang] 2019.06.10 VOL.146 王雨纯',
          src: PHOTOS[Math.floor(Math.random() * PHOTOS.length)],
          count: 0,
          avatar: 'http://file.idray.com//Image/Brand/huayang.jpg!wh50',
          name: '花漾show',
          time: '2019-06-10',
          userId: 12
        })
      }
      return arr
    },
    handleItemSelect (i) {
      this.selTabId = i.id
    }
  },
  watch: {
    selTabId (val) {
      if (val) {
        this.getData(true)
      }
    }
  },
  mounted () {
    allPhotoTypes().then(r => {
      this.tabs = r.data
      if (this.tabs.length) {
        this.selTabId = this.tabs[0].id
      }
    })
  }
}
</script>
