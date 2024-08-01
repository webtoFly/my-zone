<template>
  <el-select v-model="_value" v-bind="$attrs" :placeholder="$attrs?.placeholder||'请选择内容'">
    <el-option
        v-for="item in options"
        :key="item.value||item.id"
        :label="item.label||item.name"
        :value="item.value||item.id"
    />
  </el-select>
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
    get: () => `${props.modelValue}`,
    set: newValue => {
        emit('update:modelValue', newValue);
    }
});


</script>

<style lang="scss" scoped>

</style>
