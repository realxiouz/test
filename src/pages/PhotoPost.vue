<template>
  <div>
    photo-post
    <group>
      <x-input title="图集标题" v-model="photoForm.name" placeholder="最多30字"/>
      <x-number title="所需金币" v-model="photoForm.price" :min="0" fillable></x-number>
      <x-number title="图集数量" v-model="photoForm.total" :min="1" fillable></x-number>
    </group>
    <uploader :images="photoForm.gallery_images" :max="photoForm.total"/>

    <group>
      <cell title="免费浏览" primary="content" :inline-desc="`${photoForm.free_num}张`">
        <range :step="1" v-model="photoForm.free_num" :max="photoForm.total"></range>
      </cell>
    </group>

    <box gap="15px 10px">
      <x-button type="primary" @click.native="handleOk">发布</x-button>
    </box>
  </div>
</template>

<script>
import Uploader from '@/components/Uploader'

export default {
  name: 'PhotoPost',
  data: _ => ({
    photoForm: {
      gallery_images: [],
      total: 5,
      free_num: 0
    }
  }),
  methods: {
    handleOk () {
      console.log(this.photoForm)
    }
  },
  components: {
    Uploader
  }
}
</script>
