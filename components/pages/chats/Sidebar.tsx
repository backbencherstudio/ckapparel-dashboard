"use client";

import { useState } from "react";
import { Search, CheckCheck } from "lucide-react";
import { ChatConversation } from "@/types/chat.types";
import { format } from "date-fns";

type Props = {
  conversations: ChatConversation[];
  activeGroupId: string;
  onSelect: (id: string) => void;
};

export default function Sidebar({ conversations, activeGroupId, onSelect }: Props) {
  const [search, setSearch] = useState("");

  const filteredConversations = conversations.filter((conv) =>
    conv.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-[432px] shrink-0 border-r border-neutral-800 bg-[#111111] flex flex-col">
      {/* Search */}
      <div className="px-6 pt-6 pb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Search in chat"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1a1a1a] text-sm text-neutral-200 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-neutral-700 placeholder:text-neutral-500 border border-neutral-800"
          />
        </div>
      </div>

      {/* Group List */}
      <div className="flex-1 overflow-y-auto pb-4 px-6">
        {filteredConversations.length === 0 ? (
          <div className="text-center text-neutral-500 mt-20">
            <p className="text-sm">No conversations found</p>
          </div>
        ) : (
          filteredConversations.map((conv) => {
            const isActive = activeGroupId === conv.id;

            // Get initials from title for avatar
            const initials = conv.title
              .split(" ")
              .map((word) => word[0])
              .join("")
              .toUpperCase()
              .slice(0, 2);

            // Format time
            const timeString = conv.updatedAt
              ? format(new Date(conv.updatedAt), "h:mm a")
              : "";

            return (
              <div
                key={conv.id}
                onClick={() => onSelect(conv.id)}
                className={`flex items-center gap-3 px-5 py-3 rounded-xl cursor-pointer transition-colors mt-1 ${isActive ? "bg-[#1a2332]" : "hover:bg-[#1a1a1a]"
                  }`}
              >
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white flex-shrink-0 flex items-center justify-center">
                  {conv.avatarUrl ? (
                    <img
                      src={conv.avatarUrl}
                      alt={conv.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-black text-[8px] font-bold text-center leading-tight whitespace-pre-line">
                      {initials}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3
                      className={`text-sm font-semibold truncate ${isActive ? "text-white" : "text-neutral-300"
                        }`}
                    >
                      {conv.title}
                    </h3>
                    <span className="text-xs text-neutral-500 flex-shrink-0 ml-2">
                      {timeString}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-neutral-500 truncate pr-2">
                      {conv.memberships.length} members
                    </p>
                    {conv.unread > 0 && (
                      <span className="bg-rose-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0">
                        {conv.unread > 99 ? "99+" : conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}