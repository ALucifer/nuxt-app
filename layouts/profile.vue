<template>
    <div class="profile">
      <div class="background"/>
      <slot />
    </div>
</template>

<style lang="scss">
.background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 560px;
  background-image: url("@/assets/images/about-bg-overlay.png"), url("@/assets/images/about-bg.png");
  background-repeat: no-repeat, no-repeat;
  background-size: 100%, 100% 100%;
  background-position-y: bottom;
}

.profile {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
