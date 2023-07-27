<template>
  <div class="notifications">
    <TransitionGroup name="fade">
      <div
        class="notification"
        :class="message.class"
        v-for="message in messages"
        :key="message.id"
      >
        <span v-html="message.message"></span>
        <button @click="removeMessage(message.id)">x</button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import useFlashMessages from "~/composables/useFlashMessages";

const { messages, removeMessage } = useFlashMessages();
</script>

<style scoped>
@import "@/assets/css/components/global/AppNotifications.scss";
</style>
