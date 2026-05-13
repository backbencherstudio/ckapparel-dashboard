import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getSocket } from '@/lib/socket';
import { CHAT_KEYS } from '@/hooks/useChat';
import { ChatMessage } from '@/types/chat.types';

export const useChatSocket = (conversationId: string | undefined) => {
    const queryClient = useQueryClient();
    const currentConversationRef = useRef<string | undefined>(conversationId);

    useEffect(() => {
        currentConversationRef.current = conversationId;
    }, [conversationId]);

    useEffect(() => {
        if (!conversationId) return;

        let cleanup: (() => void) | undefined;

        const initSocket = async () => {
            const socket = await getSocket();

            // Join conversation room
            socket.emit('join:conversation', { conversationId });

            // Listen for new messages
            const handleNewMessage = (newMessage: ChatMessage) => {
                if (currentConversationRef.current !== newMessage.conversationId) return;

                queryClient.setQueryData(
                    CHAT_KEYS.messages(newMessage.conversationId),
                    (old: any) => {
                        if (old?.pages?.[0]) {
                            return {
                                ...old,
                                pages: [
                                    {
                                        ...old.pages[0],
                                        items: [...old.pages[0].items, newMessage],
                                    },
                                    ...old.pages.slice(1),
                                ],
                            };
                        }
                        return old;
                    }
                );

                queryClient.invalidateQueries({ queryKey: CHAT_KEYS.conversations() });
            };

            socket.on('message:new', handleNewMessage);

            cleanup = () => {
                socket.emit('leave:conversation', { conversationId });
                socket.off('message:new', handleNewMessage);
            };
        };

        initSocket();

        return () => {
            cleanup?.();
        };
    }, [conversationId, queryClient]);
};