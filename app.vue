<template>
  <div class="spots">
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
  </div>
</template>

<script setup lang="ts">
const date = (new Date()).getMilliseconds()
</script>

<style lang="scss">
@import "@/assets/css/common.scss";

body {
  min-height: 100vh;
  background-color: #160A3F;

  .spots {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    min-height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
  }
}
</style>
