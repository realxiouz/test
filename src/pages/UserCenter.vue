<template>
  <div>
    <scroller lock-x >
      <div style="padding: 0 0 53px">
        <div class="top" @click="$router.push({name: 'EditProfile'})">
          <div class="ava-wrap">
            <img :src="user.avatar&&user.avatar.startsWith('data:image')?user.avatar:webHost+user.avatar">
          </div>
          <div class="name">{{user.nickname||user.mobile}}</div>
          <div>{{user.level == 1 ? '(合伙人)':'(普通会员)成为合伙人?)'}}</div>
        </div>
        <div class="f3">
          <div class="item" @click="$router.push('/money-tip/0')">赚钱秘籍</div>
          <div class="item" @click="$router.push('/qrcode')">我的二维码</div>
          <div class="item" @click="$router.push('/my-group')">我的团队</div>
        </div>
        <group v-for="(item, index) in groups" :key="`group${index}`" :title="item.text">
          <cell :title="i.title" :is-link="!!i.link" v-for="(i, inx) in item.children" :key="`group${index}cell${inx}`" :link="i.link">
            <span slot="after-title" v-if="i.des" style="font-size:14px;color:gray">{{i.des}}</span>
            <img slot="icon" width="20" style="display:block;margin-right:5px;" :src="i.src"/>
          </cell>
        </group>
        <box gap="20px 10px">
          <x-button @click.native="handleLogout" type="warn">退出登录</x-button>
        </box>
      </div>
    </scroller>
    <!-- <div class="card-charge">
      <div class="card-item">
        <div class="content">
          <img src="../assets/card.png" alt="">
          <div>
            <div class="title">加油卡充值</div>
            <div class="sub-title">8.8折起</div>
          </div>
        </div>
      </div>
      <div class="card-item">
        <div class="content">
          <img src="../assets/card.png" alt="">
          <div>
            <div class="title">话费充值</div>
            <div class="sub-title">9折起</div>
          </div>
        </div>
      </div>
    </div> -->
    <nav-bottom />
  </div>
</template>

<script>
import { Group, Cell } from 'vux'
import { mapState, mapMutations } from 'vuex'
import { WEB_HOST } from '@/utils/const'
import { logout } from '@/utils/api'
import NavBottom from '@/components/NavBar1'

export default {
  components: {
    Group,
    Cell,
    NavBottom
  },
  data () {
    return {
      webHost: WEB_HOST,
      groups: [
        {
          text: '我的账户',
          children: [
            {title: '红包任务', src: require('../assets/card.png'), link: '/reward'},
            {title: '分享推广', src: require('../assets/code.png'), link: '/qrcode'},
            {title: '兑换礼品', src: require('../assets/order.png'), link: '', des: '(金币可兑换礼品)'}
          ]
        },
        {
          text: '我的钱包',
          children: [
            {title: '钱包金币', src: require('../assets/card.png'), link: '/my-wallet'},
            // {title: '钱包资金', src: require('../assets/code.png'), link: '', des: '(100元倍数可提现)'},
            {title: '我的订单', src: require('../assets/order.png'), link: '/my-order'}
          ]
        },
        {
          text: '我要赚钱',
          children: [
            {title: '看图/文赚钱', src: require('../assets/card.png'), link: '/money-tip/2'},
            {title: '投稿赚钱', src: require('../assets/code.png'), link: '/money-tip/3', des: '(合伙人上传套图)'},
            {title: '发展新合伙人', src: require('../assets/order.png'), link: '/money-tip/4'}
          ]
        },
        {
          text: '我要合作',
          children: [
            {title: '加盟/代理', src: require('../assets/card.png'), link: '/money-tip/5'},
            {title: '我要约拍', src: require('../assets/code.png'), link: '/money-tip/6', des: '(模特or摄影师)'},
            {title: '商务合作', src: require('../assets/order.png'), link: '/money-tip/7'}
          ]
        }
        // [
        //   {title: '我的钱包', src: require('../assets/card.png'), link: '/my-wallet'},
        //   {title: '我的二维码', src: require('../assets/code.png'), link: '/qrcode'},
        //   {title: '我的订单', src: require('../assets/order.png'), link: '/my-order'},
        //   {title: '红包任务', src: require('../assets/reward.png'), link: '/reward'}
        //   {title: '我要赚钱', src: require('../assets/money.png'), link: ''},
        //   {title: '成为合伙人', src: require('../assets/member.png'), link: ''},
        //   {title: '加盟&代理', src: require('../assets/vux_logo.png'), link: ''},
        //   {title: '我要约拍', src: require('../assets/vux_logo.png'), link: ''},
        //   {title: '商务合作', src: require('../assets/vux_logo.png'), link: ''},
        //   {title: '加油卡充值', src: require('../assets/oil.png'), link: ''},
        //   {title: '话费充值', src: require('../assets/phone.png'), link: ''}
        // ]
      ]
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapMutations(['setUser']),
    handleLogout () {
      logout().then(r => {}).finally(_ => {
        localStorage.removeItem('token')
        this.setUser({})
        this.$vux.toast.text('注销成功')
        this.$router.push({name: 'Login'})
      })
    }
  }
}
</script>

<style lang="less" scoped>
.top{
  height: 200px;
  text-align: center;
  box-sizing: border-box;
  padding-top: 45px;
  background: #FFAF00;
  .ava-wrap{
    width: 80px;
    height: 80px;
    display: inline-block;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid #fff;
    box-shadow: 0 1px 10px 0 #a3b4bf;
    >img{
      width: 100%;
      height: 100%;
    }
  }
  .name{
    font-size: 17px;
    color: #fff;
    margin-top: 0px;
  }
}
.f3{
  display: flex;
  background: #C8C8C8;
  .item{
    flex: 1;
    text-align: center;
    padding: 10px 0;
    font-size: 12px;
  }
}

.card-charge{
    display: flex;
    position: absolute;
    z-index: 500;
    bottom: 53px;
    width: 100%;
    background-color: #FFFFFF;
    height: 53px;
    .card-item{
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .content{
        display: flex;
        align-items: center;
        >img{
          width:32px;
          height:32px;
          margin-right: 4px;
        }
        .title{
          font-size: 14px;
          color: #000;
        }
        .sub-title{
          font-size: 8px;
          color: #aaa;
        }
      }
    }
}
</style>

