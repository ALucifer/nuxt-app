<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="newsletter">
          <div class="row justify-content-center">
            <div class="col-lg-6 col-md-8">
              <div class="newsletter__top-area">
                <h3>S'inscrire à la newsletter</h3>
                <p>
                  Ne manquez pas les tournois important afin d'affronter les
                  meilleurs joueurs.
                </p>
              </div>
              <form action="#">
                <div class="newsletter__subscribe">
                  <input
                    type="email"
                    v-model="form.email"
                    placeholder="Votre email"
                  />
                  <button class="cmn-btn">S'inscrire</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const form = ref({email: ''})
</script>

<style lang="scss" scoped>
@import "@/assets/css/components/newsletterSubscriber.scss";
</style>
