"use client";

import { useEffect, useRef } from "react";

import MessageBubble from "./MessageBubble";
import { Message } from "./chat";

export default function MessageList({ messages }: { messages: Message[] }) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      <div className="flex justify-center">
        <span className="text-xs text-neutral-500">Today</span>
      </div>
      {messages.map((msg) => (
        <MessageBubble key={msg.id} msg={msg} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}