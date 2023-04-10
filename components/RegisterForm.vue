<template>
  <AppForm @submit="submit" :validation-schema="schema">
    <div class="form-group">
      <label>Email</label>
      <AppField name="email" type="email" />
      <AppErrorMessage class="error" name="email" />
    </div>
    <div class="form-group">
      <label>Pseudo</label>
      <AppField name="pseudo" />
      <AppErrorMessage class="error" name="pseudo" />
    </div>
    <div class="form-group">
      <label>Mot de passe</label>
      <AppField name="password" type="password" />
      <AppErrorMessage class="error" name="password" />
    </div>
    <div class="form-group">
      <label>Confirmation</label>
      <AppField name="password_confirmation" type="password" />
      <AppErrorMessage class="error" name="password_confirmation" />
    </div>
    <div class="form-group">
      <button type="submit" class="cmn-btn submit-btn">Sign Up Free</button>
    </div>
    <div v-if="error" class="form-group">
      <p class="error">
        Une erreur est survenue lors de votre inscription, merci de réésayer
        plus tard.
      </p>
    </div>
  </AppForm>
</template>

<script>
import * as yup from "yup";
import useFlashMessages from "@/composables/useFlashMessages";
import UserClient from "~/app/client/UserClient";

const userClient = new UserClient()

export default {
  data() {
    const schema = yup.object({
      email: yup
        .string()
        .required("Email requis.")
        .email("Votre email n'est pas valide (exemple: john@doe.com)"),
      pseudo: yup
        .string()
        .required("Pseudo requis.")
        .min(2, "Votre pseudo doit faire au minimum 2 charactères."),
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
    });
    return {
      schema,
      form: {
        email: "",
        pseudo: "",
        password: "",
        password_confirmation: "",
      },
      error: false,
    };
  },
  setup() {
    const { addMessage } = useFlashMessages();
    return { addMessage };
  },
  methods: {
    async submit(values, actions) {
      const result = await userClient.register(values);
      if (409 === result) {
        actions.setFieldError("email", "Cet email est déjà utilisé");
      }
      if (200 === result) {
        this.addMessage({
          message: "Félicitation ! Un émail de validation vous a été envoyé.",
        });
        this.$router.push({ name: "Home" });
      } else if (![200, 409].includes(result)) {
        this.error = true;
      }
    },
  },
};
</script>

<style>
.error {
  color: brown;
}
</style>
