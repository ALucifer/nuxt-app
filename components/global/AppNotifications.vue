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

<script>
import useFlashMessages from "@/composables/useFlashMessages";

export default {
  setup() {
    const { messages, removeMessage } = useFlashMessages();
    return { messages, removeMessage };
  },
};
</script>

<style scoped>
@import "@/assets/css/components/global/AppNotifications.scss";
</style>
