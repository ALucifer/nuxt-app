<template>
  <div class="row d-flex justify-content-center">
    <div class="col-lg-8 text-center">
      <div class="section-header">
        <h3 class="title">Rechercher un tournoi</h3>
      </div>
    </div>
  </div>
  <div class="search__container row mb-40 mp-none">
    <div class="col-lg-3">
      <div class="single-input">
        <span>Search</span>
        <input v-model="form.libelle" type="text" placeholder="Search" />
      </div>
    </div>
    <div class="col-lg-3">
      <div class="single-input">
        <span>Format</span>
        <AppSelect
          libelle="Format du tournoi"
          :items="formatItems"
          @change="changeFormat($event.value)"
          name="format"
        />
      </div>
    </div>
    <div class="col-lg-3">
      <div class="single-input">
        <span>Best Of</span>
        <AppSelect
          libelle="Best Of"
          :items="boItems"
          @change="changeBO($event.value)"
          name="bestOf"
        />
      </div>
    </div>
    <div class="col-lg-3">
      <div class="single-input">
        <span>Date</span>
        <AppDatePicker
            name="date"
        />
      </div>
    </div>
    <div class="col-lg-3">
      <div class="single-input">
        <button @click="search()" class="cmn-btn" style="margin-top: 15px">
          Rechercher
        </button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import lodash from "lodash";

const form = ref({ libelle: null, format: null, best_of: null, date: null })
const boItems = ref([
    { id: 1, libelle: "1" },
    { id: 3, libelle: "3" },
    { id: 5, libelle: "5" },
])
const formatItems = ref([
    { id: 1, libelle: "1 vs 1" },
    { id: 2, libelle: "2 vs 2" },
    { id: 3, libelle: "3 vs 3" },
    { id: 4, libelle: "4 vs 4" },
])


const emit = defineEmits(['search'])

function search() {
    if (form.libelle === "") {
        form.libelle = null;
    }
    emit('search', { form: form })
}

function changeFormat(id) {
    form.value.format = id
        ? lodash.find(formatItems.value, ["id", id]).libelle
        : null;
}

function changeBO(id) {
    form.value.best_of = id;
}
</script>

<style lang="scss">
@import "@/assets/css/components/searchFormTournament.scss";
</style>
