<template>
  <div class="log-page">
    <div class="title">
      <span>记录美好生活！</span>
    </div>
    <div class="edit-area">
      <el-button type="primary" plain>
        <el-icon style="vertical-align: middle">
          <Plus/>
        </el-icon>
        写日志
      </el-button>
      <div class="form-area">
        <FormKit :config="config" v-model:form-data="formData"></FormKit>
        <el-row type="flex" justify="end">
          <el-button size="small" type="primary" class="" @click="submit">发布</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import FormKit from "~/components/FormKit/index.vue";

const config = ref([
  {
    label: '标题名称',
    field: 'title',
    type: 'input'
  },
  {
    label: '内容',
    field: 'content',
    type: 'input',
    props: {
      type: 'textarea',
      autosize:{
        minRows:5
      }
    }
  }
])
const formData = reactive({})
const submit = ()=>{
  console.log(formData,'formData')
}
</script>

<style lang="scss" scoped>
.log-page {
  padding: 20px;

  .title {
    margin: 50px;
    font-size: 26px;

    span {
      @include textGradient(to right, #ff8600, #00b0ff)
    }
  }

  .edit-area {
    margin: 0 50px;
    .form-area{
      width: 30%;
      margin-top: 20px;
    }
  }
}
</style>
