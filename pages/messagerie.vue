<template>
  <div class="container z-3">
    <div
      class="row g-0"
      style="background-color: #665494; min-height: 350px;"
    >
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">
        <MessageLeftSide
          :conversations
          :current-conversation="currentConversation"
          @change-conversation="changeConversation($event)"
        />
      </div>
      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
        <component
          :is="currentConversation ? LazyMessageRightSide: LazyNewConversation"
          v-if="newConversation"
          :key="currentConversation ? currentConversation.id : newConversation.id"
          :conversation="currentConversation ?? newConversation"
          @read-message="readMessage"
        />
        <!--        <LazyMessageRightSide -->
        <!--          :conversation="currentConversation ?? newConversation" -->
        <!--          :key="currentConversation ? currentConversation.id : 0" -->
        <!--          ref="messageRightSide" -->
        <!--          @read-message="readMessage" -->
        <!--        /> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCookies } from '@vueuse/integrations/useCookies'
import MessageLeftSide from '~/components/profile/MessageLeftSide.vue'
import LazyMessageRightSide from '~/components/profile/MessageRightSide.vue'
import LazyNewConversation from '~/components/profile/NewConversation.vue'
import type { ConversationModel } from '~/types/api/conversations'
import { useNewConversation } from '~/composables/useNewConversation'

definePageMeta({
  layout: 'profile',
})

useSeoMeta({
  title: 'Messagerie',
})

const currentConversation = ref<ConversationModel | null>(null)
const { data: conversations } = await useFetch<ConversationModel[]>(
  '/api/conversations/list',
  {
    key: 'test',
  },
)

const cookies = useCookies(['currentConversationId'])
const route = useRoute()
const { handle, isNewConversation, newConversation } = useNewConversation()

onMounted(async () => {
  await handle(conversations.value ?? [])

  if (conversations.value && !isNewConversation.value) {
    currentConversation.value = getCurrentConversation()
  }
})

const getCurrentConversation = () => {
  if (!conversations.value) return null

  if (route.query['new-conversation-with-user']) {
    const currentConversation = conversations.value.find(
      (c: ConversationModel) => [c.sendFrom, c.sendTo].includes(route.query['new-conversation-with-user'] ? +route.query['new-conversation-with-user'] : 0))

    if (currentConversation) return currentConversation
  }

  if (cookies.get('currentConversationId')) {
    const currentConversation = conversations.value.find((c: ConversationModel) => c.id === cookies.get('currentConversationId'))

    if (currentConversation) return currentConversation
  }

  return conversations.value![0]
}

const readMessage = (conversationId: number) => {
  if (!conversations.value) return

  conversations.value.every((conversation: ConversationModel) => {
    if (conversation.id === conversationId) {
      conversation.total_messages_unread--
    }
  })
}

const key = ref(0)

const changeConversation = (conversation: ConversationModel | null) => {
  currentConversation.value = conversation
  key.value++

  if (conversation) {
    cookies.set('currentConversationId', conversation.id)
  }
}
</script>

<style lang="scss">
@import "assets/css/pages/profile/messageList";
</style>
