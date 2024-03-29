<template>
  <section class="authentication pb-120 pt-120 h-100">
    <div class="container">
      <div class="authentication-container">
        <div class="col-lg-6">
          <div class="authentication-main">
            <slot name="header"></slot>
            <slot></slot>
            <div class="or">
              <p>OU</p>
            </div>
            <SocialAuthenticator
                message="Inscrivez-vous avec"
            />
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SocialAuthenticator from "@/components/SocialAuthenticator";
</script>