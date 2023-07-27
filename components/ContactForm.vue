<template>
  <AppForm @submit="onSubmit" :validation-schema="schema" class="contact-form">
    <h5>Laissez votre message</h5>
    <div class="form-group">
      <label for="name">Pseudo</label>
      <AppField
        name="name"
        placeholder="Entrez votre pseudo"
        id="contact-pseudo"
      />
      <AppErrorMessage class="error" name="name" />
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <AppField
        required
        name="email"
        type="email"
        placeholder="Entrez votre email"
        id="contact-email"
      />
      <AppErrorMessage class="error" name="email" />
    </div>
    <div class="form-group">
      <label for="email">Message</label>
      <AppField name="message" v-slot="{ field }">
        <textarea
          v-bind="field"
          placeholder="Entrez votre message"
          id="contact-text"
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
import ContactClient from "~/app/client/ContactClient";

const contactClient = new ContactClient()
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
    await contactClient.post(values)
    addMessage({
      message: 'Votre demande à bien été envoyé',
      class: 'success'
    })
  } catch (e) {
    addMessage({
      message: 'Une erreur est survenu',
      class: 'error'
    })
  }

  resetForm()
}
</script>

<style>
.error {
  color: #ff443d;
}
</style>
