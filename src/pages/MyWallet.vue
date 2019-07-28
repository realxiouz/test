<template>
  <div>
    <card>
      <div slot="content" class="money-count">
        <div class="vux-1px-r">
          <span style="color:gray">钱包余额(元)</span>
          <br/>
          <span style="color:black;font-weight:bold;margin:8px 0;font-size:20px">{{user.money}}</span>
          <br/>
          <span style="color:gray;font-size:14px">{{`可提现${parseInt(user.money/10)*10}元`}}</span>
        </div>
        <div>
          <span style="color:gray">金币余额</span>
          <br/>
          <span style="color:black;font-weight:bold;margin:8px 0;font-size:20px">{{user.score}}</span>
          <br/>
          <span style="color:gray;font-size:14px">需要加油哦</span>
        </div>
      </div>
    </card>

    <group>
      <cell title="提现" is-link link="/with-draw"></cell>
      <cell title="提现规则" link="/money-tip/1"></cell>
    </group>

    <group>
      <cell title="金币明细" is-link></cell>
      <cell title="余额明细" is-link></cell>
    </group>

    <box gap="10px 10px">
      <x-button type="primary" link="/recharge">充值</x-button>
      <x-button type="default" link="/order-list">充值记录</x-button>
    </box>
  </div>
</template>

<script>
import { XButton, Box } from 'vux'
import { mapState } from 'vuex'

export default {
  components: {
    XButton, Box
  },
  data: _ => ({
    coin: 0
  }),
  mounted () {

  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang='less' scoped>
.money-count{
  display: flex;
  padding: 20px 0;
  >div{
    flex: 1;
    text-align: center;
  }
}
</style>
