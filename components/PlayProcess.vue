<template>
  <section id="how-works-section" class="border-area">
    <div class="overlay pt-120 pb-120">
      <div class="container wow fadeInUp">
        <div class="row d-flex justify-content-center">
          <div class="col-lg-6 text-center">
            <div class="section-header">
              <h2 class="title">Comment jouer ?</h2>
              <p>Très facile, il vous suffit de suivre les étapes suivantes</p>
            </div>
          </div>
        </div>
        <div class="row mp-top justify-content-center">
          <div class="col-lg-3 col-md-3 col-sm-6 d-flex justify-content-center">
            <div class="single-item">
              <div class="icon-area">
                <span>1</span>
                <img src="images/how-icon-1.png" alt="image" />
              </div>
              <div class="text-area">
                <h5>Inscription</h5>
              </div>
            </div>
          </div>
          <div
            class="col-lg-3 col-md-3 col-sm-6 d-flex justify-content-center obj-alt"
          >
            <div class="single-item">
              <div class="icon-area">
                <span>2</span>
                <img src="images/how-icon-3.png" alt="image" />
              </div>
              <div class="text-area">
                <h5>Compétition</h5>
              </div>
            </div>
          </div>
          <div
            class="col-lg-3 col-md-3 col-sm-6 d-flex justify-content-center obj-rel"
          >
            <div class="single-item">
              <div class="icon-area">
                <span>3</span>
                <img src="images/how-icon-4.png" alt="image" />
              </div>
              <div class="text-area">
                <h5>Récompense</h5>
              </div>
            </div>
          </div>
        </div>
        <div class="row d-flex justify-content-center">
          <div class="col-lg-6 text-center">
            <NuxtLink :to="{ name: 'register' }" class="cmn-btn"
              >Rejoignez nous!</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style style lang="scss" scoped>
@import "@/assets/css/components/playProcess.scss";
</style>
