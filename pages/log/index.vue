<template>
  <div class="log-page">
    <div class="title">
      <span>记录美好生活！</span>
    </div>
    <div class="edit-area">
      <div class="form-area" v-if="showEdit">
        <FormKit :config="config" v-model:form-data="formData" ref="formRef"></FormKit>
        <el-row type="flex" justify="end">
          <el-button type="info" size="small" plain @click="showEdit=false">取消</el-button>
          <el-button size="small" type="primary" @click="submit">发布</el-button>
        </el-row>
      </div>
      <div v-else>
        <el-button type="primary" plain @click="showEdit=true ">
          <el-icon style="vertical-align: middle">
            <Plus/>
          </el-icon>
          写日志
        </el-button>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import FormKit from "~/components/FormKit/index.vue";
import Http from '@/request/index'


const config = ref([
  {
    label: '标题名称',
    field: 'title',
    type: 'input',
    required: true
  },
  {
    label: '内容',
    field: 'content',
    type: 'input',
    required: true,
    props: {
      type: 'textarea',
      autosize: {
        minRows: 5
      }
    }
  }
])
const formData = reactive({})
const showEdit = ref(false)
const formRef = ref(null)
const submit = () => {
  console.log(formData, 'formData')
  formRef.value.validate((valid, fields) => {
    console.log(valid, fields)

  })
}


onMounted(() => {
  Http.get('/list',)
})
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

    .form-area {
      width: 30%;
      margin-top: 20px;
    }
  }
}
</style>
