import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { chatService } from '@/services/chat.service';
import {
    GetConversationsParams,
    SendMessagePayload,
    MarkReadPayload,
    AddMembersPayload,
    SetRolePayload,
    UpdateConversationNamePayload,
} from '@/types/chat.types';


// QUERY KEY FACTORY

export const CHAT_KEYS = {
    all: ['chat'] as const,
    conversations: () => [...CHAT_KEYS.all, 'conversations'] as const,
    conversationList: (params?: GetConversationsParams) =>
        [...CHAT_KEYS.conversations(), params] as const,
    messages: (conversationId: string) =>
        [...CHAT_KEYS.all, 'messages', conversationId] as const,
    unread: (conversationId: string) =>
        [...CHAT_KEYS.all, 'unread', conversationId] as const,
    members: (conversationId: string) =>
        [...CHAT_KEYS.all, 'members', conversationId] as const,
};


// CONVERSATION HOOKS


export const useGetConversations = (params?: GetConversationsParams) => {
    return useQuery({
        queryKey: CHAT_KEYS.conversationList(params),
        queryFn: () => chatService.getConversations(params),
    });
};

export const useGetUnreadCount = (conversationId: string) => {
    return useQuery({
        queryKey: CHAT_KEYS.unread(conversationId),
        queryFn: () => chatService.getConversationUnreadCount(conversationId),
        enabled: !!conversationId,
        // Poll every 10 seconds for unread updates
        refetchInterval: 10000,
    });
};

export const useMarkConversationRead = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            conversationId,
            payload,
        }: {
            conversationId: string;
            payload: MarkReadPayload;
        }) => chatService.markConversationRead(conversationId, payload),
        onSuccess: (_, { conversationId }) => {
            queryClient.invalidateQueries({ queryKey: CHAT_KEYS.unread(conversationId) });
            queryClient.invalidateQueries({ queryKey: CHAT_KEYS.conversations() });
        },
    });
};

export const useAddMembersToGroup = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            conversationId,
            payload,
        }: {
            conversationId: string;
            payload: AddMembersPayload;
        }) => chatService.addMembersToGroup(conversationId, payload),
        onSuccess: (_, { conversationId }) => {
            queryClient.invalidateQueries({ queryKey: CHAT_KEYS.members(conversationId) });
            queryClient.invalidateQueries({ queryKey: CHAT_KEYS.conversations() });
        },
    });
};

export const useGetGroupMembers = (conversationId: string) => {
    return useQuery({
        queryKey: CHAT_KEYS.members(conversationId),
        queryFn: () => chatService.getGroupMembers(conversationId),
        enabled: !!conversationId,
    });
};

export const useUpdateMemberRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            conversationId,
            userId,
            payload,
        }: {
            conversationId: string;
            userId: string;
            payload: SetRolePayload;
        }) => chatService.updateMemberRole(conversationId, userId, payload),
        onSuccess: (_, { conversationId }) => {
            queryClient.invalidateQueries({ queryKey: CHAT_KEYS.members(conversationId) });
        },
    });
};

export const useRemoveMember = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            conversationId,
            userId,
        }: {
            conversationId: string;
            userId: string;
        }) => chatService.removeMember(conversationId, userId),
        onSuccess: (_, { conversationId }) => {
            queryClient.invalidateQueries({ queryKey: CHAT_KEYS.members(conversationId) });
            queryClient.invalidateQueries({ queryKey: CHAT_KEYS.conversations() });
        },
    });
};

export const useClearConversation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (conversationId: string) => chatService.clearConversation(conversationId),
        onSuccess: (_, conversationId) => {
            queryClient.invalidateQueries({ queryKey: CHAT_KEYS.messages(conversationId) });
            queryClient.invalidateQueries({ queryKey: CHAT_KEYS.conversations() });
        },
    });
};

export const useUpdateConversationName = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            conversationId,
            payload,
        }: {
            conversationId: string;
            payload: UpdateConversationNamePayload;
        }) => chatService.updateConversationName(conversationId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CHAT_KEYS.conversations() });
        },
    });
};

export const useUpdateConversationAvatar = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ conversationId, file }: { conversationId: string; file: File }) =>
            chatService.updateConversationAvatar(conversationId, file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CHAT_KEYS.conversations() });
        },
    });
};

export const useDeleteConversation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (conversationId: string) => chatService.deleteConversation(conversationId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CHAT_KEYS.conversations() });
        },
    });
};

export const useBlockConversation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (conversationId: string) => chatService.blockConversation(conversationId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CHAT_KEYS.conversations() });
        },
    });
};


// MESSAGE HOOKS


export const useGetMessages = (conversationId: string, take: number = 20) => {
    return useInfiniteQuery({
        queryKey: [...CHAT_KEYS.messages(conversationId), take],
        queryFn: ({ pageParam }) =>
            chatService.getMessages({
                conversationId,
                cursor: pageParam as string | undefined,
                take,
            }),
        initialPageParam: undefined as string | undefined,
        getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
        enabled: !!conversationId,
    });
};

export const useSendMessage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            conversationId,
            payload,
        }: {
            conversationId: string;
            payload: SendMessagePayload;
        }) => chatService.sendMessage(conversationId, payload),
        onSuccess: (_, { conversationId }) => {
            queryClient.invalidateQueries({ queryKey: CHAT_KEYS.messages(conversationId) });
            queryClient.invalidateQueries({ queryKey: CHAT_KEYS.conversations() });
        },
    });
};

export const useDeleteMessage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (messageId: string) => chatService.deleteMessage(messageId),
        onSuccess: () => {
            // Invalidate all message queries since we don't know which conversation
            queryClient.invalidateQueries({ queryKey: [CHAT_KEYS.all[0], 'messages'] });
        },
    });
};