<template>
  <div class="container">
    <div
        class="row g-0"
        style="background-color: #665494; min-height: 350px"
    >
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">
        <MessageLeftSide @changeConversation="conversationStore.setCurrentConversation($event.conversation)"  />
      </div>
      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
        <MessageRightSide v-if="currentConversation" ref="messageRightSide" @newMessage="scrollToNewMessage"  />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MessageLeftSide from "@/components/profile/MessageLeftSide.vue";
import MessageRightSide from "~/components/profile/MessageRightSide.vue";
import {useConversationStore} from "~/store/conversation";
import ClientSSE from "~/app/client/sse/ClientSSE";
import {definePageMeta} from "#imports";
import {mapActions, storeToRefs} from "pinia";

definePageMeta({
  layout: 'profile'
})

definePageMeta({
  middleware: ['is-new-conversation']
})

const conversationStore = useConversationStore()
const { conversations, currentConversation } = storeToRefs(conversationStore)
const { getUser } = useSecurity()
const route = useRoute()

conversationStore.$onAction(
    ({ name, after }) => {
      if (name === 'fetchConversations') {
        after(async () => {
          if (route.meta.user && !conversations.value.find((c) => c.interlocutor.id === route.meta.user.id)) {
            conversationStore.createNewConversation(route.meta.user)
          }

          conversationStore.setCurrentConversation()
        })
      }
      if (name === 'setCurrentConversation') {
        after(() => {
          conversationStore.fetchCurrentConversation()
        })
      }
    }
)

await useAsyncData('conversations-list', () => conversationStore.fetchConversations().then(() => true))

onMounted(async () => {
  const clientSSE = new ClientSSE(getUser())
  clientSSE.connect()

  clientSSE.eventSource.onmessage = ({ data }) => {
    conversationStore.addMessage(JSON.parse(data))
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
