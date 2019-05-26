<template>
  <div class='check'>
    <el-card>
      <div slot="header" class="clearfix">
        <span>批改作业</span>
        <div style="float: right">
          <el-switch
            v-model="type"
            active-text="未批改的"
            inactive-text="全部作业">
          </el-switch>
        </div>
      </div>
      <div>
        <div style="width: 300px">
          <el-card shadow="never">
            <div class="assignment-card">
              <div class="left">作业名称</div>
              <div class="right">
                <el-button type="danger" size="mini">查看</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </div>

    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'check'
  }
</script>

<style lang="scss">
  .check {
    .assignment-card {
      display: flex;
      justify-content: space-between;
      .left, .right {
        flex: 0 0 auto;
      }
    }
  }
</style>
