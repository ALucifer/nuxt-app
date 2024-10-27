<template>
  <AppSocialContainer>
    <template #header>
      <h4>Nouveau mot de passe</h4>
    </template>
    <template #default>
      <form @submit="onSubmit">
        <div class="form-group p-2">
          <label>Mot de passe</label>
          <AppInput
            name="password"
            type="password"
            placeholder="**********"
          />
        </div>
        <div class="form-group p-2">
          <label>Confirmation</label>
          <AppInput
            name="password_confirmation"
            type="password"
            placeholder="**********"
          />
        </div>
        <div class="form-group p-2">
          <button
            type="submit"
            class="cmn-btn submit-btn"
          >
            Sauvegarder
          </button>
        </div>
      </form>
    </template>
  </AppSocialContainer>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import AppSocialContainer from '~/components/global/AppSocialContainer.vue'

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  },
})

const route = useRoute()
const router = useRouter()
const { successMessage, errorMessage } = useFlashMessages()
const { handleSubmit } = useForm({ validationSchema: toTypedSchema(resetPasswordFormSchema) })

const onSubmit = handleSubmit(async (values) => {
  try {
    await $fetch(
      '/api/user/resetPassword',
      {
        method: 'POST',
        body: {
          token: route.query.token,
          ...values,
        },
      },
    )

    successMessage('Votre nouveau mot de passe à bien été pris en compte')
    router.push({ name: 'login' })
  }
  catch {
    errorMessage('Une erreur est survenu lors de la mise à jour de votre mot de passe.')
  }
})
</script>
