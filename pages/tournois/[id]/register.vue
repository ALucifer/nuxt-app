<template>
  <div class="container">
    <div class="col-6 mx-auto">
      <div class="card__format card__format--light">
        <div class="rows m-5">
          <AppForm @submit="submit" :validation-schema="schema">
            <AppAvatar
              :src="'data:image/svg+xml;base64,' + avatar"
              @click.prevent="generate()"
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

<script>
import { identicon } from "minidenticons";
import { mapActions } from "pinia";
import { useTournamentStore } from "@/store/tournament";
import useFlashMessages from "@/composables/useFlashMessages";
import * as yup from "yup";

definePageMeta({
  middleware: "auth",
});

export default {
  name: "tournamentRegister",
  head() {
    return {
      title: "Inscription au tournoi",
      description: "Page d'inscription à un tournoi.",
    };
  },
  setup() {
    const { addMessage } = useFlashMessages();
    return { addMessage };
  },
  data() {
    const schema = yup.object({
      libelle: yup.string().required("Le nom de votre équipe est obligatoire."),
    });
    return {
      schema,
      avatar: "",
      tournament_id: this.$route.params.id,
    };
  },
  created() {
    this.generate();
  },
  methods: {
    generate() {
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
      const encoded = btoa(svg);
      this.avatar = encoded;
    },
    async submit(values) {
      values.avatar = this.avatar;
      values.tournament_id = this.tournament_id;
      const result = await this.register(values);
      let message = "";
      let classCss = "";
      if (result === 406) {
        message = "Le nombre maximal d'inscrit a déjà été atteint.";
        classCss = "error";
      } else if (result === 409) {
        message = "Vous êtes déjà inscrit à ce tournoi.";
        classCss = "warning";
      } else if (result === 422) {
        this.addMessage({
          message:
            "Le nom d'équipe <b>" + values.libelle + "</b> est déjà utilisé.",
          class: "error",
        });
        return;
      } else if (result === 403) {
        message =
          "Le tournoi est fermé, il vous est impossible de vous enregistré.";
        classCss = "error";
      } else {
        message =
          "Vous êtes bien inscrit sous l'équipe <b>" + values.libelle + "</b>";
        classCss = "success";
      }
      this.addMessage({ message: message, class: classCss });
      this.$router.push({
        name: "tournament-id",
        params: { id: this.id },
      });
    },
    ...mapActions(useTournamentStore, ["register"]),
  },
};
</script>

<style lang="scss">
@import "@/assets/css/components/tournament/card.scss";
</style>
