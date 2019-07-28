<template>
  <span class="tag-wrap">
    <slot>tag</slot>
  </span>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.tag-wrap{
  background-color: #F4F4F4;
  padding: 2px 12px;
  display: inline-block;
  border-radius: 22.5px;
  font-size: 14px;
  border: 1px solid;
  border-color: #F4F4F4;
  color: #999999;
  &.active{
    color: #88A5D3;
    border-color: #88A5D3;
  }
}
</style>
