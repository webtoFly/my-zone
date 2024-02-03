<template>
  <el-form
      ref="FormKitRef"
      :key="UNIQUE_KEY"
      :model="modelForm"
      class="demo-ruleForm"
      label-width="auto"
      status-icon
      :inline="props.columns===1"
      v-bind="_FORM_ATTRS"
  >
    <el-row
        v-bind="props.row" :style="{ 'row-gap': `${props.rowGap}px` }"
    >
      <el-col
          v-for="(conf,index) in config.filter(ele => confController(ele))"
          :key="conf.field"
          v-bind="props.responseSize"
          :span="conf.span || COL_SPAN">
        <el-form-item
            :label="conf.label"
            :label-width="$attrs.labelWidth||conf.labelWidth||'auto'"
            :prop="conf.field"
            :required="conf.required"
            :rules="conf.rules">
          <component
              v-if="conf.type"
              :ref="`formKit-component-${conf.field}`"
              :is="verificationLoad(conf.type)"
              v-model:modelValue="modelForm[conf.field]"
              :key="conf.field"
              :placeholder="`请填写${conf.label}`"
              v-bind="verificationProps(conf)"
              @change="mutation($event, conf, $refs[`formKit-component-${conf.field}`], index)"

          />
          <slot v-else :name="conf.field" :value="modelForm[conf.field]"/>
          <template #error>
            <div class="el-form-item__error">{{ conf.label }}必填</div>
          </template>
        </el-form-item>
      </el-col>
    </el-row>

  </el-form>
</template>
<script setup lang="ts">
import {computed, defineAsyncComponent, ref} from "vue";
import type {formKitItemType} from "@/components/FormKit/type";
import {firstWordToUpper} from "@/utils/validate";
import {isArray, isBoolean, isObject} from "lodash-es";
import customComponents from "@/components/FormKit/modules";

const components: { [key: string]: any } = {}
//加载module文件夹下的文件
for (const key in customComponents) {
  components[key] = defineAsyncComponent(customComponents[key])
}

type propsType = {
  formData: { [key: string]: any; },
  config: formKitItemType[],
  row?: { gutter?: number, type?: string }, // 表单row项设置
  rowGap?: number | string, // 表单项纵向间距
  columns?: number | string, // 每行显示多少列
  responseSize?: object// 表单响应式布局尺寸
}
const props = withDefaults(defineProps<propsType>(), {
  row: () => {
    return ({gutter: 30, type: 'flex'})
  },
  rowGap: 0,
  columns: 1,
  responseSize: () => {
    return ({})
  },
  formData: () => {
    return ({})
  },
  config: () => []
})
const UNIQUE_KEY = computed(() => Number(new Date()))
const _FORM_ATTRS = computed(() => {
  const attrs = {}
  if (props.columns !== 1) attrs.inline = true
  return attrs
})
const COL_SPAN = computed(() => 24 / Number(props.columns))

const FormKitRef = ref(null)
const verificationProps = (rows = {}) => {
  const {type, request, props = {}} = rows
  return props
}
const emit = defineEmits(['update:formData', 'change'])
const modelForm = computed({
  get: () => {
    return props.formData
  },
  set: (newValue) => {
    emit('update:formData', newValue)
  }
})
const confController = (conf: formKitItemType) => {
  if (conf.visible === undefined) {
    return conf
  } else {
    if (isObject(conf.visible) || isArray(conf.visible)) {
      fixedPointClearValidate(conf)
      if (isObject(conf.visible) && checkConfigIsVisible(conf.visible)) return conf
      if (isArray(conf.visible)) {
        const _visible = conf.visible
        const isCheck = _visible.some((it: any) => {
          return checkConfigIsVisible(it)
        })
        if (isCheck) return conf
      }
    } else if (isBoolean(conf.visible)) {
      if (conf.visible) return conf
    } else {
      console.warn('visible field has been set, but it is not an [array, object, Boolean]!')
      return conf
    }
  }
}
const checkConfigIsVisible = (config: { value: any, key: string }): boolean => {
  const {value, key} = config
  if (key && value === undefined) {
    if (modelForm.value[key]) return true;
  } else if (value === undefined && key === undefined) {
    console.warn(
        "Key and value field not detected, U can like this: { value, key } or { key }"
    );
  } else {
    if (modelForm.value[key] === value) return true;
  }
  return false;
}
const fixedPointClearValidate = (config = {}) => {
  if (
      Object.hasOwnProperty.call(config, "key" && "rules") &&
      FormKitRef.value
  ) {
    FormKitRef.value!.clearValidate([config.field]);
  }
}
const verificationLoad = (type: string) => {
  const alias: { [key: string]: string } = {'address': 'el-cascader'}
  if (components.hasOwnProperty(firstWordToUpper(type)) || components.hasOwnProperty(type)) return components[firstWordToUpper(type)]
  if (alias[type]) return alias[type]
  return `el-${type}`
}
const validate = (callback: any) => {
  return new Promise((resolve, reject) => {
    FormKitRef.value!.validate((valid: any, fields: any) => {
      if (callback) {
        callback(valid, fields)
      } else {
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!', fields)
        }
      }
    })
  })
}

const mutation = async (event: any, config: formKitItemType, ref, index: number) => {
  fixedPointClearValidate(config)
  emit('change', {event, config})
}

defineExpose({validate})

</script>
<script lang="ts">
export default {
  name: 'FormKit',
}
</script>

<style scoped lang="scss">
::v-deep(.el-form-item) {
  flex-wrap: wrap;
  width: 100%;

  .el-form-item__content {
    margin-left: 0 !important;

  }
}

::v-deep(.el-select) {
  width: 100%;
}

::v-deep(.el-form-item__label) {
  font-weight: 700;
}

::v-deep(.el-input-number) {
  width: 100%;

  &.is-controls-right .el-input__wrapper {
    padding-left: 11px;
  }

  .el-input__inner {
    text-align: left;
  }


}
</style>
