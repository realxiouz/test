<template>
  <div class="weui-cell">
    <div class="weui-cell__bd">
      <div class="weui-uploader">
        <div v-show="showHeader" class="weui-uploader__hd">
          <p class="weui-uploader__title"> {{ title }} </p>
          <div v-show="showHeader && showTip" class="weui-uploader__info">
            {{ images.length }} / {{ max }}
          </div>
        </div>

        <div class="weui-uploader__bd" :class="{small: size === 'small'}">
          <div v-show="!readonly && images.length > 0" class="weui-uploader__input-box remove" @click="remove">
          </div>

          <ul class="weui-uploader__files">
            <uploader-item v-for="(i, inx) in images" :background-image="i" :key="inx" @click.native="preview(inx)"></uploader-item>
          </ul>

          <div v-show="!readonly && images.length < max" class="weui-uploader__input-box" @click="add">
            <input v-if="!handleClick" ref="input" class="weui-uploader__input" type="file" accept="image/*" :capture="showCapture" @change="change">
          </div>
        </div>
      </div>
    </div>

    <!-- <div v-transfer-dom> -->
      <previewer :list="imagsForPreview" ref="previewer"></previewer>
    <!-- </div> -->
  </div>
</template>

<script>
import UploaderItem from './UploaderItem'
import { uploadFile } from '@/utils/api'
import { WEB_HOST, MAX_SIZE_FOR_PHOTO } from '@/utils/const'

export default {
  props: {
    images: {
      type: Array,
      default: () => []
    },
    max: {
      type: Number,
      default: 10
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    showTip: {
      type: Boolean,
      default: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '图片上传'
    },
    handleClick: {
      type: Boolean,
      default: false
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    // uploadUrl: {
    //   type: String,
    //   default: ''
    // },
    size: {
      type: String,
      default: 'normal'
    },
    capture: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: 'file'
    },
    params: {
      type: Object,
      default: null
    }
  },
  components: {
    UploaderItem
  },
  methods: {
    add () {
      if (this.handleClick) {
        this.$emit('add-image')
      }
    },
    remove () {
      document.querySelector('.weui-uploader__input').value = ''
      if (this.handleClick) {
        this.$emit('remove-image')
      } else {
        this.images.shift()
      }
    },
    preview (inx) {
      this.$refs.previewer.show(inx)
    },
    change () {
      if (this.handleClick) {
        return
      }
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
      formData.append(this.name, file)
      // if (this.params) {
      //   for (let key in this.params) {
      //     formData.append(key, this.params[key])
      //   }
      // }
      if (this.autoUpload) {
        if (this.$vux && this.$vux.loading) {
          this.$vux.loading.show('正在上传')
        }
        // axios.post(this.uploadUrl, formData,{headers: this.headers})
        uploadFile(formData)
        .then((response) => {
          if (this.$vux && this.$vux.loading) {
            this.$vux.loading.hide()
          }
          this.$refs.input.value = ''
          this.images.push(response.data.url)
        })
        .catch(e => {
          if (this.$vux && this.$vux.loading) {
            this.$vux.loading.hide()
          }
        })
      } else {
        this.$emit('upload-image', formData)
      }
    }
  },
  computed: {
    showCapture () {
      return this.capture || undefined
    },
    imagsForPreview () {
      return this.images.map(i => ({src: WEB_HOST + i}))
    }
  }
}
</script>
<style scoped lang="less">
@import '~vux/src/styles/weui/widget/weui-uploader/index.less';
.remove:before {
  width: 0;
  height: 0;
}
.weui-uploader__bd.small {
  .weui-uploader__input-box {
    margin-right: 5px;
    margin-bottom: 5px;
    width: 58px;
    height: 58px;
  }
  .weui-uploader__file {
    width: 60px;
    height: 60px;
    margin-right: 5px;
    margin-bottom: 5px;
  }
}
</style>
