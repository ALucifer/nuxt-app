<template>
  <section id="error-section">
    <div class="overlay pb-120 pt-120">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <div class="main-content pt-120 pb-120 text-center">
              <h3>Whoops..</h3>
              <h5>page not found</h5>
              <NuxtLink
                :to="{ name: 'register' }"
                class="cmn-btn"
              >Join now!</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/css/error.scss";
</style>
