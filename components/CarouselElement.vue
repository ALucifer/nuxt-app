<template>
  <Carousel :autoplay="10000" :transition="1000" :wrap-around="true" :pause-autoplay-on-hover="true">
    <template #slides>
      <Slide v-for="item in items" :key="item.id">
        <div class="slide">
          <div class="row">
            <div class="col-lg-5">
              <div class="slide__left">
                <p class="text-sm" :class="{ 'text-danger': !isOpen(item) }">
                  Tournois {{ isOpen(item) ? "ouvert" : "fermé" }}
                </p>
                <h4>
                  <nuxt-link :to="{ name: 'tournois-id', params: { id: item.id } }">
                    {{ item.libelle }}{{ item.id }}
                  </nuxt-link>
                </h4>
                <CounterTournament :begin-at="item.beginAt" />
                <div class="btn-area">
                  <nuxt-link
                    v-if="isOpen(item)"
                    :to="{ name: 'tournois-id-register', params: { id: item.id } }"
                    class="cmn-btn"
                    >S'inscrire</nuxt-link
                  >
                </div>
              </div>
            </div>
            <div class="d-none d-lg-block col-lg-7 col-md-5">
              <div class="slide__right">
                <AppImage
                  class="slide__right-img"
                  src="/images/character.png"
                  alt="image"
                />
              </div>
            </div>
          </div>
        </div>
      </Slide>
    </template>
    <template #addons>
      <Navigation v-if="items.length > 1" />
    </template>
  </Carousel>
</template>

<script setup lang="ts">
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import { Carousel, Slide, Navigation } from "vue3-carousel/dist/carousel";
import CounterTournament from "@/components/CounterTournament";
import "vue3-carousel/dist/carousel.css";

defineProps({ items: { type: Array, required: true }})

const { isOpen } = useTournament()
</script>

<style lang="scss">
@import "@/assets/css/components/carousel.scss";
</style>
