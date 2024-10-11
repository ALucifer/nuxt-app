<template>
  <div class="selected-user">
    <span>De:
      <span class="selected-user__name">{{ conversation.interlocutor.pseudo }}</span>
    </span>
  </div>
  <div ref="chatContainer" class="chat-container chat__container">
    <ul class="chat-box chatContainerScroll">
      <li
        v-for="(item) in messages"
        :key="item.id"
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
          {{ $dayjs(item.createdAt).fromNow() }}
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
import type {ConversationModel, MessageModel} from "~/types/api/conversations";

const props = defineProps<{ conversation: ConversationModel }>()

const { data: messages } = await useFetch<MessageModel[]>(
    '/api/conversations/messages',
    {
      key: 'current-conversation',
      query: {
        conversationId: props.conversation.id
      }
    }
)

const { getUser } = useSecurity()

const message = ref('')
const { execute } = useFetch(
    '/api/conversations/message',
    {
      method: 'POST',
      body: {
        form: {
          text: message.value,
          sendTo: props.conversation.interlocutor.id,
          conversation_id: props.conversation.id,
        }
      },
      immediate: false,
      lazy: true
    }
)

const isOwnMessage = (message: MessageModel) => {
  return getUser().id === message.fromUser.id
}

async function send() {
  console.log('send method')
  console.log(message.value)
  await execute()
  message.value = ''
}
</script>

<style lang="scss">
@import "@/assets/css/components/profile/messageRightSide.scss";
</style>
