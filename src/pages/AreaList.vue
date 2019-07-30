<template>
  <box gap="10px 10px">
    <group>
       <popup-picker title="省" :data="list1" :columns="1" v-model="val1" show-name @on-change="val1Change"/>
       <popup-picker title="市" :data="list2" :columns="1" v-model="val2" show-name @on-change="val2Change" :disabled="!val1.length"/>
       <popup-picker title="区/县" :data="list3" :columns="1" v-model="val3" show-name :disabled="!val2.length"/>
       <x-input title="详细地址" v-model="detail" placeholder="输入详细地址" text-align="right" :max-length="30"/>
       <x-input title="收件人姓名" v-model="name" placeholder="输入收件人姓名" text-align="right" :max-length="10"/>
       <x-input title="收件人电话" v-model="phone" placeholder="输入收件人电话" text-align="right" :max-length="11"/>
     </group>

     <box gap="10px 10px" style="margin-top: 50px">
       <x-button type="primary" @click.native="handleOk">保存</x-button>
     </box>
  </box>
</template>

<script>
import { getArea, newAddress, editAddress, addressDefault } from '@/utils/api'
export default {
  mounted () {
    getArea().then(r => {
      this.list1 = r.data.map(i => {
        i.value = i.value + ''
        return i
      })
    })
    this.getData()
  },
  data: _ => ({
    list1: [],
    val1: [],
    list2: [],
    val2: [],
    list3: [],
    val3: [],
    detail: '',
    name: '',
    phone: '',
    aId: ''
  }),
  methods: {
    val1Change (val) {
      getArea({province: val[0]}).then(r => {
        this.list2 = r.data.map(i => {
          i.value = i.value + ''
          return i
        })
      })
    },
    val2Change (val) {
      getArea({city: val[0]}).then(r => {
        this.list3 = r.data.map(i => {
          i.value = i.value + ''
          return i
        })
      })
    },
    handleOk () {
      if (!this.val1.length) {
        this.$vux.toast.text('还未选择省')
        return
      }
      if (!this.val2.length) {
        this.$vux.toast.text('还未选择市')
        return
      }
      if (!this.val3.length) {
        this.$vux.toast.text('还未选择区')
        return
      }
      if (!this.detail) {
        this.$vux.toast.text('还未填写详细地址')
        return
      }
      if (!this.name) {
        this.$vux.toast.text('还未填写收件人')
        return
      }
      if (!this.phone) {
        this.$vux.toast.text('还未填电话')
        return
      }
      let p = {
        provinceId: this.val1[0],
        cityId: this.val2[0],
        regionId: this.val3[0],
        detail: this.detail,
        name: this.name,
        phone: this.phone,
        isdefault: 1
      }
      if (!this.aId) {
        newAddress(p).then(r => {
          this.$vux.toast.text(r.msg)
        })
      } else {
        p.id = this.aId
        editAddress(p).then(r => {
          this.$vux.toast.text(r.msg)
        })
      }
    },
    getData () {
      addressDefault().then(r => {
        this.aId = r.data.address_id

        this.val1 = [r.data.province_id + '']
        this.val2 = [r.data.city_id + '']
        this.val3 = [r.data.region_id + '']

        this.detail = r.data.detail
        this.name = r.data.name
        this.phone = r.data.phone
      })
    }
  }
}
</script>
