<template>
  <div class="users-container">
    <ul class="user-list">
      <template v-for="(conversation, key) in conversations" :key="key">
        <li
          class="user-list__item"
          @click.prevent="
            conversation.id !== currentConversation?.id &&
            $emit('change-conversation', {
              conversation: conversation
            })
          "
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
          <span v-if="conversation.total_messages_unread > 0" class="badge rounded-pill bg-warning text-dark">
            {{ conversation.total_messages_unread }}
          </span>
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useConversationStore } from "~/store/conversation";
import {storeToRefs} from "pinia";
import {ConversationMessagesModel} from "~/app/models/conversation.model";

const { conversations, currentConversation } = storeToRefs(useConversationStore())

defineEmits(['change-conversation'])
</script>

<style lang="scss">
@import "@/assets/css/components/profile/messageLeftSide.scss";
</style>
