<template>
  <div>
    <group>
      <popup-picker title="图集分类" :data="types" v-model="selType" @on-change="onChange" placeholder="选择分类" show-name></popup-picker>
      <x-input title="图集标题" v-model="photoForm.name" placeholder="最多30字"/>
      <x-number title="所需金币" v-model="photoForm.price" :min="0" fillable></x-number>
      <!-- <x-number title="图集数量" v-model="photoForm.total" :min="1" fillable></x-number> -->
    </group>
    <uploader :images="photoForm.images" :max="1" title='上传封面'/>
    <uploader :images="photoForm.gallery_images" :max="100"/>
    <group>
      <!-- <cell title="免费浏览" primary="content" :inline-desc="`${photoForm.free_num}张`">
        <range :step="1" v-model="photoForm.free_num" :max="photoForm.gallery_images.length"></range>
      </cell> -->
      <x-number title="免费浏览" v-model="photoForm.free_num" :min="0" fillable></x-number>
    </group>

    <box gap="15px 10px">
      <x-button type="primary" @click.native="handleOk">发布</x-button>
    </box>
  </div>
</template>

<script>
import Uploader from '@/components/Uploader'
import { allPhotoTypes, newGally } from '@/utils/api'

export default {
  name: 'PhotoPost',
  mounted () {
    allPhotoTypes().then(r => {
      this.types = [r.data.map(i => ({name: i.name, value: '' + i.id}))]
    })
  },
  data: _ => ({
    photoForm: {
      gallery_images: [],
      total: 5,
      free_num: 0,
      images: []
    },
    types: [],
    selType: []
  }),
  methods: {
    handleOk () {
      if (!this.selType.length) {
        this.$vux.toast.text('选择分类')
        return
      }
      if (!this.photoForm.name) {
        this.$vux.toast.text('填写标题')
        return
      }
      if (!this.photoForm.gallery_images.length) {
        this.$vux.toast.text('上传图集')
        return
      }
      if (!this.photoForm.images.length) {
        this.$vux.toast.text('上传封面')
        return
      }
      let p = {
        categoryId: this.selType[0],
        name: this.photoForm.name,
        freeNum: this.photoForm.free_num,
        price: this.photoForm.price,
        galleryImages: this.photoForm.gallery_images.join(','),
        thumbImage: this.photoForm.images[0]
      }
      newGally(p).then(r => {
        this.$vux.toast.text(r.msg)
        setTimeout(_ => {
          this.$router.go(-1)
        }, 1000)
      })
    },
    onChange () {

    }
  },
  components: {
    Uploader
  }
}
</script>
