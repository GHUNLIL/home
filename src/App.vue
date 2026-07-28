<template>
  <!-- 主界面 -->
  <Transition name="fade" mode="out-in">
    <main id="main">
      <div class="page-container">
        <section class="all" v-show="!store.setOpenState">
          <MainLeft />
          <MainRight v-show="!store.boxOpenState" />
          <Box v-show="store.boxOpenState" />
        </section>
        <section class="more" v-show="store.setOpenState" @click="store.setOpenState = false">
          <MoreSet />
        </section>
      </div>
      <!-- 移动端菜单按钮 -->
      <Icon class="menu" size="24" @click="store.mobileOpenState = !store.mobileOpenState">
        <component :is="store.mobileOpenState ? CloseSmall : HamburgerButton" />
      </Icon>
      <!-- 页脚 -->
      <Transition name="fade" mode="out-in">
        <Footer class="f-ter" v-show="!store.setOpenState" />
      </Transition>
    </main>
  </Transition>
</template>

<script setup lang="ts">
import { checkDays } from "@/utils/getTime.js";
import { HamburgerButton, CloseSmall } from "@icon-park/vue-next";
import { mainStore } from "@/store";
import { Icon } from "@vicons/utils";
import MainLeft from "@/views/Main/Left.vue";
import MainRight from "@/views/Main/Right.vue";
import Footer from "@/components/Footer.vue";
import Box from "@/views/Box/index.vue";
import MoreSet from "@/views/MoreSet/index.vue";
import cursorInit from "@/utils/cursor.js";
import config from "@/../package.json";
import { initFirefly, closeFirefly } from "@/utils/season/firefly";

const store = mainStore();
document.documentElement.dataset.theme = "dark";

// 页面宽度
const getWidth = () => {
  store.setInnerWidth(window.innerWidth);
};

// 监听宽度变化
watch(
  () => store.innerWidth,
  (value) => {
    if (value != null && value < 721) {
      store.boxOpenState = false;
      store.setOpenState = false;
    }
  },
);

onMounted(() => {
  checkDays();
  initFirefly();

  // 自定义鼠标
  cursorInit();

  // 监听当前页面宽度
  getWidth();
  window.addEventListener("resize", getWidth);

  // 控制台输出
  const styleTitle1 = "font-size: 20px;font-weight: 600;color: rgb(244,167,89);";
  const styleTitle2 = "font-size:12px;color: rgb(244,167,89);";
  const styleContent = "color: rgb(30,152,255);";
  const title1 = "UNLIL · 个人主页";
  const title2 = `
 _____ __  __  _______     ____     __
|_   _|  \\/  |/ ____\\ \\   / /\\ \\   / /
  | | | \\  / | (___  \\ \\_/ /  \\ \\_/ /
  | | | |\\/| |\\___ \\  \\   /    \\   /
 _| |_| |  | |____) |  | |      | |
|_____|_|  |_|_____/   |_|      |_|`;
  const content = `\n\n版本: ${config.version}\n网站: https://unlil.com/`;
  console.info(`%c${title1} %c${title2} %c${content}`, styleTitle1, styleTitle2, styleContent);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", getWidth);
  closeFirefly();
});
</script>

<style lang="scss" scoped>
#main {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // transform: scale(1.2);
  transition: transform 0.3s;
  animation: fade 0.25s ease-out both;

  .page-container {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 70px 0.75rem 64px;
    display: flex;
    align-items: center;
    justify-content: center;

    .all {
      width: 100%;
      max-width: 1120px;
      height: auto;
      padding: 0;
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      grid-auto-rows: 328px;
      gap: var(--bento-gap);
      justify-content: center;
      align-items: stretch;
      overflow: hidden;
    }

    .more {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #00000080;
      -webkit-backdrop-filter: blur(20px);
      backdrop-filter: blur(20px);
      z-index: 2;
      animation: fade 0.5s;
    }


    @media (max-width: 1200px) {
      padding: 70px 0.75rem 64px;
    }

    @media (max-width: 720px) {
      padding: 82px 14px 62px;

      .all {
        display: block;
        max-width: 560px;
        grid-auto-rows: initial;
      }
    }
  }

  .menu {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 84%;
    left: calc(50% - 28px);
    width: 56px;
    height: 34px;
    border: 1px solid var(--bento-border);
    background: var(--bento-surface);
    -webkit-backdrop-filter: blur(14px);
    backdrop-filter: blur(14px);
    border-radius: var(--bento-radius);
    transition: transform 0.3s;
    animation: fade 0.5s;

    &:active {
      transform: scale(0.95);
    }

    .i-icon {
      transform: translateY(2px);
    }

    @media (min-width: 721px) {
      display: none;
    }
  }

  @media (max-height: 650px) {
    overflow-y: auto;
    overflow-x: hidden;

    .page-container {
      height: 650px;

      .more {
        height: 650px;
        width: calc(100% + 6px);
      }
    }

    .menu {
      top: calc(650px * 0.84);
      left: calc(360px * 0.5 - 25px);

      @media (min-width: 360px) {
        left: calc(50% - 25px);
      }
    }

    .f-ter {
      top: calc(650px - 46px);

      @media (min-width: 360px) {
        padding-left: 6px;
      }
    }
  }

  @media (max-width: 360px) {
    overflow-x: auto;
    overflow: hidden;

    .page-container {
      width: 360px;
    }

    .menu {
      left: calc(360px * 0.5 - 28px);
    }

    .f-ter {
      width: 360px;
    }

    @media (min-height: 721px) {
      overflow-y: hidden;
    }
  }

}
</style>
