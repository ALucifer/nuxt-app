<template>
  <div class="users-container">
    <ul class="user-list" v-if="conversations">
      <template v-for="(conversation, key) in conversations" :key="key">
        <li
          v-if="conversation.total_messages > 0"
          class="user-list__item"
          @click.prevent="
            conversation.id !== currentConversation?.id &&
            $emit('changeConversation', {
              conversation: conversation,
            })
          "
        >
          <div class="user-item">
            <img
                :src="conversation.interlocutor.avatar"
                :alt="`${conversation.interlocutor.pseudo} avatar`"
            />
          </div>
          <p class="name-time">
            <span class="name">{{ conversation.interlocutor.pseudo }}</span>
          </p>
          <span
              v-if="
              getUnreadMessagesByConversation(conversation).length > 0
            "
              class="badge rounded-pill bg-warning text-dark"
          >{{
              getUnreadMessagesByConversation(conversation).length
            }}</span
          >
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {useConversationStore} from "~/store/conversation";
import {ConversationModel} from "~/app/models/conversation.model";

defineProps<{conversations?: ConversationModel[]}>()

const {getUnreadMessagesByConversation, currentConversation} = useConversationStore()
</script>

<style lang="scss">
@import "@/assets/css/components/profile/messageLeftSide.scss";
</style>
