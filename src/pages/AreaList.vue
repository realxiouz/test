<template>
  <div>
    <group>
       <popup-picker title="选择地区" :data="list" :columns="3" v-model="val" ref="picker"></popup-picker>
       <!-- <cell title="获取值对应的文字" :value="$refs.picker3&&$refs.picker3.getNameValues()"></cell> -->
       <!-- <popup-picker :title="title4" :data="list3" :columns="3" v-model="value4" show-name></popup-picker> -->
     </group>
  </div>
</template>

<script>
import { getArea } from '@/utils/api'
export default {
  mounted () {
    getArea().then(r => {
      this.list = r.data
    })
  },
  data: _ => ({
    list: [],
    val: []
  }),
  methods: {
    pushData () {
    }
  }
}
</script>
