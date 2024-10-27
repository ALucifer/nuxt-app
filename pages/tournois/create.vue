<template>
  <div class="container">
    <div class="tournament-register">
      <div class="col-8 card-tournament">
        <StepperContainer :current="currentStep" />
        <FormStep
          v-show="currentStep === 1"
          :schema="createTournamentStepOneFormSchema"
          @submit="next"
        >
          <template #default="{ setFieldValue }">
            <div class="row my-5">
              <div class="col-12 form-group mt-3">
                <label class="text-14">Titre</label>
                <AppInput
                  id="libelle"
                  name="libelle"
                  type="text"
                />
              </div>
              <div class="col-12 form-group mt-3">
                <label class="text-14">Date</label>
                <AppDatePicker
                  placeholder="Debut"
                  name="beginAt"
                  @change="setFieldValue('beginAt', $event.value)"
                />
              </div>
            </div>
          </template>
          <template #buttons="{ meta }">
            <ButtonsStep
              :is-last-step="false"
              :valid="meta.valid"
              :is-submit-last-step="false"
            />
          </template>
        </FormStep>
        <FormStep
          v-show="currentStep === 2"
          :schema="createTournamentStepTwoFormSchema"
          @submit="next"
        >
          <template #default="{ setFieldValue, values }">
            <div class="row my-5">
              <div class="wrapper">
                <div class="container-radios">
                  <span class="container-radios__label">Format</span>
                  <AppErrorMessage
                    class="error"
                    name="format"
                  />
                  <div
                    v-for="(format, index) in formats"
                    :key="index"
                    class="container-radios__item"
                    :class="{ 'container-radios__item--checked': values.format == format.value }"
                    @click="setFieldValue('format', format.value)"
                  >
                    <AppField
                      class="radio-choice"
                      type="radio"
                      name="format"
                      :value="format.value"
                    />
                    <label class="for-radio-choice">{{ format.label }}</label>
                  </div>
                </div>
                <div class="container-radios">
                  <span class="container-radios__label">Participants</span>
                  <AppErrorMessage
                    class="error"
                    name="maxTeams"
                  />
                  <div
                    v-for="(participant, index) in participants"
                    :key="index"
                    class="container-radios__item"
                    :class="{ 'container-radios__item--checked': values.maxTeams == participant.value }"
                    @click="setFieldValue('maxTeams', participant.value)"
                  >
                    <AppField
                      class="radio-choice"
                      type="radio"
                      name="maxTeams"
                      :value="participant.value"
                    />
                    <label class="for-radio-choice">{{ participant.label }}</label>
                  </div>
                </div>
                <div class="container-radios">
                  <span class="container-radios__label">Niveau</span>
                  <AppErrorMessage
                    class="error"
                    name="skillLevel"
                  />
                  <div
                    v-for="(level, index) in levels"
                    :key="index"
                    class="container-radios__item"
                    :class="{ 'container-radios__item--checked': values.skillLevel == level.value }"
                    @click="setFieldValue('skillLevel', level.value)"
                  >
                    <AppField
                      class="radio-choice"
                      type="radio"
                      name="skillLevel"
                      :value="level.value"
                    />
                    <label class="for-radio-choice">{{ level.label }}</label>
                  </div>
                </div>
                <div class="container-radios">
                  <span class="container-radios__label">Best of</span>
                  <AppErrorMessage
                    class="error"
                    name="bestOf"
                  />
                  <div
                    v-for="(bo, index) in bestOf"
                    :key="index"
                    class="container-radios__item"
                    :class="{ 'container-radios__item--checked': values.bestOf == bo.value }"
                    @click="setFieldValue('bestOf', bo.value)"
                  >
                    <AppField
                      class="radio-choice"
                      type="radio"
                      name="bestOf"
                      :value="bo.value"
                    />
                    <label class="for-radio-choice">{{ bo.label }}</label>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template #buttons="{ meta }">
            <ButtonsStep
              :is-last-step="false"
              :valid="meta.valid"
              :is-submit-last-step="false"
              @prev="currentStep--"
            />
          </template>
        </FormStep>
        <FormStep
          v-show="currentStep === 3"
          :schema="createTournamentStepThreeFormSchema"
          @submit="onSubmit"
        >
          <div class="row my-5">
            <div class="col-12 form-group mt-3">
              <label class="text-14">Message de motivation</label>
              <AppInput
                name="speech"
                type="text"
              />
            </div>
            <div class="col-12 form-group mt-3">
              <label class="text-14">Déroulement</label>
              <AppEditeur
                name="progress"
                placeholder="Veuillez renseignez les différentes manches de votre tournois"
              />
            </div>
          </div>
          <template #buttons="{ meta }">
            <ButtonsStep
              :is-last-step="true"
              :is-submit-last-step="isSubmitLastStep"
              :valid="meta.valid"
            />
          </template>
        </FormStep>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import StepperContainer from '~/components/stepper/StepperContainer.vue'
import FormStep from '~/components/form/FormStep.vue'
import ButtonsStep from '~/components/form/ButtonsStep.vue'
import type { TournamentModel } from '~/app/models/tournament'
import {
  createTournamentStepOneFormSchema,
  createTournamentStepTwoFormSchema,
  createTournamentStepThreeFormSchema,
} from '~/utils/schema'
import { formats, levels, bestOf, participants } from '~/utils/constants'

useSeoMeta({
  title: 'Création d\'un tournoi',
})

const { getUser } = useSecurity()
const { errorMessage, successMessage } = useFlashMessages()
const { handleRedirect } = useRedirection()
const formValues = ref({
  libelle: '',
  beginAt: '',
  format: '',
  maxTeams: 0,
  skillLevel: '',
  bestOf: 0,
  speech: null,
  progress: '',
  owner: getUser().id,
})

const isSubmitLastStep = ref(false)
const currentStep = ref(1)

// @ts-expect-error values has complex type with multiple schema
const next = (values) => {
  formValues.value = { ...formValues.value, ...values }
  currentStep.value++
}

// @ts-expect-error values has complex type with multiple schema
const onSubmit = async (values) => {
  formValues.value = { ...formValues.value, ...values }
  isSubmitLastStep.value = true

  try {
    const tournament = await $fetch<TournamentModel>(
      '/api/tournaments/create',
      {
        method: 'POST',
        body: {
          ...formValues.value,
          owner: getUser().id,
        },
      },
    )

    successMessage('Votre tournoi à bien été créé')

    handleRedirect(
      !!tournament,
      { name: 'tournois-id', params: { id: tournament.id } },
      { path: '/' },
    )
  }
  catch {
    errorMessage('Une erreur est survenu lors de la création de votre tournoi')
  }

  isSubmitLastStep.value = false
}
</script>

<style lang="scss">
@use "@/assets/css/form.scss";
@use '@/assets/css/components/tournamentForm';

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
