<template>
  <el-cascader v-model="_value"
               v-bind="$attrs"
               :options="districts"
               :props="$attrs.props|| {label: 'name',value: 'code'}"
               :placeholder="$attrs?.placeholder||'请选择内容'">
  </el-cascader>
</template>

<script setup lang="ts">
import {computed} from "vue";
import districts from "@/utils/districts";

const props = defineProps({
  modelValue: {
    default: '',
    required: true
  },
})
const emit = defineEmits(['update:modelValue'])
const _value = computed({
  get: () => {
    return props.modelValue
  },
  set: (newValue) => {
    emit('update:modelValue', newValue)
  }
})

</script>

<style lang="scss" scoped>

</style>
