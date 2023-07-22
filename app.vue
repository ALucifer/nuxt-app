<template>
  <AppHeader />
  <div class="main">
    <NuxtLayout>
      <div>
        <NuxtPage :key="`${$route.path}`" />
        <AppSidebar />
      </div>
    </NuxtLayout>
  </div>
  <AppNotifications />
  <AppFooter />
</template>

<style lang="scss">
@import "@/assets/css/common.scss";
</style>
