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
            inline-desc="2005-06-07 09:30"
          >
            <img
              slot="icon"
              src="http://wcwadmin.51dreaming.com/uploads/20190710/48c7452894a22e8827cfbe2bd7b35a19.jpg"
              style="width:40px;height:40px;border-radius: 50%;margin-right:8px"
            />
            <div>
              收益:100<br/>
              提成:99
            </div>
          </cell>
        </group>
      </div>
    </scroller>
  </div>
</template>

<script>
import QTag from '@/components/Tag'
export default {
  data: _ => ({
    list: [
      {
        nickname: '111'
      }
    ],
    tags: ['今天', '昨天', '近三天', '近七天', '全部'],
    selInx: 0,
    total: 0,
    money: 0
  }),
  methods: {
    handleMore () {

    },
    handleSelTag (inx) {
      this.selInx = inx
    }
  },
  components: {
    QTag
  }
}
</script>
