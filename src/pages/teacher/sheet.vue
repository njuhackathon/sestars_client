<template>
  <div class='sheet'>
    <div class="sheet-container">
      <h3>作业报告 —— 作业名称</h3>
      <div>2019-05-10 12：45：23截止</div>
      <div>
        <span>共有34人提交作业</span>
        <span>平均分: 75</span>
        <span>最高分：98</span>
        <span>最低分：68</span>
      </div>
      <div>
        <h4>题目详情</h4>
        <div v-for="i in 10" class="question">
          <p>{{i}}.(11分)家具家电数据对比觉得不好的v</p>
          <div style="font-size: 14px; color: #aaa">答题情况统计</div>
          <span>作答/未答: 34/12</span>
          <span>平均分: 75</span>
          <span>最高分：98</span>
          <span>最低分：68</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'sheet',
    data () {
      return {

      }
    },
    methods: {

    }
  }
</script>

<style lang="scss">
  .sheet {
    padding: 50px 70px;
    background-color: #f5f7f9;
    min-height: 100vh;
    .sheet-container {
      background-color: white;
      padding: 30px;
      .question {
        padding: 15px 0;
        border-bottom: 1px solid rgba(7, 17, 27, 0.3);
        &:last-child {
          border-bottom: none;
        }
      }
    }

  }
</style>
