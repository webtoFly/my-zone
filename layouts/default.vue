<template>
  <div class="layout-page ">
    <div class="absolute h-full overflow-hidden  duration-500 "
         :class="['/','/home'].includes(activeIndex)?'w-1/2 ':'bg-hide'">
      <div class="bg"></div>
    </div>
    <div class="absolute h-full overflow-hidden right-0 duration-500 "
         :class="['/','/home'].includes(activeIndex)?' w-1/2':'bg-hide'">
      <div class="bg -translate-x-1/2"></div>
    </div>
    <slot/>

    <!--    :default-active="activeIndex"-->
    <el-menu
        class="app-menu container-box flex justify-center"
        mode="horizontal"
        router
        :default-active="activeIndex"
        @select="handleSelect"
    >
      <el-menu-item class="app-menu-item" index="/home">
        <span>首页</span>
      </el-menu-item>
      <el-menu-item class="app-menu-item" index="/album">
        <span>相册</span>
      </el-menu-item>
      <el-menu-item class="app-menu-item" index="/log">
        <span>日志</span>
      </el-menu-item>
      <el-menu-item class="app-menu-item" index="/message">
        <span>留言板</span>
      </el-menu-item>
    </el-menu>

  </div>
</template>

<script setup>
const route = useRoute();
const activeIndex = ref(route.fullPath);
const handleSelect = val => {
    console.log(val);
    activeIndex.value = val;
};
</script>

<style lang="scss" scoped>
.layout-page {
  position: relative;
  overflow: hidden;
  height: 100%;
  background-size: cover;
  margin: 0;
}

.bg {
  position: relative;
  width: 100vw;
  height: 100%;
  z-index: 9999;
  background: url('../assets/img/bg.jpg') no-repeat;
  background-size: cover;
}

.bg-hide {
  opacity: 0;
  width: 0;
}

::v-deep(.el-sub-menu) {
  .el-sub-menu__title {
    &:hover {
      background: transparent;
    }
    &:focus {
      background: transparent;
    }
  }
}

.app-menu {
  position: absolute;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
  background-color: transparent;
  border: none;
  animation: bottom-to-up 0.8s ease-out;
  z-index: 99999;


  .app-menu-item {
    color: $textColor;
    //text-decoration: underline;
    transition: .5s;
    border-bottom: none;
    cursor: inherit;

    &:hover {
      background: transparent;
    }

    &:focus {
      background: transparent;
    }

    &.is-active {
      text-decoration: underline
    }

    img {
      width: 50px;
      height: 40px;
    }
  }
}


</style>
