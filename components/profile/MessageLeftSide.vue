<template>
  <div class="users-container">
    <ul class="user-list">
      <template
        v-for="(conversation, key) in conversations"
        :key="key"
      >
        <li
          :class="{ 'user-list__item--active': (currentConversation && conversation.id === currentConversation.id) }"
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
      <client-only>
        <li
          v-if="isNewConversation && newConversation"
          class="user-list__item"
          :class="{ 'user-list__item--active': !currentConversation }"
          @click.prevent="handleClick(null)"
        >
          <div class="user-item">
            <AppAvatar :src="newConversation.interlocutor.avatar" />
          </div>
          <p class="name-time">
            <span class="name">{{ newConversation.interlocutor.pseudo }}</span>
          </p>
        </li>
      </client-only>
      <li class="user-list__item user-list__item--icon">
        <plus-icon />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { ConversationModel } from '~/types/api/conversations'
import { useNewConversation } from '~/composables/useNewConversation'

defineProps<{ conversations: ConversationModel[], currentConversation?: ConversationModel }>()
const emits = defineEmits(['change-conversation'])
const { isNewConversation, newConversation } = useNewConversation()

function handleClick(conversation: ConversationModel | null) {
  emits('change-conversation', conversation)
}
</script>

<style lang="scss">
@use "@/assets/css/components/profile/messageLeftSide.scss";
</style>
