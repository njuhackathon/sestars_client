<template>
  <div class='student-index'>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">


  export default {
    name: 'student-index',
    data () {
      return {
        selected: "1"
      }
    }
  }
</script>

<style lang="scss">
  .student-index {
  }
</style>
