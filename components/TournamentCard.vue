<template>
  <div class="tournament-card">
    <div class="row">
      <div class="col-lg-3 col-md-3 tournament-card__image">
        <img class="top-img" src="images/game-img-1.png" alt="image" />
      </div>
      <div class="col-lg-6 col-md-9 tournament-card__informations">
        <div class="mid-area">
          <h4>{{ item.libelle }}</h4>
          <div class="tournament-card__date">
            <div class="time-area bg" v-if="showBeginAt(item.beginAt)">
              <img src="images/waitng-icon.png" alt="image" />
              <span>Début</span>
              <span class="time">{{ dateFromNow }}</span>
            </div>
            <div class="date-area bg">
              <span class="date">{{ formattedDate }}</span>
            </div>
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
              <span class="head">Enrôlé</span>
              <span class="sub"></span>
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

<script>
import { dateFormatted, dateToNow, checkIfDateIsBefore } from "@/helpers/date";

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formattedDate: function () {
      return dateFormatted({
        date: this.item.begin_at,
        format: "dddd DD MMM YYYY",
      });
    },
    dateFromNow: function () {
      return dateToNow(this.item.begin_at);
    },
  },
  methods: {
    showBeginAt: function (date) {
      return checkIfDateIsBefore(date);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/components/tournamentCard.scss";
</style>
