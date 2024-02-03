<template>
  <div class="MultipleImgUpload">
    <div
        v-for="(path, index) in _value"
        :key="index"
        :style="{
        width: $attrs.width || '80px',
        height: $attrs.height || '80px'
      }"
        class="multiple-imgUpload-show"
    >
      <el-image :src="_value" fit="cover"/>
      <!--      <div class="img-model">-->
      <!--        <i-->
      <!--            class="el-icon-delete set-img-delete"-->
      <!--            @click.stop="deleteImg(index)"-->
      <!--        />-->
      <!--      </div>-->
    </div>
    <div
        :style="{
        width: $attrs.width || '80px',
        height: $attrs.height || '80px'
      }"
        class="multiple-imgUpload-content"
    >
      <input
          ref="detailImgInput"
          v-bind="$attrs"
          type="file"
          accept="image/*"
          multiple
          class="file-input-content"
          @change="upLoad"
      >
      <el-button type="text" class="cross-icons">
        <el-icon>
          <Plus/>
        </el-icon>
      </el-button>
    </div>
  </div>
  <!--  <el-upload-->
  <!--      v-loading="loading"-->
  <!--      :show-file-list="false"-->
  <!--      :http-request="httpRequest"-->
  <!--      :style="{ width: $attrs.width || '70px', height: $attrs.height || '70px' }"-->
  <!--      v-bind="BINDED"-->
  <!--      class="imageUploader">-->
  <!--    <el-image v-if="_value" :src="_value"/>-->
  <!--    <div v-else>-->
  <!--      <el-icon>-->
  <!--        <Plus/>-->
  <!--      </el-icon>-->
  <!--    </div>-->
  <!--    &lt;!&ndash;    <i&ndash;&gt;-->
  <!--    &lt;!&ndash;       &ndash;&gt;-->
  <!--    &lt;!&ndash;        :style="{&ndash;&gt;-->
  <!--    &lt;!&ndash;          width: $attrs.width || '70px',&ndash;&gt;-->
  <!--    &lt;!&ndash;          height: $attrs.height || '70px',&ndash;&gt;-->
  <!--    &lt;!&ndash;          lineHeight: $attrs.height || '70px'&ndash;&gt;-->
  <!--    &lt;!&ndash;        }"&ndash;&gt;-->
  <!--    &lt;!&ndash;        class="el-icon-plus"/>&ndash;&gt;-->
  <!--  </el-upload>-->
</template>

<script setup lang="ts">
import {computed, useAttrs} from "vue";
import {ElMessage} from "element-plus";
import Request from "@/request/httpRequest";

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
const _attrs = useAttrs()
const emit = defineEmits(['update:modelValue'])

const _value = computed({
  get: () => {
    return props.modelValue || ''
  },
  set: (newValue) => {
    emit('update:modelValue', newValue)
  }
})
const limit = computed(() => _attrs.limit || 1)

const upLoad = async (event) => {
  const files = Array.from(event.target.files)
  console.log(files, 'files')
  if (limit.value !== -1 && _value.value.length >= limit.value) {
    ElMessage.error(`最多只能上传${limit.value}张图片`)
    return
  }
  const FormDatas = new FormData()
  for (let index = 0; index < files.length; index++) {

    const file = files[index]
    console.log(file, 'file')
    loading.value = true
    FormDatas.append("file", file)
    try {
      const {data = ''} = await Request.post("hzsx/busShop/doUpLoadwebp", FormDatas)
      if (!data) return
      if (Array.isArray(_value.value)) {
        _value.value.push(data)
      } else {
        _value.value = [data]
      }
      event.target.value = ''
      loading.value = false
    } catch (e) {
      loading.value = false
      console.error(e, '上传图片出错')
    }
  }
}
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
    const {data = ''} = await Request.post("hzsx/busShop/doUpLoadwebp", FormDatas)
    if (data) _value.value = data
    loading.value = false
  } catch (e) {
    loading.value = false
    console.error(e, '上传图片出错')
  }

}
</script>

<style lang="scss" scoped>

.MultipleImgUpload {
  display: flex !important;
  flex-wrap: wrap;
  column-gap: 15px;
  row-gap: 15px;

  .multiple-imgUpload-show {
    position: relative;

    img {
      width: 100%;
      height: 100%;
    }

    .img-model {
      visibility: hidden;
      position: absolute;
      z-index: 9;
      width: 100%;
      height: 100%;
      background-color: #2d3037;
      opacity: 0.8;
      top: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      column-gap: 10px;

      .set-img-delete {
        font-size: 20px;
        color: white;
        cursor: pointer;
      }

      .set-img-zoom {
        font-size: 20px;
        color: white;
        cursor: pointer;
      }
    }

    &:hover .img-model {
      visibility: visible;
    }
  }

  .multiple-imgUpload-content {
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    border-radius: 6px;
    position: relative;
    border: 1px #c0ccda dashed;

    .cross-icons {
      color: #606266;
      font-size: 20px;
    }
  }


}

::v-deep(.el-image) {
  height: 100%;
}

::v-deep(.file-input-content) {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  cursor: pointer;
}

</style>
