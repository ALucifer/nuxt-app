<template>
  <footer class="footer__wrapper">
    <div class="footer__mid pt-120">
      <div class="container">
        <div class="row d-flex">
          <div
            class="col-lg-8 col-md-8 d-flex justify-content-md-between justify-content-center align-items-center cus-grid"
          >
            <div class="logo-section">
              <NuxtLink :to="{ name: 'index' }" class="site-logo site-title">
                <img src="/images/logo.png" alt="site-logo" />
              </NuxtLink>
            </div>
            <ul class="menu-side">
              <li>
                <NuxtLink :to="{ name: 'index' }" class="active"
                  >Accueil</NuxtLink
                >
              </li>
              <li>
                <NuxtLink :to="{ name: 'about' }">A propos</NuxtLink>
              </li>
              <li>
                <NuxtLink :to="{ name: 'contact' }">Contact</NuxtLink>
              </li>
            </ul>
          </div>
          <div
            class="col-lg-4 col-md-4 d-flex align-items-center justify-content-center justify-content-md-end"
          >
            <ul class="social-bar">
              <li>
                <a href="#"><i class="fab fa-facebook-f"></i></a>
              </li>
              <li>
                <a href="#"><i class="fab fa-twitter"></i></a>
              </li>
              <li>
                <a href="#"><i class="fab fa-instagram"></i></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import NewsletterSubscriber from "@/components/NewsletterSubscriber";
export default {
  components: {
    NewsletterSubscriber,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/components/global/AppFooter.scss";
</style>
