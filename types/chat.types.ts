// ---- Conversation ----
export interface ChatMembership {
    userId: string;
    role: 'ADMIN' | 'MEMBER';
    lastReadAt: string;
    clearedAt: string | null;
}

export interface ChatConversation {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    type: 'GROUP' | 'DM';
    title: string;
    avatarUrl: string | null;
    senderTitle: string | null;
    receiverTitle: string | null;
    dmKey: string | null;
    createdBy: string;
    creatorId: string | null;
    participantId: string | null;
    memberships: ChatMembership[];
    messages: unknown[]; 
    creator: null;
    participant: null;
    unread: number;
    otherUserAvatar: string | null;
}

// ---- Message ----
export interface ChatSender {
    id: string;
    name: string;
    avatar: string;
}

export interface ChatMessageContent {
    text: string;
}

export type ChatMessageKind = 'TEXT' | 'IMAGE' | 'FILE';
export type ChatMessageStatus = 'PENDING' | 'SENT' | 'DELIVERED' | 'READ';

export interface ChatMessage {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    readAt: string | null;
    status: ChatMessageStatus;
    kind: ChatMessageKind;
    senderId: string;
    receiverId: string | null;
    conversationId: string;
    attachmentId: string | null;
    deletedById: string | null;
    media_Url: string | null;
    content: ChatMessageContent;
    message: null;
    sender: ChatSender;
}

// ---- API Response Wrappers ----
export interface ChatMessagesResponse {
    items: ChatMessage[];
    nextCursor: string | null;
}

// Conversation list is returned as flat array (based on your Swagger response)
export type ChatConversationsResponse = ChatConversation[];

// ---- Request Payloads ----
export interface GetConversationsParams {
    skip?: number;
    take?: number;
}

export interface GetMessagesParams {
    conversationId: string;
    cursor?: string;
    take?: number;
}

export interface SendMessagePayload {
    text: string;
}

export interface MarkReadPayload {
    at: string; // ISO date string
    messageCreatedAt: string; // ISO date string
}

export interface AddMembersPayload {
    memberIds: string[];
}

export interface SetRolePayload {
    role: 'ADMIN' | 'MEMBER';
}

export interface UpdateConversationNamePayload {
    title: string;
}

export interface ChatUnreadResponse {
    // Will update based on actual response when you test it
    count?: number;
}

export interface ChatBlockResponse {
    ok: boolean;
    conversationId: string;
    blockedBy: string;
    blockedAt: string;
    participantsAffected: number;
}