<template>
  <div class="sign-with">
    <p>{{ message }}</p>
  </div>
  <div class="social-auth">
    <a href="javascript:void(0)">
      <NuxtImg src="/images/social-icon-1.png" alt="image"/>
    </a>
    <a class="twitch" href="javascript:void(0)">
      <NuxtImg src="/images/social-icon-2.png" alt="image"/>
    </a>
    <a class="google" @click="signIn('google')">
      <NuxtImg src="/images/social-icon-3.png" alt="image"/>
    </a>
  </div>
</template>

<script setup lang="ts">
defineProps({
    message: {
      type: String,
      required: true
    }
})

const { signIn } = useAuth()
</script>

<style lang="scss" scoped>
@import "@/assets/css/components/socialAuthenticator.scss";
</style>
