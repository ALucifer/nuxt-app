<template>
  <div class="container">
    <div
      class="row no-gutters"
      style="background-color: #665494; min-height: 350px"
      v-if="dataLoaded"
    >
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">
        <MessageLeftSide
          @changeConversation="
            this.changeActiveConversation({
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

<script>
import MessageLeftSide from "@/components/profile/MessageLeftSide.vue";
import MessageRightSide from "@/components/profile/MessageRightSide.vue";
import { useConversationStore } from "@/store/conversation";
import { useAuthStore } from "@/store/auth";
import { mapState, mapActions } from "pinia";

export default {
  components: { MessageLeftSide, MessageRightSide },
  data() {
    return {
      dataLoaded: false,
    };
  },
  computed: {
    ...mapState(useConversationStore, { conversations: "conversations" }),
    ...mapState(useAuthStore, { user: "getUser" }),
  },
  methods: {
    ...mapActions(useConversationStore, [
      "changeActiveConversation",
      "createNewConversation",
      "isNewConversation",
    ]),
    loadConversation: async function () {
      const isNew = await this.isNewConversation({
        user_id: parseInt(this.$route.query.user),
      });

      if (isNew) {
        this.createNewConversation({
          user_id: parseInt(this.$route.query.user),
        });
      }
    },
    scrollToNewMessage() {
      const topPos = this.$refs.messages.$refs.messages.at(-1).offsetTop;
      let chat = this.$refs.messages.$refs.chat__container;
      chat.scrollTop = topPos;
    },
  },
  async created() {
    const conversationStore = useConversationStore();
    await conversationStore.fetchConversations();
    if (this.conversations.length !== 0) {
      await conversationStore.fetchMessages();
    }
    if (this.$route.query.user) {
      await this.loadConversation();
    }
    this.dataLoaded = true;
  },

  mounted() {
    const conversationStore = useConversationStore();
    const mercureUrl = new URL("http://localhost:1338/.well-known/mercure");
    mercureUrl.searchParams.append("topic", `user/${this.user.id}/newmessage`);
    const eventSource = new EventSource(mercureUrl);
    eventSource.onmessage = ({ data }) => {
      conversationStore.addMessage(JSON.parse(data)).then(() => {
        this.scrollToNewMessage();
      });
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/css/pages/profile/messageList.scss";
</style>
