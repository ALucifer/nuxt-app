<template>
  <div class="container-grey">
    <div class="pb-3">
      <h5>Gestion des tournois</h5>
      <p class="text-14">Tournois auquel vous êtes inscrit ou bien que vous avez créé</p>
    </div>
    <div>
      <p class="text-14">Trier par:
        <select v-model="selected" class="selector-option">
          <option v-for="filter in filters" :value="filter.id">{{ filter.libelle }}</option>
        </select>
      </p>
    </div>
  </div>
  <keep-alive>
    <TournamentCard v-if="selected === 1" :owner="true" :user="false" pagination-name="my-tournaments"/>
  </keep-alive>
  <keep-alive>
    <TournamentCard v-if="selected === 2" :owner="false" :user="true" pagination-name="my-participations" />
  </keep-alive>
</template>

<script setup lang="ts">
import TournamentCard from '@/components/profile/TournamentCard'

const filters = ref([
  { id: 1, libelle: 'Mes tournois'},
  { id: 2, libelle: 'Mes participations'},
])
const selected = ref(1)

</script>

<style lang="scss" scoped>
.container-grey {
  background-color: #C7C7C729;
  padding: 16px;
  margin-bottom: 10px;
}

.selector-option {
  background-color: white;
  font-weight: bold;
}
</style>