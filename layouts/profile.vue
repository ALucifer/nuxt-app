<template>
    <div class="profile">
      <slot />
    </div>
</template>

<style lang="scss">
.profile {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 560px;
  background-image: url("@/assets/images/about-bg-overlay.png"), url("@/assets/images/about-bg.png");
  background-repeat: no-repeat, no-repeat;
  background-size: 100%, 100% 100%;
  background-position-y: bottom;
}
</style>
