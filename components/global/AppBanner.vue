<template>
  <div class="banner" :class="{ 'banner--default': isDefault }">
    <div class="image-banner__container">
      <img
        class="image-banner__img image-banner__img--1"
        src="/images/banner-circle-1.png"
        alt="icon"
      />
      <img
        v-if="!isDefault"
        class="image-banner__img image-banner__img--2"
        src="/images/banner-circle-2.png"
        alt="icon"
      />
      <img
        v-if="!isDefault"
        class="image-banner__img image-banner__img--3"
        src="/images/banner-circle-2.png"
        alt="icon"
      />
    </div>
    <div class="container">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({ isDefault: { default: false } })
</script>

<style lang="scss">
@import "@/assets/css/components/global/AppBanner.scss";
</style>
