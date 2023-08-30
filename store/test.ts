import { defineStore } from "pinia";
import {ConversationModel} from "~/app/models/conversation.model";

export const useTestStore = defineStore({
    id: "test",
    state: () => {
        return {
            conversations: [] as ConversationModel[],
        };
    },
    actions: {
        setConversations(conversations: any) {
            this.conversations = conversations
        },
    },
});
