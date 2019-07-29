<template>
  <group :title="item.text">
          <cell :title="i.title" :is-link="!!i.link" v-for="(i, inx) in item.children" :key="`group${index}cell${inx}`" :link="i.link">
            <span slot="after-title" v-if="i.des" style="font-size:14px;color:gray">{{i.des}}</span>
            <img slot="icon" width="20" style="display:block;margin-right:5px;" :src="i.src"/>
          </cell>
        </group>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>

</style>
