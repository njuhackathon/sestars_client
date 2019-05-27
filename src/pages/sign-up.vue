<template>
  <div class='sign-up'>
    <mt-header fixed title="注册"></mt-header>
    <div>
      <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
      <mt-field label="姓名" placeholder="请输入真实姓名" v-model="realName"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
      <mt-field label="重复密码" placeholder="请重复密码" type="password" v-model="repeatPassword"></mt-field>
    </div>
    <mt-radio
      title="选择角色"
      v-model="type"
      :options="typeOption">
    </mt-radio>
    <div class="btn-wrapper">
      <mt-button type="primary" size="large" @click="signUp">注册</mt-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import API from '../api.js'

  export default {
    name: 'sign-up',
    data () {
      return {
        username: '',
        realName: '',
        password: '',
        repeatPassword: '',
        type: "0",
        typeOption: [{
          label: '教师',
          value: "0",
        },
          {
            label: '学生',
            value: "1"
          },
          {
            label: '家长',
            value: "2"
          }]
      }
    },
    methods: {
      signUp: function () {
        let {username, realName, password, type, repeatPassword} = this;
        type = Number(type);
        if (username.length === '' || realName === '' || password === '') {
          this.$message.error('信息填写不完整')
          return
        }
        if (password !== repeatPassword) {
          this.$message.error('密码输入不一致')
          return
        }
        API.post('/user/sign-up', {username, realName, password, type}).then(res => {
          localStorage.setItem("username", res.data.username)
          if (type === 0) {
            this.$router.push('/teacher/classroom')
          } else if (type === 1) {
            this.$router.push('/student/home')
          } else {
            this.$router.push('/parent')
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .sign-up {
    margin-top: 60px;
    .btn-wrapper {
      padding: 15px 15px;
    }
  }
</style>
