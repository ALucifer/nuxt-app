<template>
  <div class="container">
    <div
        class="row g-0"
        style="background-color: #665494; min-height: 350px"
        v-if="!pending"
    >
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">
        <MessageLeftSide @changeConversation="changeActiveConversation($event.conversation)" />
      </div>
      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
        <MessageRightSide  ref="messageRightSide" @newMessage="scrollToNewMessage" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MessageLeftSide from "@/components/profile/MessageLeftSide.vue";
import MessageRightSide from "~/components/profile/MessageRightSide.vue";
import {useConversationStore} from "~/store/Conversation";
import useFetchConversationsList from "~/composables/api/useFetchConversationsList";
import ClientSSE from "~/app/client/sse/ClientSSE";
import useFetchMessagesByConversation from "~/composables/api/useFetchMessagesByConversation";
definePageMeta({
  layout: 'profile'
})

const { changeActiveConversation,addMessage } = useConversationStore()
const { getUser } = useSecurity()
const { pending } = await useFetchConversationsList()
await useFetchMessagesByConversation()

onMounted(async () => {
  const clientSSE = new ClientSSE(getUser())
  clientSSE.connect()

  clientSSE.eventSource.onmessage = ({ data }) => {
    addMessage(JSON.parse(data))
    scrollToNewMessage();
  };
})

const messageRightSide = ref()

function scrollToNewMessage() {
  const topPos = messageRightSide.value.messages.at(-1).offsetTop
  let chat = messageRightSide.value.chatContainer
  chat.scrollTop = topPos;
}
</script>

<style lang="scss">
@import "@/assets/css/pages/profile/messageList.scss";
</style>
