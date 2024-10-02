<template>
  <div class="container">
    <div class="col-6 mx-auto mt-3">
      <div class="card__format card__format--light">
        <div class="rows m-5">
          <form @submit="submit">
            <AppImage
              class="card__avatar"
              :src="'data:image/svg+xml;base64,' + avatar"
              @click.prevent="generateAvatar()"
            />
            <div class="form-group my-5">
              <AppInput
                name="libelle"
                type="text"
                placeholder="Nom de votre équipe"
              />
            </div>
            <button class="cmn-btn" type="submit">Participer</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { minidenticon } from 'minidenticons'
import {definePageMeta} from "#imports";
import type {RegisterFormInput} from "~/app/models/tournament/register.input";
import type {RegisterForm} from "~/app/form/register.form";

useSeoMeta({
    title: "Inscription au tournoi",
    description: "Page d'inscription à un tournoi.",
})

definePageMeta({
  middleware: ['register']
})

const { addMessage } = useFlashMessages();
const { handleSubmit } = useForm<RegisterForm>({ validationSchema: registerFormSchema })
const route = useRoute()
const router = useRouter()

const avatar = ref()

function generateAvatar() {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < 15; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    const svg = minidenticon(result);
    const a = btoa(svg)
    avatar.value = a;
}

const submit = handleSubmit(
    async (values: RegisterForm) => {
      const registerFormInput: RegisterFormInput = {
        ...values,
        avatar: avatar.value,
        tournament_id: +route.params.id,
      }
      const result = await $fetch(
          '/api/tournaments/register',
          {
            method: 'POST',
            body: registerFormInput
          }
      )

      let message = "";
      let classCss = "";
      if (result === 406) {
        message = "Le nombre maximal d'inscrit a déjà été atteint.";
        classCss = "error";
      } else if (result === 409) {
        message = "Vous êtes déjà inscrit à ce tournoi.";
        classCss = "warning";
      } else if (result === 422) {
        addMessage({
          message:
              "Le nom d'équipe <b>" + values.libelle + "</b> est déjà utilisé.",
          class: "error",
        });
        return;
      } else if (result === 403) {
        message =
            "Le tournoi est fermé, il vous est impossible de vous enregistré.";
        classCss = "error";
      } else if (result === 401) {
        message = 'Vous n\'etes pas autorisé à faire cette action.';
        classCss = 'error'
      } else {
        message =
            "Vous êtes bien inscrit sous l'équipe <b>" + values.libelle + "</b>";
        classCss = "success";
      }
      addMessage({ message: message, class: classCss });

      router.push({
        name: "tournois-id",
        params: { id: route.params.id },
      });
    }
)

onMounted(() => generateAvatar())
</script>

<style lang="scss">
@import "@/assets/css/components/tournament/card.scss";
</style>
