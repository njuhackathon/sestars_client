<template>
  <div class='check-detail'>
    <div style="font-size: 24px">{{assignment.title}}</div>
    <div style="font-size: 14px; color: #999">{{assignment.endDate.toLocaleString().replace('T', ' ').split('.')[0]}}
      截止
    </div>
    <div style="border: 1px solid #ccc; padding: 20px; border-radius: 5px; margin-top: 20px">
      <p>{{assignment.questionAnswers[qi].question.title}}</p>
      <img v-if="assignment.questionAnswers[qi].question.imageUrl !== ''"
           :src="assignment.questionAnswers[qi].question.imageUrl" width="300">
    </div>
    <div style="border: 1px solid #ccc; padding: 20px; border-radius: 5px; margin-top: 20px">
      <div>
        <p>{{assignment.questionAnswers[qi].answers[ai].text}}</p>
        <div v-if="assignment.questionAnswers[qi].answers[ai].imageUrls.length > 0">
          <img v-for="url in assignment.questionAnswers[qi].answers[ai].imageUrls" :src="url" width="150">
        </div>
        <div style="font-size: 14px; color: #aaa">由 {{assignment.questionAnswers[qi].answers[ai].studentRealName}} 作答
        </div>
      </div>
    </div>
    <div style="margin-top: 15px; display: flex; justify-content: space-between">
      <div style="flex: 1"><span style="margin-right: 15px; display: inline-block">赋分</span>
        <el-input-number v-model="assignment.questionAnswers[qi].answers[ai].score" :precision="1" :step="0.5"
                         placeholder="赋分"></el-input-number>
      </div>
      <div style="flex: 0 0 auto">
        <el-button type="primary"
                   @click="next"
                   v-if="!((assignment.questionAnswers.length-1 === qi) && (assignment.questionAnswers[qi].answers.length-1 === ai))">
          下一个 ->
        </el-button>
        <el-button type="danger"
                   @click="mark"
                   v-if="(assignment.questionAnswers.length-1 === qi) && (assignment.questionAnswers[qi].answers.length-1 === ai)">
          结束批改
        </el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import API from '../../api'

  export default {
    name: 'check-detail',
    created () {
      this.assignmentId = this.$route.query.id
      this.getAssignment()
    },
    data () {
      return {
        qi: 0,
        ai: 0,
        assignmentId: 0,
        assignment: {}
      }
    },
    methods: {
      getAssignment: function () {
        API.get(`/teacher/assignment/?assignmentId=${this.assignmentId}`).then(res => {
          this.assignment = res.data
        })
      },
      next: function () {
        this.mark()
        if (this.ai < this.assignment.questionAnswers[this.qi].length - 1) {
          this.ai++;
        } else {
          this.ai = 0;
          if (this.qi < this.assignment.questionAnswers.length - 1) {
            this.qi++;
          } else {
            return
          }
        }
      },
      mark: function () {
        let answer = this.assignment.questionAnswers[this.qi].answers[this.ai]
        API.get(`/teacher/assignment/mark?answerId=${answer.answerId}&score=${answer.score}`).then(res => {
          if (!res.success) {
            this.$message.error('服务器出现故障')
          }
        })
      }
    },
  }
</script>

<style>
  .check-detail {
    padding: 50px 80px;
  }
</style>
