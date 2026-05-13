"use client";

import { useState, useMemo } from "react";
import Sidebar from "./Sidebar";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import {
  useGetConversations,
  useSendMessage,
  useGetMessages,
} from "@/hooks/useChat";
import { useChatSocket } from "@/hooks/useChatSocket";
import { ChatMessage, ChatConversation } from "@/types/chat.types";
import toast from "react-hot-toast";

export default function ChatApp() {
  const [activeGroupId, setActiveGroupId] = useState<string>("");
  const [inputValue, setInputValue] = useState("");

  // ========== API INTEGRATION ==========
  const {
    data: conversations,
    isLoading,
    error,
  } = useGetConversations({ skip: 0, take: 50 });

  const activeConversation = conversations?.find((c) => c.id === activeGroupId);

  const {
    data: messagesData,
    isLoading: messagesLoading,
    fetchNextPage,
    hasNextPage,
  } = useGetMessages(activeGroupId);

  const sendMessageMutation = useSendMessage();

  // Real-time socket listener
  useChatSocket(activeGroupId);

  // Transform API messages to UI format
  const activeMessages: ChatMessage[] = useMemo(() => {
    if (!messagesData?.pages) return [];
    return messagesData.pages.flatMap((page) => page.items).reverse();
  }, [messagesData]);

  // ========== EVENT HANDLERS ==========
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !activeConversation) return;

    try {
      await toast.promise(
        sendMessageMutation.mutateAsync({
          conversationId: activeConversation.id,
          payload: { text: inputValue },
        }),
        {
          loading: "Sending...",
          success: "Message sent!",
          error: "Failed to send message",
        },
      );
      setInputValue("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  // ========== LOADING STATE ==========
  if (isLoading) {
    return (
      <div className="flex -mt-6 -ml-6 h-[calc(100vh-78px)] bg-[#0a0a0a] text-neutral-200 font-sans overflow-hidden">
        <div className="max-w-[432px] shrink-0 border-r border-neutral-800 bg-[#111111] flex flex-col p-6">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-neutral-800" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-neutral-800 rounded w-3/4" />
                  <div className="h-3 bg-neutral-800 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-2 border-neutral-600 border-t-blue-500 rounded-full" />
        </div>
      </div>
    );
  }

  // ========== ERROR STATE ==========
  if (error) {
    return (
      <div className="flex -mt-6 -ml-6 h-[calc(100vh-78px)] bg-[#0a0a0a] items-center justify-center">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-red-500 text-center max-w-md">
          <h3 className="text-lg font-semibold mb-2">
            Failed to load conversations
          </h3>
          <p className="text-sm">
            {(error as Error)?.message || "Please try again later"}
          </p>
        </div>
      </div>
    );
  }

  // ========== RENDER ==========
  return (
    <div className="flex -mt-6 -ml-6 h-[calc(100vh-78px)] bg-[#0a0a0a] text-neutral-200 font-sans overflow-hidden">
      <Sidebar
        conversations={conversations || []}
        activeGroupId={activeGroupId}
        onSelect={setActiveGroupId}
      />

      <div className="flex-1 flex flex-col bg-[#0a0a0a]">
        {activeConversation ? (
          <>
            <ChatHeader conversation={activeConversation} />
            <MessageList
              messages={activeMessages}
              isLoading={messagesLoading}
              hasMore={!!hasNextPage}
              onLoadMore={() => fetchNextPage()}
            />
            <MessageInput
              value={inputValue}
              onChange={setInputValue}
              onSubmit={handleSendMessage}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-neutral-500">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
}
