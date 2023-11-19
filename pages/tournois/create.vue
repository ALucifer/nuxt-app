<template>
  <div class="container">
    <div class="tournament-register">
      <div class="col-8 card-tournament">
        <Stepper :current="currentStep"/>
        <FormWizard :validation-schema="schema" @submit="submit" v-slot="{ setFieldValue, values }">
          <FormStep>
            <div class="row my-5">
              <div class="col-12 form-group mt-3">
                <label class="text-14">Titre</label>
                <AppField name="libelle" type="text"/>
                <AppErrorMessage class="error" name="libelle"/>
              </div>
              <div class="col-12 form-group mt-3">
                <label class="text-14">Date</label>
                <AppDatePicker name="beginAt" @change="setFieldValue('beginAt', $event.value)"/>
              </div>
            </div>
          </FormStep>
          <FormStep>
            <div class="row my-5">
              <div class="col-12 form-group mt-3">
                {{ values }}
                <div class="d-flex">
                  <div class="container-radios">
                    <span class="container-radios__label">Format</span>
                    <div
                      v-for="format in formatValues"
                      class="container-radios__item"
                      :class="{ 'container-radios__item--checked': values.format == format.id}"
                      @click="setFieldValue('format', format.id)"
                    >
                      <AppField
                        class="radio-choice"
                        type="radio"
                        name="format"
                        :value="format.id"
                      />
                      <label class="for-radio-choice">{{ format.libelle }}</label>
                    </div>
                  </div>
                </div>
                <div class="d-flex">
                  <div class="container-radios">
                    <span class="container-radios__label">Participants</span>
                    <div
                        v-for="format in participantValues"
                        class="container-radios__item"
                        :class="{ 'container-radios__item--checked': values.format == format.id}"
                        @click="setFieldValue('format', format.id)"
                    >
                      <AppField
                          class="radio-choice"
                          type="radio"
                          name="format"
                          :value="format.id"
                      />
                      <label class="for-radio-choice">{{ format.libelle }}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FormStep>
        </FormWizard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as yup from "yup";
import {useAuthStore} from "@/store/auth";
import TournamentClient from "~/app/client/TournamentClient";
import {tournament} from '~/app/models/tournament'
import useRedirection from "~/composables/useRedirection";
import Stepper from "~/components/stepper/Stepper.vue";
import FormWizard from "~/components/form/FormWizard.vue";
import FormStep from "~/components/form/FormStep.vue";
import formatClear from "vue-material-design-icons/FormatClear.vue";

const tournamentClient = new TournamentClient()

const schema = [
  yup.object({
    libelle: yup.string().required("Titre de votre tournoi requis."),
    beginAt: yup
        .date()
        .min(
            new Date(),
            "Entrez une date supérieur ou égale à la date du jour."
        )
        .required("Veuillez renseigner ce champs."),
  }),
  yup.object({
    // speech: yup.string().notRequired(),
    format: yup
      .string()
      .required("Veuillez renseigner ce champs.")
      .typeError("Veuillez renseigner ce champs."),
      maxTeams: yup
          .number()
          .required("Veuillez renseigner ce champs.")
          .typeError("Veuillez renseigner ce champs."),
  }),
  // yup.object({
  //   maxTeams: yup
  //       .number()
  //       .required("Veuillez renseigner ce champs.")
  //       .typeError("Veuillez renseigner ce champs."),
  //   format: yup
  //       .string()
  //       .required("Veuillez renseigner ce champs.")
  //       .typeError("Veuillez renseigner ce champs."),
  //   skillLevel: yup
  //       .string()
  //       .required("Veuillez renseigner ce champs.")
  //       .typeError("Veuillez renseigner ce champs."),
  //   bestOf: yup
  //       .number()
  //       .required("Veuillez renseigner ce champs.")
  //       .typeError("Veuillez renseigner ce champs. type error"),
  // }),
  // yup.object({
  //   speech: yup.string().notRequired(),
  //   owner: yup.number().notRequired(),
  // })
]

const participantValues = ref(tournament.participants())
const formatValues = ref(tournament.formats())
const boValues = ref(tournament.bestOf())
const levelValues = ref(tournament.levels())
const error = ref(false)

const {getUser} = useSecurity()
const {handleResponse} = useFlashMessages()
const {handleRedirect} = useRedirection()

const isSubmitting = ref(false)
const currentStep = ref(1)

async function submit(values) {
  console.log(values)
  // isSubmitting.value = true
  //
  // const tournament = await tournamentClient.create({
  //   ...values,
  //   owner: getUser().id,
  // });
  //
  // handleResponse(
  //     !!tournament,
  //     'Votre tournoi à bien été créé',
  //     'Une erreur est survenu lors de la création de votre tournoi'
  // )
  //
  // handleRedirect(
  //     !!tournament,
  //     { name: 'tournois-id', params: { id: tournament.id } },
  //     { path: '/' },
  // )
  //
  // isSubmitting.value = false
}
</script>

<style lang="scss">
@import "@/assets/css/form.scss";
@import '@/assets/css/components/tournamentForm';

.disable-step {
  display: none;
}

.button-end {
  display: flex;
  flex-direction: row-reverse;
}

.card-tournament {
  padding: 16px;
  background-color: #3B2D91;
  border-radius: 16px;
}

.card-radio {
  padding: 8px;
  background-color: red;

  > input[type=radio] {
    display: none;
  }
}

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
