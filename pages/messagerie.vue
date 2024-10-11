<template>
  <div class="container z-3">
    <div
      class="row g-0"
      style="background-color: #665494; min-height: 350px;"
    >
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">
        <MessageLeftSide :conversations :current-conversation="currentConversation" @change-conversation="(conversation: ConversationModel) => currentConversation = conversation" />
      </div>
      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
        <LazyMessageRightSide
          v-if="currentConversation"
          :conversation="currentConversation"
          :key="currentConversation.id"
          ref="messageRightSide"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MessageLeftSide from '~/components/profile/MessageLeftSide.vue'
import LazyMessageRightSide from '~/components/profile/MessageRightSide.vue'
import type {ConversationModel} from "~/types/api/conversations";

definePageMeta({
  layout: 'profile',
  middleware: ['is-new-conversation'],
})

useSeoMeta({
  title: 'Messagerie',
})

const currentConversation = ref<ConversationModel>()
const { data: conversations } = await useFetch<ConversationModel[]>(
  '/api/conversations/list',
  {
    key: 'test'
  }
)

if (conversations.value && conversations.value.length > 0) {
  currentConversation.value = conversations.value[0]
}

onMounted(async () => {
  // const clientSSE = new ClientSSE(getUser().id)
  // clientSSE.connect()
  //
  // clientSSE.eventSource.onmessage = ({ data }) => {
  //   messageHasArrived(JSON.parse(data))
  //   if (currentConversation.value && currentConversation.value.id === JSON.parse(data).id) {
  //     scrollToNewMessage()
  //   }
  // }
})
</script>

<style lang="scss">
@import "assets/css/pages/profile/messageList";
</style>
