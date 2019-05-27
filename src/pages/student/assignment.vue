<template>
  <div class='assignment'>
    <div class="number-switch">
      <span v-if="notShowNumber" @click="notShowNumber = false"
            style="background-color: #26a2ff; display: inline-block; width: 100vw">点击切换题号和保存</span>
      <div class="number-container" v-else>
        <div v-for="i in assignment.questionList.length" :key="i" class="number" @click="jump(i-1)">
          {{i}}
        </div>
        <div style="margin-top: 10px">
          <el-button type="primary" @click="notShowNumber=true">关闭</el-button>
          <el-button type="danger" @click="save">保存</el-button>
          <div>可以多次保存哦，以最后一次为准</div>
        </div>
      </div>
    </div>
    <div class="question-container">
      <div>
        <div class="title">题目描述</div>
        <p>{{assignment.questionList[ci].title}}</p>
        <img v-if="assignment.questionList[ci].imageUrl !== ''" :src="assignment.questionList[ci].imageUrl" width="300"
             height="200">
      </div>
      <div class="title" style="margin-top: 10px">解答区域</div>
      <el-input type="textarea" :autosize="{ minRows: 2}" placeholder="在这里回答" v-model="answers[ci].text"></el-input>
      <div class="image-container">
        <!--<el-upload-->
          <!--class="upload-demo"-->
          <!--action="https://jsonplaceholder.typicode.com/posts/"-->
          <!--:on-preview="handlePreview"-->
          <!--:on-remove="handleRemove"-->
          <!--:file-list="fileList"-->
          <!--list-type="picture">-->
          <!--<el-button size="small" type="primary">上传图片</el-button>-->
          <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
        <!--</el-upload>-->
      </div>
    </div>
    <div style="text-align: center">
      <el-button @click="ci--" :disabled="ci === 0">上一题</el-button>
      <el-button @click="ci++" :disabled="ci === assignment.questionList.length-1">下一题</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import API from '../../api'

  export default {
    name: 'assignment',
    data () {
      return {
        ci: 0,
        notShowNumber: true,
        assignment: {},
        answers: []
      }
    }, methods: {
      jump: function (i) {
        this.ci = i
        this.notShowNumber = true
      },
      save: function () {
        let studentUsername = localStorage.getItem('username')
        API.post('/student/commitment/', {
          studentUsername,
          assignmentId: this.assignment.id,
          answerList: this.answers
        })
        this.notShowNumber = true
        this.$router.push('/student/home')
      }
    },
    created () {
      let id = this.$route.query.id
      API.get(`/student/assignment/?assignmentId=${id}`).then(res => {
        this.assignment = res.data;
        for (let i = 0; i < this.assignment.questionList.length; i++) {
          this.answers.push({
            questionId: this.assignment.questionList[i].id,
            text: '',
            imageUrls: []
          })
        }
      })
    }
  }
</script>

<style lang="scss">
  .assignment {
    .number-switch {
      height: 40px;
      text-align: center;
      line-height: 40px;
      color: white;
      .number-container {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        padding: 15px 15px;
        background-color: white;
        min-height: 100vh;
        z-index: 100;
      }
      .number {
        display: inline-block;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        border: 2px solid #26a2ff;
        color: #26a2ff;
        line-height: 30px;
        margin: 15px;
      }
    }
    .question-container {
      padding: 20px 30px;
    }
    .title {
      margin-bottom: 10px;
      color: #888;
    }
    .image-container {
      margin-top: 15px;
    }
  }
</style>
