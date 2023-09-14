<template>
  <AppSocialContainer>
    <template #header>
      <h4>Mot de passe perdu ?</h4>
    </template>
    <template #default>
      <AppForm @submit="onSubmit" :validation-schema="schema" class="forgot-password__form" action="">
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
import {object, string} from "yup";
import AuthClient from "~/app/client/AuthClient";

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  }
})

const schema = object({
  email: string().required('Email requis.').email('Email non valide.')
})

const {addMessage} = useFlashMessages()
const router = useRouter()
const authclient = new AuthClient()

function onSubmit(values, { resetForm }) {
  authclient.forgotPassword(values.email)

  addMessage({
    class: "success",
    message: "Un message de réinitialisation de mot de passe à été envoyé."
  })

  resetForm()
  router.push('/')
}
</script>

<style lang="scss" scoped>
.form-group {
  margin: 16px 0;
}
</style>