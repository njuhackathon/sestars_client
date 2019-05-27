<template>
  <div class='sheet'>
    <div class="sheet-container">
      <h3>作业报告 —— {{report.title}}</h3>
      <div style="font-size: 14px; color: #aaa">{{report.endTime.toLocaleString().replace("T", " ")}} 截止</div>
      <div style="margin-top: 10px">
        <el-tag type="info" style="display: inline-block; margin-right: 15px">共有{{report.commitCount}}人提交作业</el-tag>
        <el-tag>平均分: {{report.average}}</el-tag>
        <el-tag type="danger">最高分：{{report.max}}</el-tag>
        <el-tag type="success">最低分：{{report.min}}</el-tag>
      </div>
      <div>
        <h4 style="margin-top: 20px; border-top: 1px solid rgba(7,17,27,0.3); padding-top: 15px">题目详情</h4>
        <div v-for="(que, i) in report.questions" class="question" :key="i">
          <p>{{i}}.({{que.score}}分){{que.title}}</p>
          <!--<img v-if="que.image" src=""/>-->
          <!--<div style="font-size: 14px; color: #aaa; margin-top: 10px">答题情况统计</div>-->
          <el-tag type="info" style="display: inline-block; margin-right: 15px">作答/未答: {{que.commitCount}}/{{que.notCommitCount}}</el-tag>
          <el-tag>平均分: {{que.average}}</el-tag>
          <el-tag type="danger">最高分：{{que.max}}</el-tag>
          <el-tag type="success">最低分：{{que.min}}</el-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import API from '../../api'

  export default {
    name: 'sheet',
    data () {
      return {
        report: {}
      }
    },
    created () {
      this.getReport()
    },
    methods: {
      getReport: function () {
        let assignmentId = this.$route.query.id;
        API.get(`/teacher/assignment/statistic?assignmentId=${assignmentId}`).then(res => {
          this.report = res.data;
        })
      }
    }
  }
</script>

<style lang="scss">
  .sheet {
    padding: 50px 70px;
    background-color: #f5f7f9;
    min-height: 100vh;
    .sheet-container {
      background-color: white;
      padding: 30px;
      .question {
        padding: 15px 0;
        /*border-bottom: 1px solid rgba(7, 17, 27, 0.3);*/
        &:last-child {
          border-bottom: none;
        }
      }
    }

  }
</style>
