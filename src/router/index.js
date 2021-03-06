import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import { validateToken } from '@/utils/const'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/user-center',
      name: 'UserCenter',
      component: _ => import('@/pages/UserCenter'),
      meta: {
        title: '用户中心',
        auth: true
      }
    },
    {
      path: '/my-wallet',
      name: 'MyWallet',
      component: _ => import('@/pages/MyWallet'),
      meta: {
        title: '我的钱包'
      }
    },
    {
      path: '/recharge',
      name: 'Recharge',
      component: _ => import('@/pages/Recharge'),
      meta: {
        title: '充值'
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: _ => import('@/pages/Register'),
      meta: {
        title: '注册'
      }
    },
    {
      path: '/reset-password',
      name: 'ResetPassword',
      component: _ => import('@/pages/ResetPassword'),
      meta: {
        title: '重置密码'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: _ => import('@/pages/Login'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/',
      redirect: '/articles'
    },
    {
      path: '/home',
      name: 'Home',
      component: _ => import('@/pages/Home'),
      meta: {
        title: '首页'
      }
    },
    {
      path: '/photo-detail/:id',
      name: 'PhotoDetail',
      component: _ => import('@/pages/PhotoDetail'),
      meta: {
        title: '套图'
      }
    },
    {
      path: '/user/:id',
      name: 'User',
      component: _ => import('@/pages/User'),
      meta: {
        title: '他人主页'
      }
    },
    {
      path: '/videos',
      name: 'Videos',
      component: _ => import('@/pages/Videos'),
      meta: {
        title: '视频'
      }
    },
    {
      path: '/photos',
      name: 'Photos',
      component: _ => import('@/pages/Photos'),
      meta: {
        title: '套图'
      }
    },
    {
      path: '/video-detail/:id',
      name: 'VideoDetail',
      component: _ => import('@/pages/VideoDetail'),
      meta: {
      }
    },
    {
      path: '/pay-result/:id',
      name: 'PayResult',
      component: _ => import('@/pages/PayResult'),
      meta: {
      }
    },
    {
      path: '/pay-member-result/:id',
      name: 'PayMemberResult',
      component: _ => import('@/pages/PayMemberResult'),
      meta: {
      }
    },
    {
      path: '/pay-oil-result/:id',
      name: 'PayOilResult',
      component: _ => import('@/pages/PayOilResult'),
      meta: {
      }
    },
    {
      path: '/pay-phone-result/:id',
      name: 'PayPhoneResult',
      component: _ => import('@/pages/PayPhoneResult'),
      meta: {
      }
    },
    {
      path: '/reward',
      name: 'Reward',
      component: _ => import('@/pages/Reward'),
      meta: {
        title: '红包'
      }
    },
    {
      path: '/test',
      name: 'Test',
      component: _ => import('@/pages/Test'),
      meta: {
        title: '测试'
      }
    },
    {
      path: '/photo-post',
      name: 'PhotoPost',
      component: _ => import('@/pages/PhotoPost'),
      meta: {
        title: '发布图集'
      }
    },
    {
      path: '/order-list',
      name: 'OrderList',
      component: _ => import('@/pages/OrderList'),
      meta: {
        title: '我的订单'
      }
    },
    {
      path: '/edit-profile',
      name: 'EditProfile',
      component: _ => import('@/pages/EditProfile'),
      meta: {
        title: '资料编辑'
      }
    },
    {
      path: '/my-order',
      name: 'MyOrder',
      component: _ => import('@/pages/MyOrder'),
      meta: {
        title: '我的订单',
        auth: true
      }
    },
    {
      path: '/qrcode',
      name: 'Qrcode',
      component: _ => import('@/pages/Qrcode'),
      meta: {
        title: '二维码',
        auth: true
      }
    },
    {
      path: '/articles',
      name: 'Articles',
      component: _ => import('@/pages/Articles'),
      meta: {
        title: '图文',
        auth: false
      }
    },
    {
      path: '/article-detail/:id',
      name: 'ArticleDetail',
      component: _ => import('@/pages/ArticleDetail'),
      meta: {
        title: '图文详情',
        auth: false
      }
    },
    {
      path: '/money-tip/:type?',
      name: 'MoneyTip',
      component: _ => import('@/pages/MoneyTip'),
      meta: {
        title: '秘籍',
        auth: true
      }
    },
    {
      path: '/my-group',
      name: 'MyGroup',
      component: _ => import('@/pages/MyGroup'),
      meta: {
        title: '我的团队',
        auth: true
      }
    },
    {
      path: '/with-draw',
      name: 'WithDraw',
      component: _ => import('@/pages/WithDraw'),
      meta: {
        title: '提现',
        auth: true
      }
    },
    {
      path: '/success',
      name: 'Success',
      component: _ => import('@/pages/Success'),
      meta: {
        title: '成功',
        auth: true
      }
    },
    {
      path: '/money-detail',
      name: 'MoneyDetail',
      component: _ => import('@/pages/MoneyDetail'),
      meta: {
        title: '余额明细',
        auth: true
      }
    },
    {
      path: '/score-detail',
      name: 'ScoreDetail',
      component: _ => import('@/pages/ScoreDetail'),
      meta: {
        title: '余额明细',
        auth: true
      }
    },
    {
      path: '/goods',
      name: 'Goods',
      component: _ => import('@/pages/Goods'),
      meta: {
        title: '兑换商品',
        auth: true
      }
    },
    {
      path: '/member',
      name: 'Member',
      component: _ => import('@/pages/member'),
      meta: {
        title: '成为合伙人',
        auth: true
      }
    },
    {
      path: '/area-list',
      name: 'AreaList',
      component: _ => import('@/pages/AreaList'),
      meta: {
        title: '收货地址',
        auth: true
      }
    },
    {
      path: '/goods-order',
      name: 'GoodsOrder',
      component: _ => import('@/pages/GoodsOrder'),
      meta: {
        title: '兑换商品',
        auth: true
      }
    },
    {
      path: '/corporate',
      name: 'Corporate',
      component: _ => import('@/pages/Corporate'),
      meta: {
        title: '商务合作',
        auth: true
      }
    },
    {
      path: '/yuepai',
      name: 'Yuepai',
      component: _ => import('@/pages/Yuepai'),
      meta: {
        title: '我要约拍',
        auth: true
      }
    },
    {
      path: '/my-goods',
      name: 'MyGoods',
      component: _ => import('@/pages/MyGoods'),
      meta: {
        title: '兑换记录',
        auth: true
      }
    },
    {
      path: '/oil',
      name: 'Oil',
      component: _ => import('@/pages/Oil'),
      meta: {
        title: '加油卡充值',
        auth: true
      }
    },
    {
      path: '/oil-list',
      name: 'OilList',
      component: _ => import('@/pages/OilList'),
      meta: {
        title: '加油卡充值记录',
        auth: true
      }
    },
    {
      path: '/phone',
      name: 'Phone',
      component: _ => import('@/pages/Phone'),
      meta: {
        title: '话费充值',
        auth: true
      }
    },
    {
      path: '/phone-list',
      name: 'PhoneList',
      component: _ => import('@/pages/PhoneList'),
      meta: {
        title: '话费充值记录',
        auth: true
      }
    },
    {
      path: '/check-list',
      name: 'CheckList',
      component: _ => import('@/pages/CheckList'),
      meta: {
        title: '审核上传图文记录',
        auth: true
      }
    },
    {
      path: '/check',
      name: 'Check',
      component: _ => import('@/pages/Check'),
      meta: {
        title: '审核上传图文',
        auth: true
      }
    },
    {
      path: '/ad-content',
      name: 'AdContent',
      component: _ => import('@/pages/AdContent'),
      meta: {
        title: '详情',
        auth: false
      }
    },
    {
      path: '/join-info',
      name: 'JoinInfo',
      component: _ => import('@/pages/JoinInfo'),
      meta: {
        title: '代理信息',
        auth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title}_${store.state.info.webName}` : store.state.info.webName
  // let token = localStorage.token
  // if (to.path === '/user-center' && !token) {
  //   next('/login')
  // }
  if (to.meta.auth && !validateToken(new Date().getTime())) {
    next('/login')
  }
  next()
})

export default router
