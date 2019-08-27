<template>
  <div>
   <group>
     <cell title="头像 ">
       <div class="ava-wrap" @click="uploadAva">
        <img :src="avatarSrc">
      </div>
     </cell>
    <x-input
      title="用户名"
      v-model="formBean.username"
      required
      ref="username"
      :max="11"
      placeholder="输入用户名,最多8字符"
      text-align="right"
      disabled
    />
     <x-input
      title="昵称 "
      v-model="formBean.nickname"
      ref="nickname"
      required
      :max="11"
      placeholder="输入昵称,最多8字符"
      text-align="right"
      ></x-input>

     <x-input title="签名 " v-model="formBean.bio" ref="bio" required :max="20"
      placeholder="输入签名,最多30字符" text-align="right"></x-input>
      <x-input
      title="微信账号"
      v-model="formBean.wechat_account"
      placeholder="输入提现微信账号"
      text-align="right"
    />
    <x-input
      title="支付宝账号"
      v-model="formBean.alipay_account"
      placeholder="输入支付宝账号"
      text-align="right"
    />
   </group>
   <box gap="100px 10px 0">
     <x-button type="primary" @click.native="handleOk">保存</x-button>
   </box>

   <input style="display:none" ref="input" type="file" accept="image/*" @change="change">
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { uploadFile, editProfile } from '@/utils/api'
import { WEB_HOST, MAX_SIZE_FOR_PHOTO } from '@/utils/const'

export default {
  name: 'EditProfile',
  computed: {
    ...mapState(['user']),
    formBean () {
      let data = JSON.parse(JSON.stringify(this.user))
      data.avatar && data.avatar.startsWith('data:image') ? this.avatarSrc = data.avatar : this.avatarSrc = WEB_HOST + data.avatar
      return {
        username: data.username,
        nickname: data.nickname,
        avatar: data.avatar,
        bio: data.bio,
        wechat_account: data.wechat_account,
        alipay_account: data.alipay_account
      }
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    handleOk () {
      if (!this.$refs.username.valid) {
        this.$vux.toast.text('请输入用户名')
        return
      }
      if (!this.$refs.nickname.valid) {
        this.$vux.toast.text('请输入昵称')
        return
      }
      // if (!this.$refs.bio.valid) {
      //   this.$vux.toast.text('请输入签名')
      //   return
      // }

      editProfile(this.formBean).then(r => {
        this.setUser(Object.assign({}, this.user, this.formBean))
        this.$vux.toast.text('资料修改成功!')
        this.$nextTick(_ => {
          this.$router.push({name: 'UserCenter'})
        })
      })
    },
    change () {
      let formData = new window.FormData()
      let file = this.$refs.input.files[0]
      if (file.size > MAX_SIZE_FOR_PHOTO * 1024 * 1024) {
        this.$vux.toast.text(`最大上传限制${MAX_SIZE_FOR_PHOTO}Mb`)
        return
      }
      if (file.type.split('/')[0] !== 'image') {
        this.$vux.toast.text(`只能上传图片格式文件`)
        return
      }
      formData.append('file', file)
      if (this.$vux && this.$vux.loading) {
        this.$vux.loading.show('正在上传')
      }
      uploadFile(formData)
      .then(r => {
        if (this.$vux && this.$vux.loading) {
          this.$vux.loading.hide()
        }
        this.$refs.input.value = ''
        this.formBean.avatar = r.data.url
        this.avatarSrc = WEB_HOST + this.formBean.avatar
      })
      .catch(e => {
        if (this.$vux && this.$vux.loading) {
          this.$vux.loading.hide()
        }
      })
    },
    uploadAva () {
      this.$refs.input.dispatchEvent(new MouseEvent('click'))
    }
  },
  data: _ => ({
    avatarSrc: ''
  })
}
</script>

<style lang="less" scoped>
.ava-wrap{
  width: 40px;
  height: 40px;
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
</style>

