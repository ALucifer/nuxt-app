<template>
  <AppSocialContainer>
    <template #header>
      <h4>Nouveau mot de passe</h4>
    </template>
    <template #default>
      <AppForm @submit="onSubmit" :validation-schema="schema">
        <div class="form-group p-2">
          <label>Mot de passe</label>
          <AppField name="password" type="password" placeholder="**********" />
          <AppErrorMessage class="error" name="password" />
        </div>
        <div class="form-group p-2">
          <label>Confirmation</label>
          <AppField name="password_confirmation" type="password" placeholder="**********" />
          <AppErrorMessage class="error" name="password_confirmation" />
        </div>
        <div class="form-group p-2">
          <button type="submit" class="cmn-btn submit-btn">Sauvegarder</button>
        </div>
        <div v-if="error" class="form-group">
          <p class="error">
            Une erreur est survenue lors de votre inscription, merci de réésayer
            plus tard.
          </p>
        </div>
      </AppForm>
    </template>
  </AppSocialContainer>
</template>

<script setup lang="ts">
import * as yup from "yup";
import AuthClient from "~/app/client/AuthClient";

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  }
})

const route = useRoute()
const router = useRouter()
const { successMessage, errorMessage } = useFlashMessages()

const schema = yup.object({
  password: yup
      .string()
      .required("Mot de passe requis.")
      .min(6, "Votre mot de passe doit faire au mininum 6 charactères."),
  password_confirmation: yup
      .string()
      .required("Confirmation de mot de passe requis.")
      .oneOf(
          [yup.ref("password")],
          "Mot de passe et confirmation non identique"
      ),
})

const client = new AuthClient()

async function onSubmit(values) {
  const success = await client.resetPassword({ token: route.query.token, ...values })

  if (success) {
    successMessage('Votre nouveau mot de passe à bien été pris en compte')
  } else {
    errorMessage('Une erreur est survenu lors de la mise à jour de votre mot de passe.')
  }
}
</script>

