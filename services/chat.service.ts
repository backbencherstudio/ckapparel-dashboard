import axios from "@/lib/axios";
import {
  ChatConversationsResponse,
  ChatMessagesResponse,
  ChatMessage,
  GetConversationsParams,
  GetMessagesParams,
  SendMessagePayload,
  MarkReadPayload,
  AddMembersPayload,
  SetRolePayload,
  UpdateConversationNamePayload,
  ChatBlockResponse,
} from "@/types/chat.types";

export const chatService = {
  // ============ CONVERSATIONS ============

  getConversations: async (
    params?: GetConversationsParams,
  ): Promise<ChatConversationsResponse> => {
    const response = await axios.get("/conversations", { params });
    // Response is a flat array based on Swagger
    return response.data;
  },

  getConversationUnreadCount: async (
    conversationId: string,
  ): Promise<unknown> => {
    const response = await axios.get(`/conversations/${conversationId}/unread`);
    return response.data;
  },

  markConversationRead: async (
    conversationId: string,
    payload: MarkReadPayload,
  ): Promise<unknown> => {
    const response = await axios.patch(
      `/conversations/${conversationId}/read`,
      payload,
    );
    return response.data;
  },

  addMembersToGroup: async (
    conversationId: string,
    payload: AddMembersPayload,
  ): Promise<unknown> => {
    const response = await axios.post(
      `/conversations/${conversationId}/members`,
      payload,
    );
    return response.data;
  },

  getGroupMembers: async (conversationId: string): Promise<unknown> => {
    const response = await axios.get(
      `/conversations/${conversationId}/members`,
    );
    return response.data;
  },

  updateMemberRole: async (
    conversationId: string,
    userId: string,
    payload: SetRolePayload,
  ): Promise<unknown> => {
    const response = await axios.patch(
      `/conversations/${conversationId}/members/${userId}/role`,
      payload,
    );
    return response.data;
  },

  removeMember: async (
    conversationId: string,
    userId: string,
  ): Promise<unknown> => {
    const response = await axios.post(
      `/conversations/${conversationId}/members/${userId}/remove`,
    );
    return response.data;
  },

  clearConversation: async (conversationId: string): Promise<unknown> => {
    const response = await axios.patch(
      `/conversations/${conversationId}/clear`,
    );
    return response.data;
  },

  updateConversationName: async (
    conversationId: string,
    payload: UpdateConversationNamePayload,
  ): Promise<unknown> => {
    const response = await axios.patch(
      `/conversations/${conversationId}/name`,
      payload,
    );
    return response.data;
  },

  updateConversationAvatar: async (
    conversationId: string,
    file: File,
  ): Promise<unknown> => {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await axios.patch(
      `/conversations/${conversationId}/avatar`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  },

  deleteConversation: async (conversationId: string): Promise<unknown> => {
    const response = await axios.delete(`/conversations/${conversationId}`);
    return response.data;
  },

  blockConversation: async (
    conversationId: string,
  ): Promise<ChatBlockResponse> => {
    const response = await axios.post(`/conversations/${conversationId}/block`);
    return response.data;
  },

  // ============ MESSAGES ============

  getMessages: async ({
    conversationId,
    cursor,
    take,
  }: GetMessagesParams): Promise<ChatMessagesResponse> => {
    const params: Record<string, unknown> = {};
    if (take !== undefined) params.take = take;
    if (cursor) params.cursor = cursor;

    const response = await axios.get(
      `/conversations/${conversationId}/messages`,
      { params },
    );
    return response.data;
  },

  sendMessage: async (
    conversationId: string,
    payload: SendMessagePayload,
  ): Promise<ChatMessage> => {
    const response = await axios.post(
      `/conversations/${conversationId}/messages`,
      payload,
    );
    // Assuming response wraps the created message, adjust based on actual response
    return response.data?.data || response.data;
  },

  deleteMessage: async (messageId: string): Promise<unknown> => {
    const response = await axios.delete(`/messages/${messageId}`);
    return response.data;
  },
};
