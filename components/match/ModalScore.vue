<template>
  <div
    id="myModal"
    ref="myModal"
    class="modal"
    tabindex="-1"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <AppForm
          :validation-schema="schema"
          @submit="onSubmit"
        >
          <div class="modal-header">
            <h5 class="modal-title">
              Renseigner un score
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div class="modal-body d-flex gap-1 justify-content-evenly align-items-center">
            <div class="d-flex gap-3 align-items-center">
              <div class="d-flex flex-column align-items-center">
                <AppAvatar :src="getAvatar(match.team_a)" />
                <p>{{ match.team_a.libelle }}</p>
                <AppErrorMessage
                  class="error"
                  name="scoreA"
                />
              </div>
              <AppField
                name="scoreA"
                type="number"
                :validate-on-blur="false"
                :validate-on-change="false"
              />
            </div>
            <p>BO {{ match.tournament.bestOf }}</p>
            <div class="d-flex gap-3 align-items-center">
              <AppField
                name="scoreB"
                type="number"
                :validate-on-blur="false"
                :validate-on-change="false"
              />
              <div class="d-flex flex-column align-items-center">
                <AppAvatar :src="getAvatar(match.team_b)" />
                <p>{{ match.team_b.libelle }}</p>
                <AppErrorMessage
                  class="error"
                  name="scoreB"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Annuler
            </button>
            <button
              class="btn btn--primary"
              @click="handleSubmit"
            >
              Sauvegarder
            </button>
          </div>
        </AppForm>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { InferType } from 'yup'
import { object, number } from 'yup'
import type { MatchWithTeamsAndScoresModel } from '~/app/models/match.model'

const props = defineProps<{ match: MatchWithTeamsAndScoresModel }>()

const emit = defineEmits(['scored'])

const { getAvatar } = useTeam()
const { handleSubmit } = useForm()
const { getUser } = useSecurity()

const schema = object({
  scoreA: number()
    .required()
    .min(0, 'Supérieur ou égal à 0')
    .max(+props.match.tournament.bestOf, `Inférieur ou égal à ${props.match.tournament.bestOf}`)
    .test(
      'is-max',
      'Score invalide.',
      function (value) {
        const { scoreB } = this.parent

        const max = +props.match.tournament.bestOf

        return (scoreB !== max && value === max) || (scoreB === max && value !== max)
      },
    ),
  scoreB: number()
    .required()
    .min(0, 'Supérieur ou égal à 0')
    .max(+props.match.tournament.bestOf, `Inférieur ou égal à ${props.match.tournament.bestOf}`)
    .test(
      'is-max',
      'Score invalide.',
      function (value) {
        const { scoreA } = this.parent

        const max = +props.match.tournament.bestOf

        return (scoreA !== max && value === max) || (scoreA === max && value !== max)
      },
    ),
})

type FormValues = InferType<typeof schema>

const { successMessage, errorMessage } = useFlashMessages()

async function onSubmit(values: FormValues) {
  // On insert correctement le score
  // Si c'est l'admin on lui fait renseigner une premiere fois en tant qu'equipe
  // C'est ensuite si le match n'est pas valide qu'il pourra re-donner le score

  const reporter_id = props.match.team_a.userId === getUser().id ? props.match.team_a.userId : props.match.team_b.userId

  let score = {
    reporter_id: reporter_id,
    winner_score: values.scoreB,
    winner_id: props.match.adversaireB,
    looser_score: values.scoreA,
    looser_id: props.match.adversaireA,
    match_id: props.match.id,
  }

  if (values.scoreA > values.scoreB) {
    score = {
      reporter_id: reporter_id,
      winner_score: values.scoreA,
      winner_id: props.match.adversaireA,
      looser_score: values.scoreB,
      looser_id: props.match.adversaireB,
      match_id: props.match.id,
    }
  }

  try {
    await useFetch(
      '/api/matches/score',
      {
        method: 'POST',
        body: score,
        onResponse() {
          successMessage('Votre score à bien été renseigné.')
          emit('scored')
        },
        onResponseError() {
          errorMessage('Une erreur est survenu lors du renseignement de votre score.')
        },
      },
    )
    emit('scored')
  }
  catch {
    errorMessage('Une erreur est survenu lors du renseignement de votre score.')
  }
}
</script>

<style scoped lang="scss">
.avatar-img {
  width: 150px;
  height: 150px;
}

input[type="number"] {
  background-color: initial;
  color: black;
  border: initial;
  box-shadow: 7px 10px 10px 3px rgba(0, 0, 0, 0.1);
  width: 50px;
  height: 50px;
}
</style>
