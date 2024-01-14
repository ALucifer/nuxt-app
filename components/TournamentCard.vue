<template>
  <div class="tournament-card">
    <div class="row">
      <div class="col-lg-3 col-md-3 tournament-card__image">
        <AppImage class="top-img" src="images/game-img-1.png" alt="image" />
      </div>
      <div class="col-lg-6 col-md-9 tournament-card__informations">
        <div class="mid-area">
          <h4>{{ item.libelle }}</h4>
          <div class="tournament-card__date">
            <State :tournament="item" />
          </div>
          <div class="tournament-card__details">
            <div class="box-item">
              <span class="head">Format</span>
              <span class="sub">{{ item.format }}</span>
            </div>
            <div class="box-item">
              <span class="head">Participans max</span>
              <span class="sub">{{ item.max_teams }}</span>
            </div>
            <div class="box-item">
              <span class="sub">{{ item.enroll }}</span>
              <span class="head">/ {{ item.max_teams }}</span>
            </div>
            <div class="box-item">
              <span class="head">Niveau de jeu</span>
              <span class="sub">{{ item.skill_level }}</span>
            </div>
            <div class="box-item">
              <span class="head">Best Of</span>
              <span class="sub">{{ item.best_of }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 d-flex align-items-center">
        <div class="tournament-card__reward">
          <div class="contain-area">
            <p>{{ item.speech }}</p>
            <NuxtLink
              :to="{ name: 'tournois-id', params: { id: item.id } }"
              class="cmn-btn"
              >Regarder</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import State from '@/components/tournament/State.vue'

const props = defineProps({ item: { type: Object, required: true }})
</script>

<style lang="scss">
@import "@/assets/css/components/tournamentCard.scss";
</style>
