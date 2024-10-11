<template>
  <div class="users-container">
    <ul class="user-list">
      <template
        v-for="(conversation, key) in conversations"
        :key="key"
      >
        <li
          :class="{ 'user-list__item--active' : (currentConversation && conversation.id === currentConversation.id)}"
          class="user-list__item"
          @click.prevent="handleClick(conversation)"
        >
          <div class="user-item">
            <AppAvatar
              :src="conversation.interlocutor.avatar ?? ''"
              :alt="`${conversation.interlocutor.pseudo} avatar`"
            />
          </div>
          <p class="name-time">
            <span class="name">{{ conversation.interlocutor.pseudo }}</span>
          </p>
          <span
            v-if="conversation.total_messages_unread > 0"
            class="badge rounded-pill bg-warning text-dark"
          >
            {{ conversation.total_messages_unread }}
          </span>
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type {ConversationModel} from "~/types/api/conversations";

const props = defineProps<{ conversations: ConversationModel[], currentConversation?: ConversationModel }>()
const emits = defineEmits(['change-conversation'])

function handleClick(conversation: ConversationModel) {
  if (
      props.currentConversation !== undefined
      && conversation.id !== props.currentConversation.id
  ) {
    emits('change-conversation', conversation)
  }
}
</script>

<style lang="scss">
@import "@/assets/css/components/profile/messageLeftSide.scss";
</style>
