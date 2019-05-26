<template>
  <div class='assignment-list'>
    <div style="margin-bottom: 10px">待写的作业</div>
    <el-card>
      <div class="assignment-card">
        <div class="left">作业名称</div>
        <div class="right">
          <el-button type="danger" size="mini">写作业</el-button>
        </div>
      </div>
    </el-card>

  </div>
</template>

<script type="text/ecmascript-6">
  import API from '../../api'
  export default {
    name: 'assignment-list',
    created () {
      this.getAssignments()
    },
    methods: {
      getAssignments: function () {
        let studentUsername = localStorage.getItem('username')
        API.get(`/student/classroom/?studentUsername=${studentUsename}`).then(res1 => {
          if (res1.success) {
            API.get(`/student/assignment/all?studentUsername=${studentUsername}`).then(res => {
              console.log(res)
            })
          }
        })

      },
    }
  }
</script>

<style lang="scss">
  .assignment-list {
    padding: 20px 20px;
    background-color: #f5f7f9;
    min-height: 100vh;
    .assignment-card {
      display: flex;
      justify-content: space-between;
      .left, .right {
        flex: 0 0 auto;
      }
    }
  }
</style>
