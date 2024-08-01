<template>
  <el-input-number
      v-model="_value"
      controls-position="right"
      v-bind="$attrs"
      :placeholder="$attrs?.placeholder||'请填写内容'"
  />
</template>

<script setup lang="ts">
import {computed} from 'vue';

const props = defineProps({
    modelValue: {
        default: 0,
        required: true
    },
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
