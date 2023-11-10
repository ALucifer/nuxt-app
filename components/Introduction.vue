<template>
  <section class="section-container">
    <div class="section-content">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <div class="banner-content">
              <div class="banner-content__top-area">
                <h3>Jouez en illimité à des</h3>
                <h1>Tournois</h1>
                <p>Venez affronter des milliers de joueur</p>
                <div class="d-flex justify-content-center align-items-center">
                  <NuxtLink
                    v-if="isLogged"
                    class="cmn-btn"
                    :to="{ name: 'tournois' }"
                    >Je joue
                  </NuxtLink>
                  <NuxtLink v-else :to="{ name: 'register' }" class="cmn-btn"
                    >Je m'inscris
                  </NuxtLink>
                  <a
                    href="https://www.youtube.com/watch?v=MJ0zpsWQ_XM"
                    class="mfp-iframe popupvideo"
                  >
                    <img src="images/play-icon.png" alt="play" />
                  </a>
                </div>
              </div>
              <div class="row justify-content-center">
                <div class="col-lg-12">
                  <div class="row justify-content-center">
                    <div class="col-lg-6">
                      <div class="bottom-area text-center">
                        <img src="images/versus.png" alt="banner-vs" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ani-illu">
          <img
            class="left-1 wow fadeInUp"
            src="images/left-banner.png"
            alt="image"
          />
          <img
            class="right-2 wow fadeInUp"
            src="images/right-banner.png"
            alt="image"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { isLogged } = useSecurity()
</script>

<style lang="scss" scoped>
@import "~/assets/css/components/banner.scss";
@import "~/assets/css/common.scss";
</style>
