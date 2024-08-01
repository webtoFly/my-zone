<template>
  <NuxtLayout>
    <NuxtPage class="page" :style="{background:`url(${bgI}) no-repeat`,backgroundSize:'cover'}"/>
  </NuxtLayout>
</template>

<script setup>
import * as ElementPlusIconVue from '@element-plus/icons-vue';
// 引入所有页面的背景图 放在assets/img/page-bg下面
const files = import.meta.glob(['./assets/img/page-bg/*.jpg', './assets/img/page-bg/*.png'], {eager: true});
const bgI = ref('');//每个页面的背景图
const route = useRoute();
const nuxtApp = useNuxtApp();
for(const [key, component] of Object.entries(ElementPlusIconVue))
    nuxtApp.vueApp.component(key, component);

// 根据路由名称更换对应背景图
const matchBgImg = () => {
    const fileNameArr = Object.keys(files);
    const index = fileNameArr.findIndex(fileName => {
        const arr = fileName.split('/');
        return arr[arr.length - 1].includes(route.name);
    });
    if(index !== -1)
        bgI.value = files[fileNameArr[index]].default;
    else
        bgI.value = '';
};
watch(() => route.name, newVal => {
    matchBgImg();
}, {
    immediate: true
});

</script>

<style lang="scss">
.page {
  overflow: hidden;
  position: relative;
  height: 100%;
}
</style>
