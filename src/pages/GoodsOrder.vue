<template>
  <div>
    <box class="goods-wrap" gap="10px 10px">
      <img :src="webHost+goods.images"/>
      <div class="right">
        <div style="margin:10px 0">{{goods.content}}</div>
        <div class="cu-tag bg-cyan" style="padding: 4px 8px;font-size:12px;margin-bottom:10px">{{goods.goods_name}}</div>
        <div class="flex justify-between" style="align-items: flex-end;">
          <div>库存: {{goods.num}}</div>
          <div>金币: <span class="text-bold text-red" style="font-size:20px">{{goods.integral}}</span></div>
        </div>
      </div>
    </box>
    <group>
      <x-number title="购买数量" v-model="count" :min="1" :max="10"></x-number>
      <cell
        title="收货地址"
        :is-link="true"
        link="/area-list"
        :value="isSet?'已设置':'还未设置'"
      >
      </cell>
    </group>
    <box gap="10px 10px" style="margin-top: 100px">
       <x-button type="primary" @click.native="handleOk">兑换</x-button>
     </box>
  </div>
</template>

<script>
import { addressDefault, goodsBuy } from '@/utils/api'
import { mapState } from 'vuex'
import { WEB_HOST } from '@/utils/const'

export default {
  mounted () {
    addressDefault().then(r => {
      this.isSet = true
      this.aId = r.data.address_id
    })
  },
  data: _ => ({
    count: 1,
    webHost: WEB_HOST,
    isSet: false,
    aId: ''
  }),
  computed: {
    ...mapState(['goods'])
  },
  methods: {
    handleOk () {
      if (!this.aId) {
        this.$vux.toast.text('还未设置收货地址')
        return
      }
      let p = {
        goodId: this.goods.id,
        adressId: this.aId,
        num: this.count
      }
      goodsBuy(p).then(r => {
        this.$vux.toast.text(r.msg)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.goods-wrap{
  display: flex;
  >img{
    width: 120px;
    height: 120px;
  }
  .right{
    padding: 0 10px;
    flex: 1;
  }
}
</style>
