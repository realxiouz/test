import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'

import router from '@/router'
import store from '@/store'

import '@/assets/css/main.css'

import { Search, Previewer, Alert, XButton, LoadingPlugin, Scroller, ToastPlugin, ButtonTab, ButtonTabItem, Loading, XTextarea, Tab, TabItem, Tabbar, TabbarItem, Card, Divider, Checker, CheckerItem, Msg, Box, Group, Cell, Badge, AlertPlugin, Confirm, Qrcode, XInput, XNumber, Range, XHeader, Icon, ConfirmPlugin, PopupPicker,
  Swiper, SwiperItem, Grid, GridItem, XDialog, Datetime
} from 'vux'

Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)

FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.component('search', Search)
Vue.component('Previewer', Previewer)
Vue.component('Alert', Alert)
Vue.component('XButton', XButton)
Vue.component('Scroller', Scroller)
Vue.component('ButtonTab', ButtonTab)
Vue.component('ButtonTabItem', ButtonTabItem)
Vue.component('Loading', Loading)
Vue.component('XTextarea', XTextarea)
Vue.component('Tab', Tab)
Vue.component('TabItem', TabItem)
Vue.component('Tabbar', Tabbar)
Vue.component('TabbarItem', TabbarItem)
Vue.component('Card', Card)
Vue.component('Divider', Divider)
Vue.component('Checker', Checker)
Vue.component('CheckerItem', CheckerItem)
Vue.component('Msg', Msg)
Vue.component('Box', Box)
Vue.component('Group', Group)
Vue.component('Cell', Cell)
Vue.component('Badge', Badge)
Vue.component('Confirm', Confirm)
Vue.component('Qrcode', Qrcode)
Vue.component('XInput', XInput)
Vue.component('XNumber', XNumber)
Vue.component('Range', Range)
Vue.component('XHeader', XHeader)
Vue.component('Icon', Icon)
Vue.component('PopupPicker', PopupPicker)
Vue.component('Swiper', Swiper)
Vue.component('SwiperItem', SwiperItem)
Vue.component('Grid', Grid)
Vue.component('GridItem', GridItem)
Vue.component('XDialog', XDialog)
Vue.component('Datetime', Datetime)

if (process.env.NODE_ENV === 'development') {
  let VConsole = require('vconsole')
  // eslint-disable-next-line
  let vConsole = new VConsole()
}

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
