<template>
  <div class='classroom'>
    <section style="margin-bottom: 15px;" v-if="myClassroom.classroomName !== ''">
      <div style="margin-bottom: 10px">我的班级</div>
      <classroom-card :joined="true" :name="myClassroom.classroomName"></classroom-card>
    </section>
    <div style="margin-bottom: 10px">可加入的班级</div>
    <div>
      <div v-for="(classroom,i) in notJoinedClassrooms" style="margin: 10px 0">
        <classroom-card :joined="false" :name="classroom.classroomName" @join="joinClassroom(i)"></classroom-card>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import ClassroomCard from '../../components/classroom-card'
  import API from '../../api'

  export default {
    name: 'classroom',
    components: {ClassroomCard},
    data() {
      return {
        myClassroom: {
          classroomName: ''
        },
        notJoinedClassrooms: []
      }
    },
    created() {
      this.getMyClassroom()
      this.getNotJoinedClassrooms()
    },
    methods: {
      getMyClassroom: function () {
        let studentUsername = localStorage.getItem("username")
        API.get(`/student/classroom/?studentUsername=${studentUsername}`).then(res => {
          if (res.success) {
            this.myClassroom = res.data;
            console.log(this.myClassroom)
          }
        })
      },
      getNotJoinedClassrooms: function () {
        let studentUsername = localStorage.getItem("username")
        API.get(`/student/classroom/not-join?studentUsername=${studentUsername}`).then(res => {
          if (res.success) {
            this.notJoinedClassrooms = res.data;
          }
        })
      },
      joinClassroom: function (i) {
        let studentUsername = localStorage.getItem("username")
        API.get(`/student/classroom/join?studentUsername=${studentUsername}&classroomId=${this.notJoinedClassrooms[i].id}`).then(res => {
          if (res.success) {
            this.$message.success('加入成功')
            this.getMyClassroom()
            this.getNotJoinedClassrooms()
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .classroom {
    padding: 20px 20px;
    background-color: #f5f7f9;
    min-height: 100vh;
  }
</style>
