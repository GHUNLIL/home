<template>
  <!-- 基本信息 -->
  <div class="message cards">
    <div class="identity">
      <img class="logo-img" :src="siteLogo" alt="UNLIL" />
      <h1 :class="{ name: true, 'text-truncate-ellipsis': true, long: siteUrl[0].length >= 6 }">
        <span class="bg">{{ siteUrl[0] }}</span>
        <span v-if="siteUrl[1]" class="sm">.{{ siteUrl[1] }}</span>
      </h1>
    </div>
    <button type="button" class="description" aria-label="查看业务与合作" @click="changeBox">
      <Transition name="fade" mode="out-in">
        <div :key="descriptionText.hello + descriptionText.text" class="text">
          <p class="hello">{{ descriptionText.hello }}</p>
          <p class="intro">{{ descriptionText.text }}</p>
        </div>
      </Transition>
    </button>
  </div>
</template>

<script setup lang="ts">
import { Error } from "@icon-park/vue-next";
import { mainStore } from "@/store";
import { Speech, stopSpeech, SpeechLocal } from "@/utils/speech";
const store = mainStore();

// 主页站点logo
const siteLogo = envConfig.VITE_SITE_MAIN_LOGO;
// 站点链接
const siteUrl = computed(() => {
  let mns: string | null = null;
  if (store.msgNameShow) {
    mns = envConfig.VITE_SITE_MAIN_NAME  ||  envConfig.VITE_SITE_URL || "UNLIL";
    // 这里并没有处理显示自定义内容后的分段点，因为这个点看着也不错，有种写字时封笔的感觉，就不处理啦~
    // 才不是懒的！（x）
  } else {
    mns = envConfig.VITE_SITE_URL || "unlil.com";
  };
  const url = mns;
  if (!url) return "UNLIL".split(".");
  let urlFormat = url;
  // 判断协议前缀
  urlFormat = urlFormat.replace(/^(https?:\/\/)/, "");
  const domainOnly = urlFormat.split('/')[0];
  const hostname = domainOnly.split(':')[0];
  return hostname.split(".");
});

// 简介区域文字
const descriptionText = reactive({
  hello: envConfig.VITE_DESC_HELLO,
  text: envConfig.VITE_DESC_TEXT,
});

// 切换右侧功能区
const changeBox = () => {
  if ((store.getInnerWidth ?? 0) >= 721) {
    store.boxOpenState = !store.boxOpenState;
  } else {
    ElMessage({
      message: "当前显示分辨率不足以打开拓展盒子啦qwq【这么“小”还想开impart！（bushi）】",
      grouping: true,
      icon: h(Error, {
        theme: "filled",
        fill: "#efefef",
      }),
    });
    if (store.webSpeech) {
      stopSpeech();
      const voice = envConfig.VITE_TTS_Voice;
      const vstyle = envConfig.VITE_TTS_Style;
      SpeechLocal("分辨率不足.mp3");
    };
  };
};

// 监听状态变化
watch(
  () => store.boxOpenState,
  (value) => {
    if (value) {
      descriptionText.hello = envConfig.VITE_DESC_HELLO_OTHER;
      descriptionText.text = envConfig.VITE_DESC_TEXT_OTHER;
      if (store.webSpeech) {
        stopSpeech();
        const voice = envConfig.VITE_TTS_Voice;
        const vstyle = envConfig.VITE_TTS_Style;
        SpeechLocal("惊讶.mp3");
      };
    } else {
      descriptionText.hello = envConfig.VITE_DESC_HELLO;
      descriptionText.text = envConfig.VITE_DESC_TEXT;
    };
  },
);
</script>


<style lang="scss" scoped>
.message {
  width: 100%;
  height: 100%;
  min-height: 0;
  padding: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: fade 0.5s;

  .identity {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: var(--bento-text);

    .logo-img {
      border: 1px solid var(--bento-border);
      border-radius: 0;
      width: 142px;
      height: 88px;
      object-fit: cover;
      object-position: center;
    }

    .name {
      width: 100%;
      padding-left: 20px;
      transform: none;
      font-family: var(--font-sans);
      font-weight: 700;
      letter-spacing: 0.04em;

      .bg {
        font-size: clamp(3rem, 4.5vw, 4.5rem);
        color: var(--bento-text);
      }

      .sm {
        margin-left: 6px;
        font-size: 1.75rem;
        color: var(--bento-muted);

        @media (min-width: 721px) and (max-width: 789px) {
          display: none;
        }
      }
    }

    @media (max-width: 768px) {
      .logo-img {
        width: 116px;
        height: 76px;
      }

      .name {
        height: auto;

        .bg {
          font-size: 3.8rem;
        }
      }
    }

    @media (max-width: 720px) {
      max-width: 100%;
    }
  }

  .description {
    width: 100%;
    color: inherit;
    background: transparent;
    border: 0;
    text-align: left;
    font: inherit;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid var(--bento-border);
    cursor: pointer;

    .text {
      min-height: 72px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 8px;
      transition: opacity 0.2s;

      .hello {
        font-size: 1.2rem;
        font-family: var(--font-sans);
        font-weight: 650;
        letter-spacing: 0.01em;
      }

      .intro {
        color: var(--bento-muted);
        font-size: 1rem;
        line-height: 1.7;
      }
    }

    @media (max-width: 720px) {
      pointer-events: none;
    }
  }

  @media (max-width: 720px) {
    height: auto;
    min-height: 238px;
    padding: 18px;
  }
}
</style>
