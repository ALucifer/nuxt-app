<template>
  <AppSocialContainer>
    <template #header>
      <h4>Bienvenue</h4>
    </template>
    <template #default>
      <LoginForm />
    </template>
    <template #footer>
      <div class="account">
        <p>
          Vous n'avez pas de compte?
          <NuxtLink :to="{ name: 'register' }">
            Inscription ici
          </NuxtLink>
        </p>
      </div>
    </template>
  </AppSocialContainer>
</template>

<script setup lang="ts">
import LoginForm from '@/components/LoginForm'

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  },
})

useHead({
  title: 'Connexion',
  script: [
    {
      hid: 'google',
      src: 'https://accounts.google.com/gsi/client',
      async: true,
      defer: true,
    },
  ],
})
</script>

<style lang="scss">
@import "@/assets/css/pages/login.scss";
</style>
