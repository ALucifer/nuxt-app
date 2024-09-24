<template>
  <AppSocialContainer>
    <template #header>
      <h4>Mot de passe perdu ?</h4>
    </template>
    <template #default>
      <AppForm class="forgot-password__form" action="" :validation-schema="schema" @submit="onSubmit">
        <div class="form-group">
          <AppField type="email" placeholder="Votre email" name="email"/>
          <AppErrorMessage class="error" name="email"/>
        </div>
        <div class="form-group">
          <button class="cmn-btn">Envoyer un email</button>
        </div>
      </AppForm>
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
import {type InferType, object, string} from "yup";

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  }
})

const schema = object({
  email: string().required('Email requis.').email('Email non valide.')
})

type formTypes = InferType<typeof schema>;
const { handleResponse } = useFlashMessages()
const router = useRouter()

async function onSubmit(values: formTypes) {
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
}
</script>

<style lang="scss" scoped>
.form-group {
  margin: 16px 0;
}
</style>