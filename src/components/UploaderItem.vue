<template>
  <li class="weui-uploader__file" :style="style">
  </li>
</template>

<script>
import { WEB_HOST } from '@/utils/const'

export default {
  props: {
    backgroundImage: {
      type: String,
      default: ''
    }
  },
  computed: {
    style () {
      return {
        backgroundImage: this.backgroundImage.startsWith('http') ? `url(${this.backgroundImage})` : `url(${WEB_HOST}${this.backgroundImage})`
      }
    }
  }
}
</script>
