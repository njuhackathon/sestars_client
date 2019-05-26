<template>
  <div class='teacher-index'>
    <nav>
      <div class="logo left-nav">
        KID GO
      </div>
      <div class="right-nav">
        <div class="nav-cell" @click="goClassroom">班级管理</div>
        <el-dropdown>
        <span class="nav-cell">
    作业管理<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="goPublishAssignment">发布作业</el-dropdown-item>
            <el-dropdown-item @click.native="goCheckAssignment">批改作业</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'teacher-index',
    methods: {
      goClassroom: function () {
        this.$router.push('/teacher/classroom')
      },
      goPublishAssignment: function () {
        this.$router.push('/teacher/assignment')
      },
      goCheckAssignment: function () {
        this.$router.push('/teacher/check')
      }
    }
  }
</script>

<style lang="scss">
  .teacher-index {
    nav {
      width: 100%;
      height: 70px;
      background: #26a2ff;
      box-shadow: 0 2px 10px 2px #9de2ff;
      padding: 0 40px;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      z-index: 100;
      .logo {
        line-height: 70px;
        color: white;
        font-weight: 500;
        font-size: 24px;
      }
      .left-nav, .right-nav {
        flex: 0 0 auto;
        display: flex;
      }

      .right-nav {
        line-height: 70px;
        color: white;

        .nav-cell {
          font-size: 16px;
          margin: 0 10px;
          cursor: pointer;
          color: white !important;
        }
      }
    }
  }
</style>
