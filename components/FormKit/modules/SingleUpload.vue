<template>
  <el-upload
      v-loading="loading"
      :show-file-list="false"
      :http-request="httpRequest"
      :style="{ width: $attrs.width || '70px', height: $attrs.height || '70px' }"
      v-bind="BINDED"
      drag
      class="imageUploader">
    <el-image v-if="_value" :src="_value"/>
    <div v-else>
      <el-icon>
        <Plus/>
      </el-icon>
    </div>
  </el-upload>

</template>

<script setup lang="ts">
import {computed, useAttrs} from "vue";
import {ElMessage} from "element-plus";
import Requst from "@/request/httpRequest";

const NODE_ENV = import.meta.env.MODE


const loading = ref(false)
const props = defineProps({
  modelValue: {
    required: true,
    default: ''
  },
  uploadRequest: Function,
  params: {
    type: Object,
    default: () => {
    }
  }
})
const emit = defineEmits(['update:modelValue'])
const _value = computed({
  get: () => {
    return props.modelValue || ''
  },
  set: (newValue) => {
    emit('update:modelValue', newValue)
  }
})

const BINDED = computed(() => {
  const _attrs = useAttrs(),
      req = {
        beforeUpload: beforeUpload,
        onError: () => {
          loading.value = false
        },
        multiple: false
      }
  req.action = 'http'
  if (_attrs.onSuccess) req.onSuccess = _attrs.onSuccess
  if (_attrs.beforeUpload) req.beforeUpload = _attrs.beforeUpload
  if (_attrs.multiple) req.multiple = _attrs.multiple
  return req
})
const beforeUpload = (file) => {
  const isJPG = file.type === 'image/jpeg'
  const isPNG = file.type === 'image/png'
  const isLt2M = file.size / 1024 / 1024 < 1
  if (!isJPG && !isPNG) {
    ElMessage.warning('上传图片只能是 JPG/PNG 格式!')
    return false
  }
  if (!isLt2M) {
    ElMessage.warning('上传图片大小不能超过 1MB!')
    return false
  }
  loading.value = true
  return (isJPG || isPNG) && isLt2M
}
const httpRequest = async (ctx) => {
  const FormDatas = new FormData()
  FormDatas.append("file", ctx.file)
  try {
    const {data = ''} = await Requst.post("file/doUpLoadwebp", FormDatas,)
    if (data) _value.value = data
    loading.value = false
  } catch (e) {
    loading.value = false
    console.error(e, '上传图片出错')
  }

}
</script>

<style lang="scss" scoped>
.imageUploader {
  display: inline-block;
  //border: 1px dashed #d9d9d9;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%
  }

  ::v-deep(.el-upload) {
    width: 100%;
    height: 100%
  }

  ::v-deep(.el-upload-dragger) {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
}

.upload-image {
  width: 100%;
  height: 100%;
}

.image-rules {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

</style>
