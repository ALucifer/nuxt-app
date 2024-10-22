<template>
  <div class="selected-user">
    <span>De:
      <span class="selected-user__name">{{ conversation.interlocutor.pseudo }}</span>
    </span>
  </div>
  <div
    ref="chatContainer"
    class="chat-container chat__container"
  >
    <ul
      ref="chat"
      class="chat-box chatContainerScroll"
    >
      <li
        v-for="(item) in messages"
        :key="item.id"
        v-observe="{
          callback: readMessage,
          useCallback: item.state === 'UNREAD' && !isOwnMessage(item),
          message: item,
        }"
        class="chat__message"
        :class="{
          'chat__message message-item__left': isOwnMessage(item),
          'chat__message message-item__right': !isOwnMessage(item),
        }"
      >
        <div
          :class="{
            'message-item__avatar-left': isOwnMessage(item),
            'message-item__avatar-right': !isOwnMessage(item),
          }"
        >
          <AppImage
            :src="item.fromUser.avatar"
            placeholder="/images/participant-1.png"
            :alt="`${item.fromUser.pseudo} avatar`"
            class="message-item__avatar"
          />
          <div class="message-item__pseudo">
            {{ item.fromUser.pseudo }}
          </div>
        </div>
        <div
          class="message-item__text"
          :class="{
            'message-item__text--left': isOwnMessage(item),
            'message-item__text--right': !isOwnMessage(item),
          }"
        >
          {{ item.text }}
        </div>
        <div
          class="message-item__hour"
          :class="{ 'message-item__hour--right': !isOwnMessage(item) }"
        >
          {{ $dayjs(item.createdAt).fromNow() }}
        </div>
      </li>
      <AppInfiniteScroll
        v-if="data && messages"
        :done="messages.length >= data.meta.total"
        @load="loadNextMessages"
      />
    </ul>
  </div>
  <div class="form-group mt-3 mb-0 p-3">
    <form @submit="onSubmit">
      <AppTextarea
        id="message"
        class="form-control"
        rows="3"
        placeholder="Tapez votre message"
        name="message"
        @keydown.enter="onSubmit"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import type { ConversationMessagesModel, MessageModel, MessagesPaginate } from '~/types/api/conversations'
import { sendMessageFormSchema } from '~/utils/schemas.form'
import type { SendMessageForm } from '~/app/form/send-message.form'
import type { CssClassFlashMessage } from '~/types/notifications'
import AppInfiniteScroll from '~/components/global/AppInfiniteScroll.vue'

const props = defineProps<{ conversation: ConversationMessagesModel }>()
const { handleSubmit } = useForm<SendMessageForm>({ validationSchema: sendMessageFormSchema })
const { addMessage } = useFlashMessages()

const messageBody = reactive({
  text: '',
  sendTo: props.conversation.interlocutor.id,
  conversation_id: props.conversation.id,
})

const {
  conversationHasLoaded, addConversation, initMessagesToConversation,
  messages, setCurrentConversationId, addMessageToConversation, addMessagesToConversation,
} = useConversations()

const page = ref(1)

const { data, execute: fetchMessages } = useFetch<MessagesPaginate>(
  `/api/conversations/${props.conversation.id}/messages`,
  {
    key: 'current-conversation',
    query: {
      conversationId: props.conversation.id,
      page,
    },
    immediate: false,
    lazy: true,
    watch: false,
  },
)

const chat = useTemplateRef<HTMLElement>('chat')

onMounted(async () => {
  setCurrentConversationId(props.conversation)

  if (!conversationHasLoaded(props.conversation)) {
    addConversation(props.conversation)

    await fetchMessages()
    await initMessagesToConversation(data.value!.data ?? [], props.conversation.id)
  }

  const resizeObserver = new ResizeObserver(
    (entries) => {
      for (const entry of entries) {
        console.log(entry)
      }
    },
  )
  if (chat.value) {
    resizeObserver.observe(chat.value)

    onBeforeUnmount(() => {
      resizeObserver.unobserve(chat.value)
    })
  }

  await scrollToEndConversation()
})

const { getUser } = useSecurity()

const { execute, data: newMessage } = useFetch<MessageModel>(
  '/api/conversations/message',
  {
    method: 'POST',
    body: messageBody,
    immediate: false,
    lazy: true,
    watch: false,
  },
)

const isOwnMessage = (message: MessageModel) => {
  return getUser().id === message.fromUser.id
}

const onSubmit = handleSubmit(
  async (values: SendMessageForm, { resetForm }) => {
    messageBody.text = values.message
    try {
      await execute()
      if (newMessage.value) {
        await addMessageToConversation(newMessage.value)
      }
      resetForm()
      await scrollToEndConversation()
    }
    catch {
      addMessage({
        class: 'error' as CssClassFlashMessage,
        message: 'Votre message n\'a pas pu être envoyé.',
      })
    }
  },
)

const scrollToEndConversation = async () => {
  if (chat.value) {
    chat.value.scrollIntoView({ block: 'end' })
  }
}

const loadNextMessages = async () => {
  page.value++
  await fetchMessages()

  if (data.value) {
    addMessagesToConversation(data.value.data)
  }
}
const emits = defineEmits(['readMessage'])
const messageReading = ref<MessageModel>()
const { execute: apiReadMessage } = useFetch(
  '/api/conversations/readMessage',
  {
    method: 'POST',
    body: messageReading,
    immediate: false,
    lazy: true,
    watch: false,
  },
)
const readMessage = async (message: MessageModel) => {
  messageReading.value = message

  await apiReadMessage()
  emits('readMessage', message.conversation)

  messageReading.value = undefined
}
</script>

<style lang="scss">
@import "@/assets/css/components/profile/messageRightSide.scss";
</style>
