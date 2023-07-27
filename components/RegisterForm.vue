<template>
  <AppForm @submit="submit" :validation-schema="schema">
    <div class="form-group p-2">
      <label>Email</label>
      <AppField name="email" type="email" placeholder="mon@email.com" />
      <AppErrorMessage class="error" name="email" />
    </div>
    <div class="form-group p-2">
      <label>Pseudo</label>
      <AppField name="pseudo" placeholder="Pseudo" />
      <AppErrorMessage class="error" name="pseudo" />
    </div>
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

<script setup lang="ts">
import * as yup from "yup";
import useFlashMessages from "~/composables/useFlashMessages";
import UserClient from "~/app/client/UserClient";

const userClient = new UserClient()

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
})

const form = ref({
  email: "",
  pseudo: "",
  password: "",
  password_confirmation: ""
})
const error = ref(false)

const { addMessage } = useFlashMessages()
const router = useRouter()

async function submit(values, actions) {
    const result = await userClient.register(values);
    if (409 === result) {
        actions.setFieldError("email", "Cet email est déjà utilisé");
    }
    if (200 === result) {
        addMessage({
            message: "Félicitation ! Un émail de validation vous a été envoyé.",
        });
        router.push({ name: "index" });
    } else if (![200, 409].includes(result)) {
        error.value = true;
    }
}
</script>

<style>
.error {
  color: brown;
}
</style>
