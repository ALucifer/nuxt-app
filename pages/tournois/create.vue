<template>
  <div class="container">
    <div class="tournament-register">
      <div class="col-12">
        <AppForm
          @submit="submit"
          :validation-schema="schema"
          class="tournament-register--container"
          v-slot="{ setFieldValue }"
        >
          <div class="row">
            <div class="col-6 form-group">
              <label>Titre</label>
              <AppField name="libelle" type="text" />
              <AppErrorMessage class="error" name="libelle" />
            </div>
            <div class="col-6 form-group">
              <label>Date</label>
              <AppDatePicker
                name="date"
                @change="setFieldValue('beginAt', $event)"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-3 form-group single-input">
              <label for="">Participants</label>
              <AppSelect
                :items="participants"
                libelle="Nombre de participants"
                name="maxTeams"
                @change="setFieldValue('maxTeams', $event.value)"
              />
            </div>
            <div class="col-3 form-group single-input">
              <label for="">Format</label>
              <AppSelect
                :items="formatItems"
                libelle="Format"
                name="format"
                @change="setFieldValue('format', $event.value)"
              />
            </div>
            <div class="col-3 form-group single-input">
              <label for="">Niveau</label>
              <AppSelect
                :items="tournamentLevel"
                libelle="Niveau"
                name="skillLevel"
                @change="setFieldValue('skillLevel', $event.value)"
              />
            </div>
            <div class="col-3 form-group single-input">
              <label for="">Best Of</label>
              <AppSelect
                :items="boItems"
                libelle="Best Of"
                name="bestOf"
                @change="setFieldValue('bestOf', $event.value)"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-12 form-group">
              <label>Message de motivation</label>
              <AppField
                name="speech"
                type="text"
                rows="10"
                cols="30"
                maxlength="100"
                placeholder="Message de motivation pour venir participier à votre tournoi."
              />
              <AppErrorMessage class="error" name="description" />
            </div>
          </div>
          <div class="form-group">
            <label>Définisez le déroulement du tournoi</label>
            <AppEditeur />
          </div>
          <p class="error m-2" v-if="error">
            Une erreur est survenu lors de la création de votre tournoi
          </p>
          <button class="cmn-btn submit-btn">Envoyer</button>
        </AppForm>
      </div>
    </div>
  </div>
</template>

<script>
import * as yup from "yup";
import { mapState } from "pinia";
import { useAuthStore } from "@/store/auth";
import TournamentClient from "~/app/client/TournamentClient";
import { tournament } from '~/app/models/tournament'

const tournamentClient = new TournamentClient()

export default {
  data() {
    const schema = yup.object({
      libelle: yup.string().required("Titre de votre tournoi requis."),
      speech: yup.string(),
      owner: yup.number(),
      beginAt: yup
        .date()
        .min(
          new Date(),
          "Entrez une date supérieur ou égale à la date du jour."
        )
        .required("Veuillez renseigner ce champs."),
      maxTeams: yup
        .number()
        .required("Veuillez renseigner ce champs.")
        .typeError("Veuillez renseigner ce champs."),
      format: yup
        .string()
        .required("Veuillez renseigner ce champs.")
        .typeError("Veuillez renseigner ce champs."),
      skillLevel: yup
        .string()
        .required("Veuillez renseigner ce champs.")
        .typeError("Veuillez renseigner ce champs."),
      bestOf: yup
        .number()
        .required("Veuillez renseigner ce champs.")
        .typeError("Veuillez renseigner ce champs."),
    });
    return {
      participants: tournament.participants(),
      formatItems: tournament.formats(),
      boItems: tournament.bestOf(),
      tournamentLevel: tournament.levels(),
      schema,
      error: false,
    };
  },
  computed: {
    ...mapState(useAuthStore, {
      user: "getUser",
    }),
  },
  methods: {
    async submit(values) {
      const status = await tournamentClient.create({
        ...values,
        owner: this.user.id,
      });

      if (status !== 200) {
        this.error = true;
      } else {
        this.error = false;
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/css/form.scss";
.tournament-register {
  display: flex;
  justify-content: center;
  margin: 75px 0;

  &--container {
    background: #4609c3;
    box-shadow: 0px 15px 76px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    padding: 40px 30px;
  }
}
</style>
