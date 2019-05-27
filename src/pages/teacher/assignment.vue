<template>
  <div class='assignment'>
    <div class="assignment-container">
      <div>
        <span style="display: inline-block; margin-right: 15px">作业标题</span><span
        style="display: inline-block; margin-right: 15px"><el-input placeholder="请输入作业标题"
                                                                    v-model="title"></el-input></span>
        <span style="display: inline-block; margin-right: 15px">截止日期</span>
        <el-date-picker
          v-model="endTime"
          type="datetime"
          placeholder="选择截止日期时间">
        </el-date-picker>
        <span style="display: inline-block; margin: 0 15px">选择班级</span>
        <el-select
          v-model="toClassrooms"
          multiple
          collapse-tags
          style="margin-left: 20px;"
          placeholder="请选择">
          <el-option
            v-for="classroom in classrooms"
            :key="classroom.id"
            :label="classroom.classroomName"
            :value="classroom.id">
          </el-option>
        </el-select>
      </div>
      <div v-for="(question,i) in questions" :key="i">
        <div class='question'>
          <div class="delete" @click="deleteQuestion(i)" v-show="!(i === 0)">
            <x-icon class="custom-class"></x-icon>
          </div>
          <div class="text">
            <el-input placeholder="请输入题目文字" type="textarea"
                      :rows="2" v-model="question.title"/>
          </div>
          <el-upload
            :limit="1"
            class="avatar-uploader"
            action="http://47.100.97.128:8000/file/img"
            :show-file-list="false"
            :on-success="(res,file,value) => handleSuccess(i, res,file,value)"
            :before-upload="beforeUpload">
            <img v-if="question.imageUrl" :src="question.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <div class="footer">
        <el-button type="plain" @click="addQuestion">继续添加题目</el-button>
        <el-button type="primary" @click="publish">发布作业</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Question from '../../components/question'
  import API from '../../api'
  import {XIcon} from 'vue-feather-icons'

  export default {
    name: 'assignment',
    components: {Question, XIcon},
    created(){
      this.getMyClassrooms()
    },
    data () {
      return {
        questions: [{
          title: '',
          imageUrl: ''
        }],
        title: '',
        endTime: new Date(),
        classrooms: [],
        toClassrooms: []
      }
    },
    methods: {
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
      publish: function () {
        if (this.title === '' || this.questions.length === 0) {
          this.$message.error('信息填写不完整')
          return
        }
        let teacherUsername = localStorage.getItem("username")
        API.post('/teacher/assignment/create', {
          title: this.title,
          teacherUsername,
          endTime: this.endTime,
          questionList: this.questions,
          classroomIds: this.toClassrooms
        }).then(res => {
          this.$message.success('发布成功')
          this.$router.push('/teacher/check')
        })
      },
      addQuestion: function () {
        this.questions.push({
          title: '',
          imageUrl: ''
        })
      },
      deleteQuestion: function (i) {
        this.questions.splice(i, 1);
      },
      handleSuccess: function (i, res, file, fileList) {
        console.log(res)
        if (!res) {
          return
        }
        this.questions[i].imageUrl = "http://47.100.97.128:8000/file/img/" + res.data;
      },
      beforeUpload (file) {
        const isImage = (file.type === 'image/jpeg' || file.type === 'image/png');
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isImage) {
          this.$message.error('只能上传图片!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isImage && isLt2M;
      }
    }
  }
</script>

<style lang="scss">
  .assignment {
    padding: 30px 50px;
    background-color: #f5f7f9;
    min-height: 100vh;
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 150px;
      height: 150px;
      line-height: 150px;
      text-align: center;
    }
    .avatar {
      width: 150px;
      display: block;
    }
    .assignment-container {
      padding: 30px 50px;

      background-color: white;
      .footer {
        text-align: center;
      }

      .question {
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 35px 45px 35px 35px;
        margin: 20px 0;
        position: relative;
        .text {
          margin-bottom: 15px;
        }
        .el-upload__tip {
          display: inline-block;
          margin-left: 15px;
        }
        .delete {
          position: absolute;
          right: 10px;
          top: 8px;
          &:hover {
            color: red;
          }
        }
      }
    }
  }
</style>
