<template>
  <div>
    <div v-html="adContent" ref="tip" style="padding:10px"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AdContent',
  computed: {
    ...mapState(['adContent'])
  }
}
</script>
