<template>
  <section class="authentication pb-120 pt-120">
    <div class="container">
      <div class="authentication-container">
        <div class="col-lg-6">
          <div class="authentication-main">
            <h4>Let's get started</h4>
            <RegisterForm />
            <div class="or">
              <p>OR</p>
            </div>
            <SocialAuthenticator message="Connexion avec" />
            <div class="account">
              <p>
                Déjà un compte?
                <NuxtLink :to="{ name: 'login' }">Connexion</NuxtLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import RegisterForm from "@/components/RegisterForm";
import SocialAuthenticator from "@/components/SocialAuthenticator";
export default {
  name: "Register",
  head() {
    return {
      title: "Inscription",
    };
  },
  components: { RegisterForm, SocialAuthenticator },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/pages/login.scss";
</style>
