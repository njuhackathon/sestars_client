<template>
  <div class='classroom'>
    <el-card>
      <div slot="header" class="clearfix">
        <span>班级管理</span>
        <div style="float: right">
          <el-switch
            v-model="type"
            inactive-text="全部班级"
            active-text="我加入的">
          </el-switch>
          <span class="cell" @click="dialogVisible = true">创建班级</span>
        </div>
      </div>
      <div style="min-height: 100vh;">
        <div style="display: inline-block; vertical-align: top; margin: 10px" v-for="(classroom,i ) in classrooms" :key="i">
          <classroom-card name="2016级软院1班" :name="classroom.classroomName"
                          :joined="classroom.joined" @join="join(i)"></classroom-card>
        </div>
      </div>
    </el-card>
    <el-dialog title="创建班级" :visible.sync="dialogVisible">
      <el-form :model="form">
        <el-form-item label="班级名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="createClassroom">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import ClassroomCard from '../../components/classroom-card'
  import {PlusIcon} from 'vue-feather-icons'
  import API from '../../api'

  export default {
    name: 'classroom',
    components: {ClassroomCard, PlusIcon},
    data () {
      return {
        type: true,
        dialogVisible: false,
        form: {
          name: ''
        },
        classrooms: []
      }
    },
    created () {
      this.refresh();
    },
    watch: {
      'type': function () {
        this.refresh()
      }
    },
    methods: {
      createClassroom: function () {
        this.dialogVisible = false;
        let teacherUsername = localStorage.getItem("username");
        let classroomName = this.form.name
        console.log(classroomName)
        API.post('/teacher/classroom/create', {teacherUsername, classroomName}).then(res => {
          if (!res.success) {
            this.$message.error('未能成功创建')
          } else {
            this.$message.success('创建成功')
            this.refresh();
          }
        })
      },
      getAllClassrooms: function () {
        let teacherUsername = localStorage.getItem("username");
        API.get(`/teacher/classroom/get-all?teacherUsername=${teacherUsername}`).then(res => {
          if (!res.success) {
            this.$message.error('服务器故障')
          } else {
            this.classrooms = res.data
          }
        })
      },
      getMyClassrooms: function () {
        let teacherUsername = localStorage.getItem("username");
        API.get(`/teacher/classroom/my?teacherUsername=${teacherUsername}`).then(res => {
          if (!res.success) {
            this.$message.error('服务器故障')
          } else {
            this.classrooms = res.data
          }
        })
      },
      refresh: function () {
        if (this.type) {
          this.getMyClassrooms();
        } else {
          this.getAllClassrooms();
        }
      },
      join: function (i) {
        let teacherUsername = localStorage.getItem("username");
        API.get(`/teacher/classroom/join?teacherUsername=${teacherUsername}&classroomId=${this.classrooms[i].id}`).then(res => {
          if (res.success) {
            this.$message.success('加入成功')
          } else {
            this.$message.error('加入失败')
          }
        })
        this.refresh()
      }
    }
  }
</script>

<style lang="scss">
  .classroom {
    .cell {
      font-size: 14px;
      margin-left: 10px;
      border-left: 1px solid #ccc;
      padding-left: 10px;
      cursor: pointer;
      &:hover {
        color: #26a2ff;
      }
    }
  }
</style>
