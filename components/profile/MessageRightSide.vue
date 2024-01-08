<template>
  <div class="selected-user">
    <span
    >De:
      <span class="selected-user__name">{{
          currentConversation?.interlocutor?.pseudo
        }}</span></span
    >
  </div>
  <div class="chat-container chat__container" ref="chatContainer">
    <ul class="chat-box chatContainerScroll" v-if="currentConversation.messages">
      <li
          v-for="(message, i) in currentConversation.messages"
          class="chat__message"
          :key="i"
          :class="{
          'chat__message message-item__left': isOwnMessage(message),
          'chat__message message-item__right': !isOwnMessage(message),
        }"
          ref="messages"
      >
        <div
            :class="{
            'message-item__avatar-left': isOwnMessage(message),
            'message-item__avatar-right': !isOwnMessage(message),
          }"
        >
          <nuxt-img
              :src="message.fromUser.avatar"
              placeholder="/images/participant-1.png"
              :alt="`${message.fromUser.pseudo} avatar`"
              class="message-item__avatar"
          />
          <div class="message-item__pseudo">{{ message.fromUser.pseudo }}</div>
        </div>
        <div
            class="message-item__text"
            :class="{
            'message-item__text--left': isOwnMessage(message),
            'message-item__text--right': !isOwnMessage(message),
          }"
        >
          {{ message.text }}
        </div>
        <div
            class="message-item__hour"
            :class="{ 'message-item__hour--right': !isOwnMessage(message) }"
        >
          {{ $dayjs(message.created_at).fromNow() }}
        </div>
      </li>
    </ul>
  </div>
  <div class="form-group mt-3 mb-0 p-3">
    <textarea
        class="form-control"
        rows="3"
        placeholder="Tapez votre message"
        v-model="message"
        @keyup.enter="send()"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
import {useConversationStore} from "~/store/conversation";
import {storeToRefs} from "pinia";
import {MessageModel} from "~/app/models/conversation.model";

const conversationStore = useConversationStore()
const { getUser } = useSecurity()

const { currentConversation } = storeToRefs(conversationStore)
const { sendMessage, sendMessageToNewConversation } = conversationStore

const emit = defineEmits(['newMessage'])

const messages = ref()
const chatContainer = ref()
const message = ref('')

defineExpose({messages, chatContainer})

function isOwnMessage(message: MessageModel) {
  return getUser().id === message.fromUser.id
}
async function send() {
  if (currentConversation.value!.id === 0) {
    await sendMessageToNewConversation(message.value)
  } else {
    await sendMessage(message.value)
  }

  message.value = ''
  emit('newMessage')
}
</script>

<style lang="scss">
@import "@/assets/css/components/profile/messageRightSide.scss";
</style>
