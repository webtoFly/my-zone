<template>
  <el-radio-group v-model="_value">
    <el-radio v-for="(item,index) in options"
              :key="index"
              :label="item[$attrs?.valueKey||'id']"
    >
      {{ item[$attrs?.labelKey || 'name'] }}
    </el-radio>

  </el-radio-group>
</template>

<script setup lang="ts">
import {computed} from 'vue';

const props = defineProps({
    modelValue: {
        default: '',
        required: true
    },
    options: {type: Array,
        default: () => []}
});
const emit = defineEmits(['update:modelValue']);
const _value = computed({
    get: () => props.modelValue,
    set: newValue => {
        emit('update:modelValue', newValue);
    }
});


</script>

<style lang="scss" scoped>

</style>
