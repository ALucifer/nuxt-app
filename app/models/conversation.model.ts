import {UserModel} from "~/app/models/user.model";

export interface InterlocutorModel {
    id: number,
    avatar: string,
    pseudo: string,
}

export interface ConversationModel {
    id: number,
    created_at: Date,
    updated_at: Date,
    send_from: number,
    send_to: number,
    total_messages: number,
    interlocutor: InterlocutorModel,
}

export interface ConversationMessagesModel {
    id: number,
    created_at: Date,
    updated_at: Date,
    send_from: number,
    send_to: number,
    messages: Array<MessageModel>
}

export interface MessageModel {
    id: number,
    conversation: number,
    created_at: Date,
    updated_at: Date,
    text: string,
    from: number,
    to: number,
    state: string,
    fromUser: UserModel
}

export interface MessageForm {
    text: string,
    sendTo: number,
    conversation_id: number
}