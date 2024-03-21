<template>
  <div class="container">
    <div class="tournament-register">
      <div class="col-8 card-tournament">
        <Stepper :current="currentStep"/>
        <FormWizard
          :validation-schema="schema"
          :isSubmitLastStep="isSubmitLastStep"
          @submit="submit"
          @changeStep="currentStep = $event.value"
          v-slot="{ setFieldValue, values, useFieldModel }"
        >
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
              <div class="col-12 form-group mt-3">
                <AppEditeur />
              </div>
            </div>
          </FormStep>
          <FormStep>
            <div class="row my-5">
              <div class="wrapper">
                <div class="container-radios">
                  <span class="container-radios__label">Format</span>
                  <AppErrorMessage class="error" name="format" />
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
                <div class="container-radios">
                  <span class="container-radios__label">Participants</span>
                  <AppErrorMessage class="error" name="maxTeams" />
                  <div
                    v-for="participant in participantValues"
                    class="container-radios__item"
                    :class="{ 'container-radios__item--checked': values.maxTeams == participant.id}"
                    @click="setFieldValue('maxTeams', participant.id)"
                  >
                    <AppField
                      class="radio-choice"
                      type="radio"
                      name="maxTeams"
                      :value="participant.id"
                    />
                    <label class="for-radio-choice">{{ participant.libelle }}</label>
                  </div>
                </div>
                <div class="container-radios">
                  <span class="container-radios__label">Niveau</span>
                  <AppErrorMessage class="error" name="skillLevel" />
                  <div
                      v-for="level in levelValues"
                      class="container-radios__item"
                      :class="{ 'container-radios__item--checked': values.skillLevel == level.id}"
                      @click="setFieldValue('skillLevel', level.id)"
                  >
                    <AppField
                        class="radio-choice"
                        type="radio"
                        name="skillLevel"
                        :value="level.id"
                    />
                    <label class="for-radio-choice">{{ level.libelle }}</label>
                  </div>
                </div>
                <div class="container-radios">
                  <span class="container-radios__label">Best of</span>
                  <AppErrorMessage class="error" name="bestOf" />
                  <div
                      v-for="bo in boValues"
                      class="container-radios__item"
                      :class="{ 'container-radios__item--checked': values.bestOf == bo.id}"
                      @click="setFieldValue('bestOf', bo.id)"
                  >
                    <AppField
                        class="radio-choice"
                        type="radio"
                        name="bestOf"
                        :value="bo.id"
                    />
                    <label class="for-radio-choice">{{ bo.libelle }}</label>
                  </div>
                </div>
              </div>
            </div>
          </FormStep>
          <FormStep>
            <div class="row my-5">
              <div class="col-12 form-group mt-3">
                <label class="text-14">Message de motivation</label>
                <AppField name="speech" type="text"/>
                <AppErrorMessage class="error" name="speech"/>
              </div>
              <div class="col-12 form-group mt-3">
                <label class="text-14">Déroulement</label>
               <client-only>
                  <AppEditeur name="progress" placeholder="Veuillez renseignez les différentes manches de votre tournois" />
                </client-only>
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
import {tournament} from '~/app/models/tournament'
import useRedirection from "~/composables/useRedirection";
import Stepper from "~/components/stepper/Stepper.vue";
import FormWizard from "~/components/form/FormWizard.vue";
import FormStep from "~/components/form/FormStep.vue";

useSeoMeta({
  title: 'Création d\'un tournoi'
})

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
    format: yup
      .string()
      .required("Veuillez selectionner un format")
      .typeError("Veuillez renseigner ce champs."),
    maxTeams: yup
        .number()
        .required("Veuillez renseigner ce champs.")
        .typeError("Veuillez renseigner ce champs."),
    skillLevel: yup
        .string()
        .required("Veuillez renseigner ce champs.")
        .typeError("Veuillez renseigner ce champs."),
    bestOf: yup
        .number()
        .required("Veuillez renseigner ce champs.")
        .typeError("Veuillez renseigner ce champs. type error"),
  }),
  yup.object({
    speech: yup.string().notRequired(),
  })
]

const participantValues = ref(tournament.participants())
const formatValues = ref(tournament.formats())
const boValues = ref(tournament.bestOf())
const levelValues = ref(tournament.levels())
const error = ref(false)

const currentStep = ref(0)

const {getUser} = useSecurity()
const {errorMessage, successMessage} = useFlashMessages()
const {handleRedirect} = useRedirection()
const isSubmitLastStep = ref(false)
async function submit(values: any) {
  isSubmitLastStep.value = true

  try {
    const tournament = await $fetch(
        '/api/tournaments/create',
        {
          method: 'POST',
          body: {
            ...values,

            owner: getUser().id
          }
        }
    )

    successMessage('Votre tournoi à bien été créé')

    handleRedirect(
        !!tournament,
        { name: 'tournois-id', params: { id: tournament.id } },
        { path: '/' },
    )
  } catch (e) {
    errorMessage('Une erreur est survenu lors de la création de votre tournoi')
  }

  isSubmitLastStep.value = false
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
