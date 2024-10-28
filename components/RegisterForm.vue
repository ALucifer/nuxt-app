<template>
  <form
    @submit="onSubmit"
  >
    <div class="form-group p-2">
      <label>Email</label>
      <AppInput
        name="email"
        type="text"
        placeholder="Entrez votre email"
      />
    </div>
    <div class="form-group p-2">
      <label>Pseudo</label>
      <AppInput
        name="pseudo"
        type="text"
        placeholder="Entrez votre pseudo"
      />
    </div>
    <div class="form-group p-2">
      <label>Mot de passe</label>
      <AppInput
        name="password"
        type="password"
        placeholder="********"
      />
    </div>
    <div class="form-group p-2">
      <label>Confirmation</label>
      <AppInput
        name="password_confirmation"
        type="password"
        placeholder="********"
      />
    </div>
    <div class="form-group p-2">
      <button
        v-if="isSubmitting"
        class="cmn-btn submit-btn"
      >
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        />
      </button>
      <button
        v-else
        type="submit"
        class="cmn-btn submit-btn"
      >
        Envoyer
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import type { FetchError } from '~/types/api'

const { addMessage, errorMessage } = useFlashMessages()
const router = useRouter()

const { handleSubmit, isSubmitting } = useForm({ validationSchema: toTypedSchema(registerUserFormSchema) })

const onSubmit = handleSubmit(
  async (values, actions) => {
    try {
      await $fetch('/api/user/register', { method: 'POST', body: values })

      addMessage({
        class: 'success',
        message: 'Félicitation ! Un émail de validation vous a été envoyé.',
      })

      router.push({ name: 'index' })
    }
    catch (e) {
      if ((e as FetchError).response.status === 409) {
        actions.setFieldError('email', 'Email already used.')
      }
      else {
        errorMessage('An error occurred.')
      }
    }
  },
)
</script>

<style>
.error {
  color: brown;
}
</style>
