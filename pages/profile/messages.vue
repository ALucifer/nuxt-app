<template>
  <div class="container">
    <div
      class="row g-0"
      style="background-color: #665494; min-height: 350px"
      v-if="loaded"
    >
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">
        <MessageLeftSide
          @changeConversation="
            changeActiveConversation({
              id: $event.conversation_id,
            })
          "
          :conversations="conversations"
        />
      </div>
      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
        <MessageRightSide ref="messages" @newMessage="scrollToNewMessage" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MessageLeftSide from "@/components/profile/MessageLeftSide.vue";
import MessageRightSide from "@/components/profile/MessageRightSide.vue";
import { useConversationStore } from "@/store/conversation";
import ClientSSE from "~/app/client/sse/ClientSSE";

const loaded = ref(false)

const {
    changeActiveConversation, createNewConversation, isNewConversation, fetchConversations, fetchMessages, addMessage
} = useConversationStore()
const { data } = useAuth()
const route = useRoute()

const conversations = computed(() => useConversationStore().conversations)

useAsyncData(() => {
  return fetchConversations()
})

onMounted(async () => {
  if (conversations.length !== 0) {
    await fetchMessages()
  }

  if (route.query.user) {
    await loadConversation()
  }

  const clientSSE = new ClientSSE(data.value.user)
  clientSSE.connect()

  clientSSE.eventSource.onmessage = ({ data }) => {
    addMessage(JSON.parse(data)).then(() => {
      scrollToNewMessage();
    });
  };

  loaded.value = true
})

async function loadConversation() {
    const isNew = await isNewConversation({ user_id: route.query.user })

    if (isNew) {
        await createNewConversation({user_id: route.query.user })
    }
}

function scrollToNewMessage() {
    const topPos = this.$refs.messages.$refs.messages.at(-1).offsetTop;
    let chat = this.$refs.messages.$refs.chat__container;
    chat.scrollTop = topPos;
}
</script>

<style lang="scss">
@import "@/assets/css/pages/profile/messageList.scss";
</style>
