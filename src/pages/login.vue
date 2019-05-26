<template>
  <div class='login'>
    <mt-header fixed title="登录"></mt-header>
    <div>
      <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
    </div>
    <div class="btn-wrapper">
      <mt-button type="primary" size="large" @click="login">登录</mt-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import API from '../api'

  export default {
    name: 'login',
    data () {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      login: function () {
        let {username, password} = this;
        API.post('/user/login', {username, password}).then(res => {
          if (!res.success){
            this.$message.error('用户名不存在或密码不一致')
            return
          }
          localStorage.setItem("username", res.data.username)
          if (res.data.type === 0) {
            this.$router.push('/teacher/classroom')
          } else if (res.data.type === 1) {
            this.$router.push('/student/assignment-list')
          } else {
            this.$router.push('/parent')
          }
        }).catch(err => {
          this.$message.error('用户名不存在或密码不一致')
        })
      }
    }
  }
</script>

<style lang="scss">
  .login {
    margin-top: 60px;
    .btn-wrapper {
      margin: 15px;
    }
  }
</style>
