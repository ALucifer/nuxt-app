<template>
  <section class="authentication pb-120 pt-120">
    <div class="container">
      <div class="authentication-container">
        <div class="col-lg-6">
          <div class="authentication-main">
            <h4>Bienvenue</h4>
            <LoginForm />
            <div class="or">
              <p>OU</p>
            </div>
            <SocialAuthenticator message="Inscrivez-vous avec" />
            <div class="account">
              <p>
                Vous n'avez pas de compte?
                <NuxtLink :to="{ name: 'register' }">Inscription ici</NuxtLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import LoginForm from "@/components/LoginForm";
import SocialAuthenticator from "@/components/SocialAuthenticator";
export default {
  name: "Login",
  head() {
    return {
      title: "Connexion",
    };
  },
  components: { LoginForm, SocialAuthenticator },
};
</script>

<style lang="scss">
@import "@/assets/css/pages/login.scss";
</style>
