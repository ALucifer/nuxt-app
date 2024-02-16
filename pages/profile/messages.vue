<template>
  <div class="container">
    <div
        class="row g-0"
        style="background-color: #665494; min-height: 350px"
    >
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">
        <MessageLeftSide @changeConversation="setCurrentConversation($event.conversation)"/>
      </div>
      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
        <MessageRightSide v-if="currentConversation" ref="messageRightSide" @newMessage="scrollToNewMessage"  />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useConversationStore} from "~/store/conversation";
import MessageLeftSide from "~/components/profile/MessageLeftSide.vue";
import MessageRightSide from "~/components/profile/MessageRightSide.vue";
import {InterlocutorModel} from "~/app/models/conversation.model";
import {storeToRefs} from "pinia";
import ClientSSE from "~/app/client/sse/ClientSSE";

definePageMeta({
  layout: 'profile',
  middleware: ['is-new-conversation']
})

useSeoMeta({
  title: 'Messagerie'
})

const route = useRoute()
const conversationStore = useConversationStore()
const { getUser } = useSecurity()
const {conversations, currentConversation} = storeToRefs(conversationStore)
const {
  fetchConversations, fetchCurrentConversationMessages,
  createNewConversation, initCurrentConversation,
  setCurrentConversation, messageHasArrived
} = conversationStore

conversationStore.$onAction(({ name, after }) => {
  if (name === 'setCurrentConversation') {
    after(() => {
      fillCurrentConversationMessages()
    })
  }
})

await useAsyncData('conversations-list', async () => {
  await fetchConversations()

  if (route.meta.user && !conversations.value.find((c) => c.interlocutor.id === route.meta.user.id)) {
    createNewConversation(route.meta.user as InterlocutorModel, route.meta.user.id)
  }

  initCurrentConversation()

  return true
})

await useAsyncData(
    'messages',
    async () => await fillCurrentConversationMessages(),
)

onMounted(async () => {
  const clientSSE = new ClientSSE(getUser().id)
  clientSSE.connect()

  clientSSE.eventSource.onmessage = ({ data }) => {
    console.log(JSON.parse(data))
    messageHasArrived(JSON.parse(data))
    if (currentConversation.value && currentConversation.value.id === JSON.parse(data).id) {
      scrollToNewMessage();
    }
  };
})

const messageRightSide = ref()

async function fillCurrentConversationMessages() {
  if (
      !currentConversation.value
      || currentConversation.value.id === 0
      || (currentConversation.value.messages !== undefined && currentConversation.value.messages.length > 0)
  ) return

  await fetchCurrentConversationMessages()

  return true
}
function scrollToNewMessage() {
  const topPos = messageRightSide.value.messages.at(-1).offsetTop
  let chat = messageRightSide.value.chatContainer
  chat.scrollTop = topPos;
}
</script>

<style lang="scss">
@import "@/assets/css/pages/profile/messageList.scss";
</style>
