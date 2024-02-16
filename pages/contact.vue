<template>
  <div>
    <AppBanner />
    <section id="contact-section" class="pb-120">
      <div class="overlay">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-10">
              <div class="section-header text-center">
                <h5>Contactez-nous</h5>
                <h2 class="title">Get in touch today!</h2>
                <p>
                  Nous mettons tout en place pour convenir à vos besoins.
                  N'hésitez pas !
                </p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-8">
              <ContactForm />
            </div>
            <div class="col-md-4">
              <div class="right-sidebar">
                <h6 class="head-area">Plus d'information</h6>
                <div class="single-area d-flex align-items-center">
                  <div class="img-area">
                    <AppImage src="/images/email-icon.png" alt="image" />
                  </div>
                  <div class="right-area">
                    <h6>Email</h6>
                    <p class="text-sm">oublie-pas-de-creer-une-adresse@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import ContactForm from "@/components/ContactForm";

definePageMeta({
  auth: false
})

useHead({
  title: "Spots : Contact",
  description: "Page de contact."
})
</script>
