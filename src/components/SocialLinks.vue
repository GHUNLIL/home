<template>
  <!-- 社交链接 -->
  <div class="social cards">
    <div class="link">
      <a v-for="item in socialLinks" :key="item.name" :href="item.url" target="_blank"
        @mouseenter="socialTip = item.tip" @mouseleave="socialTip = '与我联系'">
        <img class="icon" :src="item.icon" height="24" />
      </a>
    </div>
    <span class="tip" @dblclick="togglesocial">{{ socialTip }}</span>
  </div>
</template>

<script setup lang="ts">
import socialLinks from "@/assets/socialLinks.json";
import { Speech, stopSpeech, SpeechLocal } from "@/utils/speech";
import { mainStore } from "@/store";

const store = mainStore();
// 社交链接提示
const socialTip = ref("与我联系");

const togglesocial = () => {
  ElMessage({
    dangerouslyUseHTMLString: true,
    message: `很高兴与你相遇`,
  });
  if (store.webSpeech) {
    stopSpeech();
    const voice = envConfig.VITE_TTS_Voice;
    const vstyle = envConfig.VITE_TTS_Style;
    SpeechLocal("戳戳社.mp3");
  };
};
</script>

<style lang="scss" scoped>
.social {
  margin-top: var(--bento-gap);
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: none;
  width: 100%;
  height: 62px;
  padding: 0 16px;
  animation: fade 0.5s;

  @media (max-width: 840px) {
    max-width: 100%;
    justify-content: center;

    .link {
      justify-content: space-evenly !important;
      width: 90%;
    }

    .tip {
      display: none !important;
      color: var(--social-font-color);
    }
  }

  .link {
    display: flex;
    align-items: center;
    justify-content: center;

    a {
      display: inherit;

      .icon {
        width: 24px;
        height: 24px;
        margin: 0 12px;
        transition: transform 0.3s;

        &:hover {
          transform: scale(1.1);
        }

        &:active {
          transform: scale(1);
        }
      }
    }
  }

  .tip {
    color: var(--bento-muted);
    display: block;
    margin-right: 4px;
    animation: fade 0.5s;
  }

  @media (min-width: 768px) {
    &:hover {
      .tip {
        display: block;
        color: var(--bento-text);
      }
    }
  }
}
</style>
