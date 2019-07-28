<template>
  <div>
    <div style="padding: 10px;background: #fff">
      <q-tag v-for="(i, inx) in tags" :key="inx" :class="{active: inx==selInx}" style="margin-right:10px" @click.native="handleSelTag(inx)">{{i}}</q-tag>
    </div>
    <div style="padding: 10px;">
      下级会员&nbsp;{{total}}&nbsp;人,收益&nbsp;{{money}}&nbsp;元
    </div>
    <scroller
      lock-x
      @on-scroll-bottom="handleMore"
      ref="pv"
    >
      <div style="padding: 0px 0 0">
        <group gutter="0px">
          <cell
            v-for="(i, inx) in list"
            :key="inx"
            :title="i.nickname"
            :inline-desc="moment(i.createtime*1000).format('YYYY-MM-DD hh:mm')"
          >
            <img
              slot="icon"
              :src="i.avatar"
              style="width:40px;height:40px;border-radius: 50%;margin-right:8px"
            />
            <div>
              收益:{{i.money}}<br/>
              提成:{{i.royalty}}
            </div>
          </cell>
        </group>
      </div>
    </scroller>
  </div>
</template>

<script>
import QTag from '@/components/Tag'
import { myTeam } from '@/utils/api'
import moment from 'moment'

export default {
  data: _ => ({
    list: [],
    tags: ['今天', '昨天', '近三天', '近七天', '全部'],
    selInx: 0,
    total: 0,
    money: 0,
    page: 1,
    moment
  }),
  methods: {
    handleSelTag (inx) {
      this.selInx = inx
      this.getData(true)
    },
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
      switch (this.selInx) {
        case 0:
          p.today = true
          break;
        case 1:
          p.yesterday = true
          break;
        case 2:
          p.lastThreeDays = true
          break;
        case 3:
          p.lastSevenDays = true
          break;
        case 4:
          p.all = true
          break;
        default:
          break;
      }
      myTeam(p).then(r => {
        let data = r.data.list
        if (this.page === 1) {
          this.list = []
        }
        this.list.push(...data)
        this.total = r.data.count
        this.money = r.data.allmoney
        if (!data.length) {
          this.isEnd = true
        }
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
  },
  components: {
    QTag
  },
  mounted() {
    this.getData()
  }
}
</script>
