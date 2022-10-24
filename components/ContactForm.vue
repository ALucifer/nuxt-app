<template>
  <AppForm @submit="submit" :validation-schema="schema" class="contact-form">
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

<script>
import { contact } from "@/client/contact";
import useFlashMessages from "@/composables/useFlashMessages";
import * as yup from "yup";

export default {
  data() {
    const schema = yup.object({
      email: yup
        .string()
        .required("Email requis.")
        .email("Votre email n'est pas valide (exemple: john@doe.com)"),
      name: yup.string().required("Pseudo requis."),
      message: yup
        .string()
        .required("Veuillez entrer un message pour pouvoir l'envoyer.")
        .min(30, "Votre message doit contenir 30 charactères minimum."),
    });
    return {
      schema,
    };
  },
  setup() {
    const { addMessage } = useFlashMessages();
    return { addMessage };
  },
  methods: {
    async submit(values, { resetForm }) {
      const result = await contact().post(values);
      if (200 === result) {
        this.addMessage({
          message: "Votre demande à bien été envoyé",
          class: "success",
        });
        resetForm();
      } else {
        this.addMessage({
          message: "Une erreur est survenu",
          class: "error",
        });
      }
    },
  },
};
</script>

<style>
.error {
  color: #ff443d;
}
</style>
