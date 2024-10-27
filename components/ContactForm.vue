<template>
  <form
    class="contact-form"
    @submit="onSubmit"
  >
    <h5>Laissez votre message</h5>
    <div class="form-group">
      <label for="name">Pseudo</label>
      <AppInput
        name="name"
        type="text"
        placeholder="Pseudo"
      />
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <AppInput
        id="email"
        type="email"
        name="email"
        placeholder="Entrez votre email"
      />
    </div>
    <div class="form-group">
      <label for="email">Message</label>
      <AppTextarea
        id="message"
        name="message"
        placeholder="Entrez votre message"
      />
    </div>
    <button
      class="cmn-btn submit-btn"
      type="submit"
    >
      Envoyer
    </button>
  </form>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import AppInput from '~/components/global/AppInput.vue'
import { contactFormSchema } from '~/utils/schema'

const { handleSubmit } = useForm({ validationSchema: toTypedSchema(contactFormSchema) })
const { addMessage } = useFlashMessages()

const onSubmit = handleSubmit(
  async (values, { resetForm }) => {
    try {
      await $fetch(
        '/api/contact',
        {
          method: 'POST',
          body: values,
        },
      )
      addMessage({
        message: 'Votre demande à bien été envoyé',
        class: 'success',
      })
    }
    catch {
      addMessage({
        message: 'Une erreur est survenu',
        class: 'error',
      })
    }

    resetForm()
  },
  ({ errors }) => {
    console.log(errors)
  },
)
</script>
