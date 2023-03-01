<template>
  <div class="selected-user">
    <span
      >De:
      <span class="selected-user__name">{{
        currentConversation.interlocutor.pseudo
      }}</span></span
    >
  </div>
  <div class="chat-container chat__container" ref="chat__container">
    <ul class="chat-box chatContainerScroll">
      <li
        v-for="(message, i) in this.getMessagesByConversationId(
          currentConversation.id
        )"
        class="chat__message"
        v-observe="{
          callback: messageRead,
          useCallback: message.state === 'UNREAD' && !isOwnMessage(message),
          message,
        }"
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

<script>
import { useConversationStore } from "@/store/conversation";
import { mapState, mapActions } from "pinia";

export default {
  data() {
    return {
      message: "",
    };
  },
  computed: {
    ...mapState(useConversationStore, ["currentConversation"]),
  },
  emits: ["newMessage"],
  methods: {
    async send() {
      if (this.currentConversation.id === 0) {
        await this.sendMessageToNewConversation({ text: this.message });
      } else {
        await this.sendMessage({ text: this.message });
      }
      this.message = "";
      this.$emit("newMessage");
    },
    ...mapActions(useConversationStore, [
      "sendMessage",
      "sendMessageToNewConversation",
      "isOwnMessage",
      "messageRead",
      "getMessagesByConversationId",
    ]),
  },
};
</script>

<style lang="scss">
@import "@/assets/css/components/profile/messageRightSide.scss";
</style>
