<template>
  <div class='classroom-card'>
    <div class="name">{{name}}</div>
    <el-button type="plain" size="mini" v-show="!joined" @click="join">加入</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'classroom-card',
    props: {
      name: {
        type: String,
        default: '班级'
      },
      joined: {
        type: Boolean,
        default: false
      }
    },
    methods:{
      join: function () {
        this.$emit('join')
      }
    }
  }
</script>

<style lang="scss">
  .classroom-card {
    width: 200px;
    display: flex;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 15px 15px;
    height: 40px;
    justify-content: space-between;
    background-color: white;
    .name {
      line-height: 40px;
    }
  }
</style>
