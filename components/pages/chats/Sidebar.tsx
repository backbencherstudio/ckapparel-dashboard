"use client";

import { Search, CheckCheck } from "lucide-react";
import { Group } from "./chat";


type Props = {
  groups: Group[];
  activeGroupId: number;
  onSelect: (id: number) => void;
};

export default function Sidebar({ groups, activeGroupId, onSelect }: Props) {
  return (
    <div className="max-w-[432px] shrink-0 border-r border-neutral-800 bg- [#111111] flex flex-col ">
      {/* Search */}
      <div className="px-6 pt-6 pb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Search in chat"
            className="w-full bg-[#1a1a1a] text-sm text-neutral-200 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-neutral-700 placeholder:text-neutral-500 border border-neutral-800"
          />
        </div>
      </div>

      {/* Group List */}
      <div className="flex-1 overflow-y-auto pb-4 px-6">
        {groups.map((group) => {
          const isActive = activeGroupId === group.id;
          const lastMessage = group.messages[group.messages.length - 1];
          const preview = lastMessage
            ? `${lastMessage.isSent ? "You" : lastMessage.sender}: ${lastMessage.text}`
            : "No messages yet";

          return (
            <div
              key={group.id}
              onClick={() => onSelect(group.id)}
              className={`flex items-center gap-3 px-5 py-3  rounded-xl cursor-pointer transition-colors mt-1 ${
                isActive ? "bg-[#1a2332]" : "hover:bg-[#1a1a1a]"
              }`}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white flex-shrink-0 flex items-center justify-center">
                <span className="text-black text-[8px] font-bold text-center leading-tight whitespace-pre-line">
                  {group.icon}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3
                    className={`text-sm font-semibold truncate ${
                      isActive ? "text-white" : "text-neutral-300"
                    }`}
                  >
                    {group.title}
                  </h3>
                  <span className="text-xs text-neutral-500 flex-shrink-0 ml-2">
                    {group.time}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-neutral-500 truncate pr-2">{preview}</p>
                  {group.badge && (
                    <span className="bg-rose-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0">
                      {group.badge}
                    </span>
                  )}
                  {group.read && !group.badge && (
                    <CheckCheck className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}