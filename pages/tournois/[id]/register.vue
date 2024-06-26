<template>
  <div class="container">
    <div class="col-6 mx-auto mt-3">
      <div class="card__format card__format--light">
        <div class="rows m-5">
          <AppForm @submit="submit" :validation-schema="schema">
            <AppImage
              :src="'data:image/svg+xml;base64,' + avatar"
              @click.prevent="generateAvatar()"
              class="card__avatar"
            />
            <div class="form-group my-5">
              <AppField
                name="libelle"
                type="text"
                placeholder="Nom de votre équipe"
              />
              <AppErrorMessage class="error" name="libelle" />
            </div>
            <button class="cmn-btn" type="submit">Participer</button>
          </AppForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { identicon } from "minidenticons";
import useFlashMessages from "~/composables/useFlashMessages";
import * as yup from "yup";
import {useTournamentStore} from "~/store/tournament";
import {definePageMeta} from "#imports";

useSeoMeta({
    title: "Inscription au tournoi",
    description: "Page d'inscription à un tournoi.",
})

definePageMeta({
  middleware: ['register']
})

const { addMessage } = useFlashMessages();
const { register } = useTournamentStore()
const route = useRoute()
const router = useRouter()
const schema = yup.object({
    libelle: yup.string().required("Le nom de votre équipe est obligatoire."),
})

const avatar = ref()

function generateAvatar() {
    let result = "";
    let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (var i = 0; i < 15; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    const svg = identicon(result);
    const a = btoa(svg)
    avatar.value = a;
}

async function submit(values) {
    values.avatar = avatar.value;
    values.tournament_id = route.params.id;
    const result = await register(values);

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

    return router.push({
      name: "tournois-id",
      params: { id: route.params.id },
    });
}

onMounted(() => generateAvatar())
</script>

<style lang="scss">
@import "@/assets/css/components/tournament/card.scss";
</style>
