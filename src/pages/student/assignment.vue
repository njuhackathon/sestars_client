<template>
  <div class='assignment'>
    <div class="number-switch">
      <span v-if="notShowNumber" @click="notShowNumber = false"
            style="background-color: #26a2ff; display: inline-block; width: 100vw">点击切换题号</span>
      <div class="number-container" v-else>
        <div v-for="i in 20" :key="i" class="number">
          {{i}}
        </div>
        <div style="margin-top: 10px">
          <el-button type="primary" @click="notShowNumber=true">关闭</el-button>
          <el-button type="primary" @click="notShowNumber=true">保存</el-button>
        </div>
      </div>
    </div>
    <div class="question-container">
      <div>
        <div class="title">题目描述</div>
        <p>题目文本好长一串题目文本好长一串题目文本好长一串题目文本好长一串题目文本好长一串题目文本好长一串题目文本好长一串题目文本好长一串题目文本好长一串题目文本好长一串题目文本好长一串题目文本好长一串</p>
        <img src="../../assets/logo.png" width="300" height="200">
      </div>
      <div class="title">解答区域</div>
      <el-input type="textarea" :autosize="{ minRows: 2}" placeholder="在这里回答" v-model="answer"></el-input>
      <div class="image-container">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture">
          <el-button size="small" type="primary">上传图片</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import API from '../../api'
  export default {
    name: 'assignment',
    data () {
      return {
        answer: '',
        notShowNumber: true
      }
    }, methods: {

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
