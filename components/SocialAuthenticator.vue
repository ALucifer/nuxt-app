<template>
  <div class="sign-with">
    <p>{{ message }}</p>
  </div>
  <div class="social-auth">
    <a href="javascript:void(0)"
      ><img src="images/social-icon-1.png" alt="image"
    /></a>
    <a class="twitch" href="javascript:void(0)"
      ><img src="images/social-icon-2.png" alt="image"
    /></a>
    <a class="google" href="javascript:void(0)"
      ><img src="images/social-icon-3.png" alt="image"
    /></a>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/components/socialAuthenticator.scss";
</style>
