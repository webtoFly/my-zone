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
      <div class="mt-5">
          <div v-for="item in listData" :key="item.id" >
            <el-row type="flex" justify="space-between">
              <el-col :span="6">{{item.title}}</el-col>
              <el-col :span="6">{{formatTime(item.creat_time)}}</el-col>
            </el-row>
            <el-row>
              {{item.content}}
            </el-row>
          </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import FormKit from '~/components/FormKit/index.vue';
import Http from '@/request/index';
import {formatTime} from '~/utils/validate';
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
                minRows: 6
            }
        }
    }
]);
const formData = reactive({});
const listData = ref([]);
const showEdit = ref(false);
const formRef = ref(null);
const submit = () => {
    formRef.value.validate((valid, fields) => {
        if(valid) Http.post('/addLog', formData);
    });
};
const getList = async() => {
    listData.value = await Http.get('/list');
};
onMounted(() => {
    getList();
});
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
      margin-top: 20px;
    }
  }
}
</style>
