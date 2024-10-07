<template>
  <AppSocialContainer>
    <template #header>
      <h4>Inscription</h4>
    </template>
    <template #default>
      <RegisterForm />
    </template>
    <template #footer>
      <div class="account">
        <p>
          Vous avez un compte?
          <NuxtLink :to="{ name: 'login' }">
            Connexion
          </NuxtLink>
        </p>
      </div>
    </template>
  </AppSocialContainer>
</template>

<script setup lang="ts">
import RegisterForm from '@/components/RegisterForm'

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  },
})

useHead({
  title: 'Inscription',
})
</script>

<style lang="scss" scoped>
@import "@/assets/css/pages/login.scss";
</style>
