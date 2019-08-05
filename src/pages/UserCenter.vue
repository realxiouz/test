<template>
  <div>
    <scroller lock-x>
      <div style="padding: 0 0 53px">
        <div class="top" @click="$router.push({name: 'EditProfile'})">
          <div class="ava-wrap">
            <img
              :src="user.avatar&&user.avatar.startsWith('data:image')?user.avatar:webHost+user.avatar"
            />
          </div>
          <div class="name">{{user.nickname||user.mobile}}</div>
          <div @click.stop="$router.push('/member')">{{user.level == 1 ? '(合伙人)':'(普通会员)成为合伙人?'}}</div>
        </div>
        <div class="f3">
          <div class="item" @click="$router.push('/money-tip/0')">赚钱秘籍</div>
          <div class="item" @click="$router.push('/qrcode')">我的二维码</div>
          <div class="item" @click="$router.push('/my-group')">我的团队</div>
        </div>
        <group v-for="(item, index) in groups" :key="`group${index}`" class="vux-1px-b">
          <div
            slot="title"
            class="weui-cell_access"
            style="display: flex;justify-content: space-between;padding: 10px 15px;"
            @click="item.show = !item.show"
          >
            <div class="flex"><img style="display:block;margin-right:5px;width:20px;height:20px" src="../assets/wenjian.png" />{{item.text}}</div>
            <div :class="!item.show ?'bottom1' :'top1'"></div>
          </div>
          <template v-if="item.show">
            <cell
              :title="i.title"
              :is-link="!!i.link"
              v-for="(i, inx) in item.children"
              :key="`group${index}cell${inx}`"
              :link="i.link"
            >
              <span slot="after-title" v-if="i.des" style="font-size:14px;color:gray">{{i.des}}</span>
              <!-- <img slot="icon" width="20" style="display:block;margin-right:5px;" :src="i.src" /> -->
            </cell>
          </template>
        </group>
        <div class="card-charge" style="margin-top:20px">
          <div class="card-item vux-1px-r">
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
        </div>
        <box gap="20px 10px">
          <x-button @click.native="handleLogout" type="warn">退出登录</x-button>
        </box>
      </div>
    </scroller>
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
  mounted () {
    if (this.user.level === '0') {
      this.groups = [
        {
          text: '我的账户',
          show: false,
          children: [
            {
              title: '红包任务',
              link: '/reward'
            },
            {
              title: '分享推广',
              link: '/qrcode'
            },
            {
              title: '兑换礼品',
              link: '/goods',
              des: '(金币可兑换礼品)'
            }
          ]
        },
        {
          text: '我的钱包',
          show: false,
          children: [
            {
              title: '钱包金币',
              link: '/my-wallet'
            },
            {
              title: '我的订单',
              link: '/my-order'
            }
          ]
        },
        {
          text: '我要赚钱',
          show: false,
          children: [
            {
              title: '投稿赚钱',
              link: '/member',
              des: '(合伙人上传套图)'
            },
            {
              title: '看图/文赚钱',
              link: '/money-tip/2'
            },

            {
              title: '发展新合伙人',
              link: '/member'
            }
          ]
        },
        {
          text: '我要合作',
          show: false,
          children: [
            {
              title: '加盟/代理',
              link: '/corporate?type=2'
            },
            {
              title: '我要约拍',
              link: '/yuepai',
              des: '(模特or摄影师)'
            },
            {
              title: '商务合作',
              link: '/corporate?type=1'
            }
          ]
        }
      ]
    }
  },
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
          show: false,
          children: [
            {
              title: '红包任务',
              link: '/reward'
            },
            {
              title: '分享推广',
              link: '/qrcode'
            },
            {
              title: '兑换礼品',
              link: '/goods',
              des: '(金币可兑换礼品)'
            }
          ]
        },
        {
          text: '我的钱包',
          show: false,
          children: [
            {
              title: '钱包金币',
              link: '/my-wallet'
            },
            {
              title: '我的订单',
              link: '/my-order'
            }
          ]
        },
        {
          text: '我要赚钱',
          show: false,
          children: [
            {
              title: '投稿赚钱',
              link: '/photo-post',
              des: '(合伙人上传套图)'
            },
            {
              title: '看图/文赚钱',
              link: '/money-tip/2'
            },
            {
              title: '发展新合伙人',
              link: '/qrcode'
            }
          ]
        },
        {
          text: '我要合作',
          show: false,
          children: [
            {
              title: '加盟/代理',
              link: '/corporate?type=2'
            },
            {
              title: '我要约拍',
              link: '/yuepai',
              des: '(模特or摄影师)'
            },
            {
              title: '商务合作',
              link: '/corporate?type=1'
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapMutations(['setUser']),
    handleLogout () {
      logout()
        .then(r => {})
        .finally(_ => {
          localStorage.removeItem('token')
          this.setUser({})
          this.$vux.toast.text('注销成功')
          this.$router.push({ name: 'Login' })
        })
    }
  }
}
</script>

<style lang="less" scoped>
.top {
  height: 200px;
  text-align: center;
  box-sizing: border-box;
  padding-top: 45px;
  background: #ffaf00;
  .ava-wrap {
    width: 80px;
    height: 80px;
    display: inline-block;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid #fff;
    box-shadow: 0 1px 10px 0 #a3b4bf;
    > img {
      width: 100%;
      height: 100%;
    }
  }
  .name {
    font-size: 17px;
    color: #fff;
    margin-top: 0px;
  }
}
.f3 {
  display: flex;
  background: #c8c8c8;
  .item {
    flex: 1;
    text-align: center;
    padding: 10px 0;
    font-size: 12px;
  }
}

.card-charge {
  display: flex;
  width: 100%;
  background-color: #ffffff;
  height: 53px;
  .card-item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .content {
      display: flex;
      align-items: center;
      > img {
        width: 32px;
        height: 32px;
        margin-right: 4px;
      }
      .title {
        font-size: 14px;
        color: #000;
      }
      .sub-title {
        font-size: 8px;
        color: #aaa;
      }
    }
  }
}

.bottom1 {
  padding-right: 13px;
  position: relative;
  text-align: right;
  color: #999999;
  &:after {
    content: " ";
    display: inline-block;
    height: 6px;
    width: 6px;
    border-width: 0px 2px 2px 0;
    border-color: #c8c8cd;
    border-style: solid;
    -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    position: relative;
    top: -2px;
    position: absolute;
    top: 50%;
    margin-top: -4px;
    right: 2px;
  }
}

.top1 {
  padding-right: 13px;
  position: relative;
  text-align: right;
  color: #999999;
  &:after {
    content: " ";
    display: inline-block;
    height: 6px;
    width: 6px;
    border-width: 2px 0px 0px 2px;
    border-color: #c8c8cd;
    border-style: solid;
    -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    position: relative;
    top: -2px;
    position: absolute;
    top: 50%;
    margin-top: -4px;
    right: 2px;
  }
}
</style>

