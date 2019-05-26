<template>
  <div class='student-index'>
    <mt-header fixed title="KID GO"></mt-header>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">作业</mt-tab-item>
      <mt-tab-item id="2">班级</mt-tab-item>
      <!--<mt-tab-item id="3">选项三</mt-tab-item>-->
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <assignment-list></assignment-list>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <classroom></classroom>
      </mt-tab-container-item>
      <!--<mt-tab-container-item id="3">-->
        <!--<mt-cell v-for="n in 6" :title="'选项 ' + n"/>-->
      <!--</mt-tab-container-item>-->
    </mt-tab-container>
  </div>
</template>

<script type="text/ecmascript-6">
  import AssignmentList from './student/assignment-list'
  import Classroom from './student/classroom'
  export default {
    name: 'student-index',
    components: {Classroom, AssignmentList},
    data(){
      return {
        selected: "1"
      }
    }
  }
</script>

<style lang="scss">
.student-index {
  margin-top: 40px;
}
</style>
