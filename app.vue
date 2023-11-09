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
  //height: 100vh;

  .spots {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    //overflow-y: scroll;
  }
}
</style>
