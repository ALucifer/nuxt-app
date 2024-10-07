<template>
  <footer class="footer__wrapper">
    <div class="footer__mid">
      <div class="container">
        <div class="footer-item-container">
          <div class="logo-section">
            <NuxtLink
              :to="{ name: 'index' }"
              class="site-logo site-title"
            >
              <AppImage
                src="/images/logo.png"
                alt="site-logo"
                class="logo-footer"
              />
            </NuxtLink>
          </div>
          <ul class="menu-side mx-auto my-sm-4">
            <li>
              <NuxtLink
                :to="{ name: 'index' }"
                class="active"
              >Accueil</NuxtLink>
            </li>
            <li>
              <NuxtLink :to="{ name: 'about' }">
                A propos
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="{ name: 'contact' }">
                Contact
              </NuxtLink>
            </li>
          </ul>
          <ul class="social-bar">
            <li>
              <a href="#">
                <facebook-icon />
              </a>
            </li>
            <li>
              <a href="#">
                <twitter-icon />
              </a>
            </li>
            <li>
              <a href="#">
                <instagram-icon />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@use '~/assets/css/components/global/AppFooter.scss';
</style>
