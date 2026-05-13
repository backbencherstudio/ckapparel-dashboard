"use client";

import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import { ChatMessage } from "@/types/chat.types";

interface MessageListProps {
  messages: ChatMessage[];
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

export default function MessageList({ messages, isLoading, hasMore, onLoadMore }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load more messages when scrolling to top
  const handleScroll = () => {
    if (containerRef.current && hasMore && onLoadMore) {
      const { scrollTop } = containerRef.current;
      if (scrollTop === 0) {
        onLoadMore();
      }
    }
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto p-6 space-y-6"
    >
      {isLoading && hasMore && (
        <div className="flex justify-center">
          <div className="animate-spin h-5 w-5 border-2 border-neutral-600 border-t-blue-500 rounded-full" />
        </div>
      )}

      {messages.length === 0 && !isLoading && (
        <div className="flex items-center justify-center h-full">
          <p className="text-neutral-500 text-sm">No messages yet. Start the conversation!</p>
        </div>
      )}

      {messages.length > 0 && (
        <div className="flex justify-center">
          <span className="text-xs text-neutral-500">Today</span>
        </div>
      )}

      {messages.map((msg) => (
        <MessageBubble key={msg.id} msg={msg} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}