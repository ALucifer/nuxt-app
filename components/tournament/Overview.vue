<template>
  <AppTabPane name="overview" tabName="tournament-view">
    <template v-slot:content>
      <div class="container pb-120">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <div class="row wrapper">
              <div class="col-lg-6 col-md-6 col-sm-6" v-for="item in items">
                <div class="overview-card">
                  <h6>{{ item.title }}</h6>
                  <p class="text-sm">{{ item.subtitle }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </AppTabPane>
</template>

<script setup lang="ts">
const items = ref([
  { title: "Jeu", subtitle: "Call of duty" },
  { title: "Generation du tournoi", subtitle: "45 minutes avant le début" },
  { title: "Format", subtitle: "1 vs 1" },
])
</script>

<style lang="scss">
@import "@/assets/css/components/tournamentOverview.scss";
</style>
