<template>
  <section class="authentication pb-120 pt-120">
    <div class="container">
      <div class="authentication-container">
        <div class="col-lg-6">
          <div class="authentication-main">
            <h4>Bienvenue</h4>
            <LoginForm />
            <div class="or">
              <p>OU</p>
            </div>
              <SocialAuthenticator
                v-if="loaded"
                message="Inscrivez-vous avec"
                :googleClick="googleClick"
              />
            <div class="account">
              <p>Vous n'avez pas de compte? <NuxtLink :to="{ name: 'register' }">Inscription ici</NuxtLink></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import LoginForm from "@/components/LoginForm";
import SocialAuthenticator from "@/components/SocialAuthenticator";
import SocialProvider from "~/app/client/oauth/SocialProvider";
import ProviderDTO from "~/app/client/oauth/DTO/ProviderDTO";

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  }
})

useHead({
  title: "Connexion",
  script: [
    {
      hid: "google",
      src: "https://accounts.google.com/gsi/client",
      async: true,
      defer: true,
    },
  ]
})
const googleClick = ref()
const loaded = ref(false)
function loadGoogle() {
    googleClick.value = (new SocialProvider()).init(ProviderDTO.google())
    loaded.value = true
}
</script>

<style lang="scss">
@import "@/assets/css/pages/login.scss";
</style>
