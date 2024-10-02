<template>
  <div class="row d-flex justify-content-center">
    <div class="col-lg-8 text-center">
      <div class="section-header">
        <h3 class="title">Rechercher un tournoi</h3>
      </div>
    </div>
  </div>
  <form @submit="search">
    <div class="search__container row mb-40 mp-none">
      <div class="col-lg-4">
        <div class="single-input">
          <span>Search</span>
          <AppInput id="libelle" name="libelle" type="text" placeholder="Libellé" />
        </div>
      </div>
      <div class="col-lg-2">
        <div class="single-input">
          <span>Format</span>
          <AppSelect
              libelle="Format du tournoi"
              :items="formatItems"
              name="format"
              @change="setFieldValue('format', $event.value)"
          />
        </div>
      </div>
      <div class="col-lg-2">
        <div class="single-input">
          <span>Best Of</span>
          <AppSelect
              libelle="Best Of"
              :items="boItems"
              name="best_of"
              @change="setFieldValue('best_of', $event.value)"
          />
        </div>
      </div>
      <div class="col-lg-2">
        <div class="single-input">
          <span>Status</span>
          <AppSelect
              libelle="Status"
              :items="statusItems"
              name="state"
              @change="setFieldValue('state', $event.value)"
          />
        </div>
      </div>
      <div class="col-lg-2">
        <div class="single-input">
          <span>Date</span>
          <AppDatePicker
              name="date"
              placeholder="Date"
              @change="setFieldValue('date', $event.value)"
          />
        </div>
      </div>
      <div class="col-lg-3">
        <div class="single-input">
          <button type="submit" class="cmn-btn" style="margin-top: 15px">
              <template v-if="!searching">
                  Rechercher
              </template>
              <AppSpinner v-else />
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import type {SearchForm} from "~/app/form/search.form";

const { handleSubmit, setFieldValue } = useForm<SearchForm>({ validationSchema: searchFormSchema })
const boItems = ref([
  {id: 1, libelle: "1"},
  {id: 3, libelle: "3"},
  {id: 5, libelle: "5"},
])
const formatItems = ref([
  {id: '1 vs 1', libelle: "1 vs 1"},
  {id: '2 vs 2', libelle: "2 vs 2"},
  {id: '2 vs 2', libelle: "3 vs 3"},
  {id: '4 vs 4', libelle: "4 vs 4"},
])
const statusItems = ref([
  {id: 'OPEN', libelle: 'Ouvert'},
  {id: 'CLOSE', libelle: 'Fermé'},
])

const emit = defineEmits(['search'])
const searching = defineModel({ type: Boolean })

const search = handleSubmit((values: SearchForm) => {
  emit('search', values)
})

</script>

<style lang="scss">
@import "@/assets/css/components/searchFormTournament.scss";
</style>
