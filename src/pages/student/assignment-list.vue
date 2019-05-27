<template>
  <div class='assignment-list'>
    <div style="margin-bottom: 10px">待写的作业</div>
    <div v-if="assignments.length === 0" style="text-align: center; color: #aaa">暂无作业</div>
    <div v-for="(assignment,i) in assignments" style="margin-bottom: 15px">
      <el-card>
        <div class="assignment-card">
          <div class="left">{{assignment.title}}</div>
          <div class="right">
            <el-button type="danger" size="mini" @click="goAssignment(i)">写作业</el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import API from '../../api'

  export default {
    name: 'assignment-list',
    created () {
      this.getAssignments()
    },
    data () {
      return {
        assignments: []
      }
    },
    methods: {
      getAssignments: function () {
        let studentUsername = localStorage.getItem('username')
        API.get(`/student/classroom/?studentUsername=${studentUsername}`).then(res1 => {
          if (res1.success) {
            API.get(`/student/assignment/all?studentUsername=${studentUsername}`).then(res => {
              this.assignments = res.data
            })
          }
        }).catch(() => {
        })
      },
      goAssignment: function (i) {
        this.$router.push({
          path: '/student/assignment',
          query: {
            id: this.assignments[i].id,
          }
        })
      }
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
