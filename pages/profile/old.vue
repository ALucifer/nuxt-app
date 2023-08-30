<template>
  <div class="container">
    <div
        class="row g-0"
        style="background-color: #665494; min-height: 350px"
        v-if="!pending"
    >
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">
<!--        <MessageLeftSide @changeConversation="changeActiveConversation($event.conversation)" />-->
        <MessageLeftSide />
      </div>
      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
<!--        <MessageRightSide  ref="messageRightSide" @newMessage="scrollToNewMessage" />-->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MessageLeftSide from "@/components/profile/MessageLeftSide.vue";
import MessageRightSide from "~/components/profile/MessageRightSide.vue";
import {useConversationStore} from "~/store/conversation";
import {useCustomFetch} from "~/composables/api/useCustomFetch";
definePageMeta({
  layout: 'profile'
})
// const {
//   changeActiveConversation, createNewConversation,
//   isNewConversation,
//   addMessage, setConversations, addMessagesByConversation
// } = useConversationStore()
// // const { getUser } = useSecurity()
// const route = useRoute()
console.log('chargement de la page messages')
// const conversations = computed(() => useConversationStore().conversations)

const { pending } = useFetch('/api/conversations')

// const { pending: conversationsPending } = useAsyncData('conversations', async () => {
//   const {fetchAuthConversationsList, fetchConversationMessages} = useConversationApi()
//   const conversationStore = useConversationStore()
//
//   const conversations = await fetchAuthConversationsList()
//   conversationStore.setConversations(conversations)
//   const messages = await fetchConversationMessages(conversationStore.currentConversation!.id)
//   conversationStore.addMessagesByConversation(conversationStore.currentConversation!, messages)
//   return conversations
// })

// onMounted(async () => {
//   if (conversations.length !== 0) {
//     await fetchMessages()
//   }
//
//   if (route.query.user) {
//     await loadConversation()
//   }
//
//   const clientSSE = new ClientSSE(getUser())
//   clientSSE.connect()
//
//   clientSSE.eventSource.onmessage = ({ data }) => {
//     addMessage(JSON.parse(data)).then(() => {
//       scrollToNewMessage();
//     });
//   };
//
//   loaded.value = true
// })
//
// async function loadConversation() {
//     const isNew = await isNewConversation({ user_id: route.query.user })
//
//     if (isNew) {
//         await createNewConversation({user_id: route.query.user })
//     }
// }
//

// const messageRightSide = ref()
//
// function scrollToNewMessage() {
//   const topPos = messageRightSide.value.messages.at(-1).offsetTop
//   let chat = messageRightSide.value.chatContainer
//   chat.scrollTop = topPos;
// }
</script>

<style lang="scss">
@import "@/assets/css/pages/profile/messageList.scss";
</style>
