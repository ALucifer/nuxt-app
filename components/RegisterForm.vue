<template>
  <AppForm
    :validation-schema="schema"
    @submit="submit"
  >
    <div class="form-group p-2">
      <label>Email</label>
      <AppField
        name="email"
        type="email"
        placeholder="mon@email.com"
        :validate-on-blur="false"
        :validate-on-change="false"
      />
      <AppErrorMessage
        class="error"
        name="email"
      />
    </div>
    <div class="form-group p-2">
      <label>Pseudo</label>
      <AppField
        name="pseudo"
        placeholder="Pseudo"
        :validate-on-blur="false"
        :validate-on-change="false"
      />
      <AppErrorMessage
        class="error"
        name="pseudo"
      />
    </div>
    <div class="form-group p-2">
      <label>Mot de passe</label>
      <AppField
        name="password"
        type="password"
        placeholder="**********"
        :validate-on-blur="false"
        :validate-on-change="false"
      />
      <AppErrorMessage
        class="error"
        name="password"
      />
    </div>
    <div class="form-group p-2">
      <label>Confirmation</label>
      <AppField
        name="password_confirmation"
        type="password"
        placeholder="**********"
        :validate-on-blur="false"
        :validate-on-change="false"
      />
      <AppErrorMessage
        class="error"
        name="password_confirmation"
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
    <div
      v-if="error"
      class="form-group"
    >
      <p class="error">
        Une erreur est survenue lors de votre inscription, merci de réésayer
        plus tard.
      </p>
    </div>
  </AppForm>
</template>

<script setup lang="ts">
import * as yup from 'yup'

const schema = yup.object({
  email: yup
    .string()
    .required('Email requis.')
    .email('Votre email n\'est pas valide (exemple: john@doe.com)'),
  pseudo: yup
    .string()
    .required('Pseudo requis.')
    .min(2, 'Votre pseudo doit faire au minimum 2 charactères.'),
  password: yup
    .string()
    .required('Mot de passe requis.')
    .min(6, 'Votre mot de passe doit faire au mininum 6 charactères.'),
  password_confirmation: yup
    .string()
    .required('Confirmation de mot de passe requis.')
    .oneOf(
      [yup.ref('password')],
      'Mot de passe et confirmation non identique',
    ),
})

const error = ref(false)

const { addMessage } = useFlashMessages()
const router = useRouter()
const isSubmitting = ref(false)

async function submit(values, actions) {
  isSubmitting.value = true

  const { data: result } = await useFetch('/api/user/register', { method: 'POST', body: values })

  if (409 === result.value) {
    actions.setFieldError('email', 'Cet email est déjà utilisé')
  }
  if (200 === result.value) {
    addMessage({
      class: 'success',
      message: 'Félicitation ! Un émail de validation vous a été envoyé.',
    })

    router.push({ name: 'index' })
  }
  else if (![200, 409].includes(result.value)) {
    error.value = true
  }

  isSubmitting.value = false
}
</script>

<style>
.error {
  color: brown;
}
</style>
