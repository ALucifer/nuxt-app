import type {UserModel} from "~/app/models/user.model";

export interface InterlocutorModel {
    id: number
    avatar: string
    pseudo: string
}

export interface ConversationModel {
    id: number
    created_at: Date
    updated_at: Date
    send_from: number
    send_to: number
    total_messages: number
    total_messages_unread: number
    interlocutor: InterlocutorModel
}

export interface ConversationMessagesModel extends ConversationModel {
    messages: MessageModel[]
}

export interface MessageModel {
    id: number
    conversation: number
    createdAt: Date
    updatedAt: Date
    text: string
    from: number
    to: number
    state: string
    fromUser: UserModel
}

export interface MessageForm {
    text: string
    sendTo: number
    conversation_id: number
}
