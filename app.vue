<template>
  <AppHeader />
  <div class="main">
    <NuxtLayout>
      <div>
        <NuxtPage :key="date" />
        <AppSidebar />
      </div>
    </NuxtLayout>
  </div>
  <AppNotifications />
  <AppFooter />
</template>

<script setup lang="ts">
const date = (new Date()).getMilliseconds()
</script>

<style lang="scss">
@import "@/assets/css/common.scss";
</style>
