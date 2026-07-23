<template>
  <div :class="store.mobileOpenState ? 'left hidden' : 'left'">
    <Message />
    <SocialLinks />
  </div>
</template>

<script setup lang="ts">
import { mainStore } from "@/store";
import Message from "@/components/Message.vue";
import SocialLinks from "@/components/SocialLinks.vue";
const store = mainStore();
</script>

<style lang="scss" scoped>
.left {
  width: 100%;
  margin: 0;
  transform: none;
  &.hidden {
    display: none;
  }
  @media (max-width: 720px) {
    margin-right: 0;
    width: 100%;
  }
}
</style>
