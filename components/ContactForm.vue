<template>
  <AppForm :validation-schema="schema" class="contact-form" @submit="onSubmit">
    <h5>Laissez votre message</h5>
    <div class="form-group">
      <label for="name">Pseudo</label>
      <AppField
        id="contact-pseudo"
        name="name"
        placeholder="Entrez votre pseudo"
      />
      <AppErrorMessage class="error" name="name" />
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <AppField
        id="contact-email"
        required
        name="email"
        type="email"
        placeholder="Entrez votre email"
      />
      <AppErrorMessage class="error" name="email" />
    </div>
    <div class="form-group">
      <label for="email">Message</label>
      <AppField v-slot="{ field }" name="message">
        <textarea
          v-bind="field"
          id="contact-text"
          placeholder="Entrez votre message"
        />
      </AppField>
      <AppErrorMessage class="error" name="message" />
    </div>
    <button class="cmn-btn submit-btn" type="submit">Envoyer</button>
  </AppForm>
</template>

<script setup lang="ts">
import useFlashMessages from "~/composables/useFlashMessages";
import { object, string } from "yup";

const { addMessage } = useFlashMessages();

const schema = object({
  email: string()
      .required("Email requis.")
      .email("Votre email n'est pas valide (exemple: john@doe.com)"),
  name: string().required("Pseudo requis."),
  message: string()
      .required("Veuillez entrer un message pour pouvoir l'envoyer.")
      .min(30, "Votre message doit contenir 30 charactères minimum."),
})

async function onSubmit(values, { resetForm }) {
  try {
    await useFetch(
        '/api/contact',
        {
          method: 'POST',
          body: values
        }
    )
    addMessage({
      message: 'Votre demande à bien été envoyé',
      class: 'success'
    })
  } catch {
    addMessage({
      message: 'Une erreur est survenu',
      class: 'error'
    })
  }

  resetForm()
}
</script>

<style scoped>
.error {
  color: #ff443d;
}
</style>
