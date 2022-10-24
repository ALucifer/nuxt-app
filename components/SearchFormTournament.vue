<template>
  <div class="row d-flex justify-content-center">
    <div class="col-lg-8 text-center">
      <div class="section-header">
        <h3 class="title">Rechercher un tournoi</h3>
      </div>
    </div>
  </div>
  <div class="search__container row mb-40 mp-none">
    <div class="col-lg-6">
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
        <button @click="search()" class="cmn-btn" style="margin-top: 15px">
          Rechercher
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import lodash from "lodash";

export default {
  data() {
    return {
      form: {
        libelle: null,
        format: null,
        best_of: null,
      },
      boItems: [
        { id: 1, libelle: "1" },
        { id: 3, libelle: "3" },
        { id: 5, libelle: "5" },
      ],
      formatItems: [
        { id: 1, libelle: "1 vs 1" },
        { id: 2, libelle: "2 vs 2" },
        { id: 3, libelle: "3 vs 3" },
        { id: 4, libelle: "4 vs 4" },
      ],
    };
  },
  emits: ["search"],
  methods: {
    search() {
      // Tips to remove empty string while no solution found
      if (this.form.libelle === "") {
        this.form.libelle = null;
      }
      this.$emit("search", { form: this.form });
    },
    changeFormat(id) {
      this.form.format = id
        ? lodash.find(this.formatItems, ["id", id]).libelle
        : null;
    },
    changeBO(id) {
      this.form.best_of = id;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/css/components/searchFormTournament.scss";
</style>
