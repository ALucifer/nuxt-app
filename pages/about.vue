<template>
  <AppBanner :isDefault="true" />
  <section id="about-us-section">
    <div class="overlay pt-120">
      <div class="container wow fadeInUp">
        <div class="main-container">
          <div class="row d-flex justify-content-center">
            <div class="col-lg-8">
              <div class="section-header text-center">
                <h2 class="title">A propos</h2>
                <p>
                  Ce site est une plateforme réunissant les joueurs en recherche
                  de compétition. Il à pour but d'organiser des tournois pour
                  les joueurs et fait pas les joueurs. Un des principals
                  problèmes que les jeux ont est de proposer des tournois mais
                  qui ne correspondent pas à tout les horaires. C'est pourquoi
                  les tournois se doivent d'être organisé par les joueurs
                  eux-même.
                </p>
                <p>
                  Je suis actuellement le seul développeur sur le projet, mais
                  très motivé par celui-ci. Etant un ancien joueur de
                  compétition sur BO2 je sais très bien ce que recherche les
                  personnes dans la compétition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({
  title: "A propos de Spots",
  description: "Page d'information sur le site Spots."
})
</script>
