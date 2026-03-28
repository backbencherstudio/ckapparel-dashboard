"use client";

import { useState } from "react";
import { Group, Message } from "./chat";
import { INITIAL_GROUPS } from "./chat";
import Sidebar from "./Sidebar";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

export default function ChatApp() {
  const [groups, setGroups] = useState<Group[]>(INITIAL_GROUPS);
  const [activeGroupId, setActiveGroupId] = useState<number>(1);
  const [inputValue, setInputValue] = useState("");

  const activeGroup = groups.find((g) => g.id === activeGroupId);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !activeGroup) return;

    const newMessage: Message = {
      id: Date.now(),
      sender: "You",
      avatar: "https://picsum.photos/seed/you/100/100",
      text: inputValue,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isSent: true,
      status: "Delivered",
    };

    setGroups((prev) =>
      prev.map((g) =>
        g.id === activeGroupId
          ? {
              ...g,
              messages: [...g.messages, newMessage],
              time: newMessage.time,
              badge: undefined,
            }
          : g
      )
    );

    setInputValue("");
  };

  return (
    <div className="flex -mt-6 -ml-6  h-[calc(100vh-78px)] bg-[#0a0a0a] text-neutral-200 font-sans overflow-hidden ">

      <Sidebar
        groups={groups}
        activeGroupId={activeGroupId}
        onSelect={setActiveGroupId}
      />

      <div className="flex-1 flex flex-col bg-[#0a0a0a]">
        {activeGroup ? (
          <>
            <ChatHeader group={activeGroup} />
            <MessageList messages={activeGroup.messages} />
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