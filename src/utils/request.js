import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
// import store from '@/store'
import router from '@/router'

const request = axios
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
axios.defaults.headers['X-Requested-With'] = 'X-Requested-With'
axios.defaults.baseURL = '/api'

axios.interceptors.request.use(
  r => {
    if (r.method === 'post' && r.url !== '/common/upload') {
      r.data = qs.stringify(r.data)
    }
    let token = localStorage.getItem('token')
    if (token) {
      r.headers['token'] = token
    }
    if (r.url === '/common/upload') {
      r.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    return r
  },
  e => {

  }
)

axios.interceptors.response.use(
  res => {
    if (res.data.code === 1) {
      return res.data
    } else if (res.data.code === 0) {
      if (res.data.msg) {
        Vue.$vux.toast.text(res.data.msg)
      }
      return Promise.reject(new Error(res.data.msg))
    }
    return Promise.reject(new Error('出错了'))
  },
  e => {
    if (e.response) {
      if (e.response.status === 401) {
        // Vue.$vux.toast.text('请首先登录')
        console.warn('token失效')
        router.push({path: '/login'})
      }
      if (e.response.status === 500) {
        Vue.$vux.toast.text('服务器出错了!')
      }
      return Promise.reject(new Error(e.response))
    }
    return Promise.reject(e)
  }
)

export default request
