<template>
  <div class="selected-user">
    <span>De:
      <span class="selected-user__name">{{
        currentConversation?.interlocutor?.pseudo
      }}</span></span>
  </div>
  <div
    ref="chatContainer"
    class="chat-container chat__container"
  >
    <ul
      v-if="currentConversation.messages"
      class="chat-box chatContainerScroll"
    >
      <li
        v-for="(item, i) in currentConversation.messages"
        ref="messages"
        :key="i"
        v-observe="{
          callback: messageRead,
          useCallback: item.state === 'UNREAD' && !isOwnMessage(item),
          item,
        }"
        class="chat__message"
        :class="{
          'chat__message message-item__left': isOwnMessage(item),
          'chat__message message-item__right': !isOwnMessage(item),
        }"
      >
        <div
          :class="{
            'message-item__avatar-left': isOwnMessage(item),
            'message-item__avatar-right': !isOwnMessage(item),
          }"
        >
          <AppImage
            :src="item.fromUser.avatar"
            placeholder="/images/participant-1.png"
            :alt="`${item.fromUser.pseudo} avatar`"
            class="message-item__avatar"
          />
          <div class="message-item__pseudo">
            {{ item.fromUser.pseudo }}
          </div>
        </div>
        <div
          class="message-item__text"
          :class="{
            'message-item__text--left': isOwnMessage(item),
            'message-item__text--right': !isOwnMessage(item),
          }"
        >
          {{ item.text }}
        </div>
        <div
          class="message-item__hour"
          :class="{ 'message-item__hour--right': !isOwnMessage(item) }"
        >
          {{ $dayjs(item.created_at).fromNow() }}
        </div>
      </li>
    </ul>
  </div>
  <div class="form-group mt-3 mb-0 p-3">
    <textarea
      v-model="message"
      class="form-control"
      rows="3"
      placeholder="Tapez votre message"
      @keyup.enter="send()"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useConversationStore } from '~/store/conversation'
import type { MessageModel } from '~/app/models/conversation.model'

const conversationStore = useConversationStore()
const { getUser } = useSecurity()

const { currentConversation } = storeToRefs(conversationStore)
const { sendMessage, sendMessageToNewConversation, messageRead } = conversationStore

const emit = defineEmits(['newMessage'])

const messages = ref()
const chatContainer = ref()
const message = ref('')

defineExpose({ messages, chatContainer })

function isOwnMessage(message: MessageModel) {
  return getUser().id === message.fromUser.id
}
async function send() {
  if (currentConversation.value!.id === 0) {
    await sendMessageToNewConversation(message.value)
  }
  else {
    await sendMessage(message.value)
  }

  message.value = ''
  emit('newMessage')
}
</script>

<style lang="scss">
@import "@/assets/css/components/profile/messageRightSide.scss";
</style>
