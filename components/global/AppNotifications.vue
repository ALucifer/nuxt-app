<template>
  <div class="notifications">
    <TransitionGroup name="fade">
      <template
        v-for="message in messages"
        :key="message.id"
      >
        <div
          v-show="message.visible"
          class="notification"
          :class="message.class"
        >
          <span v-html="message.message"></span>
          <button @click="removeMessage(message.id)">
            x
          </button>
        </div>
      </template>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
const { messages, removeMessage, readMessagesCookie } = useFlashMessages()
readMessagesCookie()
</script>

<style lang="scss" scoped>
@use "assets/css/components/global/AppNotifications.scss";
</style>
