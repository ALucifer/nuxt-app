<template>
  <AppSocialContainer>
    <template #header>
      <h4>Mot de passe perdu ?</h4>
    </template>
    <template #default>
      <form class="forgot-password__form" @submit="onSubmit">
        <div class="form-group">
          <AppInput name="email" placeholder="Votre email" type="email" />
        </div>
        <div class="form-group">
          <button class="cmn-btn">Envoyer un email</button>
        </div>
      </form>
    </template>
    <template #footer>
      <div class="account">
        <p>Vous avez un compte?
          <NuxtLink :to="{ name: 'login' }">Connexion</NuxtLink>
        </p>
      </div>
    </template>
  </AppSocialContainer>
</template>

<script setup lang="ts">
import AppSocialContainer from "~/components/global/AppSocialContainer.vue";
import { useForgotPasswordForm } from "~/composables/form/useForgotPasswordForm";
import type { ForgotPasswordForm } from "~/app/form/forgot-password.form";

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  }
})

const { handleSubmit } = useForgotPasswordForm()
const { handleResponse } = useFlashMessages()
const router = useRouter()

const onSubmit = handleSubmit(async (values: ForgotPasswordForm) => {
  const { data } = await useFetch(
      '/api/user/forgotPassword',
      {
        method: 'POST',
        body: values
      }
  )

  handleResponse(
      data.value!,
      "Un message de réinitialisation de mot de passe à été envoyé.",
      "Une erreur est survenu"
  )

  if (data.value) {
    await router.push('/')
  }
})
</script>

<style lang="scss" scoped>
.form-group {
  margin: 16px 0;
}
</style>