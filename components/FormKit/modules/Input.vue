<template>
  <el-input v-model="_value" v-bind="$attrs" :placeholder="$attrs?.placeholder||'请填写内容'"/>
</template>

<script setup lang="ts">
import {computed} from 'vue';

const props = defineProps({
    modelValue: {
        default: '',
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
<script lang="ts">
export default {
    name: 'aaa'
};
</script>

<style lang="scss" scoped>

</style>
