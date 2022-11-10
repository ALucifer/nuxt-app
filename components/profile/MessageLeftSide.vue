<template>
  <div class="users-container">
    <ul class="user-list">
      <template v-for="(conversation, key) in conversations" :key="key">
        <li
          v-if="
            conversation.total_messages > 0 ||
            conversation.id == this.currentConversation.id
          "
          class="user-list__item"
          @click.prevent="
            $emit('changeConversation', {
              conversation_id: conversation.id,
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
              getUnreadMessagesByConversationId(conversation.id).length > 0
            "
            class="badge rounded-pill bg-warning text-dark"
            >{{
              getUnreadMessagesByConversationId(conversation.id).length
            }}</span
          >
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import { useConversationStore } from "@/store/conversation";
import { mapState } from "pinia";

export default {
  props: {
    conversations: { type: Array, default: [] },
  },
  computed: {
    ...mapState(useConversationStore, [
      "getUnreadMessagesByConversationId",
      "currentConversation",
    ]),
  },
};
</script>

<style lang="scss">
@import "@/assets/css/components/profile/messageLeftSide.scss";
</style>
