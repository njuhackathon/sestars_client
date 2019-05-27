<template>
  <div class='check'>
    <el-card>
      <div slot="header" class="clearfix">
        <span>作业管理</span>
        <div style="float: right">
          <el-radio-group v-model="type" size="small">
            <el-radio-button label="未批改"></el-radio-button>
            <el-radio-button label="已批改"></el-radio-button>
            <el-radio-button label="进行中"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div style="min-height: 100vh;">
        <div style="width: 300px; display: inline-block; margin: 10px" v-for="assignment in assignments">
          <el-card shadow="never">
            <div class="assignment-card">
              <div class="left">{{assignment.title}}</div>
              <div class="right" v-if="type !== '进行中'">
                <el-button type="danger" size="mini" @click="goDetail(assignment.id)">查看</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
  import API from '../../api'

  export default {
    name: 'check',
    data () {
      return {
        assignments: [],
        type: '未批改'
      }
    },
    created () {
      this.refresh()
    },
    watch: {
      'type': function () {
        this.refresh()
      }
    },
    methods: {
      refresh: function () {
        if (this.type === '未批改') {
          this.getTodoAssignments()
        } else if (this.type === '已批改') {
          this.getDoneAssignments()
        } else {
          this.getPendingAssignments()
        }
      },
      getPendingAssignments: function () {
        let teacherUsername = localStorage.getItem('username')
        API.get(`/teacher/assignment/pending?teacherUsername=${teacherUsername}`).then(res => {
          this.assignments = res.data
        })
      },
      getTodoAssignments: function () {
        let teacherUsername = localStorage.getItem('username')
        API.get(`/teacher/assignment/todo?teacherUsername=${teacherUsername}`).then(res => {
          this.assignments = res.data
        })
      },
      getDoneAssignments: function () {
        let teacherUsername = localStorage.getItem('username')
        API.get(`/teacher/assignment/done?teacherUsername=${teacherUsername}`).then(res => {
          this.assignments = res.data
        })
      },
      goDetail: function (id) {
        if (this.type === '未批改') {
          this.$router.push({
            path: '/teacher/check-detail',
            query: {
              id
            }
          })
        } else if (this.type === '已批改') {
          this.$router.push({
            path: '/teacher/sheet',
            query: {
              id
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  .check {
    .assignment-card {
      display: flex;
      justify-content: space-between;
      .left, .right {
        flex: 0 0 auto;
      }
    }
  }
</style>
